import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/animations';
import { UploadCloud, Wand2, LineChart } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Upload Documents",
      desc: "Drag and drop PDFs, images, or raw text. Connect directly to your EMR or secure storage via our APIs.",
      icon: UploadCloud
    },
    {
      num: "02",
      title: "AI Processing",
      desc: "Our proprietary LLMs extract entities, map industry codes, and build relationship graphs automatically.",
      icon: Wand2
    },
    {
      num: "03",
      title: "Get Insights",
      desc: "Instantly view structured timelines, comprehensive summaries, and actionable data inside your dashboard.",
      icon: LineChart
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-gray-900 border-y border-slate-200/60 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      {/* Safe Background Tint Layer */}
      <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.03] dark:hidden pointer-events-none"></div>
      <div className="absolute inset-0 hidden dark:block bg-gray-900/30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">How It Works</h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">Three simple steps to transform messy data into intelligence.</p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-30" />

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeIn} className="relative flex flex-col items-center text-center group">
                
                <div className="w-32 h-32 rounded-full border border-slate-200/60 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-center mb-8 relative z-10 group-hover:border-[var(--primary)] transition-colors duration-500 shadow-xl shadow-slate-200/30 dark:shadow-none">
                  <div className="absolute inset-2 rounded-full border border-[var(--primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <step.icon className="w-10 h-10 text-slate-600 dark:text-gray-400 group-hover:text-[var(--primary-light)] transition-colors" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-slate-200/60 dark:border-gray-900 flex items-center justify-center font-bold text-sm text-[var(--primary-light)]">
                    {step.num}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white font-display">{step.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
                
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
