import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import DemoButton from './DemoButton.jsx';

export default function Differentiation() {
  const compareItems = [
    { feature: "Chronological Timeline Generation", zumm: true, others: false },
    { feature: "Structured JSON Data Export", zumm: true, others: false },
    { feature: "Multi-Industry Fine-Tuning", zumm: true, others: false },
    { feature: "End-to-End Workflow Automation", zumm: true, others: false },
    { feature: "Basic Text Summarization", zumm: true, others: true },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1120] relative border-y border-slate-200/60 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">
            Why Choose Zumm?
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg">
            We don't just summarize text. We parse, structure, and visualize intelligence.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-slate-200/60 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/30 dark:shadow-none">
          {/* Header */}
          <div className="grid grid-cols-5 bg-slate-100 dark:bg-gray-950/50 p-6 border-b border-slate-200 dark:border-white/10">
            <div className="col-span-3 font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider text-sm">Capability</div>
            <div className="col-span-1 text-center font-bold text-[var(--primary)] text-lg">Zumm</div>
            <div className="col-span-1 text-center font-semibold text-slate-500 dark:text-gray-500">Other LLMs</div>
          </div>

          {/* Body */}
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {compareItems.map((item, i) => (
              <motion.div 
                key={i} 
                className="grid grid-cols-5 p-6 items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="col-span-3 font-medium text-slate-800 dark:text-gray-200">{item.feature}</div>
                <div className="col-span-1 flex justify-center">
                  {item.zumm ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <X className="w-6 h-6 text-slate-300 dark:text-gray-600" />}
                </div>
                <div className="col-span-1 flex justify-center">
                  {item.others ? <CheckCircle2 className="w-6 h-6 text-emerald-500 opacity-50" /> : <X className="w-6 h-6 text-slate-300 dark:text-gray-600" />}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-slate-50 dark:bg-gray-950/50 p-6 flex justify-center border-t border-slate-200 dark:border-white/10">
            <DemoButton className="px-8 py-3 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-slate-900 dark:text-white font-bold transition-all">
              Experience the Difference
            </DemoButton>
          </div>
        </div>

      </div>
    </section>
  );
}
