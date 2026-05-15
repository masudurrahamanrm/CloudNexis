import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX(-((y - centerY) / 25));
    setRotateY((x - centerX) / 25);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="py-16 sm:py-20 bg-transparent relative overflow-hidden z-10 px-4">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
          viewport={{ once: true, margin: "-100px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >
          <motion.div 
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative bg-[#090e17]/90 backdrop-blur-2xl p-6 sm:p-12 md:p-14 rounded-[2rem] sm:rounded-[2.5rem] text-center overflow-hidden border border-white/5 hover:border-blue-500/40 group shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-700 max-w-3xl mx-auto"
          >
            {/* Animated Background Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-[clamp(1.8rem,7vw,4rem)] md:text-6xl font-black text-white mb-5 tracking-tighter leading-[1.08]">
                Ready to build <br className="hidden sm:block" />
                your <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">vision</span>?
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-lg mx-auto font-medium leading-relaxed">
                Join 500+ forward-thinking businesses that trust CloudNexis to engineer their digital future.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-3 text-sm sm:text-base font-extrabold px-8 py-4 rounded-full bg-white/[0.05] border border-blue-500/30 text-white hover:bg-blue-600/10 hover:border-blue-500/50 transition-all duration-500 shadow-lg backdrop-blur-md transform hover:-translate-y-1 active:scale-95 group relative z-20 cursor-pointer w-full sm:w-auto"
              >
                <span>Start Now</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
