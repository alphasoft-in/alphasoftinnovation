export default function About() {
  return (
    <section id="nosotros" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl blur-lg opacity-20"></div>
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-8 sm:p-10 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-2xl font-bold">
                  24'
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Fundada en 2024</h3>
                  <p className="text-slate-400">Sede en Ica, Perú</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Equipo Ágil</h4>
                    <p className="text-slate-400 mt-1">Contamos con un equipo especializado de 2 a 10 empleados listos para adaptarse a tus necesidades.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                    <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Enfoque B2B</h4>
                    <p className="text-slate-400 mt-1">Nos enfocamos en el crecimiento empresarial mediante herramientas de tecnología vanguardista.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre AlphaSoft Innovation Technology</h2>
            <p className="text-lg text-slate-400 mb-6">
              Somos una empresa peruana privada de desarrollo de software y consultoría tecnológica. Nuestra misión es construir un ecosistema digital donde las empresas puedan operar a su máxima capacidad.
            </p>
            <p className="text-lg text-slate-400 mb-8">
              A pesar de ser una empresa joven, nuestra agilidad nos permite ofrecer soluciones altamente personalizadas y cercanas a cada uno de nuestros clientes, garantizando calidad e innovación en cada línea de código.
            </p>
            <a href="#contacto" className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors">
              Conoce a nuestro equipo
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}
