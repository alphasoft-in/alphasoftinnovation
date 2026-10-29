import { motion } from 'framer-motion';

const metrics = [
  { value: "+99.9%", label: "Disponibilidad Cloud", detail: "Arquitectura de alta disponibilidad" },
  { value: "-35%", label: "Costos Operativos", detail: "Ahorro promedio por automatización" },
  { value: "100%", label: "A Medida", detail: "Licencia corporativa adaptada a tu flujo" },
  { value: "SUNAT", label: "Integración Nativa", detail: "Facturación y Guías Electrónicas OSE" }
];

const industries = [
  {
    name: "Minería y Construcción",
    subtitle: "Operaciones críticas en campo",
    description: "Control de maquinaria pesada, partes diarios de equipos, valorizaciones de obra, gestión de almacenes en campamento y control de seguridad (SSOMA).",
    tags: ["Control de Flota", "Almacenes en Obra", "Valorizaciones"],
    color: "amber",
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    name: "Agroindustria y Exportación",
    subtitle: "Trazabilidad desde el campo",
    description: "Seguimiento de lotes de cosecha, control de costos por hectárea, gestión de tareo de personal en campo, control de mermas y logística de frío.",
    tags: ["Trazabilidad de Lotes", "Tareo Móvil", "Costos Agrícolas"],
    color: "orange",
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    name: "Comercio B2B y Distribución",
    subtitle: "Velocidad comercial y stock real",
    description: "Sincronización de inventarios multi-sucursal, portales de pedidos mayoristas, rutas de despacho y facturación electrónica conectada a SUNAT.",
    tags: ["Multi-Almacén", "Facturación SUNAT", "Portal Mayorista"],
    color: "red",
    icon: (
      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    name: "Servicios Corporativos",
    subtitle: "Gestión de proyectos y clientes",
    description: "Automatización de cotizaciones, seguimiento comercial CRM, control de horas hombre, contratos recurrentes y tableros gerenciales de rentabilidad.",
    tags: ["CRM B2B", "Rentabilidad", "Automatización"],
    color: "amber",
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

const steps = [
  {
    step: "01",
    title: "Diagnóstico y Arquitectura",
    description: "Analizamos a fondo tu operación actual, identificamos cuellos de botella y diseñamos la arquitectura técnica exacta que tu empresa necesita."
  },
  {
    step: "02",
    title: "Prototipado UX/UI Interactivo",
    description: "Antes de programar, visualizas y apruebas cómo lucirá y funcionará cada pantalla del sistema para garantizar que sea intuitivo para tu equipo."
  },
  {
    step: "03",
    title: "Desarrollo Ágil (Sprints)",
    description: "Construimos tu software con entregas funcionales cada 2 semanas. Puedes ver el avance real y probar módulos en un entorno seguro."
  },
  {
    step: "04",
    title: "Despliegue, Capacitación y Soporte",
    description: "Ponemos el sistema en producción en la nube, capacitamos a tu personal y te acompañamos con soporte técnico continuo."
  }
];

export default function MethodologyAndIndustries() {
  return (
    <div className="bg-slate-950 relative overflow-hidden">
      
      {/* Impact Metrics Strip */}
      <section className="py-8 md:py-10 border-y border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
            {metrics.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 hover:border-orange-500/30 transition-colors"
              >
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-1">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mb-0.5">{item.label}</div>
                <div className="text-[10px] sm:text-xs text-slate-400">{item.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
              Especialización Sectorial
            </span>
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-amber-400 to-red-500 rounded-full"></div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
            Soluciones diseñadas para <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">industrias exigentes</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed px-2 sm:px-0">
            Entendemos que cada sector opera con reglas distintas. Adaptamos la tecnología a la realidad operativa de tu rubro en el Perú.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 hover:border-orange-500/40 rounded-2xl p-5 sm:p-6 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    {ind.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">{ind.name}</h3>
                    <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-wider">
                      {ind.subtitle}
                    </span>
                  </div>
                </div>
                <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed mb-4">
                  {ind.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/70">
                {ind.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-slate-950 text-orange-300/90 border border-orange-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-12 lg:py-16 bg-slate-900/30 border-t border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-[2px] w-6 md:w-10 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
                Cómo Trabajamos
              </span>
              <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-amber-400 to-red-500 rounded-full"></div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              Metodología transparente, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">sin sorpresas</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed px-2 sm:px-0">
              Un proceso estructurado en 4 etapas para garantizar entregas puntuales, calidad de código y retorno de inversión desde el primer mes.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-950 border border-slate-800 hover:border-orange-500/40 rounded-2xl p-5 relative group transition-colors"
              >
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mb-2">
                  {item.step}
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

