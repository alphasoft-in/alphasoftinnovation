export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-10 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                AlphaSoft <span className="text-cyan-400">Innovation</span>
              </span>
            </div>
            <p className="text-sm md:text-base text-slate-400 max-w-sm">
              Conectando la creatividad y la tecnología para optimizar el rendimiento empresarial mediante soluciones personalizadas.
            </p>
          </div>
          
          <div>
            <h4 className="text-base md:text-lg text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li><a href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">Inicio</a></li>
              <li><a href="/nosotros" className="text-slate-400 hover:text-cyan-400 transition-colors">Nosotros</a></li>
              <li><a href="/servicios" className="text-slate-400 hover:text-cyan-400 transition-colors">Servicios</a></li>
              <li><a href="/sistemas" className="text-slate-400 hover:text-cyan-400 transition-colors">Sistemas</a></li>
              <li><a href="/a-medida" className="text-slate-400 hover:text-cyan-400 transition-colors">A Medida</a></li>
              <li><a href="/contacto" className="text-slate-400 hover:text-cyan-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base md:text-lg text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-4 text-slate-400 text-sm md:text-base">

              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:959464155" className="hover:text-cyan-400 transition-colors">959464155</a>
              </li>

              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col space-y-1">
                  <a href="mailto:hola@alphasoftinnovation.com" className="hover:text-cyan-400 transition-colors text-xs sm:text-sm md:text-base break-all">hola@alphasoftinnovation.com</a>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-slate-500 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Alphasoft Innovation. RUC: 20612026387. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex justify-center gap-4 text-xs md:text-sm text-slate-500">
            <a href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</a>
            <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
