import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle2, UploadCloud, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function Careers() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { title: "Senior AI Engineer", dept: "Engineering", loc: "Remote" },
    { title: "Product Designer", dept: "Design", loc: "San Francisco, CA" },
    { title: "Enterprise Account Executive", dept: "Sales", loc: "New York, NY" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !file) {
      setError("Please fill out all visible fields and upload a resume.");
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      data.append('resume', file);

      const response = await fetch(`${API_BASE_URL}/careers/`, {
        method: 'POST',
        body: data, // fetch automatically sets the correct multipart boundary
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setFile(null);
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-[600px] mesh-gradient-light dark:hidden opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-16">
        
        {/* Left Col: Info & Roles */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
            Join Us in Building the <br/><span className="text-[var(--primary)]">Future of AI</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 mb-12">
            We are a team of engineers, designers, and domain experts dedicated to automating the world's most complex documentation workflows.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[var(--primary)]" /> Open Roles
          </h3>
          
          <div className="space-y-4">
            {roles.map((role, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 border border-slate-200/60 dark:border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-[var(--primary)]/50 transition-colors group cursor-pointer">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[var(--primary)] transition-colors">{role.title}</h4>
                  <div className="flex gap-3 text-sm text-slate-500 mt-1">
                    <span>{role.dept}</span>
                    <span>•</span>
                    <span>{role.loc}</span>
                  </div>
                </div>
                <button className="text-sm font-semibold text-[var(--primary)]">Apply</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Application Form */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200/60 dark:border-white/10 shadow-2xl p-8 rounded-3xl h-fit">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">General Application</h3>
          
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
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-slate-900 dark:text-white"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-slate-900 dark:text-white"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Resume Upload</label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full px-4 py-6 rounded-xl bg-slate-50 dark:bg-gray-950 border-2 border-dashed ${file ? 'border-[var(--primary)]' : 'border-slate-300 dark:border-white/20'} flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--primary)] transition-colors`}
                  >
                    {file ? (
                      <>
                        <FileText className="w-6 h-6 text-[var(--primary)] mb-2" />
                        <span className="text-sm font-medium text-[var(--primary)] truncate w-full px-4">{file.name}</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                        <span className="text-sm font-medium text-slate-600 dark:text-gray-400">Click to upload PDF or DOCX</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-gray-300 mb-2">Why Zumm?</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-slate-900 dark:text-white h-32 resize-none"
                    placeholder="Tell us why you'd be a great fit..."
                  />
                </div>
                
                <button 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white transition-all flex justify-center items-center h-14"
                >
                  {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Submit Application"}
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
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank you!</h3>
                <p className="text-slate-600 dark:text-gray-400">We have received your application and will get back to you shortly.</p>
                <button onClick={() => setIsSuccess(false)} className="mt-8 text-sm font-semibold text-[var(--primary)] hover:underline">
                  Submit another application
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
