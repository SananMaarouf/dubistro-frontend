'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from "@/context/LanguageContext";
import type { LandingProps} from "@/lib/types";

// YouTube Player types
interface YT {
  Player: YTPlayer;
}

interface YTPlayer {
  new(elementId: string, options: PlayerOptions): Player;
}

interface Player {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
}

interface PlayerOptions {
  videoId: string;
  playerVars?: {
    autoplay?: number;
    controls?: number;
    loop?: number;
    playlist?: string;
    mute?: number;
  };
  events?: {
    onReady?: () => void;
  };
}

declare global {
  interface Window {
    YT: YT;
    onYouTubeIframeAPIReady: () => void;
  }
}


export default function Landing({ alt, image, videoId, ctaText, ctaBtnText }: LandingProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<Player | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          mute: 1
        },
        events: {
          onReady: () => setVideoLoaded(true)
        }
      });
    };
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current?.isMuted && playerRef.current?.unMute) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [isMuted]);

  return (
    <div className="relative w-full h-screen overflow-clip">
      {/* placeholder image */}
      <div className="absolute w-full h-full -z-10">
        {!videoLoaded && (
          <motion.img
            src={image}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {/* video */}
        <div
          id="youtube-player"
          className="absolute w-[100vw] h-[100vh] min-w-[177.77vh] min-h-[56.25vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.2]"
        />
      </div>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* landing content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center mb-16 mx-auto lg:w-1/3 h-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-6xl font-bold text-white whitespace-pre-line text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {ctaText[language]}
        </motion.h1>
        <a href="mailto:duo@leduodubistro.no?subject=Booking">
          <motion.button
            className='px-4 py-2 bg-white text-green-900 mt-10 rounded-lg text-3xl uppercase hover:bg-green-900 hover:text-white transition duration-300'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {ctaBtnText[language]}
          </motion.button>
        </a>
      </motion.div>

      {/* mute button */}
      <motion.button
        className="absolute bottom-12 right-2 md:right-12 z-20 p-4 rounded-full bg-white/50 backdrop-blur-sm"
        onClick={() => setIsMuted(!isMuted)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? (
          <img src="/volume-x.svg" alt="Muted" className="w-6 h-6" />
        ) : (
          <img src="/volume-2.svg" alt="Unmuted" className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}