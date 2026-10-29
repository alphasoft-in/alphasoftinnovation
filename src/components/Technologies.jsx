import { motion } from 'framer-motion';

const technologies = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Astro', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' }
];

export default function Technologies() {
  // Duplicamos el arreglo para hacer el efecto de scroll infinito
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section className="py-10 md:py-14 border-y border-slate-800 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2.5">
          <div className="h-[2px] w-6 md:w-10 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
            Tecnologías Modernas
          </span>
          <div className="h-[2px] w-6 md:w-10 bg-gradient-to-l from-amber-400 to-red-500 rounded-full"></div>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5">
          Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">Stack Tecnológico</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 px-2 sm:px-0">Dominamos las herramientas más modernas y robustas del mercado</p>
      </div>
      
      <div className="relative w-full overflow-hidden">
        {/* Gradientes para suavizar los bordes del carrusel */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
        
        <motion.div 
          className="flex gap-8 w-max pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedTech.map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 hover:border-orange-500/40 px-4 py-2 rounded-full hover:bg-slate-800/80 transition-colors cursor-default"
            >
              <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
              <span className="text-slate-300 text-xs sm:text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
