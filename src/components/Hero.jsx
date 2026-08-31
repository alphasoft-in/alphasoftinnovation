export default function Hero() {
  return (
    <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm mb-8">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400"></span>
          <span className="text-sm font-medium text-slate-300">Soluciones Tecnológicas en Perú</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          El puente entre la <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">creatividad y la tecnología</span>
        </h1>
        
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-400 mx-auto mb-10">
          Optimizamos el rendimiento empresarial con desarrollo de software y consultoría tecnológica a medida. Transformamos ideas en soluciones escalables.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#servicios" className="px-8 py-4 bg-white text-slate-950 font-semibold rounded-full hover:bg-slate-200 transition-colors duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Nuestros Servicios
          </a>
          <a href="#contacto" className="px-8 py-4 bg-transparent border border-slate-700 text-white font-medium rounded-full hover:bg-slate-800 transition-colors duration-200">
            Hablemos de tu proyecto
          </a>
        </div>
        
        {/* Mockup / Dashboard Preview abstract */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 top-1/2"></div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-2 shadow-2xl relative">
            <div className="rounded-lg overflow-hidden border border-slate-800/50 bg-slate-950 flex flex-col h-[400px]">
              {/* Window Header */}
              <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              </div>
              {/* Fake UI Content */}
              <div className="p-8 flex-1 flex flex-col gap-6 opacity-60">
                <div className="flex gap-4">
                  <div className="h-24 w-1/3 bg-slate-800 rounded-lg animate-pulse"></div>
                  <div className="h-24 w-1/3 bg-slate-800 rounded-lg animate-pulse delay-75"></div>
                  <div className="h-24 w-1/3 bg-slate-800 rounded-lg animate-pulse delay-150"></div>
                </div>
                <div className="flex-1 bg-slate-800 rounded-lg animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
