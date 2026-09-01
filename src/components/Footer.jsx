export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <a href="/" className="flex items-center gap-2 mb-4 hover:opacity-90 transition-opacity w-fit cursor-pointer">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">A</span>
              </div>
              <span className="font-bold text-lg md:text-xl tracking-tight text-white">
                AlphaSoft <span className="text-cyan-400">Innovation</span>
              </span>
            </a>
            <p className="text-sm md:text-base text-slate-400 max-w-sm mx-auto md:mx-0 mb-6">
              Conectando la creatividad y la tecnología para optimizar el rendimiento empresarial mediante soluciones personalizadas.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2h-3" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z" />
                  <path d="M8 11l0 5" />
                  <path d="M8 8l0 .01" />
                  <path d="M12 16l0 -5" />
                  <path d="M16 16v-3a2 2 0 0 0-4 0" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Google">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                </svg>
              </a>
              <a href="https://wa.me/51959464155" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" />
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0-1h-1a.5 .5 0 0 0 0 1" />
                </svg>
              </a>
            </div>
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

              <li className="flex items-center justify-center md:justify-start gap-3">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:959464155" className="hover:text-cyan-400 transition-colors">959464155</a>
              </li>

              <li className="flex items-center justify-center md:justify-start gap-3">
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
            &copy; {new Date().getFullYear()} Alphasoft Innovation - RUC 20612026387
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
