import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6">Ponte en <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Contacto</span></h2>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed px-2 sm:px-0">
              ¿Listo para transformar tu empresa con tecnología de primer nivel? Hablemos de tu próximo proyecto.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Información de Contacto */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 relative"
          >
            {/* Ambient glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-xl opacity-30 -z-10 rounded-2xl"></div>
            
            <h3 className="text-lg md:text-2xl font-bold text-white mb-6 md:mb-8 text-center sm:text-left">Nuestros Datos</h3>
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold text-white">Llámanos</h4>
                  <a href="tel:959464155" className="text-xs sm:text-sm md:text-base text-slate-400 hover:text-cyan-400 transition-colors mt-1 block">959 464 155</a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20 flex-shrink-0">
                  <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold text-white">Correos</h4>
                  <a href="mailto:hola@alphasoftinnovation.com" className="text-[11px] sm:text-xs md:text-base text-slate-400 hover:text-violet-400 transition-colors mt-1 block break-all">hola@alphasoftinnovation.com</a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 flex-shrink-0">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold text-white">Empresa</h4>
                  <p className="text-xs sm:text-sm md:text-base text-slate-400 mt-1">Alphasoft Innovation</p>
                  <p className="text-xs sm:text-sm md:text-base text-slate-400">RUC: 20612026387</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold text-white">Ubicación</h4>
                  <p className="text-xs sm:text-sm md:text-base text-slate-400 mt-1">Lima, Perú</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario de Contacto */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <form className="space-y-5 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-xs md:text-sm font-medium text-slate-300 mb-2">Nombre o Empresa</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder:text-slate-600"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs md:text-sm font-medium text-slate-300 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors placeholder:text-slate-600"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs md:text-sm font-medium text-slate-300 mb-2">Mensaje</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none placeholder:text-slate-600"
                  placeholder="Cuéntanos sobre tu proyecto..."
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold py-3 md:py-4 px-4 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer text-sm md:text-base"
              >
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
