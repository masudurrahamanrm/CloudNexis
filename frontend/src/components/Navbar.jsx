import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 top-6">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-5xl mx-auto transition-all duration-500 rounded-xl ${
          scrolled ? 'glass-dark py-2 px-6 shadow-2xl' : 'py-3 px-6 bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-1.5 group cursor-pointer"
          >
            <div className="p-1 rounded-lg group-hover:scale-110 transition-all duration-300 overflow-hidden">
              <img src="/logo.png" alt="CloudNexis Logo" className="w-10 h-10 object-contain rounded-lg scale-[1.5]" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              Cloud<span className="text-primary">Nexis</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-gray-400 hover:text-white transition-all font-semibold text-xs uppercase tracking-widest relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link 
              to="/contact" 
              onClick={() => handleLinkClick('/contact')}
              className="bg-white text-black px-5 py-2 rounded-full font-bold text-xs hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 group"
            >
              Start Project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Only: About Link */}
          <div className="md:hidden">
            <Link 
              to="/about" 
              onClick={() => handleLinkClick('/about')}
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300"
            >
              About
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
