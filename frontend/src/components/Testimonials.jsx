import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Mr. Ayaan Sharma',
    role: 'CEO at TechBloom',
    content: 'CloudNexis built our SaaS platform in record time. Their attention to detail and UI/UX expertise is unmatched.',
    rating: 5,
    avatarBg: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Mr. Rehan Mukherjee',
    role: 'Founder of LocalBite',
    content: 'The mobile app they developed for us has a 4.9 rating on the App Store. Highly recommended for quality work.',
    rating: 5,
    avatarBg: 'from-indigo-500 to-purple-600'
  },
  {
    name: 'Mr. Zayan Chatterjee',
    role: 'Marketing Director',
    content: 'Our conversion rate increased by 40% after the website redesign. They truly understand business growth.',
    rating: 5,
    avatarBg: 'from-purple-500 to-pink-600'
  }
];

const TestimonialCard = ({ t, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX(-((y - centerY) / 12));
    setRotateY((x - centerX) / 12);
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
        className="group relative bg-[#090e17]/90 backdrop-blur-2xl p-6 sm:p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 text-left flex flex-col justify-between transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] overflow-hidden h-full"
      >
        <div className="absolute top-6 right-8 text-white/[0.03] group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform group-hover:scale-125">
          <Quote size={80} />
        </div>

        <div className="relative z-10">
          <div className="flex gap-1.5 mb-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            ))}
          </div>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed font-medium">
            "{t.content}"
          </p>
        </div>

        <div className="flex items-center gap-4 border-t border-white/5 pt-8 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center font-black text-white relative z-10 shadow-lg text-xl`}>
              {t.name[4]}
            </div>
          </div>
          <div>
            <div className="font-extrabold text-white text-base group-hover:text-blue-400 transition-colors tracking-tight">{t.name}</div>
            <div className="text-xs text-gray-400 font-extrabold uppercase tracking-widest mt-0.5">{t.role}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-transparent relative overflow-hidden z-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
          className="mb-20"
        >
          <h2 className="text-[clamp(2rem,8vw,4.5rem)] md:text-7xl font-black text-white mb-6 tracking-tighter px-4">
            Client <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">Voices</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed px-4">
            Discover what industry leaders say about our craftsmanship, speed, and strategic technical alignment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <TestimonialCard key={t.name} t={t} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
