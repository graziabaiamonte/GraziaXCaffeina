
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalComponentProps {
  content: string[] | null;
  onClose?: () => void;
}

const TypingParagraph: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, 15);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <p className="mb-6 whitespace-pre-wrap break-words leading-relaxed text-lg font-medium tracking-tight text-white terminal-text">
      {displayedText}
      {displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-2 h-5 bg-[var(--brand-secondary)] ml-2 translate-y-1"
        />
      )}
    </p>
  );
};

const TerminalComponent: React.FC<TerminalComponentProps> = ({ content }) => {
  const [visibleParagraphs, setVisibleParagraphs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (content && content.length > 0) {
      setVisibleParagraphs([]);
      const timers: any[] = [];
      content.forEach((paragraph, index) => {
        const t = setTimeout(() => {
          setVisibleParagraphs(prev => [...prev, paragraph]);
        }, index * 1500);
        timers.push(t);
      });
      return () => timers.forEach(t => clearTimeout(t));
    } else {
        setVisibleParagraphs([]);
    }
  }, [content]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleParagraphs]);

  const isTypingFinished = content && visibleParagraphs.length === content.length;

  return (
    <div className="w-full h-full bg-[#0a0a0c] border border-white/10 shadow-2xl overflow-hidden flex flex-col rounded-3xl">
      {/* Header */}
      <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[var(--brand-error)]"></div>
          <div className="w-3 h-3 rounded-full bg-[var(--brand-secondary)]"></div>
          <div className="w-3 h-3 rounded-full bg-[var(--brand-primary)]"></div>
        </div>
        <span className="text-[10px] font-terminal font-medium text-white/60 uppercase tracking-widest flex items-center">
          <span className="w-2 h-2 rounded-full bg-[var(--brand-secondary)] mr-2 animate-pulse"></span>
          grazia_core_v2.sh
        </span>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-black/40 min-h-[300px]"
      >
        {visibleParagraphs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/20 text-center p-4">
            <span className="text-5xl mb-6 font-terminal font-medium opacity-10 tracking-tighter">{'>_'}</span>
            <p className="text-xs uppercase font-medium tracking-widest opacity-40">Awaiting system interaction...</p>
          </div>
        ) : (
          <AnimatePresence>
            {visibleParagraphs.map((para, idx) => (
              <motion.div
                key={idx + para.substring(0, 15)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TypingParagraph text={para} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
      <div className="px-6 py-3 bg-white/5 border-t border-white/10 text-[10px] font-terminal text-white/30 flex justify-between items-center font-medium">
        <span>DEV_MATCH_SYSTEM_ACTIVE</span>
        <span>{content && !isTypingFinished ? 'LOGS: STREAMING...' : 'LOGS: READY'}</span>
      </div>
    </div>
  );
};

export default TerminalComponent;
