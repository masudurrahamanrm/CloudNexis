import React from 'react';
import { motion } from 'framer-motion';

const TrustedBy = () => {
  return (
    <section className="py-12 bg-transparent relative overflow-hidden border-b border-white/5 z-10">
      {/* Space Mesh Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
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
            className="group relative cursor-pointer"
          >
            {/* Pulsing Outer Glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse pointer-events-none"></div>

            <div className="bg-[#090e17]/90 backdrop-blur-2xl px-6 py-3 rounded-full border border-white/5 relative z-10 flex items-center gap-2 shadow-xl transition-all duration-500 group-hover:border-blue-500/40 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <div className="text-sm md:text-base font-black text-white tracking-tight transition-all duration-500 flex items-center gap-1.5">
                Keep In <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-black">Mind</span>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
