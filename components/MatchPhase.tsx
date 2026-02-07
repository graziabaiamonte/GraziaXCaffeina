
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, Heart, AlertCircle, MapPin } from 'lucide-react';
import { CANDIDATES } from '../constants';
import { Candidate } from '../types';

interface MatchPhaseProps {
  onLikeGrazia: () => void;
}

interface CardProps {
  candidate: Candidate;
  isTop: boolean;
  visualIdx: number;
  onAction: (type: 'nope' | 'like', dir: number) => void;
  isShaking: boolean;
  exitDir: number;
}

const CandidateCard: React.FC<CardProps> = ({ candidate, isTop, visualIdx, onAction, isShaking, exitDir }) => {
  const x = useMotionValue(0);
  const rotateValue = useTransform(x, [-200, 200], [-25, 25]);
  const opacityValue = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (!isTop) return;
    const threshold = 100;
    if (info.offset.x < -threshold) {
      onAction('nope', -1000);
    } else if (info.offset.x > threshold) {
      onAction('like', 1000);
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      style={isTop ? { x, rotate: rotateValue, opacity: opacityValue } : {}}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      // initial={isTop ? { scale: 0.9, opacity: 0, y: 20 } : false}
      // Usa transformPerspective per migliorare il rendering 3D su Chrome Android
      initial={isTop ? { scale: 0.9, opacity: 0, y: 20, transformPerspective: 1000 } : false}
      animate={{ 
        scale: 1 - (visualIdx * 0.05),
        opacity: 1,
        y: isTop ? (isShaking ? [0, -10, 10, -10, 10, 0] : 0) : visualIdx * 12,
        x: isTop ? 0 : visualIdx * 8,
        rotate: isTop ? 0 : visualIdx * 1,
        zIndex: 50 - visualIdx,
      }}
      exit={{ 
        x: exitDir !== 0 ? exitDir : (x.get() < 0 ? -1000 : 1000),
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 350, 
        damping: 30,
        y: isShaking ? { duration: 0.4 } : undefined
      }}
      className={`absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white shadow-2xl flex flex-col border border-[var(--text-primary)] border-opacity-5 pointer-events-auto ${isTop ? 'cursor-grab active:cursor-grabbing touch-none' : 'pointer-events-none'} will-change-transform`}
    >
      {isTop && (
        <>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute top-6 left-6 md:top-10 md:left-10 z-50 border-4 border-[var(--brand-error)] rounded-lg px-3 py-1 md:px-4 md:py-2 rotate-[-20deg] pointer-events-none">
            <span className="text-[var(--brand-error)] text-2xl md:text-4xl font-bold uppercase font-terminal">Nope</span>
          </motion.div>
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-6 right-6 md:top-10 md:right-10 z-50 border-4 border-[var(--brand-primary)] rounded-lg px-3 py-1 md:px-4 md:py-2 rotate-[20deg] pointer-events-none">
            <span className="text-[var(--brand-primary)] text-2xl md:text-4xl font-bold uppercase font-terminal">Like</span>
          </motion.div>
        </>
      )}

      <div className="relative flex-1">
        <img src={candidate.imageUrl} alt="" className="w-full h-full object-cover select-none pointer-events-none" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent flex flex-col justify-end p-6 md:p-8 pb-8 md:pb-10">
          <div className="flex justify-between items-start mb-1">
            <div className="flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{candidate.name}</h3>
              <div className="flex items-center text-white/70 text-[10px] md:text-xs font-medium uppercase tracking-widest mt-0.5">
                <MapPin size={12} className="mr-1 text-[var(--brand-accent)]" />
                {candidate.location}
              </div>
            </div>
            {candidate.isTarget && (
              <span className="bg-[var(--brand-primary)] text-[8px] md:text-[9px] px-2 py-0.5 md:px-3 md:py-1 rounded-full text-white font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] shadow-lg flex-shrink-0">THE ONE</span>
            )}
          </div>

          <p className="text-[var(--brand-accent)] font-bold text-[10px] md:text-xs mb-4 md:mb-5 uppercase tracking-wider italic leading-none">{candidate.role}</p>
          
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {candidate.passions.map((passion, i) => (
              <div 
                key={i} 
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/70 bg-white/10 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest"
              >
                {passion}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MatchPhase: React.FC<MatchPhaseProps> = ({ onLikeGrazia }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [forceLikePulse, setForceLikePulse] = useState(false);
  const [lastExitDir, setLastExitDir] = useState(0);

  const currentCandidate = CANDIDATES[currentIndex];

  useEffect(() => {
    if (systemMessage) {
      const timer = setTimeout(() => setSystemMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [systemMessage]);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleAction = (type: 'nope' | 'like', dir?: number) => {
    const direction = dir || (type === 'nope' ? -1000 : 1000);

    if (currentCandidate.isTarget) {
      if (type === 'nope') {
        setSystemMessage("Azione non permessa: non vorrai mica farti scappare il match perfetto? Clicca quel cuore! 😉");
        setForceLikePulse(true);
        triggerShake();
        return;
      }
      if (type === 'like') {
        onLikeGrazia();
      }
      return;
    } 
    
    if (type === 'like') {
      setSystemMessage("Uh-oh! Errore di sistema: i parametri di creatività non sembrano allineati. Prova a cercare ancora!");
      triggerShake();
      return;
    }

    setLastExitDir(direction);
    setCurrentIndex(prev => prev + 1);
    setForceLikePulse(false);
  };

  return (
    <div className="min-h-[90vh] md:min-h-screen flex flex-col items-center py-6 md:py-12 px-4 relative overflow-hidden transition-all duration-700 pointer-events-none">
      {/* Sistema di messaggi responsive */}
      <div className="fixed top-4 md:top-8 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
        <AnimatePresence>
          {systemMessage && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="w-full max-w-sm md:max-w-md pointer-events-auto"
            >
              <div className="bg-[var(--brand-primary)] text-[var(--bg-base)] p-4 rounded-2xl shadow-2xl flex items-center space-x-3 border-2 border-[var(--bg-base)]">
                <AlertCircle className="flex-shrink-0" size={24} />
                <p className="text-sm font-bold leading-tight uppercase tracking-tight">{systemMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md relative z-10 flex flex-col h-full flex-1 pointer-events-none">
        <header className="flex justify-between items-center mb-6 md:mb-10 pt-4 md:pt-0 pointer-events-auto">
          <span className="text-white font-bold text-lg md:text-xl font-terminal tracking-tighter">{ '{ DevMatch }' }</span>
          <div className="flex flex-col items-end">
             <span className="text-[9px] md:text-[10px] uppercase font-bold text-white opacity-60 mb-1 tracking-widest">Candidate Progress</span>
             <div className="w-24 md:w-32 h-1.5 bg-white bg-opacity-10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]" 
                  animate={{ width: `${((currentIndex + 1) / CANDIDATES.length) * 100}%` }}
                />
             </div>
          </div>
        </header>

        <div className="flex-1 relative mb-6 md:mb-10 min-h-[320px] md:min-h-[500px] pointer-events-none">
          <AnimatePresence initial={false}>
            {CANDIDATES.map((candidate, idx) => {
              if (idx < currentIndex || idx > currentIndex + 1) return null;
              const isTop = idx === currentIndex;
              const visualIdx = idx - currentIndex;
              
              return (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isTop={isTop}
                  visualIdx={visualIdx}
                  onAction={handleAction}
                  isShaking={isTop && isShaking}
                  exitDir={isTop ? lastExitDir : 0}
                />
              );
            }).reverse()}
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center space-x-6 md:space-x-8 pb-6 md:pb-4 pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAction('nope')}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#4c2e9d] shadow-xl flex items-center justify-center text-white border border-white/10"
            aria-label="Dislike"
          >
            <X size={28} className="md:w-8 md:h-8" />
          </motion.button>
          
          <motion.button
            animate={forceLikePulse ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: forceLikePulse ? Infinity : 0, duration: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAction('like')}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl border-2 transition-colors bg-[var(--brand-error)] text-white border-[var(--brand-error)]`}
            aria-label="Like"
          >
            <Heart size={36} className="md:w-10 md:h-10" fill="white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MatchPhase;
