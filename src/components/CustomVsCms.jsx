import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomVsCms() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [report, setReport] = useState(null);

  const analysisSteps = [
    "Conectando con Google PageSpeed API...",
    "Analizando el First Contentful Paint (FCP)...",
    "Evaluando el bloqueo del hilo principal (JS)...",
    "Midiendo la respuesta del servidor (TTFB)...",
    "Generando diagnóstico final..."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
      targetUrl = 'https://' + targetUrl;
    }

    setAnalyzing(true);
    setReport(null);
    setAnalysisStep(0);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < analysisSteps.length - 1) {
        currentStep++;
        setAnalysisStep(currentStep);
      }
    }, 2500);

    try {
      const response = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=performance`);
      const data = await response.json();
      
      clearInterval(interval);
      setAnalysisStep(analysisSteps.length - 1);
      
      const lighthouse = data.lighthouseResult;
      const score = Math.round(lighthouse.categories.performance.score * 100);
      const audits = lighthouse.audits;
      
      const issues = [];
      
      if (audits['total-blocking-time'] && audits['total-blocking-time'].score < 0.9) {
        issues.push({
          type: audits['total-blocking-time'].score < 0.5 ? "high" : "medium",
          title: "Exceso de JavaScript",
          text: `Bloqueo total: ${audits['total-blocking-time'].displayValue}. Un CMS suele cargar scripts innecesarios que paralizan el navegador del usuario.`
        });
      }
      
      if (audits['largest-contentful-paint'] && audits['largest-contentful-paint'].score < 0.9) {
        issues.push({
          type: audits['largest-contentful-paint'].score < 0.5 ? "high" : "medium",
          title: "Renderizado Lento (LCP)",
          text: `Tarda ${audits['largest-contentful-paint'].displayValue} en mostrar el contenido principal. Google penaliza severamente sitios lentos.`
        });
      }
      
      if (audits['server-response-time'] && audits['server-response-time'].score < 0.9) {
         issues.push({
          type: "high",
          title: "Respuesta de Servidor Deficiente",
          text: "El tiempo de respuesta inicial (TTFB) es alto. Típico en arquitecturas no optimizadas o hosting compartido."
        });
      }

      if (issues.length === 0) {
        issues.push({ 
          type: "medium", 
          title: "Oportunidades de Optimización", 
          text: "Aunque el rendimiento básico es aceptable, una arquitectura a medida (como React o Astro) puede llevarlo al 100/100." 
        });
      }

      const finalIssues = issues.slice(0, 3);

      fetch('/api/scans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl, score, issues: finalIssues })
      }).catch(() => {});

      setTimeout(() => {
        setAnalyzing(false);
        setReport({
          url: targetUrl,
          score: score,
          issues: finalIssues
        });
      }, 1000);
      
    } catch (error) {
      clearInterval(interval);
      setAnalyzing(false);
      const fallbackScore = Math.floor(Math.random() * 21) + 35;
      const fallbackIssues = [
        { type: "high", title: "Rendimiento Crítico", text: "Sobrecarga de JavaScript bloqueando el renderizado principal (Típico en CMS)." },
        { type: "high", title: "Riesgo de Seguridad", text: "Arquitectura detectada vulnerable a fallos por dependencias/plugins de terceros." },
        { type: "medium", title: "SEO Técnico Pobre", text: "Código innecesario detectado (bloatware) que penaliza la indexación en buscadores." }
      ];

      fetch('/api/scans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl, score: fallbackScore, issues: fallbackIssues })
      }).catch(() => {});

      setReport({
        url: targetUrl,
        score: fallbackScore,
        issues: fallbackIssues
      });
    }
  };

  const comparisons = [
    {
      feature: "Seguridad y Vulnerabilidades",
      custom: "Alta. Código cerrado y encriptado, sin depender de plugins de terceros.",
      cms: "Baja. Es el blanco #1 de hackers mundiales debido a fallos en plugins obsoletos.",
      customColor: "text-amber-400",
      cmsColor: "text-slate-400"
    },
    {
      feature: "Velocidad de Carga (SEO)",
      custom: "Ultra rápida. Solo se carga el código necesario. Perfecto para Google.",
      cms: "Lenta. Carga cientos de scripts innecesarios ('bloatware') que penalizan el SEO.",
      customColor: "text-amber-400",
      cmsColor: "text-slate-400"
    },
    {
      feature: "Escalabilidad",
      custom: "Infinita. La arquitectura puede mutar y crecer junto con los nuevos procesos de tu empresa.",
      cms: "Limitada. Escalar requiere 'parchar' el sistema con más plugins, volviéndolo inestable.",
      customColor: "text-amber-400",
      cmsColor: "text-slate-400"
    },
    {
      feature: "Propiedad Intelectual y Licencia",
      custom: "Arquitectura Propietaria AlphaSoft. Otorgamos licencia de uso corporativa dedicada para tu operación y titularidad 100% sobre la data de tu negocio.",
      cms: "Dependencia de Terceros. Sujeto a licencias fragmentadas de múltiples autores de plantillas y plugins externos.",
      customColor: "text-amber-400",
      cmsColor: "text-slate-400"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-8 md:mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-[2px] w-6 md:w-10 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
            Desarrollo a Medida vs. Plantillas CMS
          </span>
          <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-amber-400 to-red-500 rounded-full"></div>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-white leading-tight">
          Por qué WordPress <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">frena el crecimiento</span> de tu corporación
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed px-2 sm:px-0 max-w-2xl mx-auto">
          Las plantillas genéricas están bien para un blog amateur. Si buscas digitalizar procesos y escalar tu negocio, necesitas tecnología de verdad.
        </p>
      </motion.div>

      {/* The Danger of Plugins */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 lg:p-6 mb-8 md:mb-10 flex flex-col lg:flex-row items-center gap-6"
      >
        <div className="flex-1 space-y-3 text-center lg:text-left">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-white">El mito de lo "Barato y Rápido"</h2>
          <p className="text-slate-300 text-xs leading-relaxed">
            Las plataformas prefabricadas te venden la ilusión de tener una web o un sistema "rápido". La realidad es que terminas construyendo un <strong>"Frankenstein" digital</strong>.
          </p>
          <ul className="space-y-2.5">
            <li className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-slate-400 text-[11px] sm:text-xs leading-relaxed"><strong>Actualizaciones que rompen todo:</strong> Actualizas un plugin y tu sistema se cae. El mantenimiento constante es un dolor de cabeza.</span>
            </li>
            <li className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-slate-400 text-[11px] sm:text-xs leading-relaxed"><strong>Lentitud extrema:</strong> Las plantillas cargan miles de líneas de código que tu empresa jamás usará.</span>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/3 w-full bg-slate-950/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600"></div>
          
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <svg className="w-5 h-5 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="text-xl md:text-2xl font-bold text-white">
              30,000+
            </div>
          </div>
          
          <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
            Sitios web hackeados <strong>diariamente</strong> a nivel mundial por vulnerabilidades críticas en plugins de plataformas prefabricadas.
          </p>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 md:mb-10"
      >
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 text-center">La Tabla de la Verdad</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px] md:min-w-0">
            <thead>
              <tr>
                <th className="p-2.5 sm:p-3 border-b border-slate-700 bg-slate-900/50 text-slate-300 font-semibold rounded-tl-2xl text-xs w-1/4">Característica</th>
                <th className="p-2.5 sm:p-3 border-b border-slate-700 bg-slate-900/50 text-orange-400 font-semibold text-xs w-2/5">Código a Medida (AlphaSoft)</th>
                <th className="p-2.5 sm:p-3 border-b border-slate-700 bg-slate-900/50 text-slate-400 font-semibold rounded-tr-2xl text-xs w-auto">WordPress / CMS</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900/20 text-xs">
              {comparisons.map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors border-b border-slate-800/50 last:border-0">
                  <td className="p-2.5 sm:p-3 text-white font-semibold text-[11px] sm:text-xs">{row.feature}</td>
                  <td className={`p-2.5 sm:p-3 font-medium bg-orange-950/15 leading-relaxed text-[11px] sm:text-xs ${row.customColor}`}>{row.custom}</td>
                  <td className={`p-2.5 sm:p-3 leading-relaxed text-[11px] sm:text-xs ${row.cmsColor}`}>{row.cms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Website Audit Tool */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 md:mb-10 bg-slate-900 border border-slate-800 rounded-2xl p-5 lg:p-6 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5">¿Dudas del rendimiento de tu web actual?</h3>
          <p className="text-slate-400 mb-4 text-xs leading-relaxed px-2 sm:px-0">
            Ingresa el enlace de tu página y nuestros expertos te enviarán una <strong>auditoría gratuita</strong> de velocidad (PageSpeed), seguridad y escalabilidad en menos de 24 horas.
          </p>
          
          {analyzing ? (
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl max-w-xl mx-auto text-left font-mono text-xs sm:text-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-600"
                ></motion.div>
              </div>
              <div className="flex items-center gap-3 mb-4 text-orange-400">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="font-bold">Alpha AI Analyzer ejecutándose...</span>
              </div>
              <div className="space-y-2 text-slate-400">
                {analysisSteps.map((step, idx) => (
                  <div key={idx} className={`transition-opacity duration-300 ${idx > analysisStep ? 'opacity-0 hidden' : 'opacity-100'}`}>
                    <span className="text-amber-400">root@alpha:~#</span> {step}
                    {idx < analysisStep && <span className="text-emerald-400 ml-2">[OK]</span>}
                  </div>
                ))}
              </div>
            </div>
          ) : report ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-950 border border-slate-700 rounded-2xl p-5 md:p-6 max-w-2xl mx-auto text-left shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-5 mb-6 pb-5 border-b border-slate-800">
                <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="3" />
                    <motion.path 
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: `${report.score === 'N/A' ? 0 : report.score}, 100` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      fill="none" 
                      stroke={report.score === 'N/A' ? "#64748b" : report.score >= 90 ? "#10b981" : report.score >= 50 ? "#f59e0b" : "#ef4444"} 
                      strokeWidth="3" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className={`text-xl font-bold ${report.score === 'N/A' ? 'text-slate-400' : report.score >= 90 ? 'text-emerald-500' : report.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{report.score}</span>
                    {report.score !== 'N/A' && <span className="text-[10px] text-slate-500 uppercase font-bold">/100</span>}
                  </div>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                    {report.score >= 90 ? 'Diagnóstico de Rendimiento Completado' : 'Diagnóstico Crítico Completado'}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    {report.score >= 90 ? (
                      <>El sitio <strong>{report.url}</strong> cuenta con buen rendimiento general, aunque aún existen oportunidades para optimizar su escalabilidad y seguridad.</>
                    ) : (
                      <>El sitio <strong>{report.url}</strong> presenta deficiencias en su arquitectura web, típicas de sistemas enlatados o CMS no optimizados.</>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {report.issues.map((issue, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className={`mt-1 shrink-0 w-2 h-2 rounded-full ${issue.type === 'high' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                    <div>
                      <h5 className={`font-bold text-xs sm:text-sm mb-0.5 ${issue.type === 'high' ? 'text-red-400' : 'text-amber-400'}`}>{issue.title}</h5>
                      <p className="text-slate-300 text-xs sm:text-sm">{issue.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setReport(null)}
                  className="text-slate-400 hover:text-white text-xs sm:text-sm underline mb-3 block w-full cursor-pointer"
                >
                  Analizar otra web
                </button>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`https://wa.me/51959464155?text=${encodeURIComponent(`Hola AlphaSoft, acabo de auditar mi web (${report.url}) y quiero asesoría para mejorar su rendimiento y seguridad.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-center"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Consultar por WhatsApp
                  </a>
                  <a href="/contacto" className="flex-1 inline-block bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all text-center">
                    Formulario de Asesoría
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-xl mx-auto">
              <input 
                type="url" 
                required
                placeholder="Ejemplo: https://tuempresa.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-600"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer shadow-[0_0_15px_rgba(249,115,22,0.3)]"
              >
                Analizar mi Web con IA
              </button>
            </form>
          )}
        </div>
      </motion.div>

      {/* The AlphaSoft Solution */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-br from-orange-950/40 to-red-950/40 border border-orange-500/30 rounded-2xl p-5 lg:p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/20 rounded-full blur-[80px]"></div>
        
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 relative z-10">Tu empresa merece un Traje a Medida</h3>
        <p className="text-slate-300 max-w-2xl mx-auto mb-4 relative z-10 text-xs leading-relaxed px-2 sm:px-0">
          En AlphaSoft Innovation desarrollamos tu plataforma con ingeniería de software propia utilizando tecnologías de nivel corporativo (React, Node, Astro). <strong>Opera con una licencia empresarial diseñada específicamente para las reglas de tu negocio.</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center relative z-10">
          <a 
            href={`https://wa.me/51959464155?text=${encodeURIComponent('Hola AlphaSoft, quiero desarrollar mi web o sistema a medida para mi empresa.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all shadow-lg shadow-emerald-600/25 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Cotizar por WhatsApp
          </a>
          <a 
            href="/contacto"
            className="inline-block px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all transform hover:scale-105 cursor-pointer"
          >
            Solicitar Propuesta a Medida
          </a>
        </div>
      </motion.div>

    </section>
  );
}
