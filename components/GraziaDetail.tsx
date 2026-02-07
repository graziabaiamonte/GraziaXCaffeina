
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Zap, CheckCircle2, Sparkles } from 'lucide-react';
import { GRAZIA_VALUES } from '../constants';
import TerminalComponent from './TerminalOverlay';
import FinalCelebration from './FinalCelebration';

interface GraziaDetailProps {
  showFinal: boolean;
  onAllValuesUnlocked: () => void;
}

const GraziaDetail: React.FC<GraziaDetailProps> = ({ showFinal, onAllValuesUnlocked }) => {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [activeAnecdote, setActiveAnecdote] = useState<string[] | null>(null);
  const [lastUnlockTime, setLastUnlockTime] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);

  const handleValueClick = (id: string, anecdote: string[]) => {
    if (!unlockedIds.has(id)) {
      const newUnlocked = new Set(unlockedIds);
      newUnlocked.add(id);
      setUnlockedIds(newUnlocked);
      setLastUnlockTime(Date.now());

      if (newUnlocked.size === GRAZIA_VALUES.length) {
        setTimeout(() => {
          onAllValuesUnlocked();
        }, 1000); 
      }
    }
    setActiveAnecdote(anecdote);
  };

  useEffect(() => {
    if (showFinal && celebrationRef.current) {
      celebrationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showFinal]);

  const compatibility = Math.round((unlockedIds.size / GRAZIA_VALUES.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8 lg:p-12 relative z-10 transition-all duration-700 flex flex-col pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        {/* Top Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start md:items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <div className="rounded-full overflow-hidden border-4 border-[var(--brand-primary)] shadow-2xl relative w-full h-full">
              <img 
                src={`${(import.meta as any).env.BASE_URL}grazia_baiamonte.jpeg`}
                alt="Grazia" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
              <h1 className="text-4xl md:text-5xl font-medium text-[var(--text-primary)]">Grazia B. <span className="text-[var(--text-primary)] opacity-50 font-light text-2xl">| 24</span></h1>
              <p className="text-[var(--brand-primary)] font-medium italic uppercase tracking-tighter">"The Ultimate Frontend Match"</p>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex items-center text-[var(--bg-base)] text-xs font-medium bg-[var(--brand-primary)] px-4 py-2 rounded-full shadow-md">
                <MapPin size={14} className="mr-2 text-[var(--brand-accent)]" />
                <span>0.0km DISTANZA</span>
              </div>
              <div className="flex items-center text-[var(--bg-base)] text-xs font-medium bg-[var(--brand-primary)] px-4 py-2 rounded-full shadow-md">
                <Zap size={14} className="mr-2 text-[var(--brand-accent)]" />
                <span>DISPONIBILITÀ: SUBITO</span>
              </div>
              <div className="flex items-center text-[var(--bg-base)] text-xs font-medium bg-[var(--brand-primary)] px-4 py-2 rounded-full shadow-md">
                <Briefcase size={14} className="mr-2 text-[var(--brand-accent)]" />
                <span>NEXT GEN TALENT</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-80">
            <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-visible">
              <AnimatePresence>
                {lastUnlockTime > 0 && (
                  <motion.div
                    key={lastUnlockTime}
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -40, scale: 1.2 }}
                    exit={{ opacity: 0, y: -60, scale: 0.8 }}
                    className="absolute top-0 right-4 flex items-center space-x-1 text-[var(--brand-secondary)] font-medium pointer-events-none drop-shadow-sm"
                  >
                    <Sparkles size={16} />
                    <span>SYNERGY +16%</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-center mb-3">
                <span className="font-medium flex items-center text-xs text-[var(--text-primary)] uppercase tracking-widest">
                  Match-o-Meter
                </span>
                <span className="text-[var(--text-primary)] font-terminal text-sm font-bold" aria-live="polite">{compatibility}%</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${compatibility}%` }}
                  className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="mb-4">
              <h2 className="text-2xl font-medium mb-1 text-[var(--text-primary)] uppercase italic tracking-wide">I Nostri Valori</h2>
              <p className="text-[var(--text-primary)] opacity-50 text-xs font-medium uppercase tracking-widest">Analizza i dati di sistema...</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:space-y-3">
              {GRAZIA_VALUES.map((val) => {
                const isUnlocked = unlockedIds.has(val.id);
                const isActive = activeAnecdote === val.anecdote;
                const isOtherHovered = hoveredId !== null && hoveredId !== val.id;
                
                return (
                  <motion.button
                    key={val.id}
                    onMouseEnter={() => setHoveredId(val.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ opacity: isOtherHovered ? 0.6 : 1 }}
                    onClick={() => handleValueClick(val.id, val.anecdote)}
                    aria-pressed={isActive}
                    className={`
                      relative py-3 px-4 md:py-4 md:px-8 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-tight transition-all duration-300 shadow-lg border-2
                      ${isActive 
                        ? 'bg-[var(--brand-secondary)] text-[var(--bg-base)] border-[var(--brand-secondary)] scale-105' 
                        : 'bg-[#4c2e9d] border-[#4c2e9d] text-white'
                      }
                      ${!isUnlocked && !isActive ? 'opacity-80 hover:opacity-100' : 'opacity-100'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{val.label}</span>
                      {isUnlocked && (
                        <CheckCircle2 
                          size={16} 
                          className={`ml-2 ${isActive ? 'text-[var(--bg-base)]' : 'text-[var(--brand-secondary)]'}`} 
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 h-[600px] lg:h-auto min-h-[500px]">
            <TerminalComponent content={activeAnecdote} />
          </div>
        </div>

        <AnimatePresence>
          {showFinal && (
            <motion.div
              ref={celebrationRef}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="w-full mt-8"
            >
              <FinalCelebration />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GraziaDetail;
