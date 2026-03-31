import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    const startTime = Date.now();
    const fadeDuration = 15000; // 15 seconds to fade

    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const elapsed = Date.now() - startTime;
      
      // Calculate opacity: starts at 1, goes down to 0.2
      let currentOpacity = 1 - (elapsed / fadeDuration) * 0.8;
      if (currentOpacity < 0.2) currentOpacity = 0.2;
      setOpacity(currentOpacity);

      // Decrease particle count over time to make it less intense
      const particleCount = Math.floor(50 * currentOpacity);
      
      // Since they fall down, start a bit higher than random
      myConfetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffb6c1', '#ffc0cb', '#ff69b4', '#ff1493', '#db7093']
      });
      myConfetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffb6c1', '#ffc0cb', '#ff69b4', '#ff1493', '#db7093']
      });
    }, 250);

    return () => {
      clearInterval(interval);
      myConfetti.reset();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full transition-opacity duration-200"
    />
  );
};
