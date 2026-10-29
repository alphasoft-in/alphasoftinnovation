import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 20,
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Viewport container for text and buttons */}
        <div className="min-h-[100dvh] flex flex-col justify-center pt-24 pb-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm mb-5 md:mb-6">
            <motion.span 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-2 w-2 rounded-full bg-orange-400"
            />
            <span className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-300">Soluciones Tecnológicas en Perú</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 leading-tight md:leading-tight">
            El puente entre la <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">creatividad y la tecnología</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-xl text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mx-auto mb-8 md:mb-10 px-2 sm:px-0 leading-relaxed">
            Optimizamos el rendimiento de tu empresa con software a medida. Transformamos ideas en soluciones escalables.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/servicios" 
              className="w-[230px] sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-semibold rounded-full hover:from-amber-400 hover:to-red-500 transition-all duration-200 shadow-[0_0_25px_rgba(249,115,22,0.35)] cursor-pointer text-xs sm:text-sm md:text-base"
            >
              Nuestros Servicios
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/51959464155?text=${encodeURIComponent('Hola AlphaSoft, me gustaría conversar sobre un proyecto de software para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[230px] sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-semibold rounded-full transition-all duration-200 cursor-pointer text-xs sm:text-sm md:text-base"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Consultar por WhatsApp
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="/contacto" 
              className="w-[230px] sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 bg-transparent border border-slate-700 hover:border-orange-500/50 text-white font-medium rounded-full transition-colors duration-200 cursor-pointer text-xs sm:text-sm md:text-base"
            >
              Formulario de Contacto
            </motion.a>
          </motion.div>
        </motion.div>
        </div>
        
        {/* Mockup / Dashboard Preview abstract */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          className="relative mx-auto max-w-5xl pb-8 lg:pb-16"
        >
          <motion.div variants={floatVariants} animate="animate">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 top-1/2"></div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-2 shadow-2xl relative">
              
              {/* Animated glowing border behind */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 rounded-xl opacity-20 blur-sm -z-10"
              />
              
              <div className="rounded-lg overflow-hidden border border-slate-800/50 bg-slate-950 flex flex-col h-[250px] md:h-[400px]">
                {/* Window Header */}
                <div className="h-8 md:h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/60"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-orange-500/60"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400/60"></div>
                </div>
                {/* Fake UI Content */}
                <div className="p-4 md:p-8 flex-1 flex flex-col gap-4 md:gap-6 opacity-60">
                  <div className="flex gap-2 md:gap-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="h-16 md:h-24 w-1/3 bg-slate-800 rounded-lg"></motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="h-16 md:h-24 w-1/3 bg-slate-800 rounded-lg"></motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} className="h-16 md:h-24 w-1/3 bg-slate-800 rounded-lg"></motion.div>
                  </div>
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }} className="flex-1 bg-slate-800 rounded-lg origin-left"></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
