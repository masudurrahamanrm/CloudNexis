import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Sparkles, Code2, Palette, Cpu } from 'lucide-react';
import { Facebook, Instagram, Linkedin } from '../components/BrandIcons';
import CTA from '../components/CTA';

const TeamPage = () => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      filter: "blur(6px)" 
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  const team = [
    {
      name: 'Masudur Rahaman',
      role: 'Founder & Lead Architect',
      image: '/masudur.jpg',
      bio: 'Visionary engineer specializing in scalable cloud infrastructures and enterprise software.',
      skills: ['System Design', 'React Native', 'Node.js'],
      social: {
        instagram: 'https://www.instagram.com/ig_princeae/',
        facebook: 'https://www.facebook.com/masudur.rahaman.in',
        linkedin: '#'
      }
    },
    {
      name: 'Md Basim Ali',
      role: 'Director & Fullstack Developer',
      image: '/basim.jpg',
      bio: 'Crafting high-fidelity digital experiences that bridge the gap between complex tech and human intuition.',
      skills: ['Modern UI','AWS','Security']
    },
    {
      name: 'Ijaj Ahamed',
      role: 'UI/UX Designer ',
      image: '/ijaj.jpg',
      bio: 'Expert in building robust, high-performance web applications with a focus on React and Go.',
      skills: ['React', 'Go', 'PostgreSQL']
    },
    {
      name: 'Sibkatulla Al Islam',
      role: 'Cloud Operations Lead',
      image: '/sibkatulla.jpg',
      bio: 'Working with Sibkatullah means your brand gets more than visuals.',
      skills: [ 'Kubernetes', 'Branding']
    }
  ];

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

  const meetOurWords = "Meet Our".split(" ");
  const developersDesignersWords = "Expert Developers & Designers".split(" ");

  return (
    <div className="bg-transparent overflow-hidden relative z-10 w-full pt-[120px] pb-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-bold mb-4 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Sparkles size={12} />
              The Minds Behind Cloud<span className="text-blue-400 font-bold">Nexis</span>
            </div>
            
            <h1 className="text-[clamp(1.51rem,6.05vw,3.03rem)] md:text-[57px] font-black text-white mb-6 tracking-tighter leading-tight">
              <span className="inline-block smoky-container mx-2" style={{ perspective: "1000px" }}>
                <span className="relative inline-flex items-center flex-wrap justify-center" style={{ transformStyle: 'preserve-3d' }}>
                  {meetOurWords.map((word, wordIndex) => {
                    let charOffset = 0;
                    for (let w = 0; w < wordIndex; w++) {
                      charOffset += meetOurWords[w].length + 1;
                    }
                    return (
                      <span key={wordIndex} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, charIndex) => {
                          const globalIndex = charOffset + charIndex;
                          const center = word.length / 2;
                          const rotationY = (center - charIndex) * 5;
                          return (
                            <motion.span
                              key={charIndex}
                              custom={globalIndex}
                              variants={reactiveLetterVariants}
                              initial="hidden"
                              animate={["visible", "energyTouch"]}
                              className="inline-block text-white"
                              style={{ 
                                display: 'inline-block', 
                                minWidth: char === " " ? "0.3em" : "auto",
                                textShadow: "0 1px 0 #ccc, 0 2px 0 #b0b0b0, 0 5px 10px rgba(0,0,0,0.3)",
                                willChange: 'transform',
                                transform: `rotateX(10deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - charIndex) * -1.5}px)`
                              }}
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                        {wordIndex < meetOurWords.length - 1 && (
                          <span className="inline-block" style={{ minWidth: "0.3em" }}>&nbsp;</span>
                        )}
                      </span>
                    );
                  })}
                </span>
                <div className="smoke-layer smoke-layer-white smoke-1"></div>
                <div className="smoke-layer smoke-layer-white smoke-2"></div>
              </span>
              <br />
              <span className="inline-block smoky-container mx-2" style={{ perspective: "1000px" }}>
                <span className="relative inline-flex items-center flex-wrap justify-center" style={{ transformStyle: 'preserve-3d' }}>
                  {developersDesignersWords.map((word, wordIndex) => {
                    let charOffset = "Meet Our".length;
                    for (let w = 0; w < wordIndex; w++) {
                      charOffset += developersDesignersWords[w].length + 1;
                    }
                    return (
                      <span key={wordIndex} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, charIndex) => {
                          const globalIndex = charOffset + charIndex;
                          const center = word.length / 2;
                          const rotationY = (center - charIndex) * 6;
                          return (
                            <motion.span
                              key={charIndex}
                              custom={globalIndex}
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
                                transform: `rotateX(10deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - charIndex) * -2.5}px)`
                              }}
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                        {wordIndex < developersDesignersWords.length - 1 && (
                          <span className="inline-block" style={{ minWidth: "0.3em" }}>&nbsp;</span>
                        )}
                      </span>
                    );
                  })}
                </span>
                <div className="smoke-layer smoke-1"></div>
                <div className="smoke-layer smoke-2"></div>
                <div className="smoke-layer smoke-3"></div>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-400 max-w-[600px] mx-auto font-medium leading-relaxed">
              A collective of engineers, designers, and visionaries dedicated to building the future of the web.
            </p>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div id="team-grid" className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mb-16">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 h-full"
            >
              {/* Soft Gradient Glow Behind Card */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-[2.5rem] blur-xl -z-10 opacity-50"></div>
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                className="bg-[#090e17]/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 group hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col items-center text-center h-full relative"
              >
                {/* Team Member Photo */}
                <div className="relative w-32 h-32 mb-8 group-hover:scale-105 transition-transform duration-500 ease-out">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/5 group-hover:border-blue-400/40 transition-colors duration-500 shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{member.name}</h3>
              <div className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 px-4 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                {member.role}
              </div>

              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 flex-grow">
                {member.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {member.skills.map(skill => (
                  <span key={skill} className="text-[9px] font-bold text-gray-300 bg-white/5 px-3 py-1 rounded-md border border-white/10 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-5 pt-6 border-t border-white/5 w-full justify-center">
                <a href={member.social?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href={member.social?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href={member.social?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <CTA />
    </div>
  );
};

export default TeamPage;
