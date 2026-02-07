import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TerminalComponentProps {
  content: string[] | null;
  onClose?: () => void;
}

// --- Sottocomponente per l'effetto Typing ---
const TypingParagraph: React.FC<{ text: string; shouldAnimate: boolean; onFinished: () => void }> = ({ 
  text, 
  shouldAnimate, 
  onFinished 
}) => {
  // Se non deve animarsi, mostra il testo completo immediatamente
  const [displayedText, setDisplayedText] = useState(shouldAnimate ? '' : text);
  const hasFinishedRef = useRef(!shouldAnimate);

  useEffect(() => {
    // Se il paragrafo è già stato animato in passato o non deve animarsi, non fare nulla
    if (!shouldAnimate) return;

    let i = 0;
    const timer = setInterval(() => {
      const nextChar = text.slice(0, i + 1);
      setDisplayedText(nextChar);
      i++;

      if (i >= text.length) {
        clearInterval(timer);
        if (!hasFinishedRef.current) {
          hasFinishedRef.current = true;
          onFinished();
        }
      }
    }, 15);

    return () => clearInterval(timer);
    // L'effetto gira solo se shouldAnimate è true
  }, [text, shouldAnimate, onFinished]);

  return (
    <p className="mb-6 whitespace-pre-wrap break-words leading-relaxed text-lg font-medium tracking-tight text-white terminal-text">
      {displayedText}
      {/* Mostra il cursore solo se sta ancora scrivendo */}
      {shouldAnimate && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-2 h-5 bg-[var(--brand-secondary)] ml-2 translate-y-1"
        />
      )}
    </p>
  );
};

// --- Componente Principale ---
const TerminalComponent: React.FC<TerminalComponentProps> = ({ content }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content && content.length > 0) {
      setVisibleCount(1);
    } else {
      setVisibleCount(0);
    }
  }, [content]);

  const handleNext = useCallback(() => {
    if (content && visibleCount < content.length) {
      setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 2000); // 2 secondi di pausa dopo la fine del typing
    }
  }, [content, visibleCount]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleCount]);

  return (
    <div className="w-full h-full bg-[#0a0a0c] border border-white/10 shadow-2xl overflow-hidden flex flex-col rounded-3xl font-mono">
      {/* Header */}
      <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-[10px] text-white/60 uppercase tracking-widest flex items-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          grazia_core_v2.sh
        </span>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-black/40 min-h-[300px]"
      >
        {!content || content.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/20 text-center p-4">
            <span className="text-5xl mb-6 opacity-10 tracking-tighter">{'>_'}</span>
            <p className="text-xs uppercase font-medium tracking-widest opacity-40">Awaiting system interaction...</p>
          </div>
        ) : (
          <div>
            {content.slice(0, visibleCount).map((para, idx) => {
              // Determiniamo se questo paragrafo è quello "nuovo" che deve animarsi
              // Un paragrafo deve animarsi SOLO se il suo indice è l'ultimo visibile
              const isLastParagraph = idx === visibleCount - 1;

              return (
                <motion.div
                  key={idx}
                  initial={isLastParagraph ? { opacity: 0, x: -5 } : { opacity: 1 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TypingParagraph 
                    text={para} 
                    // Se NON è l'ultimo, deve stare fermo (già scritto)
                    shouldAnimate={isLastParagraph} 
                    onFinished={isLastParagraph ? handleNext : () => {}} 
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-3 bg-white/5 border-t border-white/10 text-[10px] text-white/30 flex justify-between items-center font-medium">
        <span>DEV_MATCH_SYSTEM_ACTIVE</span>
        <span>{content && visibleCount < content.length ? 'LOGS: STREAMING...' : 'LOGS: READY'}</span>
      </div>
    </div>
  );
};

export default TerminalComponent;