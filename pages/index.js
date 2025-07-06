import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50">
      <motion.h1
        className="text-4xl font-bold text-pink-700 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hey Sneha… Something magical awaits
      </motion.h1>
      <Link href="/unlock">
  <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full shadow-lg text-lg">
    Start the Surprise
  </button>
</Link>

    </div>
  );
}
