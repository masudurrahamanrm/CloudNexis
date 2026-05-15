import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Sparkles size={14} />
                About CloudNexis
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Engineering <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">The Future</span>
              </h2>
              
              <p className="text-gray-400 text-lg sm:text-xl font-medium leading-relaxed mb-8">
                We don't just write code. We build digital engines that power the next generation of industry leaders. Our team merges creative vision with technical precision to build software that dominates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Our Mission</h4>
                    <p className="text-sm text-gray-400">High-fidelity solutions for modern startups.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Our Promise</h4>
                    <p className="text-sm text-gray-400">Secure, scalable, and future-proof architectures.</p>
                  </div>
                </div>
              </div>

              <Link 
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-extrabold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg"
              >
                Learn More About Us
              </Link>
            </motion.div>
          </div>

          {/* Right Visual / Image area */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] bg-[#090e17]/80 backdrop-blur-2xl border border-white/5 p-8 sm:p-10 shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden group hover:border-blue-500/30 transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col gap-4 sm:gap-6 pt-10">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-4xl font-black text-white mb-2">50+</h3>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Projects Delivered</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-3xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]">
                    <h3 className="text-4xl font-black text-white mb-2">100%</h3>
                    <p className="text-sm text-blue-200 font-semibold uppercase tracking-wider">Client Satisfaction</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 sm:gap-6 pb-10">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-4xl font-black text-white mb-2">24/7</h3>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Support Available</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-4xl font-black text-white mb-2">10+</h3>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Expert Developers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
