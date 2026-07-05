"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Play, Pause, RotateCcw, Volume2, Mic, Square, CheckCircle, 
  Eye, RefreshCw, VolumeX, Sparkles, BookOpen, HelpCircle,
  Languages, ChevronRight, ChevronLeft, Check, X, Info, Award, Headphones
} from "lucide-react";
import { shadowingLessons } from "@/lib/shadowingData";

interface Props {
  backUrl?: string;
  lessonSlug?: string;
}

export default function DictationShadowingClient({ backUrl = "/hoc-tap", lessonSlug = "luyen-nghe-a2-tong-ket-2025" }: Props) {
  // 5-step flow: 1 | 2 | 3 | 4 (Dictation) | 5 (Shadowing)
  const [step, setStep] = useState<number>(1);
  
  // Active lesson details
  const lessonData = shadowingLessons[lessonSlug] || shadowingLessons["luyen-nghe-a2-tong-ket-2025"];
  const { sentences, title, audio_url: youtubeVideoId } = lessonData;
  
  // Sentence state for Dictation & Shadowing steps (Step 4 & 5)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const currentSentence = sentences[currentSentenceIndex];

  // YouTube Player States
  const [player, setPlayer] = useState<any>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  // Active sentence highlighting state in Step 1 & 2
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);

  // Dictation States (Step 4)
  const [dictationMode, setDictationMode] = useState<"easy" | "hard">("easy");
  const [easyInputs, setEasyInputs] = useState<Record<number, string>>({});
  const [easyChecked, setEasyChecked] = useState(false);
  const [easyShowAnswers, setEasyShowAnswers] = useState(false);
  const [hardInput, setHardInput] = useState("");
  const [hardChecked, setHardChecked] = useState(false);
  const [hardShowAnswers, setHardShowAnswers] = useState(false);

  // Shadowing Speaking States (Step 5)
  const [isRecording, setIsRecording] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState("");
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [shadowingScore, setShadowingScore] = useState<number | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  // Dictionary Popup State
  const [clickedWord, setClickedWord] = useState<string | null>(null);
  const [wordTranslation, setWordTranslation] = useState<string | null>(null);
  const [wordLoading, setWordLoading] = useState(false);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);

  // Timings offsets
  // Lần 1: 0 offset (12.0s to 244.0s)
  // Lần 2: 230400ms offset (starts at ~245.76s in video)
  // Lần 3: 460800ms offset (starts at ~476.16s in video)
  const getPlayOffsetSeconds = (activeStep: number): number => {
    const period = lessonData.repeat_offset || 0;
    if (activeStep === 1) return 0;
    if (activeStep === 2) return period;
    if (activeStep === 3) return period * 2;
    return 0; // step 4 & 5 have custom offsets
  };

  // Reset sentence specific states when shifting sentences
  const resetSentenceStates = () => {
    setEasyInputs({});
    setEasyChecked(false);
    setEasyShowAnswers(false);
    setHardInput("");
    setHardChecked(false);
    setHardShowAnswers(false);
    setSpeechTranscript("");
    setUserAudioUrl(null);
    setShadowingScore(null);
    setClickedWord(null);
  };

  // Initialize YouTube Iframe API
  useEffect(() => {
    const initPlayer = () => {
      const p = new (window as any).YT.Player("youtube-player", {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            setPlayerReady(true);
          },
          onStateChange: (event: any) => {
            if (event.data === 1) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }
  }, [youtubeVideoId]);

  // Track Player current time to highlight sentences and handle boundary limits
  useEffect(() => {
    let interval: any;
    if (isPlaying && player) {
      interval = setInterval(() => {
        const t = player.getCurrentTime(); // in seconds
        setCurrentTime(t);

        // Auto pause boundary for sentence modes (Step 4 & 5)
        if (step >= 4 && currentSentence) {
          const endSec = currentSentence.end / 1000;
          if (t >= endSec) {
            player.pauseVideo();
          }
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, player, step, currentSentenceIndex, currentSentence]);

  // Determine active sentence index
  useEffect(() => {
    if (step >= 4) {
      setActiveSentenceIndex(currentSentenceIndex);
      return;
    }

    const offset = getPlayOffsetSeconds(step);
    const currentMs = (currentTime - offset) * 1000;
    
    const foundIdx = sentences.findIndex(
      (s) => currentMs >= s.start && currentMs <= s.end
    );

    if (foundIdx !== -1) {
      setActiveSentenceIndex(foundIdx);
    } else {
      setActiveSentenceIndex(null);
    }
  }, [currentTime, step, sentences, currentSentenceIndex, getPlayOffsetSeconds]);

  // Setup Web Speech API for recognition in Shadowing mode
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = "en-US";
      
      rec.onresult = (event: any) => {
        const resultText = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join(" ");
        setSpeechTranscript(resultText);
        calculateSimilarity(resultText, currentSentence.content);
      };

      rec.onerror = (e: any) => {
        console.error("Speech recognition error", e);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, [currentSentenceIndex]);

  // Handle Play/Pause
  const handleTogglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  // Skip step
  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
      resetSentenceStates();
      if (player) {
        player.pauseVideo();
        const offset = getPlayOffsetSeconds(step + 1);
        player.seekTo(offset + (sentences[0].start / 1000), true);
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      resetSentenceStates();
      if (player) {
        player.pauseVideo();
        const offset = getPlayOffsetSeconds(step - 1);
        player.seekTo(offset + (sentences[0].start / 1000), true);
      }
    }
  };

  // Jump player to sentence start
  const playSentenceSegment = (index: number) => {
    if (!player) return;
    const sentence = sentences[index];
    const offset = getPlayOffsetSeconds(step);
    const startSec = (sentence.start / 1000) + offset;
    player.seekTo(startSec, true);
    player.playVideo();
  };

  // Dictation/Shadowing Segment Player
  const handleReplaySegment = () => {
    if (!player) return;
    const sentence = sentences[currentSentenceIndex];
    const startSec = sentence.start / 1000;
    player.seekTo(startSec, true);
    player.playVideo();
  };

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (player && player.setPlaybackRate) {
      player.setPlaybackRate(rate);
    }
  };

  // Word Click Helper
  const handleWordClick = async (word: string, event: React.MouseEvent) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;

    setClickedWord(cleanWord);
    setWordLoading(true);
    setWordTranslation(null);

    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPos({
      x: window.scrollX + rect.left + rect.width / 2,
      y: window.scrollY + rect.top - 10
    });

    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(cleanWord)}`
      );
      if (res.ok) {
        const json = await res.json();
        const translated = json[0].map((item: any) => item[0]).join("");
        setWordTranslation(translated);
      } else {
        setWordTranslation("Không tìm thấy nghĩa");
      }
    } catch (e) {
      setWordTranslation("Lỗi kết nối");
    } finally {
      setWordLoading(false);
    }
  };

  const playWordTTS = (word: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Shadowing Microphone Recording
  const startRecording = async () => {
    setSpeechTranscript("");
    setShadowingScore(null);
    setUserAudioUrl(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setUserAudioUrl(audioUrl);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (err) {
      alert("Không thể khởi động Microphone. Vui lòng cấp quyền ghi âm.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const calculateSimilarity = (spoken: string, original: string) => {
    const normalize = (str: string) => 
      str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();

    const cleanSpoken = normalize(spoken).split(" ");
    const cleanOriginal = normalize(original).split(" ");

    if (cleanOriginal.length === 0) return;

    let matches = 0;
    cleanOriginal.forEach(word => {
      if (cleanSpoken.includes(word)) {
        matches++;
      }
    });

    const percent = Math.round((matches / cleanOriginal.length) * 100);
    setShadowingScore(percent);
  };

  const getShadowingFeedback = () => {
    const normalize = (str: string) => 
      str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();

    const spokenWords = normalize(speechTranscript).split(/\s+/);
    const targetWords = normalize(currentSentence.content).split(/\s+/);

    return (
      <div className="p-4 bg-surface/60 border border-line rounded-xl">
        <h4 className="text-xs font-semibold text-slate-400 mb-2">Giọng nói bạn vừa ghi âm được nhận diện:</h4>
        <p className="text-base text-slate-200">
          {speechTranscript.split(/\s+/).map((word, i) => {
            const clean = normalize(word);
            const isMatch = targetWords.includes(clean);
            return (
              <span key={i} className={isMatch ? "text-emerald-400 font-medium" : "text-rose-400 line-through"}>
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    );
  };

  // Helper to split sentence into interactive words
  const renderInteractiveSentenceText = (text: string) => {
    const tokens = text.split(/(\s+)/);
    return tokens.map((token, i) => {
      const isWord = /\w+/.test(token);
      if (isWord) {
        return (
          <span 
            key={i} 
            onClick={(e) => handleWordClick(token, e)}
            className="cursor-pointer hover:text-sky-400 hover:underline transition-colors"
          >
            {token}
          </span>
        );
      }
      return <span key={i}>{token}</span>;
    });
  };

  // Diff rendering helper for hard dictation
  const renderHardDiff = () => {
    const normalize = (str: string) => 
      str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();

    const userNorm = normalize(hardInput);
    const targetNorm = normalize(currentSentence.content);

    const userWords = userNorm.split(" ");
    const targetWords = targetNorm.split(" ");

    return (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-surface/60 border border-line space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle className="h-4 w-4" />
            <span>Đáp án chuẩn:</span>
          </div>
          <p className="text-base text-slate-100">
            {currentSentence.content.split(/\s+/).map((word, i) => {
              const clean = normalize(word);
              const wasTyped = userWords.includes(clean);
              return (
                <span key={i} className={wasTyped ? "text-emerald-400 font-medium" : "text-slate-500 underline decoration-wavy decoration-red-500"}>
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface/60 border border-line space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
            <Info className="h-4 w-4" />
            <span>Bạn đã nhập:</span>
          </div>
          <p className="text-base text-slate-200">
            {hardInput.split(/\s+/).map((word, i) => {
              const clean = normalize(word);
              const isCorrect = targetWords.includes(clean);
              return (
                <span key={i} className={isCorrect ? "text-emerald-400" : "text-rose-400 font-medium bg-rose-500/10 px-1 rounded line-through"}>
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6 select-none relative text-white">
      {/* Dictionary Popup Card */}
      {clickedWord && popupPos && (
        <div 
          className="absolute z-50 w-72 p-4 bg-slate-850 border border-line rounded-2xl shadow-xl shadow-black/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ 
            left: `${popupPos.x}px`, 
            top: `${popupPos.y}px`,
            transform: 'translate(-50%, -100%)' 
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h5 className="font-bold text-sky-400 text-lg flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-sky-400" />
              {clickedWord}
            </h5>
            <div className="flex gap-1.5">
              <button 
                onClick={() => playWordTTS(clickedWord)}
                className="p-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 transition"
                title="Phát âm"
              >
                <Volume2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setClickedWord(null)}
                className="p-1 rounded-lg bg-surface-raised hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="border-t border-slate-750 my-2 pt-2 text-sm text-slate-200">
            {wordLoading ? (
              <span className="text-slate-500 text-xs flex items-center gap-1.5">
                <RefreshCw className="h-3 w-3 animate-spin text-sky-400" />
                Đang tra nghĩa...
              </span>
            ) : (
              <p>{wordTranslation}</p>
            )}
          </div>
        </div>
      )}

      {/* Top Banner Navigation */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-line pb-5">
        <div>
          <Link href={backUrl} className="inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition mb-1">
            ← Quay lại buổi học
          </Link>
          <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>{title}</span>
          </h1>
        </div>

        {/* Wizard step indicator */}
        <div className="flex items-center gap-2 bg-surface/60 p-1.5 border border-line rounded-xl">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => {
                setStep(s);
                resetSentenceStates();
                if (player) {
                  player.pauseVideo();
                  const offset = getPlayOffsetSeconds(s);
                  player.seekTo(offset + (sentences[0].start / 1000), true);
                }
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-150 ${
                step === s 
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-surface-raised/40"
              }`}
            >
              Bước {s}
            </button>
          ))}
        </div>
      </div>

      {/* Step description */}
      <div className="p-4 rounded-xl border border-indigo-950/40 bg-gradient-to-r from-indigo-950/20 to-slate-950/20 text-slate-300 text-sm">
        {step === 1 && (
          <span className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-indigo-400" />
            <strong>Bước 1: Nghe phụ đề Tiếng Anh</strong> — Tập trung nghe cách phát âm của người bản xứ. Click trực tiếp vào từ để tra từ điển.
          </span>
        )}
        {step === 2 && (
          <span className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-indigo-400" />
            <strong>Bước 2: Nghe song ngữ Anh - Việt</strong> — Xem nghĩa tiếng Việt song song để hiểu nội dung đối thoại.
          </span>
        )}
        {step === 3 && (
          <span className="flex items-center gap-2">
            <VolumeX className="h-5 w-5 text-indigo-400" />
            <strong>Bước 3: Nghe không phụ đề</strong> — Tập trung tối đa vào tai nghe, rèn luyện phản xạ nghe trực tiếp.
          </span>
        )}
        {step === 4 && (
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <strong>Bước 4: Chép chính tả (Dictation)</strong> — Nghe từng câu, chép lại từ còn thiếu hoặc cả câu. Script đã bị ẩn đi.
          </span>
        )}
        {step === 5 && (
          <span className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-indigo-400" />
            <strong>Bước 5: Shadowing (Nói đuổi)</strong> — Nghe người bản xứ nói, bấm mic nhại giọng lại. AI chấm điểm phát âm.
          </span>
        )}
      </div>

      {/* Main Body Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left column: YouTube Video Iframe */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-slate-950 shadow-2xl">
            <div id="youtube-player" className="absolute inset-0 w-full h-full" />
            
            {/* Dark Cover overlay for Steps 3, 4, and 5 to prevent subtitle cheating */}
            {step >= 3 && (
              <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center space-y-4 z-10 p-6 text-center select-none">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-20 w-20 rounded-full bg-indigo-500/10 animate-ping" />
                  <div className="relative h-14 w-14 rounded-full bg-surface border border-line flex items-center justify-center shadow-lg">
                    <Headphones className="h-6 w-6 text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Chế Độ Nghe Âm Thanh</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                    Màn hình video được che lại để tránh hiển thị phụ đề cứng của video gốc, giúp bạn tập trung luyện tai nghe tốt nhất.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Subtitle helper controls inside Player control board */}
          <div className="flex items-center justify-between bg-surface/40 border border-line p-4 rounded-2xl">
            <button
              onClick={handleTogglePlay}
              disabled={!playerReady}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:bg-surface-raised px-5 py-2 text-sm font-bold text-white shadow-lg transition duration-200"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? "Tạm Dừng" : "Phát Video"}</span>
            </button>

            {/* Playback rate select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Tốc độ:</span>
              <div className="flex rounded-lg overflow-hidden bg-surface-raised border border-line">
                {[0.75, 1, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => changeSpeed(rate)}
                    className={`px-2.5 py-1 text-xs font-semibold transition ${
                      playbackRate === rate ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Workspace */}
        <div className="lg:col-span-5 h-[480px] flex flex-col">
          {step === 3 ? (
            /* Step 3: No Subtitles text */
            <div className="flex-1 flex flex-col items-center justify-center border border-line bg-surface/20 rounded-2xl p-6 text-center space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute h-24 w-24 rounded-full bg-indigo-500/10 animate-ping" />
                <div className="relative h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Volume2 className="h-8 w-8 text-indigo-400" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-200">Chế Độ Nghe Tập Trung</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Phụ đề đã bị ẩn đi hoàn toàn. Bạn hãy nhắm mắt lại hoặc nhìn hình ảnh video, cố gắng hiểu đối thoại bằng tai nghe.
              </p>
            </div>
          ) : step === 4 ? (
            /* Step 4: Dictation (Chép chính tả) Workspace */
            <div className="flex-1 flex flex-col border border-line bg-surface/30 rounded-2xl p-5 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">
                  Chép chính tả — Câu {currentSentenceIndex + 1}/{sentences.length}
                </span>

                <div className="flex bg-slate-950 rounded-lg p-0.5 border border-line">
                  <button
                    onClick={() => { setDictationMode("easy"); resetSentenceStates(); }}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition ${dictationMode === "easy" ? "bg-indigo-500 text-white" : "text-slate-400"}`}
                  >
                    Dễ (Điền ô)
                  </button>
                  <button
                    onClick={() => { setDictationMode("hard"); resetSentenceStates(); }}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition ${dictationMode === "hard" ? "bg-indigo-500 text-white" : "text-slate-400"}`}
                  >
                    Khó (Gõ hết)
                  </button>
                </div>
              </div>

              {/* Dictation Input Board */}
              <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-4 min-h-[140px] flex flex-col justify-center">
                {dictationMode === "easy" ? (
                  /* Easy mode fill-in-the-blanks */
                  <div className="text-base leading-relaxed text-slate-100 select-text">
                    {currentSentence.words.map((word) => {
                      if (word.type === "BLANK") {
                        const isCorrect = easyChecked && easyInputs[word.key]?.trim().toLowerCase() === word.value.toLowerCase();
                        return (
                          <input
                            key={word.key}
                            type="text"
                            value={easyInputs[word.key] || ""}
                            onChange={(e) => {
                              setEasyInputs({ ...easyInputs, [word.key]: e.target.value });
                              setEasyChecked(false);
                              setEasyShowAnswers(false);
                            }}
                            placeholder="..."
                            className={`mx-1 px-1.5 py-0.5 w-20 text-center text-sm font-semibold border rounded bg-surface outline-none focus:border-indigo-500 transition duration-150 ${
                              easyChecked 
                                ? (isCorrect ? "border-emerald-500/80 text-emerald-400 bg-emerald-500/5" : "border-rose-500/80 text-rose-450 bg-rose-500/5") 
                                : "border-line text-slate-200"
                            }`}
                          />
                        );
                      }
                      return <span key={word.key}>{word.value}</span>;
                    })}
                  </div>
                ) : (
                  /* Hard mode type all */
                  <div className="space-y-3">
                    {!hardChecked ? (
                      <textarea
                        value={hardInput}
                        onChange={(e) => setHardInput(e.target.value)}
                        placeholder="Hãy gõ lại toàn bộ câu nói bạn nghe được vào đây..."
                        rows={3}
                        className="w-full text-sm p-3 rounded-xl border border-line bg-surface text-slate-150 placeholder-slate-500 outline-none focus:border-indigo-500 transition"
                      />
                    ) : (
                      renderHardDiff()
                    )}
                  </div>
                )}

                {/* Show bilingual reference translations if checked or revealed */}
                {(easyShowAnswers || hardShowAnswers) && (
                  <div className="border-t border-line/80 pt-3 space-y-1">
                    <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Eye className="h-3 w-3 text-indigo-400" />
                      Đáp án & Dịch nghĩa:
                    </div>
                    <p className="text-sm font-semibold text-indigo-300">
                      {renderInteractiveSentenceText(currentSentence.content)}
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      {currentSentence.contentVi}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleReplaySegment}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-line bg-surface/50 hover:bg-surface-raised text-slate-300 font-bold text-xs transition"
                  >
                    <Volume2 className="h-4 w-4 text-indigo-400" />
                    Nghe lại câu này
                  </button>

                  {dictationMode === "easy" ? (
                    <>
                      <button
                        onClick={() => setEasyChecked(true)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs transition"
                      >
                        <Check className="h-4 w-4" />
                        Kiểm tra
                      </button>
                      <button
                        onClick={() => setEasyShowAnswers(!easyShowAnswers)}
                        className="p-2.5 rounded-xl border border-line bg-surface/30 text-slate-400 hover:text-slate-100 transition"
                        title="Xem đáp án"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      {hardChecked ? (
                        <button
                          onClick={() => setHardChecked(false)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-surface-raised hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Sửa lại
                        </button>
                      ) : (
                        <button
                          onClick={() => setHardChecked(true)}
                          disabled={!hardInput.trim()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs transition"
                        >
                          <Check className="h-4 w-4" />
                          Kiểm tra
                        </button>
                      )}
                      <button
                        onClick={() => setHardShowAnswers(!hardShowAnswers)}
                        className="p-2.5 rounded-xl border border-line bg-surface/30 text-slate-400 hover:text-slate-100 transition"
                        title="Xem đáp án"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Navigation sentence */}
                <div className="flex items-center justify-between pt-2 border-t border-line">
                  <button
                    onClick={() => {
                      if (currentSentenceIndex > 0) {
                        setCurrentSentenceIndex(currentSentenceIndex - 1);
                        resetSentenceStates();
                      }
                    }}
                    disabled={currentSentenceIndex === 0}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Trước
                  </button>

                  <button
                    onClick={() => {
                      if (currentSentenceIndex < sentences.length - 1) {
                        setCurrentSentenceIndex(currentSentenceIndex + 1);
                        resetSentenceStates();
                      }
                    }}
                    disabled={currentSentenceIndex === sentences.length - 1}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40"
                  >
                    Sau
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : step === 5 ? (
            /* Step 5: Shadowing interactive speak module */
            <div className="flex-1 flex flex-col border border-line bg-surface/30 rounded-2xl p-6 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">
                  Shadowing — Câu {currentSentenceIndex + 1}/{sentences.length}
                </span>
                
                {/* Accuracy Score badge */}
                {shadowingScore !== null && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                    <Award className="h-3.5 w-3.5" />
                    Độ chuẩn: {shadowingScore}%
                  </div>
                )}
              </div>

              {/* Text Card */}
              <div className="p-4 bg-slate-950/60 border border-line rounded-xl space-y-2">
                <p className="text-base text-slate-100 font-medium leading-relaxed">
                  {renderInteractiveSentenceText(currentSentence.content)}
                </p>
                <p className="text-xs text-indigo-300">
                  💡 Click bất kỳ từ nào ở trên để xem phiên âm và dịch nghĩa.
                </p>
              </div>

              <div className="p-4 bg-surface/30 border border-line rounded-xl">
                <p className="text-xs font-semibold text-slate-500 mb-1">Dịch nghĩa:</p>
                <p className="text-sm text-slate-300 italic">{currentSentence.contentVi}</p>
              </div>

              {/* AI Recognized speech feedback */}
              {speechTranscript && getShadowingFeedback()}

              {/* Action Buttons */}
              <div className="mt-auto space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  {/* Replay audio of sentence */}
                  <button
                    onClick={handleReplaySegment}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-line bg-surface-raised hover:bg-slate-750 text-slate-200 font-bold text-sm transition"
                  >
                    <RotateCcw className="h-4 w-4 text-indigo-400" />
                    Nghe mẫu
                  </button>

                  {/* Micro record button */}
                  {isRecording ? (
                    <button
                      onClick={stopRecording}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition animate-pulse"
                    >
                      <Square className="h-4 w-4" />
                      Dừng & Chấm điểm
                    </button>
                  ) : (
                    <button
                      onClick={startRecording}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition shadow-lg shadow-indigo-500/20"
                    >
                      <Mic className="h-4 w-4" />
                      Bắt đầu ghi âm
                    </button>
                  )}
                </div>

                {/* User voice playback if recorded */}
                {userAudioUrl && (
                  <div className="flex items-center gap-3 p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-xl">
                    <span className="text-xs font-bold text-indigo-400">Giọng nói của bạn:</span>
                    <audio src={userAudioUrl} controls className="h-8 flex-1 outline-none text-xs" />
                  </div>
                )}

                {/* Navigation sentence */}
                <div className="flex items-center justify-between pt-2 border-t border-line">
                  <button
                    onClick={() => {
                      if (currentSentenceIndex > 0) {
                        setCurrentSentenceIndex(currentSentenceIndex - 1);
                        resetSentenceStates();
                      }
                    }}
                    disabled={currentSentenceIndex === 0}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Trước
                  </button>

                  <button
                    onClick={() => {
                      if (currentSentenceIndex < sentences.length - 1) {
                        setCurrentSentenceIndex(currentSentenceIndex + 1);
                        resetSentenceStates();
                      }
                    }}
                    disabled={currentSentenceIndex === sentences.length - 1}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-40"
                  >
                    Sau
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Step 1 & 2: Subtitle/Transcript List */
            <div className="flex-1 flex flex-col border border-line bg-surface/30 rounded-2xl p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400">Bản phụ đề chạy theo video:</span>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">
                  {step === 1 ? "English Only" : "Bilingual"}
                </span>
              </div>

              {/* Scrollable list of sentences */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {sentences.map((sentence, idx) => {
                  const isActive = activeSentenceIndex === idx;
                  return (
                    <div
                      key={sentence.index}
                      onClick={() => playSentenceSegment(idx)}
                      className={`p-3 rounded-xl cursor-pointer border transition duration-200 ${
                        isActive
                          ? "bg-indigo-500/10 border-indigo-500/40 shadow-md shadow-indigo-500/5 scale-[1.01]"
                          : "bg-slate-950/20 border-slate-900 hover:bg-surface/40 hover:border-line"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className={`text-[10px] font-mono mt-0.5 px-1.5 py-0.5 rounded ${
                          isActive ? "bg-indigo-500 text-white" : "bg-surface text-slate-500"
                        }`}>
                          {idx + 1}
                        </span>
                        
                        <div className="space-y-1 flex-1">
                          <p className={`text-sm leading-relaxed transition ${
                            isActive ? "text-indigo-300 font-bold" : "text-slate-300"
                          }`}>
                            {renderInteractiveSentenceText(sentence.content)}
                          </p>

                          {step === 2 && (
                            <p className="text-xs text-slate-450 leading-relaxed font-light italic border-t border-slate-900/60 pt-1 mt-1">
                              {sentence.contentVi}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer wizard navigation */}
      <div className="flex items-center justify-between border-t border-line pt-5">
        <button
          onClick={handlePrevStep}
          disabled={step === 1}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-line hover:bg-surface text-slate-300 hover:text-white text-sm font-semibold disabled:opacity-40 disabled:hover:bg-transparent transition duration-150"
        >
          <ChevronLeft className="h-4 w-4" />
          Bước trước
        </button>

        <button
          onClick={handleNextStep}
          disabled={step === 5}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 disabled:opacity-40 disabled:hover:bg-indigo-500 transition duration-150"
        >
          Bước tiếp theo
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
