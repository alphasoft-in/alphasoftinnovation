import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-2xl rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
            
            <div className="flex-1 text-slate-300 text-sm leading-relaxed">
              <h4 className="text-white font-semibold mb-1 text-base flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Privacidad y Cookies
              </h4>
              <p>
                Utilizamos cookies propias y de terceros para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Al hacer clic en "Aceptar", usted consiente el uso de todas las cookies. Puede obtener más información leyendo nuestra <a href="/privacidad" className="text-cyan-400 hover:underline">Política de Privacidad</a>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={declineCookies}
                className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Rechazar
              </button>
              <button 
                onClick={acceptCookies}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
              >
                Aceptar Cookies
              </button>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
