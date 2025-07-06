import { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Cake() {
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const enableAudio = () => {
      if (audioRef.current && !musicPlaying) {
        audioRef.current.play().catch((err) => console.warn('Audio blocked:', err));
        setMusicPlaying(true);
      }
      document.removeEventListener('click', enableAudio);
    };
    document.addEventListener('click', enableAudio);
    return () => document.removeEventListener('click', enableAudio);
  }, [musicPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play().catch((err) => console.warn('Play failed:', err));
        setMusicPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-200 text-center p-6 relative overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} src="/happy-birthday.mp3" loop preload="auto" />

      {/* Sparkles Animation */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-yellow-300 text-xl"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
        >
          ✨
        </motion.span>
      ))}

      {/* Cake Animation */}
      <Player
        autoplay
        loop
        src="/animations/birthday-cake.json"
        style={{ height: '300px', width: '300px' }}
      />

      {/* Message */}
      <motion.p
  className="text-xl sm:text-2xl text-yellow-800 my-6 max-w-xl leading-relaxed"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  Make a wish, my love... and watch it bloom with the flame. 🎂💫 <br />
  On this day, the universe smiled — because you were born. 🌟<br />
  Every flicker of this candle holds a promise… that I’ll always be yours. 💛
</motion.p>


      {/* Music Toggle Button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white border border-yellow-300 text-yellow-600 px-6 py-2 rounded-full shadow-sm mb-4 text-sm hover:bg-yellow-100"
      >
        {musicPlaying ? ' 🎶' : ' Blow out the candles and cut the cake🎵'}
      </motion.button>

      {/* Continue Button */}
      <Link href="/fireworks">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-8 rounded-full shadow-lg text-lg mt-2"
        >
          Continue to Celebration 🎆
        </motion.button>
      </Link>
    </div>
  );
}

