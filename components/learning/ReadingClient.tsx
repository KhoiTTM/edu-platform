"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, HelpCircle, Eye, EyeOff, Award, ArrowLeft, RefreshCw, MessageSquare, Volume2, Sparkles, Languages } from "lucide-react";
import type { IELTSReadingLesson } from "@/lib/ieltsReadingPassages";
import { VocabFlipCard } from "@/components/learning/VocabFlipCard";
import AITeacherChat from "@/components/learning/AITeacherChat";
import { DictionaryPopup } from "@/components/DictionaryPopup";

interface Props {
  lesson: IELTSReadingLesson;
  studentName?: string;
  backUrl?: string;
}

interface TFNGStatement {
  id: string;
  statement: string;
  correct: 'TRUE' | 'FALSE' | 'NOT GIVEN';
  explanation: string;
}

interface ReadingExampleSentence {
  english: string;
  vietnamese: string;
  vocabWord: string;
}

const READING_EXAMPLES: Record<number, ReadingExampleSentence[]> = {
  1: [
    { vocabWord: "routine", english: "Establishing a daily routine helps students manage their homework and sleep schedules better.", vietnamese: "Thiết lập một thói quen hàng ngày giúp học sinh quản lý bài tập về nhà và lịch trình giấc ngủ tốt hơn." },
    { vocabWord: "prepare", english: "You must prepare carefully for the IELTS reading section by practicing daily.", vietnamese: "Bạn phải chuẩn bị kỹ lưỡng cho phần thi đọc IELTS bằng cách luyện tập hàng ngày." },
    { vocabWord: "gardening", english: "My grandmother spends her weekend gardening in the backyard to relax.", vietnamese: "Bà tôi dành thời gian cuối tuần làm vườn ở sân sau để thư giãn." },
    { vocabWord: "handcrafts", english: "Buying local handcrafts is an excellent way to support small businesses.", vietnamese: "Mua đồ thủ công mỹ nghệ địa phương là một cách tuyệt vời để hỗ trợ các doanh nghiệp nhỏ." },
    { vocabWord: "delicious", english: "She cooked a delicious soup using fresh organic ingredients from the garden.", vietnamese: "Cô ấy đã nấu một món súp thơm ngon sử dụng các nguyên liệu hữu cơ tươi sạch từ vườn." }
  ],
  2: [
    { vocabWord: "apartment", english: "Giorgio's apartment is located in a quiet residential area of Milan.", vietnamese: "Căn hộ của Giorgio nằm ở một khu dân cư yên tĩnh của Milan." },
    { vocabWord: "comfortable", english: "The living room is equipped with a comfortable gray sofa and warm lights.", vietnamese: "Phòng khách được trang bị một chiếc ghế sofa màu xám thoải mái và ánh đèn ấm áp." },
    { vocabWord: "wardrobe", english: "She bought a spacious wooden wardrobe to organize all her winter clothes.", vietnamese: "Cô ấy đã mua một chiếc tủ quần áo bằng gỗ rộng rãi để sắp xếp tất cả quần áo mùa đông của mình." },
    { vocabWord: "balcony", english: "We often drink tea on the balcony and look at the beautiful city streets.", vietnamese: "Chúng tôi thường uống trà trên ban công và ngắm nhìn đường phố xinh đẹp." }
  ],
  3: [
    { vocabWord: "hobby", english: "Photography is a creative hobby that helps you capture memorable moments.", vietnamese: "Nhiếp ảnh là một sở thích sáng tạo giúp bạn lưu lại những khoảnh khắc đáng nhớ." },
    { vocabWord: "relax", english: "Listening to instrumental music is the best way to relax after long class hours.", vietnamese: "Nghe nhạc không lời là cách tốt nhất để thư giãn sau những giờ học dài trên lớp." },
    { vocabWord: "active", english: "Outdoor sports keep children active and prevent eye strain from smart screens.", vietnamese: "Thể thao ngoài trời giữ cho trẻ em năng động và ngăn ngừa mỏi mắt do màn hình thông minh." },
    { vocabWord: "balance", english: "It is important to balance academic study with physical exercise and social activities.", vietnamese: "Việc cân bằng giữa học tập trên lớp với tập thể dục và các hoạt động xã hội là rất quan trọng." }
  ],
  4: [
    { vocabWord: "destination", english: "Paris is a dream travel destination for tourists who love culture and art.", vietnamese: "Paris là một điểm đến du lịch mơ ước cho những du khách yêu thích văn hóa và nghệ thuật." },
    { vocabWord: "itinerary", english: "The tour guide handed out a detailed travel itinerary for our family trip.", vietnamese: "Hướng dẫn viên du lịch đã phát một lịch trình du lịch chi tiết cho chuyến đi của gia đình chúng tôi." },
    { vocabWord: "suitcase", english: "Please check your travel documents before locking your suitcase.", vietnamese: "Vui lòng kiểm tra các giấy tờ du lịch trước khi khóa vali của bạn." },
    { vocabWord: "pack", english: "You should only pack essential clothes to keep your luggage light.", vietnamese: "Bạn chỉ nên mang theo quần áo cần thiết để giữ cho hành lý gọn nhẹ." }
  ],
  5: [
    { vocabWord: "ingredients", english: "Using fresh ingredients is the most important rule of healthy home cooking.", vietnamese: "Sử dụng các nguyên liệu tươi sạch là quy tắc quan trọng nhất của việc tự nấu ăn lành mạnh tại nhà." },
    { vocabWord: "recipe", english: "This simple recipe teaches children how to prepare steaming vegetables.", vietnamese: "Công thức đơn giản này dạy trẻ em cách chuẩn bị các món rau hấp." },
    { vocabWord: "organic", english: "Buying organic fruits is better for your body because they contain no chemicals.", vietnamese: "Mua trái cây hữu cơ tốt hơn cho cơ thể bạn vì chúng không chứa hóa chất." },
    { vocabWord: "homemade", english: "I prefer homemade meals to packaged food because they contain less salt.", vietnamese: "Tôi thích các bữa ăn tự làm tại nhà hơn thực phẩm đóng gói sẵn vì chúng chứa ít muối hơn." }
  ],
  6: [
    { vocabWord: "commute", english: "Commuting by underground train is faster and avoids heavy traffic jams.", vietnamese: "Di chuyển đi lại bằng tàu điện ngầm nhanh hơn và tránh được ùn tắc giao thông nghiêm trọng." },
    { vocabWord: "rush hour", english: "Driving during the rush hour is stressful due to constant delays.", vietnamese: "Lái xe vào giờ cao điểm rất căng thẳng do liên tục bị chậm trễ." },
    { vocabWord: "traffic jam", english: "A major accident caused a massive traffic jam on the main highway.", vietnamese: "Một vụ tai nạn lớn đã gây ra tình trạng kẹt xe nghiêm trọng trên đường cao tốc chính." },
    { vocabWord: "public", english: "Using public transport helps reduce air pollution in big metropolitan cities.", vietnamese: "Sử dụng phương tiện giao thông công cộng giúp giảm ô nhiễm không khí ở các thành phố lớn." }
  ],
  7: [
    { vocabWord: "office", english: "Modern offices often design flexible open spaces to improve productivity.", vietnamese: "Các văn phòng hiện đại thường thiết kế không gian mở linh hoạt để cải thiện hiệu suất công việc." },
    { vocabWord: "manual", english: "Farmers do hard manual work under the sun to grow food for the nation.", vietnamese: "Người nông dân làm công việc chân tay vất vả dưới ánh mặt trời để trồng trọt thực phẩm cho cả nước." },
    { vocabWord: "qualifications", english: "Studying at university helps students earn professional qualifications.", vietnamese: "Học tập tại trường đại học giúp sinh viên đạt được các bằng cấp chuyên môn." },
    { vocabWord: "colleagues", english: "She always maintains a friendly relationship with all her office colleagues.", vietnamese: "Cô ấy luôn duy trì mối quan hệ thân thiện với tất cả các đồng nghiệp trong văn phòng của mình." }
  ],
  8: [
    { vocabWord: "deficient", english: "A diet deficient in essential vitamins will make your immune system weak.", vietnamese: "Một chế độ ăn thiếu hụt các vitamin thiết yếu sẽ làm cho hệ thống miễn dịch của bạn yếu đi." },
    { vocabWord: "insomnia", english: "Using smartphones late at night stops the body from sleeping and causes insomnia.", vietnamese: "Sử dụng điện thoại thông minh muộn vào ban đêm ngăn cơ thể đi vào giấc ngủ và gây ra chứng mất ngủ." },
    { vocabWord: "strain", english: "Looking at screens for hours without rest leads to eye strain and headaches.", vietnamese: "Nhìn vào màn hình hàng giờ liền không nghỉ ngơi dẫn đến mỏi mắt và đau đầu." },
    { vocabWord: "recommendation", english: "The doctor's recommendation is to sleep at least seven hours every night.", vietnamese: "Lời khuyên của bác sĩ là nên ngủ ít nhất bảy tiếng mỗi đêm." }
  ],
  9: [
    { vocabWord: "bilingual", english: "Bilingual children can switch between two languages fluently and naturally.", vietnamese: "Trẻ em song ngữ có thể chuyển đổi giữa hai ngôn ngữ một cách trôi chảy và tự nhiên." },
    { vocabWord: "fluently", english: "He practices English vocabulary daily in order to speak the language fluently.", vietnamese: "Anh ấy luyện tập từ vựng tiếng Anh hàng ngày để nói ngôn ngữ này một cách trôi chảy." },
    { vocabWord: "opportunities", english: "Being fluent in English opens up career opportunities in international companies.", vietnamese: "Nói trôi chảy tiếng Anh mở ra nhiều cơ hội nghề nghiệp tại các công ty quốc tế." },
    { vocabWord: "native", english: "It is helpful to practice speaking topics directly with native speakers.", vietnamese: "Việc thực hành các chủ đề nói trực tiếp với người bản xứ là rất hữu ích." }
  ],
  10: [
    { vocabWord: "gadget", english: "A smart watch is a useful tech gadget that monitors your daily heart rate.", vietnamese: "Đồng hồ thông minh là một thiết bị công nghệ hữu ích giúp theo dõi nhịp tim hàng ngày của bạn." },
    { vocabWord: "automatically", english: "The smart security camera will automatically alert you of any movement.", vietnamese: "Camera an ninh thông minh sẽ tự động cảnh báo cho bạn về bất kỳ chuyển động nào." },
    { vocabWord: "predict", english: "It is difficult to predict how advanced artificial intelligence will be in 2030.", vietnamese: "Rất khó để dự đoán trí tuệ nhân tạo sẽ tiên tiến đến mức nào vào năm 2030." },
    { vocabWord: "artificial", english: "Smart home gadgets use artificial intelligence to optimize temperature and save electricity.", vietnamese: "Các thiết bị nhà thông minh sử dụng trí tuệ nhân tạo để tối ưu hóa nhiệt độ và tiết kiệm điện." }
  ]
};

const TFNG_DATABASE: Record<number, TFNGStatement[]> = {
  1: [
    { id: "tfng-u1-1", statement: "Jack wakes up at 6:00 AM every morning.", correct: "FALSE", explanation: "Trong bài đọc nêu rõ: 'I usually wake up at 6:30 AM.' nên câu phát biểu thức dậy lúc 6h là Sai (FALSE)." },
    { id: "tfng-u1-2", statement: "Jack walks to the bus stop with his sister.", correct: "TRUE", explanation: "Bài đọc viết: 'we walk to the bus stop and catch the bus...' nên việc đi bộ cùng em gái là Đúng (TRUE)." },
    { id: "tfng-u1-3", statement: "Jack's brother enjoys gardening.", correct: "FALSE", explanation: "Bài đọc viết: 'My brother, Tony, does not like gardening.' nên câu phát biểu thích làm vườn là Sai (FALSE)." },
    { id: "tfng-u1-4", statement: "Jack's mother plants roses only.", correct: "NOT GIVEN", explanation: "Bài đọc chỉ nói: 'She loves planting colorful flowers.' (yêu thích trồng hoa nhiều màu sắc), không xác nhận có phải chỉ trồng duy nhất hoa hồng hay không (NOT GIVEN)." }
  ],
  2: [
    { id: "tfng-u2-1", statement: "Giorgio's apartment has a balcony.", correct: "TRUE", explanation: "Bài đọc viết: 'There is also a small balcony next to the living room...' nên là Đúng (TRUE)." },
    { id: "tfng-u2-2", statement: "The dining table is located in the kitchen.", correct: "FALSE", explanation: "Bài đọc viết: 'In the living room... Next to the sofa, I have a small dining table...' nên việc bàn ăn ở trong bếp là Sai (FALSE)." },
    { id: "tfng-u2-3", statement: "Giorgio lives alone in Milan.", correct: "NOT GIVEN", explanation: "Bài đọc chỉ giới thiệu Giorgio sống ở căn hộ ở Milan, không đề cập đến việc anh ấy ở một mình hay với ai (NOT GIVEN)." }
  ],
  3: [
    { id: "tfng-u3-1", statement: "Outdoor hobbies are bad for students' health.", correct: "FALSE", explanation: "Bài đọc ghi: 'These outdoor activities are excellent because they keep our bodies strong and healthy.' nên là Sai (FALSE)." },
    { id: "tfng-u3-2", statement: "Playing video games can help connect with friends.", correct: "TRUE", explanation: "Bài đọc viết: 'Playing video games is fun and helps connect with friends online...' nên là Đúng (TRUE)." },
    { id: "tfng-u3-3", statement: "The writer thinks students should play video games all day.", correct: "FALSE", explanation: "Bài đọc ghi: 'students should not spend too much time looking at screens.' nên là Sai (FALSE)." }
  ],
  4: [
    { id: "tfng-u4-1", statement: "An itinerary is a list of activities to do each day.", correct: "TRUE", explanation: "Bài đọc định nghĩa: 'An itinerary is a list of activities you want to do each day.' nên là Đúng (TRUE)." },
    { id: "tfng-u4-2", statement: "You must choose your destination after you pack your suitcase.", correct: "FALSE", explanation: "Bài đọc ghi: 'First, you need to choose your destination. Second, you must pack your suitcase...' nên thứ tự ngược lại là Sai (FALSE)." },
    { id: "tfng-u4-3", statement: "Most tourists prefer mountains to beaches.", correct: "NOT GIVEN", explanation: "Bài đọc chỉ nói: 'Some people love relaxing on warm beaches, while others prefer exploring cool mountains.', không so sánh số đông thích bên nào hơn (NOT GIVEN)." }
  ],
  5: [
    { id: "tfng-u5-1", statement: "Homemade food generally has less salt.", correct: "TRUE", explanation: "Bài đọc viết: 'Homemade food has less salt and keeps essential vitamins...' nên là Đúng (TRUE)." },
    { id: "tfng-u5-2", statement: "Fresh vegetables are worse than packaged food.", correct: "FALSE", explanation: "Bài đọc ghi: 'Fresh vegetables... are much better than packaged food...' nên là Sai (FALSE)." },
    { id: "tfng-u5-3", statement: "Organic fruits are cheaper than supermarket fruits.", correct: "NOT GIVEN", explanation: "Bài đọc không đề cập hay so sánh giá cả giữa hai loại quả này (NOT GIVEN)." }
  ],
  6: [
    { id: "tfng-u6-1", statement: "Commuting is easy in big cities.", correct: "FALSE", explanation: "Bài đọc mở đầu: 'In big cities, traveling to work can be difficult.' nên là Sai (FALSE)." },
    { id: "tfng-u6-2", statement: "Underground trains are faster than buses because they don't get stuck in traffic.", correct: "TRUE", explanation: "Bài đọc ghi: 'Using the underground train... is much faster... because trains do not get stuck on roads.' nên là Đúng (TRUE)." },
    { id: "tfng-u6-3", statement: "Private cars help reduce air pollution.", correct: "FALSE", explanation: "Bài đọc viết: 'drive their private cars, which causes heavy pollution...' nên là Sai (FALSE)." }
  ],
  7: [
    { id: "tfng-u7-1", statement: "Builders do manual work outside.", correct: "TRUE", explanation: "Bài đọc viết: 'manual work outside, like builders who construct houses...' nên là Đúng (TRUE)." },
    { id: "tfng-u7-2", statement: "Office workers never work from home.", correct: "FALSE", explanation: "Bài đọc viết: 'In recent years, many office workers are working from home.' nên là Sai (FALSE)." },
    { id: "tfng-u7-3", statement: "Manual workers earn more money than office workers.", correct: "NOT GIVEN", explanation: "Bài đọc không đề cập hay so sánh mức lương của hai nhóm ngành nghề này (NOT GIVEN)." }
  ],
  8: [
    { id: "tfng-u8-1", statement: "Bright screen light helps the body fall asleep faster.", correct: "FALSE", explanation: "Bài đọc viết: 'The bright screen light stops the body from sleeping...' nên là Sai (FALSE)." },
    { id: "tfng-u8-2", statement: "Using smartphones late at night causes eye strain.", correct: "TRUE", explanation: "Bài đọc ghi: 'use smartphones... late at night... causing eye strain and tiredness.' nên là Đúng (TRUE)." },
    { id: "tfng-u8-3", statement: "You should look at screens until you fall asleep.", correct: "FALSE", explanation: "Bài đọc khuyên: 'you should avoid looking at screens at least one hour before bed.' nên là Sai (FALSE)." }
  ],
  9: [
    { id: "tfng-u9-1", statement: "Speaking English is only useful in Vietnam.", correct: "FALSE", explanation: "Bài đọc viết: 'speaking English opens up many opportunities to study and make friends from different countries.' nên là Sai (FALSE)." },
    { id: "tfng-u9-2", statement: "A bilingual person can speak two languages fluently.", correct: "TRUE", explanation: "Bài đọc ghi: 'A person who speaks two languages fluently is called bilingual.' nên là Đúng (TRUE)." },
    { id: "tfng-u9-3", statement: "Making mistakes slows down language learning.", correct: "FALSE", explanation: "Bài đọc ghi: 'Do not be afraid of making mistakes, because mistakes help you learn faster.' nên là Sai (FALSE)." }
  ],
  10: [
    { id: "tfng-u10-1", statement: "Smart home gadgets are controlled using a laptop only.", correct: "FALSE", explanation: "Bài đọc ghi: 'you can use your smartphone to turn on the lights or control...' nên là Sai (FALSE)." },
    { id: "tfng-u10-2", statement: "Robot vacuums clean floors automatically.", correct: "TRUE", explanation: "Bài đọc viết: 'robot vacuum cleaners that clean floors automatically...' nên là Đúng (TRUE)." },
    { id: "tfng-u10-3", statement: "Smart security cameras in the future will use AI.", correct: "TRUE", explanation: "Bài đọc ghi: 'security cameras will use artificial intelligence to protect families.' nên là Đúng (TRUE)." }
  ]
};

export function ReadingClient({ lesson, studentName = "Học sinh", backUrl = "/hoc-tap/mindset-ielts/reading" }: Props) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [activeTab, setActiveTab] = useState<"vocab" | "quiz" | "coach">("quiz");
  const [revealedExamples, setRevealedExamples] = useState<Record<number, boolean>>({});

  const unitNumNormalized = Math.max(1, Math.min(10, lesson.unitNum));
  const tfngStatements = TFNG_DATABASE[unitNumNormalized] || [];
  const exampleSentences = READING_EXAMPLES[unitNumNormalized] || [];

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [tfngAnswers, setTfngAnswers] = useState<Record<string, 'TRUE' | 'FALSE' | 'NOT GIVEN'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleSelectAnswer = (qId: string, oIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: oIdx }));
  };

  const handleSelectTFNG = (stmtId: string, value: 'TRUE' | 'FALSE' | 'NOT GIVEN') => {
    if (quizSubmitted) return;
    setTfngAnswers((prev) => ({ ...prev, [stmtId]: value }));
  };

  const submitQuiz = () => {
    let score = 0;
    lesson.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct_index) {
        score += 1;
      }
    });
    tfngStatements.forEach((stmt) => {
      if (tfngAnswers[stmt.id] === stmt.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    setActiveTab("quiz"); // Focus on quiz results
  };

  const restartQuiz = () => {
    setSelectedAnswers({});
    setTfngAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.85; // slightly slower for students
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleExampleTranslate = (idx: number) => {
    setRevealedExamples(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const totalQuestionsLength = lesson.questions.length + tfngStatements.length;
  const totalAnsweredCount = Object.keys(selectedAnswers).length + Object.keys(tfngAnswers).length;
  const quizCompletedPercent = Math.round((totalAnsweredCount / totalQuestionsLength) * 100);

  // Helper to highlight key words in the passage text
  const highlightKeyWords = (text: string, vocabList: { word: string }[]) => {
    let highlighted = text;
    // Sort by length descending to avoid partial matches on shorter substrings first
    const sortedVocab = [...vocabList].sort((a, b) => b.word.length - a.word.length);
    
    sortedVocab.forEach(v => {
      const regex = new RegExp(`\\b(${v.word}s?|${v.word.replace(/ing$/, '')}ing)\\b`, 'gi');
      highlighted = highlighted.replace(regex, `<span class="text-amber-400 font-extrabold underline decoration-amber-500/40 decoration-2 underline-offset-2">$1</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <header className="rounded-2xl border border-amber-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Link
              href={backUrl}
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
            >
              <ArrowLeft size={16} />
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-black text-amber-400 uppercase tracking-widest border border-amber-500/20">
              <Award size={10} /> UNIT {lesson.unitNum} · IELTS CORE READING
            </span>
          </div>
          <h1 className="mt-3 text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 tracking-tight">
            {lesson.title}
          </h1>
          <p className="mt-1.5 text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <span>{lesson.unitTitle}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl px-5 text-xs font-black transition-all duration-300 shadow-md ${
              showTranslation
                ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20"
                : "bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
            {showTranslation ? "Tắt Dịch Tiếng Việt" : "Dịch Song Ngữ"}
          </button>
        </div>
      </header>

      {/* DUAL-COLUMN WORKSPACE */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* LEFT COLUMN: PASSAGE (Col span 7) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/40 to-slate-950/20 p-6 md:p-8 shadow-xl backdrop-blur-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <BookOpen size={16} className="text-amber-500" />
                READING PASSAGE
              </h2>
              <span className="text-[10px] text-slate-500 font-bold bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-850">
                Nhấp đúp chuột để tra nhanh
              </span>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed font-sans text-sm md:text-base select-text">
              {lesson.paragraphs.map((p, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-900 bg-slate-950/40 hover:border-slate-800 hover:bg-slate-950/60 transition-all duration-300 space-y-3 shadow-sm group">
                  <div className="text-[10px] text-slate-600 font-mono font-bold tracking-wider">PARAGRAPH {idx + 1}</div>
                  <p className="text-slate-200 font-light hover:text-white leading-loose text-[14px] md:text-[15px] transition-colors">
                    {highlightKeyWords(p.english, lesson.vocabulary)}
                  </p>
                  {showTranslation && (
                    <p className="text-xs text-amber-500/90 bg-amber-500/5 border-l-2 border-l-amber-500/50 pl-4 py-3 rounded-r-xl leading-relaxed italic animate-in fade-in slide-in-from-top-1 duration-300">
                      {p.vietnamese}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* VÍ DỤ MINH HỌA THỰC TẾ (Example Sentences Section) */}
          {exampleSentences.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/40 to-slate-950/30 p-6 shadow-xl backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  Ví dụ minh họa thực tế (Bổ trợ đọc)
                </h3>
                <span className="text-[9px] text-slate-500 font-extrabold uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                  Phát âm + Dịch nghĩa
                </span>
              </div>
              
              <div className="grid gap-3.5">
                {exampleSentences.map((ex, idx) => {
                  const isRevealed = revealedExamples[idx];
                  return (
                    <div 
                      key={idx} 
                      className="rounded-xl border border-slate-850 bg-slate-950/50 p-4 space-y-2 hover:border-slate-800 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-3 group"
                    >
                      <div className="space-y-1.5 flex-1">
                        <span className="inline-block text-[9px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/50">
                          {ex.vocabWord}
                        </span>
                        <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">
                          {ex.english}
                        </p>
                        {isRevealed && (
                          <p className="text-xs text-amber-500/90 font-light italic bg-amber-500/5 p-2 rounded-lg border-l border-amber-500/30 animate-in fade-in duration-200">
                            {ex.vietnamese}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                        <button
                          onClick={() => speakText(ex.english)}
                          className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
                          title="Nghe phát âm bản xứ"
                        >
                          <Volume2 size={14} />
                        </button>
                        <button
                          onClick={() => toggleExampleTranslate(idx)}
                          className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-amber-400 flex items-center justify-center transition"
                          title="Dịch câu ví dụ"
                        >
                          <Languages size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: WORKSPACE TABS (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* TAB BAR */}
          <div className="flex rounded-xl bg-slate-950/80 p-1 border border-slate-850 text-xs font-bold shadow-inner">
            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                activeTab === "quiz" ? "bg-amber-600 text-white shadow-md shadow-amber-600/10" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Comprehension
            </button>
            <button
              onClick={() => setActiveTab("vocab")}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                activeTab === "vocab" ? "bg-amber-600 text-white shadow-md shadow-amber-600/10" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Key Vocabulary
            </button>
            <button
              onClick={() => setActiveTab("coach")}
              className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "coach" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare size={12} /> AI Teacher
            </button>
          </div>

          {/* TAB CONTENT: QUIZ */}
          {activeTab === "quiz" && (
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/40 to-slate-950/20 p-5 shadow-xl backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-amber-500" />
                  ĐỌC HIỂU TỔNG HỢP ({totalQuestionsLength} CÂU)
                </h3>
                {quizSubmitted && (
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                    Score: {quizScore}/{totalQuestionsLength} Correct
                  </span>
                )}
              </div>

              {/* Progress and status */}
              {!quizSubmitted && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span>MỨC ĐỘ HOÀN THÀNH</span>
                    <span>{quizCompletedPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${quizCompletedPercent}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6 max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">
                
                {/* Part 1: Multiple Choice Questions */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-amber-500 tracking-wider">
                    Part 1: Multiple Choice Questions
                  </h4>
                  {lesson.questions.map((q, qIdx) => {
                    const selectedIdx = selectedAnswers[q.id];

                    return (
                      <div key={q.id} className="rounded-xl border border-slate-850 bg-slate-950/50 p-4 space-y-3">
                        <h5 className="text-xs font-bold text-slate-200 leading-relaxed">
                          Q{qIdx + 1}: {q.question}
                        </h5>
                        <div className="grid gap-2">
                          {q.options.map((option, oIdx) => {
                            const isSelected = selectedIdx === oIdx;
                            const isCorrect = oIdx === q.correct_index;

                            return (
                              <button
                                key={oIdx}
                                disabled={quizSubmitted}
                                onClick={() => handleSelectAnswer(q.id, oIdx)}
                                className={`w-full rounded-lg border px-3 py-2.5 text-left text-xs transition flex items-center justify-between font-medium ${
                                  quizSubmitted
                                    ? isCorrect
                                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold"
                                      : isSelected
                                        ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                                        : "border-slate-900 bg-slate-950/20 text-slate-500"
                                    : isSelected
                                      ? "border-amber-500 bg-amber-500/10 text-amber-400 font-bold"
                                      : "border-slate-850 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:bg-slate-900/50"
                                }`}
                              >
                                <span>{option}</span>
                                {quizSubmitted && isCorrect && <span className="text-emerald-400">✓</span>}
                                {quizSubmitted && isSelected && !isCorrect && <span className="text-rose-400">✗</span>}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation displayed after submission */}
                        {quizSubmitted && (
                          <div className="mt-3 rounded-lg bg-slate-900/50 border border-slate-850 p-3 text-[11px] text-slate-400 leading-relaxed italic">
                            <strong className="text-amber-500/90 not-italic block mb-0.5">Giải thích:</strong>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Part 2: True/False/Not Given Questions */}
                {tfngStatements.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="text-xs font-black uppercase text-amber-500 tracking-wider">
                      Part 2: IELTS True / False / Not Given
                    </h4>
                    {tfngStatements.map((stmt, sIdx) => {
                      const userAns = tfngAnswers[stmt.id];

                      return (
                        <div key={stmt.id} className="rounded-xl border border-slate-850 bg-slate-950/50 p-4 space-y-3">
                          <h5 className="text-xs font-bold text-slate-200 leading-relaxed">
                            Statement {sIdx + 1}: {stmt.statement}
                          </h5>
                          
                          <div className="grid grid-cols-3 gap-2">
                            {(['TRUE', 'FALSE', 'NOT GIVEN'] as const).map((choice) => {
                              const isSelected = userAns === choice;
                              const isCorrect = choice === stmt.correct;

                              return (
                                <button
                                  key={choice}
                                  disabled={quizSubmitted}
                                  onClick={() => handleSelectTFNG(stmt.id, choice)}
                                  className={`rounded-lg border py-2.5 text-center text-[10px] font-black transition ${
                                    quizSubmitted
                                      ? isCorrect
                                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold"
                                        : isSelected
                                          ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                                          : "border-slate-900 bg-slate-950/20 text-slate-650"
                                      : isSelected
                                        ? "border-amber-500 bg-amber-500/10 text-amber-400 font-bold"
                                        : "border-slate-850 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:bg-slate-900/50"
                                  }`}
                                >
                                  {choice}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation displayed after submission */}
                          {quizSubmitted && (
                            <div className="mt-3 rounded-lg bg-slate-900/50 border border-slate-850 p-3 text-[11px] text-slate-400 leading-relaxed italic">
                              <strong className="text-amber-500/90 block mb-0.5">
                                Đáp án đúng: <span className="text-emerald-400 font-bold">{stmt.correct}</span>
                              </strong>
                              {stmt.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-850">
                {!quizSubmitted ? (
                  <button
                    onClick={submitQuiz}
                    disabled={totalAnsweredCount < totalQuestionsLength}
                    className="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 text-xs font-bold text-white transition hover:bg-amber-500 shadow-lg shadow-amber-600/15 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Nộp Bài Khảo Sát Đọc Hiểu ➔
                  </button>
                ) : (
                  <button
                    onClick={restartQuiz}
                    className="w-full inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-slate-800 px-4 text-xs font-bold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  >
                    <RefreshCw size={12} /> Làm Lại Quiz Đọc Hiểu
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB CONTENT: KEY VOCABULARY */}
          {activeTab === "vocab" && (
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/40 to-slate-950/20 p-5 shadow-xl backdrop-blur-md space-y-4 animate-in fade-in duration-300">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
                📚 TỪ VỰNG TIÊU ĐIỂM (Tap to Flip)
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Tập trung học các từ vựng học thuật quan trọng cấu thành nên bài đọc trên. Nhấp vào thẻ để lật xem nghĩa tiếng Việt & ví dụ.
              </p>
              <div className="grid gap-3.5 grid-cols-2">
                {lesson.vocabulary.map((v) => (
                  <VocabFlipCard
                    key={v.word}
                    word={v.word}
                    meaning={v.meaning}
                    pronunciation={v.pronunciation}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: COACH ARIA CHAT */}
          {activeTab === "coach" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <AITeacherChat
                mode="warmup"
                sessionInfo={{
                  title: lesson.title,
                  summary: lesson.description || `Luyện đọc Unit ${lesson.unitNum}`
                }}
                studentName={studentName}
              />
            </div>
          )}
        </div>
      </div>
      <DictionaryPopup />
    </div>
  );
}
