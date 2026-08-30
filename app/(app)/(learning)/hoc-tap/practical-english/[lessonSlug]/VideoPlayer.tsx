"use client";

import { useRef, useState, useEffect } from "react";

interface VideoPlayerProps {
  lessonTitle: string;
  videoUrl: string;
  aspectRatio: string;
  isCompleted: boolean;
  onCompleteAction: () => Promise<void>;
}

export default function VideoPlayer({
  lessonTitle,
  videoUrl,
  aspectRatio,
  isCompleted,
  onCompleteAction,
}: VideoPlayerProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isLocalVideo = videoUrl.startsWith("/");

  // Xử lý tự động hoàn thành sau 15 giây nếu không phải video local (Google Drive Iframe)
  useEffect(() => {
    if (completed || isSubmitting || isLocalVideo) return;
    
    // Đếm ngược 15 giây (hoặc thời gian tùy chỉnh) rồi tự động ghi nhận
    const timer = setTimeout(async () => {
      setIsSubmitting(true);
      setCompleted(true);
      await onCompleteAction();
    }, 15000); // 15 giây
    
    return () => clearTimeout(timer);
  }, [completed, isSubmitting, isLocalVideo, onCompleteAction]);

  const handleTimeUpdate = async () => {
    if (completed || isSubmitting || !videoRef.current) return;

    const video = videoRef.current;
    const progress = video.currentTime / video.duration;

    // Tự động hoàn thành khi xem quá 2/3 (66.6%)
    if (progress >= 0.666) {
      setIsSubmitting(true);
      setCompleted(true);
      await onCompleteAction();
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`rounded-2xl overflow-hidden shadow-2xl bg-black border border-line w-full relative ${
          aspectRatio === "vertical"
            ? "max-w-[400px] aspect-[9/20]"
            : "max-w-[800px] aspect-video"
        }`}
      >
        {videoUrl ? (
          isLocalVideo ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls
              controlsList="nodownload"
              onTimeUpdate={handleTimeUpdate}
              playsInline
            />
          ) : (
            <iframe
              src={videoUrl}
              className="absolute top-0 left-0 w-full h-full border-none"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            Đang cập nhật video...
          </div>
        )}
      </div>

      {!completed && (
        <div className="mt-8 text-center animate-pulse text-sky-400">
          Đang theo dõi tiến độ học... 
        </div>
      )}
      
      {completed && (
        <div className="mt-6 text-emerald-400 font-bold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Đã hoàn thành bài học này!
        </div>
      )}
    </div>
  );
}
