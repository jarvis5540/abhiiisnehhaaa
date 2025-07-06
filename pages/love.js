import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';

export default function Love() {
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play blocked:', err);
        });
        setMusicPlaying(true);
      }
    }
  };

  useEffect(() => {
    const enableAudio = () => {
      if (audioRef.current && !musicPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play blocked:', err);
        });
        setMusicPlaying(true);
      }
      document.removeEventListener('click', enableAudio);
    };
    document.addEventListener('click', enableAudio);
    return () => document.removeEventListener('click', enableAudio);
  }, [musicPlaying]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-rose-100 to-pink-200 text-center p-6 overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} src="/love-song.mp3" loop preload="auto" />

      {/* Floating Hearts Animation */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-300 text-2xl animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 4
          }}
        >
          💖
        </motion.span>
      ))}

      {/* Main Sneha Image */}
      <motion.div
        initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="rounded-full border-4 border-rose-400 shadow-xl overflow-hidden w-48 h-48 mb-6 z-10"
      >
        <Image src="/sneha.jpg" alt="Sneha" width={192} height={192} />
      </motion.div>

      {/* Romantic Message */}
      <motion.p
        className="text-xl sm:text-2xl font-medium text-rose-800 max-w-xl mb-8 px-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Typewriter
          words={[
            "You changed my world 💖",
            "You’re my every heartbeat 💓",
            "I still smile at your first message ☺️",
            "Tum mile... toh lagta hai zindagi mil gayi 🥹",
            "You're the magic I never knew I needed ✨",
            "Forever sounds perfect — with you 💍"
          ]}
          loop={0}
          cursor
          cursorStyle="💘"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </motion.p>

      {/* Music Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        className="bg-white text-rose-500 border border-rose-300 px-6 py-2 mb-4 rounded-full shadow-md z-10 hover:bg-rose-100 text-sm"
      >
        {musicPlaying ? 'Pause Music 🎵' : 'Play Music 🎶'}
      </motion.button>

      {/* Cute Button */}
      <Link href="/cake">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 px-8 rounded-full shadow-xl text-lg z-10 transition duration-300 animate-bounce"
        >
          Next Surprise 🎁
        </motion.button>
      </Link>
    </div>
  );
}