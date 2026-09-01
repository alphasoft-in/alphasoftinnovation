import { motion } from 'framer-motion';

const aboutSections = [
  {
    id: "quienes-somos",
    name: "Quiénes Somos",
    subtitle: "Especialistas en Tecnología B2B",
    description: "Somos una empresa peruana privada especialista en diseño web, desarrollo de software, ciencia de datos y consultoría tecnológica. Nuestra agilidad nos permite ofrecer soluciones personalizadas, garantizando calidad e innovación en cada línea de código.",
    benefits: ["Equipo de 2 a 10 expertos", "Metodologías ágiles", "Enfoque 100% corporativo", "Desarrollo local (Perú)"],
    color: "cyan",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: "mision",
    name: "Nuestra Misión",
    subtitle: "Impulsando el Ecosistema Digital",
    description: "Nuestra misión es construir un ecosistema digital donde las empresas puedan operar a su máxima capacidad. Optimizamos el rendimiento de tu empresa con software a medida y transformamos ideas en soluciones escalables.",
    benefits: ["Escalabilidad absoluta", "Transformación Digital", "Eficiencia Operativa", "Seguridad de Datos"],
    color: "violet",
    icon: (
      <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: "experiencia",
    name: "Experiencia Multisectorial",
    subtitle: "Soluciones para industrias clave",
    description: "Contamos con amplia experiencia creando soluciones robustas para sectores altamente exigentes como la minería, agricultura y otras industrias clave que requieren sistemas precisos y eficientes.",
    benefits: ["Minería", "Agricultura", "Comercio B2B", "Servicios Empresariales"],
    color: "blue",
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
];

// Helper to get hex colors
const getColorHex = (color) => {
  const map = {
    'cyan': '#22d3ee',
    'violet': '#a78bfa',
    'fuchsia': '#e879f9',
    'emerald': '#34d399',
    'pink': '#f472b6',
    'blue': '#60a5fa'
  };
  return map[color] || '#22d3ee';
};

export default function About() {
  return (
    <section className="pt-12 pb-6 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-5">
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-400 uppercase">
              AlphaSoft Innovation
            </span>
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-cyan-400 to-violet-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white leading-tight">
            Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Identidad</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed px-2 sm:px-0">
            Conoce el núcleo operativo, la visión y la experiencia que respaldan cada proyecto tecnológico que desarrollamos.
          </p>
        </motion.div>
        
        <div className="space-y-6 lg:space-y-8">
          {aboutSections.map((section, index) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors`}
            >
              <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center border shadow-lg`} 
                   style={{ 
                     borderColor: getColorHex(section.color),
                     backgroundColor: 'rgba(15, 23, 42, 0.8)'
                   }}>
                {section.icon}
              </div>
              
              <div className="flex-1 text-center sm:text-left flex flex-col items-center sm:items-start lg:block">
                <h2 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{section.name}</h2>
                <h3 className="text-[10px] md:text-xs font-bold tracking-wider uppercase mb-2 md:mb-3" 
                    style={{ color: getColorHex(section.color) }}>
                  {section.subtitle}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mb-4 md:mb-5 leading-relaxed">
                  {section.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-2 md:gap-3 w-full">
                  {section.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center justify-center sm:justify-start gap-2">
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-400 text-[11px] sm:text-xs font-medium text-left">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
