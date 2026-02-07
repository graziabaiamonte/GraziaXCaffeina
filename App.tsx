
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPhase from './components/LandingPhase';
import MatchPhase from './components/MatchPhase';
import GraziaDetail from './components/GraziaDetail';
import PhysicsBackground from './components/PhysicsBackground';
import { AppPhase } from './types';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.LANDING);

  return (
    <div className="relative min-h-screen selection:bg-[var(--brand-primary)] selection:text-[var(--bg-base)]">
      {/* Background globale con simulazione fisica */}
      <PhysicsBackground phase={phase} />

      {/* 
          Glass Layer Globale: 
          Si attiva in tutte le fasi tranne la LANDING. 
          Sfondo opacizzato reso quasi solido (/95) per un contrasto estremo e focus sui contenuti.
      */}
      <motion.div 
        initial={false}
        animate={{ 
          opacity: phase === AppPhase.LANDING ? 0 : 1,
          backdropFilter: phase === AppPhase.LANDING ? 'blur(0px)' : 'blur(20px)'
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="fixed inset-0 z-5 pointer-events-none bg-black/30"
      />

      {/* 
          Contenuto dinamico sopra lo sfondo:
          - In LANDING: pointer-events-none per permettere di interagire con le forme sotto.
          - In MATCHING/DETAIL: pointer-events-auto per interagire con card e terminale.
      */}
      <div className={`relative z-10 min-h-screen ${phase === AppPhase.LANDING ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        <AnimatePresence mode="wait">
          {phase === AppPhase.LANDING && (
            <LandingPhase key="landing" onStart={() => setPhase(AppPhase.MATCHING)} />
          )}
          
          {phase === AppPhase.MATCHING && (
            <MatchPhase key="matching" onLikeGrazia={() => setPhase(AppPhase.GRAZIA_DETAIL)} />
          )}

          {(phase === AppPhase.GRAZIA_DETAIL || phase === AppPhase.FINAL) && (
            <GraziaDetail 
              key="detail" 
              showFinal={phase === AppPhase.FINAL}
              onAllValuesUnlocked={() => setPhase(AppPhase.FINAL)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
