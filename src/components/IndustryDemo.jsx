import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIndustry } from '../context/IndustryContext';
import { Activity, ShieldCheck, Scale, FileJson, ArrowRightCircle } from 'lucide-react';

export default function IndustryDemo() {
  const { industry, setIndustry } = useIndustry();

  const demoContent = {
    healthcare: {
      headline: "Extract clinical timelines in seconds",
      demoCard: "CLINICAL_NOTES_789.pdf",
      output: [
        { label: "Diagnoses", value: "Type 2 Diabetes, Hypertension" },
        { label: "Medications", value: "Metformin 500mg, Lisinopril 10mg" },
        { label: "Codes", value: "ICD-10: E11.9, I10" }
      ]
    },
    insurance: {
      headline: "Extract claims data instantly",
      demoCard: "CLAIM_FORM_A8X.pdf",
      output: [
        { label: "Incident", value: "Rear-end collision (Fault: Other)" },
        { label: "Damages estimated", value: "$4,250.00" },
        { label: "Fraud Risk", value: "Low (0.02)" }
      ]
    },
    legal: {
      headline: "Understand case files at a glance",
      demoCard: "DEPOSITION_SMITH_v_JONES.pdf",
      output: [
        { label: "Key finding", value: "Contradiction in timeline (Op. Pg 42)" },
        { label: "Entities involved", value: "John Smith, ACME Corp." },
        { label: "Summary", value: "Breach of contract occurred on 10/12/23" }
      ]
    }
  };

  const industries = [
    { id: 'healthcare', label: 'Healthcare', icon: Activity },
    { id: 'insurance', label: 'Insurance', icon: ShieldCheck },
    { id: 'legal', label: 'Legal', icon: Scale },
  ];

  const current = demoContent[industry];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 glow-top-primary dark:bg-gray-950 transition-colors duration-500">
      {/* Safe Background Tint Layer */}
      <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.03] dark:hidden pointer-events-none"></div>
      <div className="absolute inset-0 hidden dark:block bg-gray-900/30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white font-display">See It In Action</h2>
          
          {/* Section Toggle */}
          <div className="inline-flex bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/10 p-1.5 rounded-2xl w-full max-w-md mx-auto shadow-2xl backdrop-blur-sm">
            {industries.map((ind) => {
              const Icon = ind.icon;
              const isActive = industry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setIndustry(ind.id)}
                  className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all duration-300 relative ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-gray-500 dark:text-gray-500 hover:text-slate-700 dark:text-gray-300'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="demo-active-bg"
                      className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-[var(--primary-light)]' : ''}`} />
                  <span className="text-xs font-semibold relative z-10">{ind.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Demo Interface */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="border-b border-slate-200/60 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 p-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="ml-4 text-xs font-mono text-gray-500 dark:text-gray-500">zumm-playground</div>
          </div>
          
          <div className="p-8 md:p-12 lg:grid lg:grid-cols-2 gap-12 items-center bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-950">
            <AnimatePresence mode="wait">
              <motion.div 
                key={industry + "-text"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mb-12 lg:mb-0"
              >
                <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white font-display">{current.headline}</h3>
                <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-sm">Just upload the document and let our proprietary AI models extract structured, actionable insights instantly.</p>
                
                {/* Simulated Upload Card */}
                <div className="bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center gap-4 hover:bg-white/10 transition-colors w-full max-w-sm cursor-pointer shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                  <FileJson className="w-12 h-12 text-[var(--primary-light)] mb-2" />
                  <span className="font-mono text-sm text-slate-700 dark:text-gray-300">{current.demoCard}</span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary-light)] bg-white/5 px-3 py-1.5 rounded-full">
                    <ArrowRightCircle className="w-4 h-4" /> Run Extraction
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Simulated Output Panel */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={industry + "-box"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white dark:bg-gray-950 border border-slate-200/60 dark:border-gray-800 rounded-2xl p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] h-full min-h-[300px]"
              >
                <div className="absolute top-0 right-1/4 w-32 h-32 bg-[var(--primary-dark)] blur-[60px] opacity-40 rounded-full pointer-events-none" />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-6 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[var(--primary)]" />
                  Structured Output
                </h4>
                
                <div className="space-y-4">
                  {current.output.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/5 p-4 rounded-xl shadow-md"
                    >
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-medium tracking-wide uppercase block mb-1">{item.label}</span>
                      <span className="text-[var(--primary-light)] font-mono text-sm">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
