"use client";

import { useState, useCallback, useEffect } from "react";

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = "en-US";

        recog.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recog.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          let errorMessage = event.error;
          if (event.error === "not-allowed") {
            errorMessage = "Microphone access was denied. Please allow microphone permissions in your browser settings.";
          } else if (event.error === "no-speech") {
            errorMessage = "No speech was detected. Please try again.";
          }
          setError(errorMessage);
          setIsListening(false);
        };

        recog.onstart = () => {
          setIsListening(true);
        };

        recog.onend = () => {
          setIsListening(false);
        };

        setRecognition(recog);
      } else {
        setError("Speech recognition not supported in this browser.");
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      setError(null);
      setTranscript("");
      try {
        recognition.start();
        // State will be updated in onstart
      } catch (err: any) {
        console.error("Failed to start recognition:", err);
        // If it's already started, we just ensure the state is synced
        if (err.name === 'InvalidStateError') {
          setIsListening(true);
        } else {
          setError(err.message || "Failed to start microphone");
        }
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
        // State will be updated in onend
      } catch (err) {
        console.error("Failed to stop recognition:", err);
        setIsListening(false);
      }
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return { 
    isListening, 
    transcript, 
    error, 
    startListening, 
    stopListening, 
    resetTranscript 
  };
}
