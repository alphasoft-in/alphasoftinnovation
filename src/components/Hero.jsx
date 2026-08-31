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
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm mb-6 md:mb-8">
            <motion.span 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-2 w-2 rounded-full bg-cyan-400"
            />
            <span className="text-xs md:text-sm font-medium text-slate-300">Soluciones Tecnológicas en Perú</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-tight md:leading-tight">
            El puente entre la <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">creatividad y la tecnología</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-2xl text-base md:text-xl text-slate-400 mx-auto mb-10 px-2 sm:px-0 leading-relaxed">
            Optimizamos el rendimiento de tu empresa con software a medida. Transformamos ideas en soluciones escalables.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/servicios" 
              className="w-[260px] sm:w-auto px-8 py-3.5 bg-white text-slate-950 font-semibold rounded-full hover:bg-slate-200 transition-colors duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer text-sm md:text-base"
            >
              Nuestros Servicios
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="/contacto" 
              className="w-[260px] sm:w-auto px-8 py-3.5 bg-transparent border border-slate-700 text-white font-medium rounded-full transition-colors duration-200 cursor-pointer text-sm md:text-base"
            >
              Hablemos de tu proyecto
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Mockup / Dashboard Preview abstract */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <motion.div variants={floatVariants} animate="animate">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 top-1/2"></div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-2 shadow-2xl relative">
              
              {/* Animated glowing border behind */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 rounded-xl opacity-20 blur-sm -z-10"
              />
              
              <div className="rounded-lg overflow-hidden border border-slate-800/50 bg-slate-950 flex flex-col h-[400px]">
                {/* Window Header */}
                <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                {/* Fake UI Content */}
                <div className="p-8 flex-1 flex flex-col gap-6 opacity-60">
                  <div className="flex gap-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="h-24 w-1/3 bg-slate-800 rounded-lg"></motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="h-24 w-1/3 bg-slate-800 rounded-lg"></motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} className="h-24 w-1/3 bg-slate-800 rounded-lg"></motion.div>
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
