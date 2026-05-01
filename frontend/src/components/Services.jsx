import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Palette, ArrowUpRight, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'Website Development',
    description: 'We build high-performance, responsive websites using the latest technologies like React, Next.js, and high-end backend solutions.',
    icon: <Layout className="w-8 h-8 text-white" />,
    color: 'from-primary/20 to-transparent',
    delay: 0.1
  },
  {
    title: 'Mobile App Development',
    description: 'Native-feel iOS and Android applications designed for seamless performance, high speed, and maximum user retention.',
    icon: <Smartphone className="w-8 h-8 text-white" />,
    color: 'from-secondary/40 to-primary/20',
    delay: 0.2
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric designs that focus on aesthetic appeal, emotional connection, and intuitive flows for your global customers.',
    icon: <Palette className="w-8 h-8 text-white" />,
    color: 'from-red-600/40 to-secondary/20',
    delay: 0.3
  }
];

const Services = () => {
  return (
    <section id="services" className="pt-44 pb-32 bg-[#000000] relative overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
              <Sparkles size={14} />
              Next-Gen Digital Solutions
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              Our <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">Expertise</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
              We merge creative vision with technical precision to build software that doesn't just work—it dominates.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: service.delay, duration: 0.6 }}
              viewport={{ once: true }}
              className="group p-1 bg-white/5 rounded-[2.5rem] hover:bg-gradient-to-br transition-all duration-700 h-full cursor-default"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                hover: { background: `linear-gradient(135deg, ${service.color} 0%, rgba(0,0,0,0) 50%)` }
              }}
            >
              <div className="p-10 rounded-[2.3rem] glass-dark h-full flex flex-col justify-between group-hover:bg-black/60 transition-colors duration-500">
                <div>
                  <div className={`mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">Learn More</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
