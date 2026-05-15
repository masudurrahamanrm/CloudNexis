import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign, Users, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Fast Delivery',
    description: 'We prioritize speed without compromising quality, ensuring your project launches on time.',
    icon: <Zap className="text-yellow-400" />,
    gradient: 'from-amber-500/20 to-yellow-500/5',
    borderHover: 'hover:border-yellow-500/40'
  },
  {
    title: 'Affordable Pricing',
    description: 'Premium solutions that fit your budget. We offer transparent pricing with no hidden costs.',
    icon: <DollarSign className="text-emerald-400" />,
    gradient: 'from-emerald-500/20 to-teal-500/5',
    borderHover: 'hover:border-emerald-500/40'
  },
  {
    title: 'Startup Friendly',
    description: 'We understand the unique challenges startups face and provide scalable solutions that grow with you.',
    icon: <Users className="text-blue-400" />,
    gradient: 'from-blue-500/20 to-indigo-500/5',
    borderHover: 'hover:border-blue-500/40'
  },
  {
    title: 'Scalable Solutions',
    description: 'Our architectures are built to handle growth, from 100 users to millions of daily active users.',
    icon: <ShieldCheck className="text-purple-400" />,
    gradient: 'from-purple-500/20 to-pink-500/5',
    borderHover: 'hover:border-purple-500/40'
  }
];

const FeatureCard = ({ feature, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX(-((y - centerY) / 10));
    setRotateY((x - centerX) / 10);
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
        className={`group relative bg-[#090e17]/90 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/5 ${feature.borderHover} transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden h-full flex flex-col justify-between`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
        
        <div className="relative z-10">
          <div className="w-14 h-14 bg-white/[0.08] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            {React.cloneElement(feature.icon, { size: 28 })}
          </div>
          <h3 className="text-xl font-extrabold text-white mb-4 group-hover:text-white transition-colors tracking-tight">{feature.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed font-medium">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-24 bg-transparent relative overflow-hidden z-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
          >
            <h2 className="text-[clamp(2rem,8vw,4.5rem)] md:text-7xl font-black text-white mb-6 tracking-tighter px-4">
              Why <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]">Partner</span> With Us
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed px-4">
              We combine technical mastery with a deep understanding of business goals to deliver high-fidelity results that actually matter.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
