import { motion } from 'framer-motion';

const systems = [
  {
    id: "erp",
    name: "ERP (Planificación de Recursos Empresariales)",
    subtitle: "El corazón operativo de tu negocio",
    description: "Un ERP unifica todas las áreas de una empresa en un solo sistema: contabilidad, compras, ventas, inventario y recursos humanos. Elimina la duplicidad de datos y los silos de información, permitiendo que la información fluya en tiempo real entre todos los departamentos.",
    benefits: ["Centralización de datos", "Reducción de costos operativos", "Automatización de contabilidad", "Trazabilidad completa"],
    color: "cyan",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: "crm",
    name: "CRM (Gestión de Relaciones con el Cliente)",
    subtitle: "El motor de tus ventas y fidelización",
    description: "Un CRM almacena el historial completo de cada cliente, desde el primer contacto hasta el soporte post-venta. Permite al equipo comercial dar seguimiento a prospectos, automatizar correos y nunca perder una oportunidad de venta por falta de seguimiento.",
    benefits: ["Aumento de conversión de ventas", "Fidelización de clientes", "Historial de interacciones", "Pronósticos de ventas (Forecasting)"],
    color: "violet",
    icon: (
      <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: "bi",
    name: "BI (Inteligencia de Negocios)",
    subtitle: "El cerebro analítico para tomar decisiones",
    description: "El software de BI recolecta los datos generados por el ERP y el CRM para transformarlos en gráficos, tableros dinámicos (dashboards) y reportes automatizados. Pasa de ver 'qué pasó' a entender 'por qué pasó' y 'qué pasará'.",
    benefits: ["Decisiones basadas en datos reales", "Detección de cuellos de botella", "Dashboards interactivos en tiempo real", "Identificación de nuevas oportunidades"],
    color: "fuchsia",
    icon: (
      <svg className="w-8 h-8 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: "wms",
    name: "WMS (Gestión de Almacenes e Inventarios)",
    subtitle: "El control físico de tus activos",
    description: "Especialmente vital para empresas agrícolas, mineras o de retail. Un WMS optimiza el espacio de almacén, rastrea la entrada y salida de materiales, previene robos o mermas y garantiza que nunca te quedes sin stock crítico.",
    benefits: ["Control de stock en tiempo real", "Trazabilidad de lotes y fechas", "Optimización de espacio físico", "Reducción de pérdidas por merma"],
    color: "emerald",
    icon: (
      <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

export default function SystemsGuide() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:py-20">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-5 text-white leading-tight">
          Arquitectura <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Empresarial Digital</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed px-2 sm:px-0">
          Para que una empresa escale de forma segura, necesita cimientos tecnológicos sólidos. Conoce los sistemas clave que toda corporación moderna utiliza para liderar en su sector.
        </p>
      </motion.div>

      <div className="space-y-12">
        {systems.map((sys, index) => (
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
                   borderColor: sys.color === 'cyan' ? '#22d3ee' : sys.color === 'violet' ? '#a78bfa' : sys.color === 'fuchsia' ? '#e879f9' : '#34d399',
                   backgroundColor: 'rgba(15, 23, 42, 0.8)'
                 }}>
              {sys.icon}
            </div>
            
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{sys.name}</h2>
              <h3 className="text-[10px] md:text-xs font-bold tracking-wider uppercase mb-2 md:mb-3" 
                  style={{ color: sys.color === 'cyan' ? '#22d3ee' : sys.color === 'violet' ? '#a78bfa' : sys.color === 'fuchsia' ? '#e879f9' : '#34d399' }}>
                {sys.subtitle}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-4 md:mb-5 leading-relaxed">
                {sys.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
                {sys.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-400 text-[11px] sm:text-xs font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 text-center bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 lg:p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px]"></div>
        
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 relative z-10">¿No sabes por cuál empezar?</h3>
        <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto mb-5 relative z-10">
          Como expertos en desarrollo a medida, no solo te vendemos un software; analizamos tu flujo de trabajo y construimos exactamente el módulo que necesitas para solucionar tu cuello de botella actual, integrándolo todo a tu propio ritmo.
        </p>
        <a 
          href="/contacto"
          className="inline-block px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-colors relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
        >
          Solicita una Consultoría Gratuita
        </a>
      </motion.div>

    </div>
  );
}
