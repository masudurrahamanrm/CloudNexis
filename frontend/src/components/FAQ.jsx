import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer: 'Typical landing pages take 1-2 weeks, while complex websites can take 4-8 weeks depending on features.'
  },
  {
    question: 'What technologies do you use?',
    answer: 'We specialize in modern stacks like React, Next.js, Node.js, and React Native for mobile apps.'
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, we provide ongoing maintenance and support packages to ensure your site stays secure and updated.'
  },
  {
    question: 'How flexible is your pricing?',
    answer: 'We offer tiered pricing and custom quotes to fit different budgets and project requirements.'
  }
];

const FAQCard = ({ faq, index, isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`rounded-2xl transition-all duration-500 border backdrop-blur-2xl ${isOpen ? 'bg-white/[0.08] border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.15)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
    >
      <button 
        onClick={onClick}
        className="w-full p-5 sm:p-6 text-left flex justify-between items-center group transition-all cursor-pointer"
      >
        <span className={`font-extrabold transition-all duration-300 tracking-tight sm:text-lg ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
          {faq.question}
        </span>
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 shadow-md flex-shrink-0 ml-4 ${isOpen ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rotate-180 shadow-[0_0_12px_rgba(59,130,246,0.4)]' : 'bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 sm:p-6 pt-0 text-gray-300 font-medium leading-relaxed text-sm sm:text-base">
          {faq.answer}
        </div>
      </div>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX(-((y - centerY) / 30));
    setRotateY((x - centerX) / 30);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="py-16 sm:py-20 bg-transparent relative overflow-hidden z-10">

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
            className="relative bg-[#090e17]/90 backdrop-blur-2xl p-5 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-blue-500/40 group shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all duration-700 max-w-3xl mx-auto"
          >
            {/* Animated Background Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

            <div className="text-center mb-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-[clamp(1.8rem,7vw,4rem)] md:text-6xl font-black text-white mb-4 tracking-tighter px-2">
                  Common <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">Queries</span>
                </h2>
                <p className="text-gray-400 font-medium text-sm sm:text-base max-w-lg mx-auto px-4">Everything you need to know about starting your project with Cloud<span className="text-blue-400 font-bold">Nexis</span>.</p>
              </motion.div>
            </div>
            
            <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
              {faqs.map((faq, index) => (
                <FAQCard 
                  key={index} 
                  faq={faq} 
                  index={index} 
                  isOpen={openIndex === index} 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)} 
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
