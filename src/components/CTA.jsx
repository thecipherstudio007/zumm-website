import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import { ArrowRight, Sparkles } from 'lucide-react';
import DemoButton from './DemoButton';

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0B1120] transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 mesh-gradient-dark opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--primary)] opacity-10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative z-10 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-medium mb-4 backdrop-blur-md border border-white/10 uppercase tracking-wider text-xs">
              <Sparkles className="w-4 h-4 text-[var(--primary-light)]" />
              Ready to transform your workflow?
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-white max-w-3xl mx-auto font-display">
              Focus on care. <br aria-hidden="true" className="hidden md:block"/> Not paperwork.
            </h2>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
              Make faster, better decisions while spending less time on administrative work. Upgrade to the enterprise AI workflow platform today.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 pt-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <DemoButton className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--primary)] text-slate-900 font-bold hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center gap-2">
                  Book Demo <ArrowRight className="w-5 h-5" />
                </DemoButton>
                <a href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 border border-white/10 text-white font-bold hover:bg-white/20 transition-colors text-center">
                  Try Sample
                </a>
                <a href="mailto:sales@zumm.ai" className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent text-slate-400 font-bold hover:text-white transition-colors text-center">
                  Contact Sales
                </a>
              </div>
              <p className="text-sm font-medium text-slate-400 mt-2">
                Schedule a 30-minute demo at your convenience
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
