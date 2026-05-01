import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center pt-44 pb-16 overflow-hidden bg-[#000000]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-red-600/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >


            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              We Build <br />
              <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">
                Modern Apps
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed font-medium">
              Scale your business with high-performance websites and mobile solutions tailored for the next generation of startups.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5 mb-12">
              <Link to="/contact" className="btn-primary flex items-center gap-2 group">
                Get a Free Quote
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/portfolio" className="btn-secondary flex items-center gap-2 group">
                <Play size={20} className="fill-white group-hover:scale-110 transition-transform" />
                Our Portfolio
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                <span className="text-sm font-medium text-gray-300">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                <span className="text-sm font-medium text-gray-300">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                <span className="text-sm font-medium text-gray-300">Scalable Tech</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -2 }}
            animate={{ opacity: 1, scale: 0.8, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="relative perspective-1000 scale-90 lg:scale-100"
          >
            {/* The main preview card */}
            <div className="relative z-10 glass p-2 rounded-[2rem] overflow-hidden glow-box transform hover:rotate-1 transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-30"></div>
              <img
                src="/dashboard.jpg"
                alt="CloudNexis Dashboard"
                className="rounded-[1.5rem] w-full shadow-2xl relative z-10"
              />
            </div>

            {/* Floating UI Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-6 glass-dark p-6 rounded-2xl hidden xl:block z-20 border border-primary/20"
            >
              <div className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Revenue Growth</div>
              <div className="text-2xl font-black text-white">+148%</div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-red-500 w-2/3 h-full rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-12 glass-dark p-6 rounded-2xl hidden xl:block z-20 border border-secondary/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <CheckCircle2 className="text-red-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Project Status</div>
                  <div className="text-lg font-bold text-white">Live & Optimized</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
