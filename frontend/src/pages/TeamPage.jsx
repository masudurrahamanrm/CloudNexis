import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Sparkles, Code2, Palette, Cpu } from 'lucide-react';
import { Facebook, Instagram, Linkedin } from '../components/BrandIcons';
import CTA from '../components/CTA';

const TeamPage = () => {
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

  return (
    <div className="min-h-screen bg-[#000000] overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 pt-44 pb-32">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-red-500 text-xs font-bold mb-8 uppercase tracking-widest">
              <Sparkles size={14} />
              The Minds Behind Cloud<span className="text-primary">Nexis</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
              Meet Our <br />
              <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">Elite Team</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
              A collective of engineers, designers, and visionaries dedicated to building the future of the web.
            </p>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[2.5rem] border-white/5 group hover:border-red-500/20 transition-all duration-500 relative flex flex-col items-center text-center"
            >
              {/* Team Member Photo */}
              <div className="relative w-32 h-32 mb-8 group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-red-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/5 group-hover:border-red-500/30 transition-colors duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">{member.name}</h3>
              <div className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-6 px-4 py-1 bg-red-500/5 rounded-full border border-red-500/10">
                {member.role}
              </div>

              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                {member.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {member.skills.map(skill => (
                  <span key={skill} className="text-[9px] font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/5 w-full justify-center">
                <a href={member.social?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href={member.social?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href={member.social?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CTA />
    </div>
  );
};

export default TeamPage;
