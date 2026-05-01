import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 bg-[#000000] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="relative glass p-10 md:p-16 rounded-[2.5rem] text-center overflow-hidden border-white/5 group shadow-2xl">
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0000]/10 via-transparent to-[#ef4444]/10 opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
              Ready to build <br className="hidden md:block" />
              your <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">vision</span>?
            </h2>
            <p className="text-base text-gray-500 mb-10 max-w-lg mx-auto font-medium leading-relaxed">
              Join 500+ forward-thinking businesses that trust CloudNexis to engineer their digital future.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500 group"
            >
              Start Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
