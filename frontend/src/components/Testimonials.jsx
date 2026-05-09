import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Mr. Ayaan Sharma',
    role: 'CEO at TechBloom',
    content: 'CloudNexis built our SaaS platform in record time. Their attention to detail and UI/UX expertise is unmatched.',
    rating: 5
  },
  {
    name: 'Mr. Rehan Mukherjee',
    role: 'Founder of LocalBite',
    content: 'The mobile app they developed for us has a 4.9 rating on the App Store. Highly recommended for quality work.',
    rating: 5
  },
  {
    name: 'Mr. Zayan Chatterjee',
    role: 'Marketing Director',
    content: 'Our conversion rate increased by 40% after the website redesign. They truly understand business growth.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#000000] relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-20 tracking-tighter">
          Client <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">Voices</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="p-8 md:p-10 rounded-[2.5rem] glass border-white/5 text-left flex flex-col justify-between group hover:border-primary/20 transition-all duration-500">
              <div>
                <div className="flex gap-1 mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
                  "{t.content}"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-white relative z-10">
                    {t.name[0]}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-primary transition-colors">{t.name}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
