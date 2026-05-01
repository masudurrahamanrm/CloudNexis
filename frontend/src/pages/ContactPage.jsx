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
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

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
        title: 'New Project Inquiry', // Added title for the subject line
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

  return (
    <div className="min-h-screen bg-[#000000] pt-44 pb-16 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-red-600/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            Let's <span className="bg-gradient-to-r from-[#ff0000] via-[#ef4444] to-[#991b1b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_12px_rgba(255,0,0,0.3)]">Connect</span>
          </h1>
          <p className="text-base text-gray-400 max-w-lg mx-auto font-medium">
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
            <motion.div key={i} variants={itemVariants} className="glass p-4 rounded-xl flex flex-col items-center text-center group border-white/5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-red-500 mb-3">
                <item.icon size={20} />
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">{item.label}</div>
              <div className="text-white font-bold text-xs">{item.value}</div>
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
          <div className="glass p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden group border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/5 via-transparent to-red-900/5 opacity-50"></div>
            
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative z-10 py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-400 font-medium mb-8">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-red-600 hover:text-white transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-red-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-red-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+91 00000 00000"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white focus:border-red-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 ml-1">Interested In</label>
                      <div className="flex flex-wrap gap-2">
                        {servicesList.map((service) => (
                          <button 
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`px-3 py-1.5 rounded-full border text-[9px] font-bold transition-all ${
                              formData.services.includes(service)
                              ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-red-500 hover:text-white'
                            }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 ml-1">Message</label>
                    <textarea 
                      required
                      rows="3" 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your project goals..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-red-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    className="w-full bg-white text-black hover:bg-red-600 hover:text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div key={item} className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
