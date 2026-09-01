export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-10 sm:pt-16 pb-8">
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
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Google">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </a>
              <a href="https://wa.me/51959464155" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.031 0C5.388 0 0 5.388 0 12.031c0 2.128.552 4.126 1.523 5.902L.15 23.46l5.707-1.498A11.95 11.95 0 0012.03 24c6.643 0 12.03-5.388 12.03-12.03C24.06 5.388 18.673 0 12.031 0zm0 22.015c-1.802 0-3.51-.462-5.01-1.3l-.36-.201-3.731.98 1.01-3.633-.223-.353A9.972 9.972 0 012.046 12.03c0-5.508 4.48-9.988 9.985-9.988s9.986 4.48 9.986 9.988c0 5.507-4.48 9.985-9.986 9.985zm5.474-7.48c-.3-.15-1.776-.877-2.052-.977-.275-.101-.476-.151-.676.15-.201.3-.776.977-.952 1.178-.176.2-.351.225-.651.075-.3-.15-1.267-.467-2.414-1.49-.893-.796-1.497-1.778-1.673-2.079-.176-.3-.018-.464.132-.614.135-.135.301-.351.451-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.676-1.628-.926-2.23-.245-.588-.493-.508-.676-.518-.175-.008-.376-.008-.576-.008-.2 0-.526.075-.802.375-.276.3-.1052 1.178-.1052 2.871 0 1.693.1077 3.096.1227 3.297.151.2 2.228 3.4 5.398 4.767.755.326 1.344.52 1.803.666.758.241 1.448.207 1.993.125.613-.092 1.776-.726 2.026-1.428.25-.702.25-1.304.175-1.428-.076-.126-.276-.201-.576-.351z" clipRule="evenodd" />
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
