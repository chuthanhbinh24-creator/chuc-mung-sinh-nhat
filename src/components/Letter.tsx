import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LetterProps {
  onRead?: () => void;
}

export const Letter: React.FC<LetterProps> = ({ onRead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (hasOpened && onRead) {
      onRead();
    }
  };

  // Sample images for the letter
  const images = [
    "https://files.catbox.moe/5abrah.jpg",
    "https://files.catbox.moe/x1rzvz.jpg"
  ];

  return (
    <div className="relative z-30 flex items-center justify-center w-full h-full mt-10">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            whileHover={{ y: -20, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={handleOpen}
            className="relative cursor-pointer group"
          >
            {/* Envelope Back */}
            <div className="w-80 h-56 bg-pink-300 rounded-md shadow-xl relative overflow-hidden border border-pink-400">
              {/* Envelope Flap (Closed) */}
              <div className="absolute top-0 left-0 w-full h-full border-t-[112px] border-t-pink-400 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent origin-top z-20"></div>
              
              {/* Envelope Body */}
              <div className="absolute bottom-0 left-0 w-full h-full border-b-[112px] border-b-pink-200 border-l-[160px] border-l-pink-300 border-r-[160px] border-r-pink-300 z-10"></div>
              
              {/* Heart Seal */}
              <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-red-500 group-hover:scale-125 transition-transform">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-10 left-0 w-full text-center text-pink-700 font-medium animate-pulse">
              Nhấn vào để mở thư nhé!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div 
              className="bg-[#fff9f0] w-full max-w-2xl max-h-[85vh] rounded-lg shadow-2xl overflow-hidden flex flex-col relative border-4 border-pink-200"
              onClick={(e) => e.stopPropagation()}
              initial={{ rotateX: 90 }}
              animate={{ rotateX: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-8 overflow-y-auto letter-content">
                <h2 className="font-amsterdam text-4xl md:text-5xl text-pink-600 text-center mb-6">
                  Gửi đến cô nàng chiên xù 😁😁
                </h2>
                
                <div className="font-sans text-gray-700 text-lg leading-relaxed space-y-4 mb-8">
                  <p>
                    Hello<br/>
                    Nhân dịp sinh nhật hôm nay
                  </p>
                  <p>
                    Anh chúc em một tuổi mới vui vẻ, nhiều niềm vui<br/>
                    Luôn hạnh phúc bên người mình thương
                  </p>
                  <p>
                    Cũng không còn gì, có một chút món quà nho nhỏ tặng em ngày sinh nhật này thôi.
                  </p>
                  <p>
                    Ờmmmm....<br/>
                    Đọc xong rồi thì….<br/>
                    <span className="italic text-pink-500">(tắt bức thư đi, có điều bất ngờ á 🤭🤭🤭)</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {images.map((src, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.2 }}
                      className="rounded-lg overflow-hidden border-4 border-white shadow-lg transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
                    >
                      <img src={src} alt={`Kỷ niệm ${idx + 1}`} className="w-full h-auto object-cover aspect-square md:aspect-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
