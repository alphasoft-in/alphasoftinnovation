import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl blur-lg opacity-20"></div>
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-8 sm:p-10 backdrop-blur-sm">

              <div className="space-y-6">
                <motion.div whileHover={{ x: 10 }} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 cursor-default transition-transform">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Equipo Ágil</h4>
                    <p className="text-slate-400 mt-1">Contamos con un equipo especializado de 2 a 10 empleados listos para adaptarse a tus necesidades.</p>
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ x: 10 }} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 cursor-default transition-transform">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Enfoque B2B</h4>
                    <p className="text-slate-400 mt-1">Crecimiento empresarial mediante tecnología vanguardista.</p>
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ x: 10 }} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 cursor-default transition-transform">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Multisectorial</h4>
                    <p className="text-slate-400 mt-1">Especialistas en minería, agricultura y más industrias.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.2 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 md:mb-6 leading-tight">Sobre AlphaSoft Innovation Technology</h2>
            <p className="text-sm sm:text-base text-slate-400 mb-5 md:mb-6 leading-relaxed">
              Somos una empresa peruana privada <strong className="text-white">especialista en diseño web, desarrollo de software, ciencia de datos</strong> y consultoría tecnológica. Nuestra misión es construir un ecosistema digital donde las empresas puedan operar a su máxima capacidad.
            </p>
            <p className="text-sm sm:text-base text-slate-400 mb-6 md:mb-8 leading-relaxed">
              Contamos con amplia experiencia creando soluciones robustas para sectores altamente exigentes como la <strong className="text-white">minería, agricultura</strong> y otras industrias clave. Nuestra agilidad nos permite ofrecer soluciones personalizadas, garantizando calidad e innovación en cada línea de código.
            </p>

          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
