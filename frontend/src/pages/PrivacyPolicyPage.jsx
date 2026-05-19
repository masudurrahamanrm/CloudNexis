import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText, Globe, CheckCircle } from 'lucide-react';
import CTA from '../components/CTA';

const PrivacyPolicyPage = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: 'easeOut' } 
    }
  };

  const sections = [
    {
      icon: Eye,
      title: '1. Information We Collect',
      content: 'We collect information to provide better services to all our clients. This includes personal information you provide directly (such as name, email address, phone number, and project requirements when filling out our contact forms) and technical usage data collected automatically (such as IP addresses, browser types, and navigation patterns on our site).'
    },
    {
      icon: Lock,
      title: '2. How We Use Information',
      content: 'We use the collected information to deliver, maintain, protect, and improve our services, develop new solutions, and communicate with you. Your details allow us to respond to inquiries, send milestone updates, process billing, and provide dedicated support throughout the development lifecycle.'
    },
    {
      icon: Shield,
      title: '3. Data Security & Storage',
      content: 'CloudNexis takes data security extremely seriously. We implement robust, industry-standard administrative, technical, and physical security measures to protect your personal information and code repositories from unauthorized access, alteration, disclosure, or destruction.'
    },
    {
      icon: Globe,
      title: '4. Third-Party Sharing',
      content: 'We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our trusted business partners and hosting/cloud providers for the sole purpose of rendering services.'
    },
    {
      icon: CheckCircle,
      title: '5. Your Rights & Choices',
      content: 'You have the right to request access to the personal data we hold about you, request corrections to any inaccuracies, or request the deletion of your data from our systems. To exercise these rights, please contact our privacy compliance officer at our official email.'
    }
  ];

  return (
    <div className="bg-transparent overflow-hidden relative z-10 w-full pt-[120px] pb-[80px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <motion.div 
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-bold mb-4 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Shield size={12} />
            Data Protection
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Privacy <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Last updated: May 19, 2026. Learn how we safeguard your personal information, protect your project data, and maintain absolute confidentiality.
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-[#090e17]/80 backdrop-blur-2xl p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-10 mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5 opacity-30 pointer-events-none rounded-[2.5rem]"></div>
          
          <div className="prose prose-invert max-w-none relative z-10">
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8">
              At CloudNexis, privacy and security are foundational pillars. This Privacy Policy outlines the types of information we collect, how we store and protect it, and the choices you can make regarding your data. By using our website and services, you consent to the data practices described in this document.
            </p>

            <div className="space-y-8">
              {sections.map((section, idx) => (
                <div key={idx} className="border-t border-white/5 pt-8 first:border-0 first:pt-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                      <section.icon size={16} />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{section.title}</h2>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed ml-11">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-8 mt-12 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <FileText size={14} className="text-blue-400" />
                <span>Questions? Contact us at <a href="mailto:cloudnexis.solution@gmail.com" className="text-blue-400 hover:underline">cloudnexis.solution@gmail.com</a></span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
      <CTA />
    </div>
  );
};

export default PrivacyPolicyPage;
