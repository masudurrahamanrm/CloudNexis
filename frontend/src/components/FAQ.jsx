import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-[#000000] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Common <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">Queries</span>
          </h2>
          <p className="text-gray-500 font-medium">Everything you need to know about starting your project with Cloud<span className="text-primary">Nexis</span>.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`rounded-[2rem] transition-all duration-500 border ${isOpen ? 'bg-white/5 border-primary/30 shadow-2xl shadow-primary/10' : 'bg-[#050505] border-white/5 hover:border-white/10'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 md:p-8 text-left flex justify-between items-center group transition-all"
                >
                  <span className={`font-bold transition-all duration-300 ${isOpen ? 'text-white text-lg' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-white/5 text-gray-500'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-8 pt-0 text-gray-500 font-medium leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
