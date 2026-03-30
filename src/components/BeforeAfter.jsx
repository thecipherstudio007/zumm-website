import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, FileText, Blocks, History, MousePointerClick, Zap, LayoutDashboard } from 'lucide-react';

export default function BeforeAfter() {
  const beforePoints = [
    { icon: FileText, text: "Long unstructured documents" },
    { icon: MousePointerClick, text: "Manual reading & data entry" },
    { icon: Blocks, text: "Scattered, decoupled patient data" },
    { icon: History, text: "No clear, chronological timeline" }
  ];

  const afterPoints = [
    { icon: Zap, text: "Wait-free structured insights" },
    { icon: LayoutDashboard, text: "Unified single-pane dashboard" },
    { icon: Blocks, text: "Correlated data across sources" },
    { icon: History, text: "Instant chronological timelines" }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-200/50 dark:border-emerald-800/50">
            Transformation
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white font-display">
            The Zumm Advantage
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Stop losing hours to manual chart review. Experience the difference when AI structures your data out-of-the-box.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Before Zumm */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-400 opacity-5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Before Zumm</h3>
            </div>

            <ul className="space-y-6">
              {beforePoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <point.icon className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-gray-300 font-medium">{point.text}</span>
                </li>
              ))}
            </ul>
            
            {/* Visual Rep */}
            <div className="mt-12 opacity-50 grayscale select-none">
              <div className="w-full h-32 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-4 flex flex-col gap-2 shadow-inner">
                <div className="h-2 w-full bg-slate-200 dark:bg-gray-800 rounded"></div>
                <div className="h-2 w-11/12 bg-slate-200 dark:bg-gray-800 rounded"></div>
                <div className="h-2 w-full bg-slate-200 dark:bg-gray-800 rounded"></div>
                <div className="h-2 w-4/5 bg-slate-200 dark:bg-gray-800 rounded"></div>
                <div className="h-2 w-full bg-slate-200 dark:bg-gray-800 rounded mt-2"></div>
              </div>
            </div>
          </motion.div>

          {/* After Zumm */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-3xl p-8 lg:p-12 relative shadow-2xl shadow-emerald-500/5 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 opacity-10 blur-[100px] rounded-full pointer-events-none group-hover:opacity-20 transition-opacity duration-1000"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">With Zumm</h3>
            </div>

            <ul className="space-y-6">
              {afterPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <point.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-800 dark:text-white font-medium">{point.text}</span>
                </li>
              ))}
            </ul>

            {/* Visual Rep */}
            <div className="mt-12 select-none">
              <div className="w-full h-32 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 flex gap-4 shadow-lg">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div className="h-2 w-20 bg-emerald-100 dark:bg-emerald-900/50 rounded"></div>
                  </div>
                  <div className="h-8 w-full bg-slate-50 dark:bg-gray-800 rounded-lg border border-slate-100 dark:border-gray-700"></div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-gray-800 rounded"></div>
                  <div className="h-2 w-3/4 bg-slate-100 dark:bg-gray-800 rounded"></div>
                </div>
                <div className="w-1/3 bg-slate-50 dark:bg-gray-800 rounded-lg border border-slate-100 dark:border-gray-700 p-2 flex flex-col gap-2 justify-center">
                   <div className="h-1.5 w-full bg-emerald-200 dark:bg-emerald-900/50 rounded"></div>
                   <div className="h-1.5 w-4/5 bg-emerald-200 dark:bg-emerald-900/50 rounded"></div>
                   <div className="h-1.5 w-full bg-emerald-200 dark:bg-emerald-900/50 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
