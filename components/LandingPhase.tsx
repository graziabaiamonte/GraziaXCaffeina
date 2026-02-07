
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LandingPhaseProps {
  onStart: () => void;
}

const LandingPhase: React.FC<LandingPhaseProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-6 relative z-10 select-none bg-transparent pointer-events-none"
    >

      {/* testo main */}
      <div className="relative flex flex-col items-center justify-center h-full max-w-full md:max-w-6xl">
        <div className="mb-2 md:mb-4 font-terminal text-xl md:text-3xl lg:text-3xl font-bold flex items-center justify-center space-x-2 md:space-x-3 text-white">
          <span >{ '{' }</span>
          <span>DevMatch</span>
          <span >{ '}' }</span>
        </div>

        <div className=" px-2">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className=" font-black mb-3 md:mb-4 leading-[0.9] md:leading-[0.85] tracking-tighter text-white uppercase flex flex-col "
          >
           <span className='text-3xl  lg:text-3xl'>Swipe</span>
           <span className='text-5xl  lg:text-5xl'>Match</span>
           <span className='text-8xl  lg:text-8xl -mt-2'>Hire</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[14px] sm:text-xs md:text-sm lg:text-base font-medium mb-6 md:mb-8  tracking-[0.1em]  sm:max-w-md md:max-w-2xl mx-auto text-white"
          >
           Sappiamo che là fuori è pieno di profili ritoccati e promesse infrante. Su DevMatch non cerchiamo solo qualcuno che scriva codice, ma qualcuno che condivida i vostri stessi valori. Senza filtri, solo puro match.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-5 py-3 md:px-10 md:py-5 bg-white text-[var(--bg-base)] rounded-full font-bold text-base md:text-xl uppercase tracking-[0.05em] md:tracking-[0.1em] shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center space-x-3 md:space-x-4 mx-auto pointer-events-auto"
          >
            <span>Inizia a fare swipe</span>
            <div className="w-5 h-5 md:w-7 md:h-7 bg-[var(--bg-base)] rounded-full flex items-center justify-center">
               <Heart fill="white" size={12} className="md:w-4 md:h-4" stroke="none" />
            </div>
          </motion.button>
        </div>
      </div>
      

      {/* TODO scegli la frase migliore */}
      {/* <div className="absolute bottom-6 md:bottom-10 text-[8px] md:text-[10px] text-white opacity-40 uppercase tracking-[0.3em] md:tracking-[0.6em] font-medium pointer-events-none z-10 text-center w-full px-4">
        Collisioni fisiche attive <span className="hidden sm:inline">•</span> <br className="sm:hidden" /> Interagisci con le forme
      </div> */}

      <div className="absolute bottom-6 md:bottom-10 text-[8px] md:text-[10px] text-white opacity-40 uppercase tracking-[0.3em] md:tracking-[0.6em] font-medium pointer-events-none z-10 text-center w-full px-4">
        Rompiamo il ghiaccio? <span className="hidden sm:inline">•</span> <br className="sm:hidden" />Trascina le forme dove vuoi, prometto di non crashare
      </div>
    </motion.div>
  );
};

export default LandingPhase;
