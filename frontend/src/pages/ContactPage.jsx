import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, CheckCircle2, Loader2, Phone } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    services: []
  });
  const [status, setStatus] = useState('idle');

  const servicesList = ['Web Dev', 'App Dev', 'UI/UX', 'Cloud'];

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setStatus('loading');

    const selectedServices = formData.services.length > 0 
      ? formData.services.join(', ') 
      : 'No services selected';

    const emailData = {
      service_id: 'service_dek3glv',
      template_id: 'template_h7zwgie',
      user_id: '3fHwrbgsJe0xbg1QF',
      template_params: {
        name: formData.name,
        user_name: formData.name,
        email: formData.email,
        user_email: formData.email,
        phone: formData.phone,
        user_phone: formData.phone,
        services: selectedServices,
        user_services: selectedServices,
        interested: selectedServices,
        user_interest: selectedServices,
        message: formData.message,
        time: new Date().toLocaleString(),
        title: 'New Project Inquiry',
        to_name: 'CloudNexis Team'
      }
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', services: [] });
      } else {
        setStatus('error');
        alert('Something went wrong. Please check your EmailJS template variables.');
      }
    } catch (error) {
      setStatus('error');
      alert('Error connecting to the server.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const reactiveLetterVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    energyTouch: (i) => ({
      y: [0, -8, 0],
      scale: [1, 1.08, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatDelay: 0.5,
        delay: i * 0.15, 
        ease: "easeInOut"
      }
    })
  };

  const letsLetters = "Let's".split("");
  const connectLetters = "Connect".split("");

  return (
    <div className="bg-transparent overflow-hidden relative z-10 w-full pt-[120px] pb-[80px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-[clamp(2.5rem,10vw,5rem)] md:text-8xl font-black text-white mb-6 tracking-tighter leading-tight">
            <span className="inline-block smoky-container mx-2" style={{ perspective: "1000px" }}>
              <span className="relative inline-flex items-center" style={{ transformStyle: 'preserve-3d' }}>
                {letsLetters.map((char, i) => {
                  const center = letsLetters.length / 2;
                  const rotationY = (center - i) * 6;
                  return (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={reactiveLetterVariants}
                      initial="hidden"
                      animate={["visible", "energyTouch"]}
                      className="inline-block text-white"
                      style={{ 
                        display: 'inline-block', 
                        minWidth: char === " " ? "0.3em" : "auto",
                        textShadow: "0 1px 0 #ccc, 0 2px 0 #b0b0b0, 0 5px 10px rgba(0,0,0,0.3)",
                        willChange: 'transform',
                        transform: `rotateX(10deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - i) * -2}px)`
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
              <div className="smoke-layer smoke-layer-white smoke-1"></div>
              <div className="smoke-layer smoke-layer-white smoke-2"></div>
            </span>
            <br className="sm:hidden" />
            <span className="inline-block smoky-container mx-2" style={{ perspective: "1000px" }}>
              <span className="relative inline-flex items-center" style={{ transformStyle: 'preserve-3d' }}>
                {connectLetters.map((char, i) => {
                  const center = connectLetters.length / 2;
                  const rotationY = (center - i) * 5;
                  return (
                    <motion.span
                      key={i}
                      custom={i + letsLetters.length}
                      variants={reactiveLetterVariants}
                      initial="hidden"
                      animate={["visible", "energyTouch"]}
                      className="inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent"
                      style={{ 
                        display: 'inline-block', 
                        minWidth: char === " " ? "0.3em" : "auto",
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: "0 1px 0 #1e3a8a, 0 2px 0 #1d4ed8, 0 8px 15px rgba(0,0,0,0.3)",
                        willChange: 'transform',
                        transform: `rotateX(10deg) rotateY(${rotationY}deg) translateZ(${Math.abs(center - i) * -3}px)`
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
              <div className="smoke-layer smoke-1"></div>
              <div className="smoke-layer smoke-2"></div>
              <div className="smoke-layer smoke-3"></div>
            </span>
          </h1>
          <p className="text-base text-gray-400 max-w-lg mx-auto font-medium leading-relaxed mt-4">
            Ready to scale? We're here to help you build the next big thing.
          </p>
        </motion.div>

        {/* Info Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full"
        >
          {[
            { icon: Mail, label: 'Email', value: 'cloudnexis.solution@gmail.com' },
            { icon: MessageSquare, label: 'WhatsApp', value: '+91 93399 50143' },
            { icon: MapPin, label: 'Location', value: 'Kolkata, India' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants} 
              className="bg-[#090e17]/80 backdrop-blur-xl p-5 rounded-2xl flex flex-col items-center text-center group border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/[0.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500 shadow-xl"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-500 shadow-md">
                <item.icon size={20} />
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">{item.label}</div>
              <div className="text-gray-200 font-bold text-xs sm:truncate max-w-[200px] group-hover:text-white transition-colors">{item.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-[#090e17]/90 backdrop-blur-2xl p-6 sm:p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden group border border-white/5 shadow-2xl hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5 opacity-50 pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative z-10 py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-400 font-medium mb-8 leading-relaxed">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 ml-1">Full Name</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01, border: "1px solid rgba(59, 130, 246, 0.5)", backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.3 }}
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none transition-all shadow-inner placeholder:text-gray-600 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 ml-1">Email Address</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01, border: "1px solid rgba(59, 130, 246, 0.5)", backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.3 }}
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none transition-all shadow-inner placeholder:text-gray-600 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <motion.input 
                          whileFocus={{ scale: 1.01, border: "1px solid rgba(59, 130, 246, 0.5)", backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                          transition={{ duration: 0.3 }}
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+91 00000 00000"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white outline-none transition-all shadow-inner placeholder:text-gray-600 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 ml-1">Interested In</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {servicesList.map((service) => (
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`px-4 py-1.5 rounded-full border text-[10px] font-bold transition-all cursor-pointer ${
                              formData.services.includes(service)
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-blue-500/50 hover:text-white'
                            }`}
                          >
                            {service}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 ml-1">Message</label>
                    <motion.textarea 
                      whileFocus={{ scale: 1.005, border: "1px solid rgba(59, 130, 246, 0.5)", backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                      transition={{ duration: 0.3 }}
                      required
                      rows="4" 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your project goals..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none transition-all resize-none shadow-inner placeholder:text-gray-600 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    ></motion.textarea>
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] bg-[length:200%_auto] hover:bg-[right_center] py-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-500 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Send Inquiry
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Promise Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          {['24h Response', 'Dedicated PM', 'Free Consulting'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/5 shadow-sm">
              <CheckCircle2 size={14} className="text-blue-400" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
