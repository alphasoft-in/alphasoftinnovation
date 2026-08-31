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
    <section className="py-20 border-y border-slate-800 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Nuestro Stack Tecnológico</h3>
        <p className="text-slate-400">Dominamos las herramientas más modernas y robustas del mercado</p>
      </div>
      
      <div className="relative w-full overflow-hidden">
        {/* Gradientes para suavizar los bordes del carrusel */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
        
        <motion.div 
          className="flex gap-12 w-max"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedTech.map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-6 py-3 rounded-full hover:bg-slate-800 transition-colors cursor-default"
            >
              <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain" />
              <span className="text-slate-300 font-medium">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
