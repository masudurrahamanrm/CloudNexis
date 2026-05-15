import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Palette, ArrowUpRight, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'Website Development',
    description: 'We build high-performance, responsive websites using the latest technologies like React, Next.js, and high-end backend solutions.',
    icon: <Layout className="w-8 h-8 text-white" />,
    color: 'from-blue-500/40 to-indigo-500/20',
    iconBg: 'from-blue-500 to-indigo-600',
    delay: 0.1
  },
  {
    title: 'Mobile App Development',
    description: 'Native-feel iOS and Android applications designed for seamless performance, high speed, and maximum user retention.',
    icon: <Smartphone className="w-8 h-8 text-white" />,
    color: 'from-indigo-500/40 to-purple-500/20',
    iconBg: 'from-indigo-500 to-purple-600',
    delay: 0.2
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric designs that focus on aesthetic appeal, emotional connection, and intuitive flows for your global customers.',
    icon: <Palette className="w-8 h-8 text-white" />,
    color: 'from-purple-500/40 to-pink-500/20',
    iconBg: 'from-purple-500 to-pink-600',
    delay: 0.3
  }
];

const ServiceCard = ({ service, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX(-((y - centerY) / 12));
    setRotateY((x - centerX) / 12);
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
        style={{ willChange: 'transform' }}
        className="group relative p-1 bg-white/[0.05] rounded-[2.5rem] hover:bg-gradient-to-br from-blue-500/30 via-indigo-500/30 to-purple-500/30 transition-all duration-500 h-full cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
      >
        <div className="p-6 sm:p-10 rounded-[2.3rem] bg-[#090e17]/90 backdrop-blur-2xl h-full flex flex-col justify-between group-hover:bg-[#030712]/60 transition-colors duration-500 border border-white/5">
          <div>
            <div className={`mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors tracking-tight">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed font-medium">
              {service.description}
            </p>
          </div>
          
          <div className="mt-10 flex items-center justify-between">
            <span className="text-sm font-extrabold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Learn More</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500 shadow-md">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
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
  const expertiseLetters = "Expertise".split("");

  return (
    <section id="services" className="pt-0 pb-20 sm:pb-32 bg-transparent relative overflow-hidden z-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black mb-8 uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Sparkles size={14} className="animate-spin" />
              Next-Gen Digital Solutions
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
                        whileInView={["visible", "energyTouch"]}
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
                  {expertiseLetters.map((char, i) => {
                    const center = expertiseLetters.length / 2;
                    const rotationY = (center - i) * 5;
                    return (
                      <motion.span
                        key={i}
                        custom={i + ourLetters.length}
                        variants={reactiveLetterVariants}
                        initial="hidden"
                        whileInView={["visible", "energyTouch"]}
                        viewport={{ once: true }}
                        className="inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent"
                        style={{ 
                          display: 'inline-block', 
                          minWidth: char === " " ? "0.3em" : "auto",
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: "0 1px 0 #1e3a8a, 0 2px 0 #1d4ed8, 0 4px 10px rgba(0,0,0,0.2)",
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
              We merge creative vision with technical precision to build software that doesn't just work—it dominates.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
