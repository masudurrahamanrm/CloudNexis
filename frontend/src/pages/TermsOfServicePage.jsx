import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Award, Scale, HelpCircle, Briefcase, Key } from 'lucide-react';
import CTA from '../components/CTA';

const TermsOfServicePage = () => {
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
      icon: Scale,
      title: '1. Acceptance of Terms',
      content: 'By accessing and utilizing the development, design, and consulting services provided by CloudNexis, you agree to comply with and be bound by these Terms of Service. These terms constitute a legally binding agreement between you (the client) and CloudNexis.'
    },
    {
      icon: Briefcase,
      title: '2. Scope of Services',
      content: 'CloudNexis delivers bespoke technical solutions including but not limited to Web Application Development, Mobile Application Development, UI/UX Design, Cloud Infrastructure Engineering, and Technical Architecture Consulting. The specific scope, deliverables, and timelines for each engagement will be detailed in individual Statement of Work (SOW) documents.'
    },
    {
      icon: Key,
      title: '3. Intellectual Property Rights',
      content: 'Unless otherwise agreed upon in writing in a signed Statement of Work, all custom software, assets, source code, designs, and database architectures engineered explicitly for the Client shall become the sole property of the Client upon receipt of full and final payment.'
    },
    {
      icon: Award,
      title: '4. Client Obligations & Input',
      content: 'The success of development projects depends heavily on collaborative input. Clients are responsible for providing complete project specifications, assets, branding guidelines, APIs access, and timely milestone reviews. Delays in providing feedback may result in timeline adjustments.'
    },
    {
      icon: HelpCircle,
      title: '5. Governing Law & Dispute Resolution',
      content: 'These terms and any projects executed under them shall be governed by and construed in accordance with the laws of West Bengal, India. Any disputes arising from or related to our services shall be subject to the exclusive jurisdiction of the courts located in Kolkata, India.'
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
            <FileText size={12} />
            Service Agreement
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Terms of <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Last updated: May 19, 2026. Please read our service agreement terms carefully before initiating any development or design partnership.
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
              Thank you for choosing CloudNexis. The following terms outline the conditions, responsibilities, and guidelines governing the design and engineering services we deliver. Engaging our team for any project signifies your acknowledgement and acceptance of these conditions.
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

export default TermsOfServicePage;
