import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function Final() {
  const audioRef = useRef(null);
  const [step, setStep] = useState('proposal');
  const [denialCount, setDenialCount] = useState(0);

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 text-center p-6 relative overflow-hidden">
      <audio ref={audioRef} src="/romantic-piano.mp3" loop preload="auto" />

      {/* Floating Emojis */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-300 text-xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity }}
        >
          {i % 2 === 0 ? '💖' : '💍'}
        </motion.span>
      ))}

      {/* Proposal */}
      {step === 'proposal' && (
        <>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-700 drop-shadow-lg mb-6 z-10"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            Will you marry me baby? 💍
          </motion.h1>

          <motion.div
            className="flex gap-6 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <button
              onClick={() => setStep('confirm')}
              className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-full text-lg shadow-lg"
            >
              Yes 💗
            </button>
            <button
              onClick={() => {
                if (denialCount >= 2) {
                  setStep('trap');
                } else {
                  setDenialCount(denialCount + 1);
                  setStep('nope');
                }
              }}
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-6 rounded-full text-lg shadow-lg"
            >
              No 🙈
            </button>
          </motion.div>
        </>
      )}

      {/* Confirmation */}
      {step === 'confirm' && (
        <>
          <motion.h2
            className="text-3xl font-semibold text-purple-700 z-10"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Like... for real-real? 😳💕
          </motion.h2>
          <button
            onClick={() => setStep('yes')}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-8 rounded-full text-lg shadow-md z-10"
          >
            1000% Sure! 💞
          </button>
        </>
      )}

      {/* Accepted */}
      {step === 'yes' && (
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-pink-700 mb-4 animate-bounce">
            Aaaahhhh!!! She said YES!!! 💖💍
          </h2>
          <p className="text-xl text-pink-800">
            This is the beginning of our forever fairytale. 💫✨<br />
            Let’s plan our dream wedding now 😍💐
          </p>
        </motion.div>
      )}

      {/* Funny Rejection */}
      {step === 'nope' && (
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold text-red-600 mb-4">Whattt?! 😵</h2>
          <p className="text-md text-red-500">
            I think you misclicked. Let’s try this again 😜😜😜😜😜😜😜
          </p>
          <button
            onClick={() => setStep('proposal')}
            className="mt-6 bg-red-400 hover:bg-red-500 text-white py-2 px-6 rounded-full text-lg"
          >
            Fine... Take me back ❤️
          </button>
        </motion.div>
      )}

      {/* Forced Acceptance after repeated No */}
      {step === 'trap' && (
        <motion.div
          className="text-center z-10 animate-pulse"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-pink-700 mb-4">
            Okay okay... You can’t say no forever! 😤💘
          </h2>
          <p className="text-md text-pink-700">
            Destiny says YES. Now click that button and make my heart happy 💓
          </p>
          <button
            onClick={() => setStep('yes')}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full text-lg shadow-lg"
          >
            I Say Yes 😅
          </button>
        </motion.div>
      )}
    </div>
  );
}