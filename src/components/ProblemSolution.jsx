import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer, fadeIn } from '../utils/animations';
import { SearchX, ClockAlert, FileWarning, Briefcase, Zap, Cpu, Network, CheckCircle2, BrainCircuit, LayoutTemplate } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative transition-colors duration-500">
      
      {/* Problem Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Documents Are Slowing You Down
          </motion.h2>
          <motion.p variants={fadeIn} className="text-slate-600 dark:text-gray-400 text-lg">
            Traditional document review is a bottleneck. High volumes of unstructured data lead to delayed decisions and expensive oversights.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: SearchX, title: "Buried Insights", desc: "Critical information gets lost in massive 100+ page files." },
            { icon: ClockAlert, title: "Too Much Manual Reading", desc: "Professionals spend hours parsing instead of deciding." },
            { icon: FileWarning, title: "Risk of Human Error", desc: "Fatigue leads to missed codes, dates, and liability risks." },
            { icon: Briefcase, title: "Slow Workflows", desc: "Backlogs prevent timely patient care or claim settlement." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeIn}
              className="bg-red-900/10 border border-red-500/20 p-8 rounded-2xl relative overflow-hidden group hover:bg-red-900/20 transition-all"
            >
              <item.icon className="w-8 h-8 text-red-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      {/* Solution Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white font-display">
              AI That Understands Your Documents
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-400">
              Zumm completely inverts the workflow. Upload any unstructured document, and our domain-specific models generate structured, reliable data.
            </p>
            
            <ul className="space-y-6">
              {[
                { icon: Zap, label: "Instant Extraction", text: "Turn PDFs into JSON instantly." },
                { icon: Cpu, label: "Contextual Accuracy", text: "Understands medical, legal, and insurance terminology." },
                { icon: Network, label: "Connected Insights", text: "Builds timelines across multiple disparate documents." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--primary-dark)]/30 border border-[var(--primary)]/50 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[var(--primary-light)]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.label}</h4>
                    <p className="text-slate-600 dark:text-gray-400 text-sm">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Visual */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
            className="bg-white dark:bg-[#0B1120] rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-2xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 blur-[100px] rounded-full" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left: Problem */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-widest border border-red-500/20">
                  The Problem
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Fragmented, Unstructured Chaos</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Most industries still rely on manual eyes to scan thousands of pages. This is slow, error-prone, and impossible to scale without adding massive headcount.
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    "Average 4.5 hours per document review",
                    "Significant data entry fatigue & errors",
                    "Dark data remains unmined and wasted"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-400">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: AI Analysis Animation Block */}
              <div className="relative">
                <div className="aspect-square bg-slate-50 dark:bg-gray-900 rounded-3xl border border-slate-200 dark:border-white/5 p-6 flex items-center justify-center relative overflow-hidden">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="relative z-10"
                  >
                    <div className="w-24 h-24 bg-[var(--primary)] rounded-2xl flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse shadow-lg shadow-blue-500/20" />
                      <BrainCircuit className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--primary)]/10 blur-[80px] rounded-full" />
                  <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/10 blur-[60px] rounded-full" />
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
