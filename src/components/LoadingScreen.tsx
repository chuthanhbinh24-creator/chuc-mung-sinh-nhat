import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#ffe6ea]">
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 1, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl drop-shadow-lg"
      >
        🎁
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 font-amsterdam text-3xl text-pink-600"
      >
        Đang chuẩn bị điều bất ngờ...
      </motion.h2>
    </div>
  );
};
