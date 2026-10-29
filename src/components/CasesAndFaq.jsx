import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "¿Cómo funciona la titularidad del código fuente y el licenciamiento del software?",
    a: "Conforme a la Ley sobre el Derecho de Autor (Decreto Legislativo N° 822) y nuestros Términos y Condiciones, AlphaSoft Innovation Technology conserva la titularidad exclusiva de los derechos de propiedad intelectual e industrial sobre el código fuente, arquitectura, algoritmos y metodologías desarrolladas (salvo pacto escrito en contrario). Tu empresa recibe una licencia de uso corporativa, intransferible y dedicada para su operación interna, manteniendo siempre el 100% de la propiedad y confidencialidad sobre la información y bases de datos de su negocio."
  },
  {
    q: "¿Cuánto tiempo toma desarrollar e implementar un sistema a medida?",
    a: "Trabajamos con metodología ágil por entregas quincenales (Sprints). Una página web corporativa de alto rendimiento toma entre 2 y 3 semanas, mientras que la primera versión operativa (MVP) de un sistema ERP, CRM o WMS suele estar lista entre 4 y 8 semanas según la complejidad."
  },
  {
    q: "¿Se puede integrar con SUNAT o con el software contable que ya usamos?",
    a: "Sí. Desarrollamos APIs y conectores a medida para integrar tu nuevo sistema con Facturación Electrónica SUNAT/OSE, bancos, sistemas contables existentes, relojes biométricos o plataformas de comercio electrónico."
  },
  {
    q: "¿Qué sucede si mi empresa crece y necesito agregar más módulos después?",
    a: "Esa es la mayor ventaja de nuestra arquitectura modular (React, Node.js, PostgreSQL). Puedes empezar hoy resolviendo tu cuello de botella principal (por ejemplo, Almacén y Ventas) y más adelante sumar RRHH, Finanzas o Business Intelligence sin rehacer nada."
  },
  {
    q: "¿Ofrecen capacitación para mi personal y garantía post-lanzamiento?",
    a: "Absolutamente. Todo proyecto incluye sesiones de capacitación práctica para tus usuarios, manuales operativos y un periodo de garantía técnica para asegurar que toda tu operación fluya sin interrupciones."
  }
];

export default function CasesAndFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      {/* Corporate FAQ Accordion */}
      <section className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
              Preguntas Frecuentes
            </span>
            <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-amber-400 to-red-500 rounded-full"></div>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
            Resolvemos tus dudas sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">Desarrollo a Medida</span>
          </h2>
        </motion.div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors ${isOpen ? 'bg-slate-900 border-orange-500/40' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-xs font-semibold text-white">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-4 h-4 text-orange-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
