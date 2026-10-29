import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Sistemas', href: '/sistemas' },
    { name: 'A Medida', href: '/a-medida' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg shadow-slate-950/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
            <img src="/apple-touch-icon.png?v=2" alt="AlphaSoft Logo" className="w-9 h-9 md:w-10 md:h-10 object-contain drop-shadow-[0_0_8px_rgba(249,115,22,0.25)]" />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-white">
                ALPHA<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">SOFT</span>
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.18em] text-slate-400 uppercase font-medium mt-0.5">
                Innovation Technology
              </span>
            </div>
          </a>
          
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? currentPath === '/' : currentPath.startsWith(link.href);
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`transition-colors duration-200 text-xs lg:text-sm font-medium ${isActive ? 'text-orange-400' : 'text-slate-300 hover:text-white'}`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          
          <div className="hidden md:flex">
            <a 
              href="https://wa.me/51959464155?text=Hola%20AlphaSoft%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa%20tecnol%C3%B3gica%20para%20mi%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/15 to-red-600/15 hover:from-amber-500/25 hover:to-red-600/25 text-white px-4 py-1.5 lg:px-5 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all border border-orange-500/30 hover:border-orange-400/60 backdrop-blur-sm cursor-pointer"
            >
              Agendar Asesoría
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? currentPath === '/' : currentPath.startsWith(link.href);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${isActive ? 'text-orange-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pt-2 pb-1 px-3">
              <a
                href="https://wa.me/51959464155?text=Hola%20AlphaSoft%2C%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa%20tecnol%C3%B3gica%20para%20mi%20empresa."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md"
              >
                Agendar Asesoría
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
