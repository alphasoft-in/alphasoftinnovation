import { motion } from 'framer-motion';

export default function ErpSection() {
  const benefits = [
    {
      title: "Centralización Absoluta",
      description: "Despídete de los archivos sueltos y la información fragmentada. Un ERP unifica todas las áreas de tu empresa (ventas, inventario, RRHH, finanzas) en una única plataforma accesible en tiempo real.",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Eliminación de Errores",
      description: "La automatización de procesos repetitivos reduce drásticamente el error humano. Tus operaciones serán más rápidas, seguras y requerirán menos supervisión manual.",
      icon: (
        <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Toma de Decisiones Inteligente",
      description: "Obtén reportes gerenciales en segundos. Con datos precisos y actualizados al instante, podrás identificar tendencias y tomar decisiones que impulsen la rentabilidad real de tu negocio.",
      icon: (
        <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Escalabilidad Garantizada",
      description: "A diferencia del software empaquetado, un sistema desarrollado a medida evoluciona y crece junto contigo. Si tu empresa abre nuevas sucursales, el software se adapta sin fricciones.",
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-12 lg:py-20 bg-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left Column - Sales Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase mb-2.5">
              Transformación Digital
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-5 leading-snug md:leading-tight">
              Un <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">ERP</span> es el verdadero motor de tu crecimiento
            </h3>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                En el entorno competitivo actual, operar con hojas de cálculo o sistemas desconectados no solo te hace perder tiempo, sino que <strong>te está haciendo perder dinero</strong>. 
              </p>
              <p>
                Un sistema <strong>ERP (Planificación de Recursos Empresariales)</strong> desarrollado a medida actúa como el sistema nervioso central de tu empresa. Conecta tu inventario con tus ventas, automatiza tu contabilidad y te brinda visibilidad total sobre qué está sucediendo en tu negocio.
              </p>
              <p className="border-l-0 lg:border-l-4 border-orange-500 lg:pl-4 italic text-[11px] sm:text-xs text-slate-400">
                "Las empresas que digitalizan y automatizan sus procesos operativos logran reducir costos hasta en un 30% y multiplicar su capacidad productiva."
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
              <a 
                href={`https://wa.me/51959464155?text=${encodeURIComponent('Hola AlphaSoft, quiero información sobre un sistema ERP a medida para mi empresa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all shadow-lg shadow-emerald-600/25 cursor-pointer text-xs sm:text-sm"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Consultar ERP por WhatsApp
              </a>
              <a 
                href="/contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-bold rounded-full hover:from-amber-400 hover:to-red-500 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] cursor-pointer text-xs sm:text-sm"
              >
                Inicia tu Digitalización
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            className="grid sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl hover:border-orange-500/40 hover:bg-slate-800/50 transition-colors text-center sm:text-left flex flex-col items-center sm:items-start"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 mb-3 shadow-inner">
                  {benefit.icon}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">{benefit.title}</h4>
                <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
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
