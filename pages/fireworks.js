import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

// Dynamic Lottie import
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

export default function Fireworks() {
  const audioRef = useRef(null);

  useEffect(() => {
    const enableAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play blocked:', err);
        });
      }
      document.removeEventListener('click', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    return () => document.removeEventListener('click', enableAudio);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-black text-white text-center p-6 overflow-hidden">
      {/* 🔊 Fireworks/celebration sound */}
      <audio ref={audioRef} src="/fireworks.mp3" preload="auto" loop />

      {/* Sparkles background */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-yellow-200"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 1.5 + 0.5}rem`
          }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -10, 0] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
        >
          ✨
        </motion.span>
      ))}

      {/* Fireworks animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Player
          autoplay
          loop
          src="/animations/fireworks.json"
          style={{ height: '300px', width: '300px' }}
        />
      </motion.div>

      {/* Romantic message */}
      <motion.p
        className="text-xl sm:text-2xl mt-8 max-w-2xl text-center text-white font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <Typewriter
          words={[
            'This night belongs to you, my queen… 🌌',
            'The stars envy your shine. ✨',
            'Every spark reminds me of your smile. 💫',
            'You are my forever wish... 🎇',
            'And this moment is just the beginning. 💍'
          ]}
          loop={0}
          cursor
          cursorStyle="💖"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2500}
        />
      </motion.p>

      {/* Final Surprise button */}
      <Link href="/final">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 bg-white text-black py-3 px-8 rounded-full shadow-xl text-lg animate-pulse transition-all"
        >
          Final Surprise 💍
        </motion.button>
      </Link>
    </div>
  );
}
