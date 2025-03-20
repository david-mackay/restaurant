'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
}

export const VideoBackground = ({ videoSrc }: VideoBackgroundProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePause = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  useEffect(() => {
    // Ensure video plays on load
    if (videoRef.current && !isPaused) {
      videoRef.current.play().catch(err => {
        console.error("Video playback failed:", err);
      });
    }
  }, [isPaused]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <video 
        ref={videoRef}
        className="absolute min-w-full min-h-full object-cover"
        src={videoSrc}
        loop
        muted
        playsInline
      />
      <button 
        className="absolute bottom-4 left-4 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors z-50"
        onClick={togglePause}
        aria-label={isPaused ? "Play background video" : "Pause background video"}
      >
        {isPaused ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
          </svg>
        )}
      </button>
    </div>
  );
};