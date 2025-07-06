import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Unlock() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleUnlock = () => {
    if (input.trim().toLowerCase() === 'i love you abhi') {
      router.push('/love');
    } else {
      setError("Aww... that's not quite right 😅 Try something sweeter!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200 text-center p-6 relative overflow-hidden">
      {/* Decorative Hearts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 text-2xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
        >
          💕
        </motion.div>
      ))}

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl font-bold text-pink-700 drop-shadow mb-8 z-10"
      >
        Sneha... Only one phrase can unlock this love story 💌
      </motion.h1>

      <motion.input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError('');
        }}
        placeholder="Hint: 3 Magical words + abhi  💑"
        className="px-5 py-3 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg shadow-inner z-10 mb-4 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      <motion.button
        onClick={handleUnlock}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full shadow-lg text-lg z-10 transition duration-300 animate-bounce"
      >
        Unlock Our Forever 🔓
      </motion.button>

      {error && (
        <motion.p
          className="text-red-500 mt-6 text-sm animate-pulse z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}