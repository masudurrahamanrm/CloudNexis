import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
    <nav className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 top-4 sm:top-6 pointer-events-none">
      <motion.div 
        className={`max-w-5xl mx-auto transition-all duration-500 rounded-2xl sm:rounded-full border pointer-events-auto ${
          scrolled || isMobileMenuOpen
            ? 'bg-[#090e17]/40 border-blue-500/30 backdrop-blur-xl py-2 sm:py-3 px-5 sm:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
            : 'bg-white/[0.03] border-white/10 backdrop-blur-md py-3 sm:py-4 px-5 sm:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/20 hover:bg-white/[0.06]'
        }`}
      >
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="p-1 rounded-lg group-hover:scale-110 transition-all duration-300 overflow-hidden">
              <img src="/logo.png" alt="CloudNexis Logo" className="w-10 h-10 object-contain rounded-lg scale-[1.5]" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              Cloud<span className="text-blue-400 font-bold">Nexis</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`${
                    isActive ? 'text-white font-extrabold' : 'text-gray-400 font-semibold'
                  } hover:text-white transition-all text-xs uppercase tracking-widest relative group cursor-pointer`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ${
                    isActive ? 'w-full shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link 
              to="/contact" 
              onClick={() => handleLinkClick('/contact')}
              className="bg-white/5 border border-blue-500/30 text-white px-6 py-2.5 rounded-full font-black text-xs hover:bg-blue-600/10 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer backdrop-blur-md shadow-lg"
            >
              <span>Start Project</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Link */}
          <div className="md:hidden flex items-center">
            <Link 
              to="/about"
              onClick={() => handleLinkClick('/about')}
              className="text-gray-300 hover:text-white transition-all text-xs uppercase tracking-widest font-bold px-2 py-1 relative group"
            >
              ABOUT
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 py-6 border-t border-white/10 mt-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className={`${
                        isActive ? 'text-blue-400 font-extrabold' : 'text-gray-300 font-semibold'
                      } hover:text-white transition-all text-sm uppercase tracking-[0.2em] px-2`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <Link 
                  to="/contact" 
                  onClick={() => handleLinkClick('/contact')}
                  className="mt-2 bg-white/5 border border-blue-500/30 text-white px-6 py-4 rounded-xl font-black text-sm text-center shadow-lg hover:bg-blue-600/10 hover:border-blue-500/50 transition-all backdrop-blur-md"
                >
                  Start Project
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
