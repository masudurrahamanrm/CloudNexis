import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Rocket, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$499',
    icon: Zap,
    description: 'Perfect for new startups and personal brands.',
    features: ['Single Page Website', 'Responsive Design', 'SEO Optimization', '1 Month Support', 'Hosting Setup'],
    popular: false,
    color: 'from-red-600/10 to-transparent'
  },
  {
    name: 'Business',
    price: '$1,499',
    icon: Rocket,
    description: 'The standard for growing businesses and SMEs.',
    features: ['Multi-page Website', 'Custom UI/UX Design', 'CMS Integration', '3 Months Support', 'Speed Optimization', 'Social Media'],
    popular: true,
    color: 'from-primary/20 to-secondary/10'
  },
  {
    name: 'Pro',
    price: 'Custom',
    icon: Crown,
    description: 'Tailored solutions for complex enterprise needs.',
    features: ['Custom Web/Mobile App', 'Advanced Integrations', 'Priority Support', 'Lifetime Maintenance', 'Infrastructure', 'Dedicated Team'],
    popular: false,
    color: 'from-secondary/15 to-primary/5'
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="pt-44 pb-24 bg-[#000000] relative overflow-hidden">
      {/* Dynamic Background Elements - Hero Style Synchronization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-red-600/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            Transparent <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Choose a plan that fits your business goals. No hidden fees, just pure value.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-[2.5rem] glass border-white/5 flex flex-col h-full group overflow-hidden ${
                plan.popular ? 'scale-105 z-10 border-primary/30 shadow-2xl shadow-primary/10' : ''
              }`}
            >
              {/* Background Glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${plan.color} rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-700`}></div>
              
              {plan.popular && (
                <div className="absolute top-6 right-8 bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                  Best Value
                </div>
              )}

              <div className="relative z-10 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <plan.icon size={24} className={plan.popular ? 'text-red-500' : 'text-gray-400'} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-sm text-gray-500 font-medium">/project</span>}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">{plan.description}</p>
              </div>

              <div className="relative z-10 space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${plan.popular ? 'bg-primary/20' : 'bg-white/10'}`}>
                      <Check size={12} className={plan.popular ? 'text-primary' : 'text-gray-400'} />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`relative z-10 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                plan.popular 
                ? 'bg-white text-black hover:bg-primary hover:text-white shadow-xl shadow-white/5' 
                : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
