import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';

const projects = [
  {
    name: 'Keep In Mind',
    tech: 'React • Firebase • Auth',
    image: '/keepinmind-logo.png',
    description: 'A sophisticated task management and mindfulness platform.',
    url: 'https://keepinmind.in'
  },
  {
    name: 'ORA Vision',
    tech: 'React • AI • Audio',
    image: '/oravision-logo.jpg',
    description: 'Empowering vision through sound.',
    status: 'Coming Soon'
  },
  {
    name: 'ChatZone',
    tech: 'React Native • Firebase',
    image: '/chatzone-logo.png',
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

const ProjectCard = ({ project, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(-((y - centerY) / 15));
    setRotateY((x - centerX) / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 80, damping: 15 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full flex flex-col p-2 rounded-[2rem] bg-[#090e17]/90 backdrop-blur-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] overflow-hidden"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem]">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {project.status === 'Coming Soon' ? (
            <div className="absolute top-4 right-4 z-20">
              <div className="px-4 py-1.5 rounded-full bg-[#030712]/90 backdrop-blur-md border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Coming Soon</span>
              </div>
            </div>
          ) : (
            <a
              href={project.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10"
            >
              <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl font-bold">
                <ExternalLink size={24} />
              </div>
            </a>
          )}
        </div>

        <div className="p-6 flex-grow flex flex-col justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">{project.tech}</div>
            </div>
            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors tracking-tight">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:underline"
                >
                  {project.name}
                  <ExternalLink size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                project.name
              )}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-700 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const reactiveLetterVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    energyTouch: (i) => ({
      y: [0, -8, 0],
      scale: [1, 1.08, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatDelay: 0.5,
        delay: i * 0.15,
        ease: "easeInOut"
      }
    })
  };

  const ourLetters = "Our".split("");
  const impactLetters = "Impact".split("");

  return (
    <section id="portfolio" className="pt-0 pb-20 sm:pb-32 bg-transparent relative overflow-hidden z-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black mb-8 uppercase tracking-widest shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Sparkles size={14} className="animate-spin" />
              Impactful Digital Solutions
            </div>

            <h2 className="text-[clamp(2.5rem,10vw,5rem)] md:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter">
              <span className="inline-block smoky-container mx-2" style={{ perspective: "1000px" }}>
                <span className="relative inline-flex items-center" style={{ transformStyle: 'preserve-3d' }}>
                  {ourLetters.map((char, i) => {
                    const center = ourLetters.length / 2;
                    const rotationY = (center - i) * 6;
                    return (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={reactiveLetterVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="inline-block text-white"
                        style={{
                          display: 'inline-block',
                          minWidth: char === " " ? "0.3em" : "auto",
                          textShadow: "0 1px 0 #ccc, 0 2px 0 #b0b0b0, 0 5px 10px rgba(0,0,0,0.3)",
                          willChange: 'transform',
                          transform: `rotateX(12deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - i) * -2}px)`
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
                <div className="smoke-layer smoke-layer-white smoke-1"></div>
                <div className="smoke-layer smoke-layer-white smoke-2"></div>
              </span>

              <span className="inline-block smoky-container mx-2" style={{ perspective: "1000px" }}>
                <span className="relative inline-flex items-center" style={{ transformStyle: 'preserve-3d' }}>
                  {impactLetters.map((char, i) => {
                    const center = impactLetters.length / 2;
                    const rotationY = (center - i) * 5;
                    return (
                      <motion.span
                        key={i}
                        custom={i + ourLetters.length}
                        variants={reactiveLetterVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent"
                        style={{
                          display: 'inline-block',
                          minWidth: char === " " ? "0.3em" : "auto",
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: "0 1px 0 #1e3a8a, 0 2px 0 #1d4ed8, 0 8px 15px rgba(0,0,0,0.3)",
                          willChange: 'transform',
                          transform: `rotateX(12deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - i) * -3}px)`
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
                <div className="smoke-layer smoke-1"></div>
                <div className="smoke-layer smoke-2"></div>
                <div className="smoke-layer smoke-3"></div>
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed px-4">
              We don't just build projects; we create benchmarks. Explore how we've helped startups and enterprises redefine their digital presence.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6 sm:gap-8 border-t border-white/5 pt-12 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl px-2"
          >
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">Recent <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Work</span></h3>
            <p className="text-gray-400 text-base sm:text-lg font-medium leading-relaxed">
              We take pride in delivering high-fidelity solutions that push the boundaries of what's possible in the digital space.
            </p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/[0.05] border border-white/10 text-white font-black hover:bg-white hover:text-black transition-all duration-500 shadow-lg transform hover:-translate-y-1 active:scale-95 cursor-pointer w-full sm:w-auto"
          >
            View Case Studies
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
