import React from 'react';
import { Zap, DollarSign, Users, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Fast Delivery',
    description: 'We prioritize speed without compromising quality, ensuring your project launches on time.',
    icon: <Zap className="text-yellow-400" />
  },
  {
    title: 'Affordable Pricing',
    description: 'Premium solutions that fit your budget. We offer transparent pricing with no hidden costs.',
    icon: <DollarSign className="text-green-400" />
  },
  {
    title: 'Startup Friendly',
    description: 'We understand the unique challenges startups face and provide scalable solutions that grow with you.',
    icon: <Users className="text-primary" />
  },
  {
    title: 'Scalable Solutions',
    description: 'Our architectures are built to handle growth, from 100 users to millions of daily active users.',
    icon: <ShieldCheck className="text-secondary" />
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#000000] relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Why <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">Partner</span> With Us
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            We combine technical mastery with a deep understanding of business goals to deliver high-fidelity results that actually matter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div 
              key={feature.title} 
              className="group relative glass p-8 rounded-[2rem] border-white/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                  {React.cloneElement(feature.icon, { size: 28 })}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
