
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Building2 } from 'lucide-react';

const FinalCelebration: React.FC = () => {
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const colorPrimary = styles.getPropertyValue('--brand-primary').trim();
    const colorText = styles.getPropertyValue('--bg-base').trim(); // Use dark purple for confetti too if desired
    const colorSecondary = styles.getPropertyValue('--brand-secondary').trim();
    const colorAccent = styles.getPropertyValue('--brand-accent').trim();

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: [colorPrimary, colorText, colorSecondary, colorAccent]
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: [colorPrimary, colorText, colorSecondary, colorAccent]
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleContact = () => {
    window.location.href = "mailto:grazia.prova@gmail.com?subject=It's a Match! - Offerta di Lavoro&body=Ciao Grazia, abbiamo visto il tuo profilo su DevMatch e pensiamo che tu sia la risorsa perfetta per la nostra agenzia!";
  };

  return (
    <div className="relative w-full py-12">
      <div className="relative w-full bg-white border border-[var(--bg-base)] border-opacity-10 rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-16 text-center">
        <div className="relative z-10">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black mb-4 italic tracking-tighter text-[var(--bg-base)] uppercase"
          >
            IT'S A <span className="text-[var(--brand-primary)]">PERFECT</span> MATCH!
          </motion.h1>

          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-3xl font-bold mb-10 text-[var(--bg-base)] opacity-80"
          >
            Grazia + La Tua Agenzia
          </motion.p>

          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="flex items-center justify-center mb-12"
          >
            <div className="relative flex items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[var(--brand-primary)] overflow-hidden z-20 bg-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&h=800&auto=format&fit=crop" 
                  alt="Grazia B."
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute left-1/2 -translate-x-1/2 z-30 bg-[var(--bg-base)] rounded-full p-2 shadow-lg"
              >
                <div className="bg-[var(--brand-primary)] rounded-full p-2">
                  <Sparkles size={24} className="text-white fill-white" />
                </div>
              </motion.div>

              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[var(--bg-base)] border-opacity-10 overflow-hidden -ml-6 z-10 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center shadow-2xl">
                <Building2 size={48} className="text-[var(--bg-base)] opacity-20" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <button
              onClick={handleContact}
              className="group relative flex items-center space-x-3 px-12 py-6 bg-[var(--bg-base)] text-white rounded-full font-bold text-xl md:text-2xl hover:brightness-125 transition-all shadow-xl"
              aria-label="Invia email a Grazia"
            >
              <Mail size={28} />
              <span>Fissiamo un Colloquio?</span>
              <Sparkles size={20} className="absolute -top-3 -right-3 text-[var(--brand-secondary)] animate-bounce" />
            </button>
            
            <div className="flex flex-col gap-1">
              <p className="text-[var(--bg-base)] opacity-70 font-bold uppercase tracking-widest text-sm">Contatto: <span className="text-[var(--brand-primary)]">grazia.prova@gmail.com</span></p>
              <p className="text-xs text-[var(--bg-base)] opacity-40 uppercase tracking-[0.4em] font-terminal font-bold">SYSTEM STABLE | READY FOR ONBOARDING</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FinalCelebration;
