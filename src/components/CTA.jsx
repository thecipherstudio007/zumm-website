import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import { ArrowRight, Sparkles } from 'lucide-react';
import DemoButton from './DemoButton';

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-50 dark:bg-[#0B1120] transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-100 dark:opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--primary)] opacity-[0.03] dark:opacity-10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-12 md:p-20 rounded-[3rem] text-center shadow-2xl dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative z-10 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 dark:bg-white/10 text-[var(--primary)] dark:text-white font-medium mb-4 backdrop-blur-md border border-[var(--primary)]/20 dark:border-white/10 uppercase tracking-wider text-xs">
              <Sparkles className="w-4 h-4 text-[var(--primary)] dark:text-[var(--primary-light)]" />
              Ready to transform your workflow?
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white max-w-3xl mx-auto font-display">
              Focus on care. <br aria-hidden="true" className="hidden md:block"/> Not paperwork.
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
              Make faster, better decisions while spending less time on administrative work. Upgrade to the enterprise AI workflow platform today.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 pt-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <DemoButton className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center gap-2 font-bold shadow-lg shadow-[var(--primary)]/20">
                  Book Demo <ArrowRight className="w-5 h-5" />
                </DemoButton>
                <a href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-center">
                  Try Sample
                </a>
                <a href="mailto:sales@zumm.ai" className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent text-slate-500 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors text-center">
                  Contact Sales
                </a>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
                Schedule a 30-minute demo at your convenience
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
