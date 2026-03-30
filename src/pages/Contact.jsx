import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageSquare, MapPin, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Name, Email, and Message are required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    try {
      // Production URL should be an env variable in a real setup
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden relative">
      <SEO 
        title="Contact Us" 
        description="Get in touch with the Zumm team for sales inquiries, support, or custom implementation questions."
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-16">
        
        {/* Left Col */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
            Get in <span className="text-[var(--primary)]">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 mb-12">
            Whether you have a question about our API, pricing, or need a custom implementation, our team is ready to answer all your questions.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">Sales & Support</h4>
                <p className="text-slate-600 dark:text-gray-400 mt-1">Our experts are available 24/7 to help you structure your document workflows.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">Direct Email</h4>
                <p className="text-[var(--primary)] font-medium mt-1">hello@zumm.ai</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">Headquarters</h4>
                <p className="text-slate-600 dark:text-gray-400 mt-1">100 Innovation Drive<br/>San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Form */}
        <div className="bg-slate-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/10 shadow-xl p-8 rounded-3xl h-fit">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-5"
              >
                {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">{error}</div>}
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Name *</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Company</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-slate-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Message *</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-slate-900 dark:text-white h-32 resize-none"
                  />
                </div>
                
                <button 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white transition-all flex justify-center items-center h-14 mt-4"
                >
                  {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Send Message"}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent</h3>
                <p className="text-slate-600 dark:text-gray-400">Thank you for reaching out. A member of our team will contact you shortly.</p>
                <button onClick={() => setIsSuccess(false)} className="mt-8 text-sm font-semibold text-[var(--primary)] hover:underline">
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
