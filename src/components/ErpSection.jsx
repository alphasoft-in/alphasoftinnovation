import { motion } from 'framer-motion';

export default function ErpSection() {
  const benefits = [
    {
      title: "Centralización Absoluta",
      description: "Despídete de los archivos sueltos y la información fragmentada. Un ERP unifica todas las áreas de tu empresa (ventas, inventario, RRHH, finanzas) en una única plataforma accesible en tiempo real.",
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Eliminación de Errores",
      description: "La automatización de procesos repetitivos reduce drásticamente el error humano. Tus operaciones serán más rápidas, seguras y requerirán menos supervisión manual.",
      icon: (
        <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Toma de Decisiones Inteligente",
      description: "Obtén reportes gerenciales en segundos. Con datos precisos y actualizados al instante, podrás identificar tendencias y tomar decisiones que impulsen la rentabilidad real de tu negocio.",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Escalabilidad Garantizada",
      description: "A diferencia del software empaquetado, un sistema desarrollado a medida evoluciona y crece junto contigo. Si tu empresa abre nuevas sucursales, el software se adapta sin fricciones.",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="pt-12 pb-20 lg:pt-24 lg:pb-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Sales Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
              Transformación Digital
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 md:mb-6 leading-snug md:leading-tight">
              Un <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">ERP</span> es el verdadero motor de tu crecimiento
            </h3>
            
            <div className="space-y-4 md:space-y-5 text-sm md:text-base text-slate-300 leading-relaxed">
              <p>
                En el entorno competitivo actual, operar con hojas de cálculo o sistemas desconectados no solo te hace perder tiempo, sino que <strong>te está haciendo perder dinero</strong>. 
              </p>
              <p>
                Un sistema <strong>ERP (Planificación de Recursos Empresariales)</strong> desarrollado a medida actúa como el sistema nervioso central de tu empresa. Conecta tu inventario con tus ventas, automatiza tu contabilidad y te brinda visibilidad total sobre qué está sucediendo en tu negocio.
              </p>
              <p className="border-l-0 lg:border-l-4 border-violet-500 lg:pl-5 italic text-xs md:text-sm text-slate-400">
                "Las empresas que digitalizan y automatizan sus procesos operativos logran reducir costos hasta en un 30% y multiplicar su capacidad productiva."
              </p>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <a 
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer text-sm"
              >
                Inicia tu Digitalización
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 hover:bg-slate-800/50 transition-colors text-center sm:text-left flex flex-col items-center sm:items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 mb-4 shadow-inner">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
