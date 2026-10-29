import { motion } from 'framer-motion';

const services = [
  {
    id: "web",
    name: "Diseño y Desarrollo Web",
    subtitle: "Tu escaparate digital 24/7",
    description: "Creación de páginas web modernas, atractivas y altamente funcionales para potenciar tu presencia digital. Optimizadas para velocidad y conversión.",
    benefits: ["Diseño responsivo", "Optimización SEO", "Alta velocidad de carga", "Experiencia de usuario (UX)"],
    color: "amber",
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    id: "medida",
    name: "Sistemas a Medida",
    subtitle: "Soluciones exclusivas para tu negocio",
    description: "Diseño y creación de aplicaciones o sistemas web adaptados a las solicitudes específicas de cada negocio. Lo que necesites, lo construimos.",
    benefits: ["Escalabilidad absoluta", "Licencia corporativa dedicada", "Sin cobros por usuario", "Alineado a tus procesos"],
    color: "orange",
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    color: "red",
    icon: (
      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    color: "amber",
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    color: "orange",
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    color: "red",
    icon: (
      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

// Helper to get hex colors
const getColorHex = (color) => {
  const map = {
    'amber': '#fbbf24',
    'orange': '#fb923c',
    'red': '#f87171',
    'emerald': '#34d399'
  };
  return map[color] || '#fb923c';
};

export default function Services() {
  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-slate-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-6 md:mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
              Nuestros Servicios
            </span>
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-amber-400 to-red-500 rounded-full"></div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2.5 text-white leading-tight">
            Catálogo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">Soluciones</span>
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed px-2 sm:px-0">
            Descubre cómo podemos potenciar tu negocio con nuestra gama de servicios especializados en tecnología y desarrollo de software.
          </p>
        </motion.div>
        
        <div className="space-y-4 lg:space-y-5">
          {services.map((sys, index) => (
            <motion.div 
              key={sys.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-5 items-center bg-slate-900/40 border border-slate-800 rounded-2xl p-4 sm:p-5 hover:bg-slate-900/60 hover:border-orange-500/30 transition-colors`}
            >
              <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border shadow-lg`} 
                   style={{ 
                     borderColor: getColorHex(sys.color),
                     backgroundColor: 'rgba(15, 23, 42, 0.8)'
                   }}>
                {sys.icon}
              </div>
              
              <div className="flex-1 text-center sm:text-left flex flex-col items-center sm:items-start lg:block">
                <h2 className="text-sm sm:text-base font-bold text-white mb-0.5">{sys.name}</h2>
                <h3 className="text-[10px] font-bold tracking-wider uppercase mb-1.5" 
                    style={{ color: getColorHex(sys.color) }}>
                  {sys.subtitle}
                </h3>
                <p className="text-slate-300 text-xs mb-3 leading-relaxed">
                  {sys.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-1.5 md:gap-2 w-full mb-3.5">
                  {sys.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center justify-center sm:justify-start gap-2">
                      <svg className="w-3.5 h-3.5 text-orange-500/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-400 text-[11px] font-medium text-left">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2.5 border-t border-slate-800/80 w-full">
                  <a
                    href={`https://wa.me/51959464155?text=${encodeURIComponent(`Hola AlphaSoft, deseo información y cotización sobre el servicio de ${sys.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Consultar por WhatsApp
                  </a>
                  <a
                    href="/contacto"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-orange-500/20 border border-slate-700 hover:border-orange-500/40 text-slate-300 hover:text-orange-300 text-[11px] font-medium transition-all cursor-pointer"
                  >
                    Cotizar por Formulario
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
