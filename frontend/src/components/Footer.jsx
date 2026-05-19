import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { Facebook, Instagram, Linkedin } from './BrandIcons';

const Footer = () => {
  return (
    <footer className="pt-20 sm:pt-32 pb-16 bg-transparent border-t border-white/5 relative overflow-hidden z-10">
      {/* Subtle Space Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-1.5 group cursor-pointer">
              <div className="p-1 rounded-xl group-hover:scale-110 transition-all duration-300 overflow-hidden">
                <img src="/logo.png" alt="CloudNexis Logo" className="w-12 h-12 object-contain rounded-xl scale-[1.5]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                Cloud<span className="text-blue-400">Nexis</span>
              </span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
              We engineer high-performance digital experiences, from sleek startups to enterprise-scale cloud architectures.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/CloudNexis.in/' },
                { Icon: Instagram, href: 'https://www.instagram.com/cloudnexis.in' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/cloudnexis/' }
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-md"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-10">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Portfolio', 'About', 'Team', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to={`/${link === 'Home' ? '' : link.toLowerCase()}`} className="text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-10">Our Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'App Development', 'UI/UX Design', 'Digital Marketing', 'Cloud Solutions'].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-10">Connect With Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/10 transition-colors shrink-0 shadow-md">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Email Us</div>
                  <div className="text-gray-300 font-bold text-sm sm:truncate">cloudnexis.solution@gmail.com</div>
                </div>
              </li>
              <li className="flex gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/10 transition-colors shrink-0 shadow-md">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">WhatsApp</div>
                  <div className="text-gray-300 font-bold text-sm">+91 93399 50143</div>
                </div>
              </li>
              <li className="flex gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/10 transition-colors shrink-0 shadow-md">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Location</div>
                  <div className="text-gray-300 font-bold text-sm">Kolkata, India</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-[11px] font-bold uppercase tracking-[0.1em]">
          <p>© {new Date().getFullYear()} CloudNexis Technologies. Designed for Excellence.</p>
          <div className="flex gap-10">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
