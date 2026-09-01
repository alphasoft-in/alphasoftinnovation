import { motion } from 'framer-motion';

const services = [
  {
    id: "web",
    name: "Diseño y Desarrollo Web",
    subtitle: "Tu escaparate digital 24/7",
    description: "Creación de páginas web modernas, atractivas y altamente funcionales para potenciar tu presencia digital. Optimizadas para velocidad y conversión.",
    benefits: ["Diseño responsivo", "Optimización SEO", "Alta velocidad de carga", "Experiencia de usuario (UX)"],
    color: "cyan",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    id: "medida",
    name: "Sistemas a Medida",
    subtitle: "Soluciones exclusivas para tu negocio",
    description: "Diseño y creación de aplicaciones o sistemas web adaptados a las solicitudes específicas de cada negocio. Lo que necesites, lo construimos.",
    benefits: ["Escalabilidad absoluta", "Sin licencias mensuales", "Propiedad del código fuente", "Alineado a tus procesos"],
    color: "violet",
    icon: (
      <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: "automatizacion",
    name: "Automatización de Procesos",
    subtitle: "Eficiencia y productividad",
    description: "Implementación de herramientas de software para agilizar tareas repetitivas y elevar los índices de productividad, reduciendo errores humanos.",
    benefits: ["Menos tareas manuales", "Reducción de errores", "Ahorro de horas hombre", "Flujos de trabajo continuos"],
    color: "emerald",
    icon: (
      <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  },
  {
    id: "datos",
    name: "Ciencia y Análisis de Datos",
    subtitle: "Toma decisiones con inteligencia",
    description: "Extracción, modelado y transformación de datos usando algoritmos avanzados e Inteligencia Artificial para predecir tendencias y facilitar la toma de decisiones estratégicas.",
    benefits: ["Análisis predictivo", "Dashboards interactivos", "Minería de datos", "Reportes automatizados"],
    color: "fuchsia",
    icon: (
      <svg className="w-8 h-8 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: "integracion",
    name: "Integración de Sistemas",
    subtitle: "Conectando todas tus plataformas",
    description: "Sincronización y conexión de las plataformas existentes en los negocios para mejorar su eficiencia operativa, permitiendo que hablen entre sí.",
    benefits: ["APIs personalizadas", "Centralización de información", "Conexión con ERP/CRM", "Sincronización en tiempo real"],
    color: "cyan",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  },
  {
    id: "soporte",
    name: "Soporte y Mantenimiento Técnico",
    subtitle: "Operatividad garantizada",
    description: "Servicios continuos para asegurar que los desarrollos e infraestructuras de software operen al 100% de su capacidad. Tu tranquilidad, nuestra prioridad.",
    benefits: ["Monitoreo preventivo", "Resolución de incidencias", "Actualizaciones de seguridad", "Copias de respaldo (Backups)"],
    color: "violet",
    icon: (
      <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

export default function Services() {
  return (
    <section className="pt-12 pb-6 sm:py-24 bg-slate-900/50 overflow-hidden">
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
              Nuestros Servicios
            </span>
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-cyan-400 to-violet-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white leading-tight">
            Catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Soluciones</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed px-2 sm:px-0">
            Descubre cómo podemos potenciar tu negocio con nuestra gama de servicios especializados en tecnología y desarrollo de software.
          </p>
        </motion.div>
        
        <div className="space-y-12">
          {services.map((sys, index) => (
            <motion.div 
              key={sys.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors`}
            >
              <div className={`w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center border shadow-lg`} 
                   style={{ 
                     borderColor: getColorHex(sys.color),
                     backgroundColor: 'rgba(15, 23, 42, 0.8)'
                   }}>
                {sys.icon}
              </div>
              
              <div className="flex-1 text-center sm:text-left flex flex-col items-center sm:items-start lg:block">
                <h2 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{sys.name}</h2>
                <h3 className="text-[10px] md:text-xs font-bold tracking-wider uppercase mb-2 md:mb-3" 
                    style={{ color: getColorHex(sys.color) }}>
                  {sys.subtitle}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mb-4 md:mb-5 leading-relaxed">
                  {sys.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-2 md:gap-3 w-full">
                  {sys.benefits.map((benefit, i) => (
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
