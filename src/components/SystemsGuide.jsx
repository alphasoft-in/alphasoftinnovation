import { useState } from 'react';
import { motion } from 'framer-motion';

const systems = [
  {
    id: "erp",
    name: "ERP (Planificación de Recursos Empresariales)",
    subtitle: "El corazón operativo de tu negocio",
    description: "Un ERP unifica todas las áreas de una empresa en un solo sistema: contabilidad, compras, ventas, inventario y recursos humanos. Elimina la duplicidad de datos y los silos de información, permitiendo que la información fluya en tiempo real entre todos los departamentos.",
    benefits: ["Centralización de datos", "Reducción de costos operativos", "Automatización de contabilidad", "Trazabilidad completa"],
    color: "amber",
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    color: "orange",
    icon: (
      <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    color: "red",
    icon: (
      <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    color: "amber",
    icon: (
      <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  }
];

const quizQuestions = [
  {
    stepTitle: "Cuello de Botella",
    question: "¿Cuál es hoy el mayor dolor operativo en tu empresa?",
    options: [
      {
        title: "Desorden entre áreas y Excel",
        subtitle: "Ventas, compras, tesorería y facturación desconectadas",
        target: "erp",
        tag: "Operaciones & Finanzas",
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      },
      {
        title: "Fuga de ventas y cotizaciones",
        subtitle: "Prospectos sin seguimiento comercial ni historial claro",
        target: "crm",
        tag: "Comercial & Clientes",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      },
      {
        title: "Descuadres de stock y almacén",
        subtitle: "Mermas, quiebres de inventario o falta de trazabilidad por lote",
        target: "wms",
        tag: "Logística & Almacenes",
        icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      },
      {
        title: "Ceguera en reportes gerenciales",
        subtitle: "Datos dispersos que impiden ver la rentabilidad real en vivo",
        target: "bi",
        tag: "Directorio & Analítica",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      }
    ]
  },
  {
    stepTitle: "Escala Operativa",
    question: "¿Cómo opera tu equipo en el día a día?",
    options: [
      {
        title: "Múltiples áreas o sucursales",
        subtitle: "Necesitamos que administración, caja y operaciones trabajen en línea",
        target: "erp",
        tag: "Multisede / Corporativo",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      },
      {
        title: "Fuerza de ventas activa",
        subtitle: "Ejecutivos enviando propuestas y atendiendo leads por WhatsApp/correo",
        target: "crm",
        tag: "Equipo Comercial",
        icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      },
      {
        title: "Alto flujo de mercadería o insumos",
        subtitle: "Despachos diarios, recepción de proveedores, obra o planta",
        target: "wms",
        tag: "Cadena de Suministro",
        icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      },
      {
        title: "Gerencia enfocada en KPIs",
        subtitle: "Requerimos consolidar indicadores financieros y operativos al instante",
        target: "bi",
        tag: "Toma de Decisiones",
        icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
      }
    ]
  },
  {
    stepTitle: "Resultado Urgente",
    question: "¿Qué meta quieres lograr en los próximos 60 días?",
    options: [
      {
        title: "Automatizar Facturación SUNAT y Finanzas",
        subtitle: "Emitir comprobantes y controlar cuentas por cobrar/pagar en 1 clic",
        target: "erp",
        tag: "Impacto Financiero",
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      },
      {
        title: "Duplicar la velocidad de cotización",
        subtitle: "Tener embudo comercial claro, alertas automáticas y cierres medibles",
        target: "crm",
        tag: "Impacto en Ventas",
        icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      },
      {
        title: "Exactitud del 99% en Inventarios",
        subtitle: "Kardex valorizado, control de lotes y Guías de Remisión Electrónicas",
        target: "wms",
        tag: "Impacto Logístico",
        icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
      },
      {
        title: "Tablero Ejecutivo Automatizado",
        subtitle: "Ver utilidad neta por sede, vendedor o línea de negocio en tiempo real",
        target: "bi",
        tag: "Impacto Estratégico",
        icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      }
    ]
  }
];

const recommendations = {
  erp: {
    code: "ERP CORE + SUNAT",
    title: "Sistema ERP a Medida con Facturación SUNAT",
    desc: "Tu prioridad es centralizar tus operaciones (ventas, compras, tesorería y facturación electrónica) en una sola plataforma para eliminar el doble trabajo y tener control financiero total.",
    badge: "Arquitectura Recomendada: ERP Core",
    mvpTime: "4 a 6 semanas (Fase 1)",
    deliverables: [
      "Módulo de Ventas, Compras, Caja y Bancos",
      "Conexión directa SUNAT / OSE (Facturas, Boletas, SIRE)",
      "Roles de usuario y auditoría de movimientos"
    ]
  },
  crm: {
    code: "CRM COMERCIAL B2B",
    title: "CRM Corporativo & Cotizador Inteligente",
    desc: "Tu prioridad es estructurar tu embudo comercial, centralizar cotizaciones en PDF, automatizar alertas de seguimiento y aumentar tu tasa de cierre de ventas.",
    badge: "Arquitectura Recomendada: CRM Comercial",
    mvpTime: "3 a 5 semanas (Fase 1)",
    deliverables: [
      "Pipeline visual de oportunidades y clientes",
      "Generador de cotizaciones formales en 1 clic",
      "Recordatorios automáticos y métricas por vendedor"
    ]
  },
  wms: {
    code: "WMS KARDEX & LOGÍSTICA",
    title: "Sistema WMS de Almacenes e Inventarios",
    desc: "Tu prioridad es controlar ingresos, salidas, lotes, kardex valorizado y guías de remisión electrónicas para frenar mermas y quiebres de stock.",
    badge: "Arquitectura Recomendada: WMS Logístico",
    mvpTime: "4 a 6 semanas (Fase 1)",
    deliverables: [
      "Control multialmacén, lotes y alertas de stock mínimo",
      "Kardex físico y valorizado en tiempo real",
      "Emisión de Guías de Remisión Electrónicas (GRE)"
    ]
  },
  bi: {
    code: "BI & ANALÍTICA EJECUTIVA",
    title: "Suite de Business Intelligence & Dashboards",
    desc: "Tu prioridad es conectar tus bases de datos actuales para visualizar márgenes de ganancia, costos por centro de negocio y proyecciones en tiempo real.",
    badge: "Arquitectura Recomendada: BI Ejecutivo",
    mvpTime: "2 a 4 semanas (Fase 1)",
    deliverables: [
      "Dashboards gerenciales de rentabilidad y flujo de caja",
      "Conexión automática con tus sistemas o bases de datos",
      "Reportes descargables y alertas de desviación"
    ]
  }
};

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

export default function SystemsGuide() {
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  const handleOptionSelect = (option) => {
    const updated = [...selectedAnswers, option];
    if (quizStep < quizQuestions.length - 1) {
      setSelectedAnswers(updated);
      setQuizStep(quizStep + 1);
    } else {
      // Calculate dominant target across the 3 answers
      const counts = updated.reduce((acc, item) => {
        acc[item.target] = (acc[item.target] || 0) + 1;
        return acc;
      }, {});
      const sortedTargets = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      const primaryKey = sortedTargets[0] || updated[0].target;
      const secondaryKey = sortedTargets[1] && sortedTargets[1] !== primaryKey ? sortedTargets[1] : null;

      setSelectedAnswers(updated);
      setQuizResult({
        ...recommendations[primaryKey],
        secondaryModule: secondaryKey ? recommendations[secondaryKey].code : null,
        userChoices: updated.map((u) => u.title)
      });
    }
  };

  const handlePrevStep = () => {
    if (quizStep > 0) {
      setSelectedAnswers(selectedAnswers.slice(0, -1));
      setQuizStep(quizStep - 1);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setSelectedAnswers([]);
    setQuizResult(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-6 md:mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-2.5">
          <div className="h-[2px] w-6 md:w-10 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
            Sistemas Core
          </span>
          <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-amber-400 to-red-500 rounded-full"></div>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2.5 text-white leading-tight">
          Arquitectura <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">Empresarial Digital</span>
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed px-2 sm:px-0">
          Para que una empresa escale de forma segura, necesita cimientos tecnológicos sólidos. Conoce los sistemas clave que toda corporación moderna utiliza para liderar en su sector.
        </p>
      </motion.div>

      <div className="space-y-4 lg:space-y-5">
        {systems.map((sys, index) => (
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
                  href={`https://wa.me/51959464155?text=${encodeURIComponent(`Hola AlphaSoft, me interesa recibir asesoría sobre ${sys.name}.`)}`}
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

      {/* SUNAT Electronic Invoicing Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 md:mt-8 bg-slate-900/70 border border-orange-500/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-center gap-5">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full mb-1.5">
              Cumplimiento Tributario en Perú
            </span>
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5">
              Facturación Electrónica <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">SUNAT / OSE Integrada</span>
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed mb-3.5">
              Todos nuestros sistemas ERP y comerciales se conectan de forma nativa con SUNAT y operadores OSE para que emitas comprobantes electrónicos en un clic, sin depender de portales lentos ni doble digitación.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left mb-3.5">
              {[
                "Facturas y Boletas",
                "Guías de Remisión (GRE)",
                "Notas de Crédito/Débito",
                "Libros Electrónicos SIRE"
              ].map((doc, i) => (
                <div key={i} className="bg-slate-950/80 border border-slate-800 rounded-xl p-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
                  <span className="text-slate-300 text-[11px] font-medium">{doc}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <a
                href={`https://wa.me/51959464155?text=${encodeURIComponent('Hola AlphaSoft, deseo información sobre Facturación Electrónica SUNAT / OSE integrada.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Consultar Facturación por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive System Recommender Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 md:mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 lg:p-6 relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-500/10 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6 items-start relative z-10">
          {/* Left Column: Context & Stepper */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-orange-400 uppercase bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                Diagnóstico en 30 Segundos
              </span>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 leading-snug">
                ¿Por qué sistema debería empezar tu empresa?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Selecciona el escenario que mejor describa tu operación actual en estos 3 pasos para obtener tu arquitectura recomendada.
              </p>

              {/* Step Progress Bar */}
              <div className="mb-3.5">
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-slate-300">
                    {quizResult ? 'Diagnóstico Completado' : `Paso ${quizStep + 1} de ${quizQuestions.length}`}
                  </span>
                  <span className="text-orange-400">
                    {quizResult ? '100%' : `${Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-300"
                    style={{ width: quizResult ? '100%' : `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Stepper Pills */}
              <div className="space-y-1.5 hidden sm:block">
                {quizQuestions.map((q, idx) => {
                  const isDone = quizResult || idx < quizStep;
                  const isCurrent = !quizResult && idx === quizStep;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                        isCurrent
                          ? 'bg-orange-500/10 border-orange-500/40 text-white font-semibold'
                          : isDone
                          ? 'bg-slate-950/60 border-emerald-500/30 text-emerald-400'
                          : 'bg-slate-950/30 border-slate-800/60 text-slate-500'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : isCurrent
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </span>
                      <div className="truncate">
                        <span className="block text-[11px] leading-tight">{q.stepTitle}</span>
                        {selectedAnswers[idx] && (
                          <span className="block text-[10px] text-slate-400 font-normal truncate">
                            {selectedAnswers[idx].title}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {!quizResult && quizStep > 0 && (
              <button
                onClick={handlePrevStep}
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-orange-400 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al paso anterior
              </button>
            )}
          </div>

          {/* Right Column: Interactive 2x2 Options Grid or Rich Result Card */}
          <div className="lg:col-span-8">
            {quizResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-950 border border-orange-500/40 rounded-2xl p-4 sm:p-5 text-left shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      {quizResult.badge}
                    </span>
                    {quizResult.secondaryModule && (
                      <span className="inline-block text-[10px] font-semibold text-orange-300 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full">
                        + Complemento sugerido: {quizResult.secondaryModule}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    Entrega estimada: {quizResult.mvpTime}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white mb-1">{quizResult.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3.5">{quizResult.desc}</p>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block mb-2">
                    Módulos y Entregables Incluidos en esta Fase:
                  </span>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {quizResult.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 bg-slate-950/70 border border-slate-800/80 rounded-lg p-2">
                        <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[11px] text-slate-200 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/51959464155?text=${encodeURIComponent(
                        `Hola AlphaSoft, completé el diagnóstico web. Mi resultado recomendado es: ${quizResult.title} (${quizResult.userChoices.join(' / ')}). Me gustaría recibir una cotización.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-bold rounded-full transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
                    >
                      <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                      </svg>
                      Enviar Diagnóstico por WhatsApp
                    </a>
                    <a
                      href="/contacto"
                      className="flex-1 sm:flex-initial text-center px-3.5 py-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white text-[11px] sm:text-xs font-bold rounded-full hover:from-amber-400 hover:to-red-500 transition-all cursor-pointer"
                    >
                      Agendar por Formulario
                    </a>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Repetir evaluación
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {quizQuestions[quizStep].question}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full shrink-0">
                    {quizQuestions[quizStep].stepTitle}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {quizQuestions[quizStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(opt)}
                      className="text-left p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-orange-500/60 transition-all flex flex-col justify-between group cursor-pointer hover:shadow-[0_0_20px_rgba(249,115,22,0.12)]"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 group-hover:border-orange-500/40 flex items-center justify-center transition-colors">
                            <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={opt.icon} />
                            </svg>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400 group-hover:text-amber-400 transition-colors">
                            {opt.tag}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors mb-0.5">
                          {opt.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {opt.subtitle}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] font-semibold text-slate-500 group-hover:text-orange-400 transition-colors">
                        <span>Seleccionar opción</span>
                        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 md:mt-8 text-center bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px]"></div>
        
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 relative z-10">¿Buscas integrar todos tus módulos?</h3>
        <p className="text-slate-300 text-xs max-w-2xl mx-auto mb-4 relative z-10 leading-relaxed">
          Como expertos en desarrollo a medida, analizamos tu flujo de trabajo y construimos exactamente el ecosistema que necesitas, integrándolo todo a tu propio ritmo.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center relative z-10">
          <a 
            href={`https://wa.me/51959464155?text=${encodeURIComponent('Hola AlphaSoft, me gustaría agendar una consultoría sobre sistemas integrados a medida.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all shadow-lg shadow-emerald-600/25 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Hablar por WhatsApp
          </a>
          <a 
            href="/contacto"
            className="inline-block px-4 py-2 text-xs bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-bold rounded-full hover:from-amber-400 hover:to-red-500 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] cursor-pointer"
          >
            Solicitar por Formulario
          </a>
        </div>
      </motion.div>

    </section>
  );
}
