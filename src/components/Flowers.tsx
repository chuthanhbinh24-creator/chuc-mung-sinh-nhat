import React from 'react';
import { motion } from 'framer-motion';

const Leaf = ({ cx, cy, angle, delay, scale = 1 }: { cx: number, cy: number, angle: number, delay: number, scale?: number }) => (
  <motion.g
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: scale, opacity: 1 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${angle}deg)` }}
  >
    <path d={`M${cx},${cy} Q${cx+40},${cy-40} ${cx+80},${cy} Q${cx+40},${cy+40} ${cx},${cy}`} fill="#4ade80" />
    <path d={`M${cx},${cy} Q${cx+40},${cy-10} ${cx+70},${cy}`} stroke="#16a34a" strokeWidth="3" fill="none" />
  </motion.g>
);

const FlowerHTML = ({ cx, cy, angle, delay, scale = 1 }: { cx: number, cy: number, angle: number, delay: number, scale?: number }) => {
  const left = `${(cx / 400) * 100}%`;
  const top = `${(cy / 1000) * 100}%`;

  // ✅ FIX: chỉnh góc để cuống hoa luôn hướng vào dây
  const correctedAngle = angle + (angle > 0 ? -90 : 90);

  // Sway animation
  const swayVariants = {
    animate: {
      rotate: [
        correctedAngle - 5,
        correctedAngle + 5,
        correctedAngle - 5
      ],
      transition: {
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }
    }
  };

  return (
    <motion.div
      className="absolute z-10"
      style={{
        left,
        top,
        x: '-50%',
        y: '-50%',
        transformOrigin: 'bottom center' // ✅ giữ cuống làm trục xoay
      }}
      initial={{ scale: 0, opacity: 0, rotate: correctedAngle - 20 }}
      animate={{ scale: scale, opacity: 1, rotate: correctedAngle }}
      transition={{ delay, duration: 1, type: "spring" }}
    >
      <motion.div
        variants={swayVariants}
        animate="animate"
        style={{ transformOrigin: 'bottom center' }}
      >
        <div className="pink-flower">
          <div className="pink-flower__leafs">
            <div className="pink-flower__leaf pink-flower__leaf--1"></div>
            <div className="pink-flower__leaf pink-flower__leaf--2"></div>
            <div className="pink-flower__leaf pink-flower__leaf--3"></div>
            <div className="pink-flower__leaf pink-flower__leaf--4"></div>
            <div className="pink-flower__white-circle"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Vine = ({ 
  side, 
  customClass, 
  delayOffset = 0, 
  scale = 1, 
  heightClass = "h-screen",
  rotateOffset = 0,
  widthClass = "w-64 md:w-96"
}: { 
  side: 'left' | 'right', 
  customClass?: string, 
  delayOffset?: number, 
  scale?: number,
  heightClass?: string,
  rotateOffset?: number,
  widthClass?: string
}) => {
  const isLeft = side === 'left';
  const transformOrigin = isLeft ? "top left" : "top right";
  
  // Swaying animation
  const swayVariants = {
    animate: {
      rotate: isLeft ? [-1 + rotateOffset, 2 + rotateOffset, -1 + rotateOffset] : [1 + rotateOffset, -2 + rotateOffset, 1 + rotateOffset],
      scale: scale,
      transition: {
        duration: 12 + (delayOffset % 3),
        repeat: Infinity,
        ease: "easeInOut",
        delay: delayOffset
      }
    }
  };

  return (
    <motion.div 
      className={`absolute top-0 ${customClass || ''} ${widthClass} ${heightClass} pointer-events-none`}
      style={{ transformOrigin }}
      variants={swayVariants}
      initial={{ scale, rotate: rotateOffset }}
      animate="animate"
    >
      <svg width="100%" height="100%" viewBox="0 0 400 1000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main Thick Stem */}
        <motion.path
          d={isLeft 
            ? "M-20,-20 C150,150 350,300 200,500 C50,700 350,850 200,1050" 
            : "M420,-20 C250,150 50,300 200,500 C350,700 50,850 200,1050"}
          stroke="#16a34a"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: delayOffset }}
          className="drop-shadow-lg"
        />
        
        {/* Secondary Twining Stem */}
        <motion.path
          d={isLeft 
            ? "M-10,-20 C200,100 250,350 150,550 C0,750 400,800 150,1050" 
            : "M410,-20 C200,100 150,350 250,550 C400,750 0,800 250,1050"}
          stroke="#22c55e"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeOut", delay: 0.5 + delayOffset }}
          className="drop-shadow-md"
        />

        {/* Leaves - Left Vine */}
        {isLeft && (
          <>
            <Leaf cx={60} cy={80} angle={25} delay={0.5 + delayOffset} scale={1.2} />
            <Leaf cx={180} cy={180} angle={-15} delay={0.8 + delayOffset} scale={1.4} />
            <Leaf cx={250} cy={320} angle={50} delay={1.2 + delayOffset} scale={1.3} />
            <Leaf cx={200} cy={450} angle={-35} delay={1.6 + delayOffset} scale={1.5} />
            <Leaf cx={100} cy={600} angle={25} delay={2.0 + delayOffset} scale={1.2} />
            <Leaf cx={220} cy={780} angle={-50} delay={2.4 + delayOffset} scale={1.4} />
            <Leaf cx={250} cy={920} angle={35} delay={2.8 + delayOffset} scale={1.3} />
          </>
        )}

        {/* Leaves - Right Vine */}
        {!isLeft && (
          <>
            <Leaf cx={340} cy={80} angle={155} delay={0.5 + delayOffset} scale={1.2} />
            <Leaf cx={220} cy={180} angle={195} delay={0.8 + delayOffset} scale={1.4} />
            <Leaf cx={150} cy={320} angle={130} delay={1.2 + delayOffset} scale={1.3} />
            <Leaf cx={200} cy={450} angle={215} delay={1.6 + delayOffset} scale={1.5} />
            <Leaf cx={300} cy={600} angle={155} delay={2.0 + delayOffset} scale={1.2} />
            <Leaf cx={180} cy={780} angle={230} delay={2.4 + delayOffset} scale={1.4} />
            <Leaf cx={150} cy={920} angle={145} delay={2.8 + delayOffset} scale={1.3} />
          </>
        )}
      </svg>

      {/* Flowers - Left Vine */}
      {isLeft && (
        <>
          <FlowerHTML cx={140} cy={130} angle={-80} delay={1.2 + delayOffset} scale={1.2} />
          <FlowerHTML cx={240} cy={280} angle={-65} delay={1.8 + delayOffset} scale={1.4} />
          <FlowerHTML cx={200} cy={480} angle={60} delay={2.4 + delayOffset} scale={1.3} />
          <FlowerHTML cx={180} cy={680} angle={-60} delay={3.0 + delayOffset} scale={1.5} />
          <FlowerHTML cx={220} cy={850} angle={30} delay={3.6 + delayOffset} scale={1.2} />
        </>
      )}

      {/* Flowers - Right Vine */}
      {!isLeft && (
        <>
          <FlowerHTML cx={260} cy={130} angle={80} delay={1.2 + delayOffset} scale={1.2} />
          <FlowerHTML cx={154} cy={280} angle={65} delay={1.8 + delayOffset} scale={1.4} />
          <FlowerHTML cx={200} cy={480} angle={-60} delay={2.4 + delayOffset} scale={1.3} />
          <FlowerHTML cx={220} cy={680} angle={60} delay={3.0 + delayOffset} scale={1.5} />
          <FlowerHTML cx={180} cy={850} angle={-30} delay={3.6 + delayOffset} scale={1.2} />
        </>
      )}
    </motion.div>
  );
};

export const Flowers: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Edge Vines - Framing the screen */}
      <Vine side="left" customClass="-left-16 md:-left-8 z-40" scale={1.1} heightClass="h-[120vh]" widthClass="w-64 md:w-80" rotateOffset={-2} delayOffset={0.5} />
      <Vine side="right" customClass="-right-16 md:-right-8 z-40" scale={1.0} heightClass="h-[110vh]" widthClass="w-64 md:w-80" rotateOffset={2} delayOffset={1.2} />

      {/* Front Vines - Closer to center, asymmetrical, very long */}
      <Vine side="left" customClass="left-8 md:left-24 z-30" scale={1.15} heightClass="h-[130vh]" widthClass="w-72 md:w-[28rem]" rotateOffset={8} delayOffset={0.2} />
      <Vine side="right" customClass="right-12 md:right-32 z-30" scale={1.25} heightClass="h-[140vh]" widthClass="w-80 md:w-[30rem]" rotateOffset={-12} delayOffset={0.7} />
      
      {/* Back Vines - Adding depth, reaching in */}
      <Vine side="left" customClass="left-16 md:left-40 opacity-60 blur-[1px] z-10" scale={0.8} heightClass="h-[115vh]" widthClass="w-56 md:w-80" rotateOffset={18} delayOffset={3.0} />
      <Vine side="right" customClass="-right-4 md:right-4 opacity-50 blur-[2px] z-10" scale={0.7} heightClass="h-[160vh]" widthClass="w-64 md:w-96" rotateOffset={-8} delayOffset={3.8} />
    </div>
  );
};