import React from 'react';
import { motion } from 'framer-motion';

const TrustedBy = () => {
  return (
    <section className="py-12 bg-[#000000] relative overflow-hidden">
      {/* Background Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Powering Digital Leaders
            </span>
          </motion.div>
        </div>
        
        <div className="flex justify-center items-center">
          <motion.a
            href="https://keepinmind.in"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group relative"
          >
            {/* Pulsing Outer Glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
            
            <div className="glass px-4 py-2 rounded-full border-white/5 relative z-10 flex items-center gap-2 shadow-lg transition-all duration-500 group-hover:border-primary/20">
              <div className="text-xs md:text-sm font-black text-white tracking-tighter transition-all duration-500 flex items-center gap-1">
                Keep In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mind</span>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
