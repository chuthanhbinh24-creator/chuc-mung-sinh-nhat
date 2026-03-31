import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// THAY ĐỔI LINK ÂM THANH VÀ VIDEO Ở ĐÂY
// ==========================================
const AUDIO_URL = "https://puny-salmon-uqiyt6jjm2.edgeone.app/Shiki,%20Low%20G,%20Justatee%20-%20In%20Love%20x%20Có%20Đôi%20Điều%20(Pizuh%20Mashup)%20-%20Pizuh.mp3"; // Link nhạc nền
const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4"; // Link video
// ==========================================

interface MediaControlsProps {
  showVideo: boolean;
}

export const MediaControls: React.FC<MediaControlsProps> = ({ showVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openVideo = () => {
    setIsVideoOpen(true);
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  };

  // Tự động phát nhạc khi tải xong (có thể bị trình duyệt chặn nếu không có tương tác)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <>
      {/* Audio Element */}
      <audio ref={audioRef} src={AUDIO_URL} loop />

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors"
          title={isPlaying ? "Tắt Nhạc" : "Bật Nhạc"}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      </div>

      {/* Video Button - Slides up from bottom center */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-none"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openVideo}
              className="pointer-events-auto flex items-center gap-2 px-8 py-4 bg-pink-500 text-white rounded-full shadow-2xl hover:bg-pink-600 transition-colors font-semibold text-lg border-2 border-pink-300"
              title="Mở Video"
            >
              <Play size={24} fill="currentColor" />
              Xem Video Kỷ Niệm
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X size={24} />
              </button>
              <video
                src={VIDEO_URL}
                controls
                autoPlay
                onEnded={closeVideo}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
