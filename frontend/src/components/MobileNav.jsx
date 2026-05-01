import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Briefcase, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileNav = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Layers },
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Contact', href: '/contact', icon: MessageSquare },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 z-[100] px-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-dark border border-white/10 rounded-[2rem] p-1.5 shadow-2xl flex justify-around items-center backdrop-blur-2xl"
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.name}
              to={link.href}
              className="relative group flex flex-col items-center p-2.5"
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon 
                size={18} 
                className={`relative z-10 transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-gray-500 group-hover:text-white'
                }`} 
              />
              <span className={`text-[8px] font-bold mt-0.5 uppercase tracking-widest relative z-10 transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'
              }`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MobileNav;
