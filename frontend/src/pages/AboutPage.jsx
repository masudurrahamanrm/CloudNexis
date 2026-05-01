import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Users, Shield } from 'lucide-react';
import WhyChooseUs from '../components/WhyChooseUs';
import TrustedBy from '../components/TrustedBy';
import CTA from '../components/CTA';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] overflow-hidden relative">
      {/* Dynamic Background Elements - Hero Style Synchronization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-red-600/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-44 pb-32">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-red-500 text-xs font-bold mb-8 uppercase tracking-widest">
              <Sparkles size={14} />
              Our Story & Mission
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              Engineering <br />
              <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">The Future</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
              At Cloud<span className="text-primary">Nexis</span>, we don't just write code. We build digital engines that power the next generation of industry leaders.
            </p>
          </motion.div>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-44">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To provide high-fidelity software solutions that enable startups to compete with industry giants.' },
            { icon: Users, title: 'Our Values', desc: 'Transparency, technical excellence, and a relentless focus on our clients success.' },
            { icon: Shield, title: 'Our Promise', desc: 'We deliver secure, scalable, and future-proof architectures that grow with your business.' }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[2.5rem] border-white/5 group hover:border-red-500/20 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                <card.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <TrustedBy />
      </div>
      
      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default AboutPage;
