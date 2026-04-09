import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// THAY ĐỔI LINK ÂM THANH VÀ VIDEO Ở ĐÂY
// ==========================================
const AUDIO_URL = "https://dn710202.ca.archive.org/0/items/shiki-low-g-justatee-in-love-x-co-doi-dieu-pizuh-mashup-pizuh/Shiki%2C%20Low%20G%2C%20Justatee%20-%20In%20Love%20x%20C%C3%B3%20%C4%90%C3%B4i%20%C4%90i%E1%BB%81u%20%28Pizuh%20Mashup%29%20-%20Pizuh.mp3"; // Link nhạc nền
const VIDEO_URL = "https://ia800504.us.archive.org/14/items/du-an-cuoi-cung/D%E1%BB%B1%20%C3%81n%20Cu%E1%BB%91i%20C%C3%B9ng.ia.mp4"; // Link video
// ==========================================

interface MediaControlsProps {
  showVideo: boolean;
}

export const MediaControls: React.FC<MediaControlsProps> = ({ showVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    window.open(VIDEO_URL, '_blank');
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
              Hề Hế Đây Nè
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
