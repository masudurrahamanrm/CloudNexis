import React from 'react';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Build Something Great</h2>
            <p className="text-gray-400 mb-10 text-lg">
              Have a project in mind? We'd love to hear from you. Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email Us</div>
                  <div className="text-white font-bold text-xl">hello@cloudnexis.in</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">WhatsApp</div>
                  <div className="text-white font-bold text-xl">+91 98765 43210</div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all">
                Chat on WhatsApp
              </button>
            </div>
          </div>

          <div className="glass p-10 rounded-3xl border-white/10">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors appearance-none">
                  <option className="bg-dark">Website Development</option>
                  <option className="bg-dark">Mobile App Development</option>
                  <option className="bg-dark">UI/UX Design</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                ></textarea>
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
