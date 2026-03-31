/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Fireworks } from './components/Fireworks';
import { MouseEffect } from './components/MouseEffect';
import { Flowers } from './components/Flowers';
import { Letter } from './components/Letter';
import { MediaControls } from './components/MediaControls';
import { motion } from 'framer-motion';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasReadLetter, setHasReadLetter] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#ffe6ea] overflow-hidden relative font-sans selection:bg-pink-300 selection:text-pink-900">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="relative w-full h-screen flex flex-col items-center pt-16 px-4"
        >
          {/* Background Effects */}
          <Fireworks />
          <MouseEffect />
          <Flowers />

          {/* Header */}
          <div className="relative z-30 text-center mb-8">
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="font-amsterdam text-6xl md:text-8xl text-pink-600 drop-shadow-md mb-4"
            >
              Chúc Mừng Sinh Nhật
            </motion.h1>
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="font-sans text-xl md:text-2xl font-semibold text-pink-500 tracking-wide bg-white/50 px-6 py-2 rounded-full inline-block shadow-sm backdrop-blur-sm border border-pink-200"
            >
              🎀 Nguyễn Anh Thư - Hổ 🎀
            </motion.h2>
          </div>

          {/* Main Content - Letter */}
          <Letter onRead={() => setHasReadLetter(true)} />

          {/* Media Controls */}
          <MediaControls showVideo={hasReadLetter} />
        </motion.div>
      )}
    </div>
  );
}
