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
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">A</span>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-white">
              AlphaSoft <span className="text-cyan-400">Innovation</span>
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? currentPath === '/' : currentPath.startsWith(link.href);
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`transition-colors duration-200 text-sm font-medium ${isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          
          <div className="hidden md:flex">
            <a href="tel:959464155" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full font-medium transition-all border border-white/10 hover:border-white/30 backdrop-blur-sm cursor-pointer">
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
                  className={`block px-3 py-2 text-base font-medium rounded-md ${isActive ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
