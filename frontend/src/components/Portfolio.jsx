import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    name: 'Keep In Mind',
    tech: 'React • Firebase • Auth',
    image: '/keepinmind-logo.png',
    description: 'A sophisticated task management and mindfulness platform.',
    url: 'https://keepinmind.in'
  },
  {
    name: 'Nexis Commerce',
    tech: 'React • Node • Stripe',
    image: '/coming-soon.png',
    description: 'A revolutionary e-commerce engine. Currently under development.',
    status: 'Coming Soon'
  },
  {
    name: 'Aether Fitness',
    tech: 'React Native • Firebase',
    image: '/coming-soon.png',
    description: 'Real-time workout synchronization platform. Currently under development.',
    status: 'Coming Soon'
  },
  {
    name: 'Flux Dashboard',
    tech: 'Next.js • Tailwind • SQL',
    image: '/coming-soon.png',
    description: 'An ultra-fast analytics platform. Currently under development.',
    status: 'Coming Soon'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="pt-44 pb-24 bg-[#000000] relative overflow-hidden">
      {/* Dynamic Background Elements - Hero Style Synchronization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-red-600/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-red-500 text-xs font-bold mb-8 uppercase tracking-widest">
              Impactful Digital Solutions
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              Our <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">Impact</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
              We don't just build projects; we create benchmarks. Explore how we've helped startups and enterprises redefine their digital presence.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-t border-white/5 pt-20">
          <div className="max-w-2xl">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Recent <span className="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">Work</span></h3>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              We take pride in delivering high-fidelity solutions that push the boundaries of what's possible in the digital space.
            </p>
          </div>
          <button className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-500">
            View Case Studies
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[2rem] glass border-white/5 p-2 h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem]">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {project.status === 'Coming Soon' ? (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-3 py-1 rounded-full bg-secondary/90 backdrop-blur-sm border border-secondary/20 shadow-lg shadow-secondary/20">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white">Coming Soon</span>
                      </div>
                    </div>
                  ) : (
                    <a 
                      href={project.url || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                        <ExternalLink size={20} />
                      </div>
                    </a>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-secondary text-[9px] font-black uppercase tracking-[0.2em]">{project.tech}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">
                      {project.url ? (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:underline"
                        >
                          {project.name}
                          <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 font-medium line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${project.status === 'Coming Soon' ? 'from-secondary/50 to-secondary' : 'from-secondary to-primary'} transition-all duration-700 rounded-full`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
