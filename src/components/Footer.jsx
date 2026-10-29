export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <a href="/" className="flex items-center gap-2.5 mb-4 hover:opacity-90 transition-opacity w-fit cursor-pointer">
              <img src="/apple-touch-icon.png" alt="AlphaSoft Logo" className="w-8 h-8 md:w-9 md:h-9 rounded-lg object-contain border border-orange-500/30 shadow-md shadow-orange-500/10" />
              <div className="flex flex-col leading-none text-left">
                <span className="font-extrabold text-base md:text-lg tracking-tight text-white">
                  ALPHA<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">SOFT</span>
                </span>
                <span className="text-[8px] md:text-[9px] tracking-[0.18em] text-slate-400 uppercase font-medium mt-0.5">
                  Innovation Technology
                </span>
              </div>
            </a>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto md:mx-0 mb-6 leading-relaxed">
              Conectando la creatividad y la tecnología para optimizar el rendimiento empresarial mediante soluciones personalizadas.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-slate-500 hover:text-orange-400 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2h-3" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-orange-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z" />
                  <path d="M8 11l0 5" />
                  <path d="M8 8l0 .01" />
                  <path d="M12 16l0 -5" />
                  <path d="M16 16v-3a2 2 0 0 0-4 0" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-orange-400 transition-colors" aria-label="Google">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                </svg>
              </a>
              <a href="https://wa.me/51959464155" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-orange-400 transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" />
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0-1h-1a.5 .5 0 0 0 0 1" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm md:text-base text-white font-semibold mb-3.5">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="/" className="text-slate-400 hover:text-orange-400 transition-colors">Inicio</a></li>
              <li><a href="/nosotros" className="text-slate-400 hover:text-orange-400 transition-colors">Nosotros</a></li>
              <li><a href="/servicios" className="text-slate-400 hover:text-orange-400 transition-colors">Servicios</a></li>
              <li><a href="/sistemas" className="text-slate-400 hover:text-orange-400 transition-colors">Sistemas</a></li>
              <li><a href="/a-medida" className="text-slate-400 hover:text-orange-400 transition-colors">A Medida</a></li>
              <li><a href="/contacto" className="text-slate-400 hover:text-orange-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm md:text-base text-white font-semibold mb-3.5">Contacto</h4>
            <ul className="space-y-3.5 text-slate-400 text-xs sm:text-sm">

              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <svg className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:959464155" className="hover:text-orange-400 transition-colors">959464155</a>
              </li>

              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <svg className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col space-y-1">
                  <a href="mailto:hola@alphasoftinnovation.com" className="hover:text-orange-400 transition-colors text-xs sm:text-sm break-all">hola@alphasoftinnovation.com</a>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-slate-500 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Alphasoft Innovation - RUC 20612026387
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 text-xs md:text-sm text-slate-500">
            <a href="/libro-de-reclamaciones" className="flex items-center gap-2 hover:text-white transition-colors bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-orange-500/40 text-slate-300">
              <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Libro de Reclamaciones
            </a>
            <a href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</a>
            <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
