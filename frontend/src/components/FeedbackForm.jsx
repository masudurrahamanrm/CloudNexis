import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      // You can add logic here to send data to your backend or email
      console.log('Feedback Submitted:', { ...formData, rating });
    }, 1000);
  };

  return (
    <section className="py-24 bg-[#000000] relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Share Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-gray-400 font-medium">Your feedback helps us grow and serve you better.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 relative overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors font-medium placeholder:text-white/20"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Role / Company</label>
                    <input
                      required
                      type="text"
                      placeholder="CEO at TechCorp"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors font-medium placeholder:text-white/20"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-center py-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 block mb-4">Your Rating</label>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="transition-transform active:scale-90"
                      >
                        <Star
                          size={32}
                          className={`${
                            star <= (hover || rating)
                              ? 'fill-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]'
                              : 'text-white/10'
                          } transition-all duration-300`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-4">Your Story</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell us about your project with CloudNexis..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors font-medium placeholder:text-white/20 resize-none"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={!rating || !formData.name || !formData.content}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black flex items-center justify-center gap-3 group"
                >
                  Submit Feedback
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-16 rounded-[2.5rem] border-white/5 text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={40} className="text-primary" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Thank You!</h3>
              <p className="text-gray-400 font-medium mb-8">
                Your feedback has been received. We truly appreciate you taking the time to share your experience.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', role: '', content: '' });
                  setRating(0);
                }}
                className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Send Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeedbackForm;
