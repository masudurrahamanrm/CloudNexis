import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Users, Shield } from 'lucide-react';
import WhyChooseUs from '../components/WhyChooseUs';
import TrustedBy from '../components/TrustedBy';
import CTA from '../components/CTA';

const AboutPage = () => {
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

  const engineeringLetters = "Engineering".split("");
  const theFutureLetters = "The Future".split("");

  return (
    <div className="bg-transparent overflow-hidden relative z-10 w-full pt-[120px] pb-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Sparkles size={14} />
              Our Story & Mission
            </div>
            
            <h1 className="text-[clamp(2.5rem,10vw,5rem)] md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
              <span className="inline-block smoky-container mx-2" style={{ perspective: "1000px" }}>
                <span className="relative inline-flex items-center" style={{ transformStyle: 'preserve-3d' }}>
                  {engineeringLetters.map((char, i) => {
                    const center = engineeringLetters.length / 2;
                    const rotationY = (center - i) * 4;
                    return (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={reactiveLetterVariants}
                        initial="hidden"
                        animate={["visible", "energyTouch"]}
                        className="inline-block text-white"
                        style={{ 
                          display: 'inline-block', 
                          minWidth: char === " " ? "0.3em" : "auto",
                          textShadow: "0 1px 0 #ccc, 0 2px 0 #b0b0b0, 0 5px 10px rgba(0,0,0,0.3)",
                          willChange: 'transform',
                          transform: `rotateX(10deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - i) * -1.5}px)`
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
              <br />
              <span className="inline-block smoky-container mx-2" style={{ perspective: "1000px" }}>
                <span className="relative inline-flex items-center" style={{ transformStyle: 'preserve-3d' }}>
                  {theFutureLetters.map((char, i) => {
                    const center = theFutureLetters.length / 2;
                    const rotationY = (center - i) * 5;
                    return (
                      <motion.span
                        key={i}
                        custom={i + engineeringLetters.length}
                        variants={reactiveLetterVariants}
                        initial="hidden"
                        animate={["visible", "energyTouch"]}
                        className="inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent"
                        style={{ 
                          display: 'inline-block', 
                          minWidth: char === " " ? "0.3em" : "auto",
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: "0 1px 0 #1e3a8a, 0 2px 0 #1d4ed8, 0 8px 15px rgba(0,0,0,0.3)",
                          willChange: 'transform',
                          transform: `rotateX(10deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - i) * -2.5}px)`
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    );
                  })}
                </span>
                <div className="smoke-layer smoke-1"></div>
                <div className="smoke-layer smoke-2"></div>
                <div className="smoke-layer smoke-3"></div>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
              At Cloud<span className="text-blue-400 font-bold">Nexis</span>, we don't just write code. We build digital engines that power the next generation of industry leaders.
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
              className="bg-[#090e17]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 group hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500 shadow-md">
                <card.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{card.title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{card.desc}</p>
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
