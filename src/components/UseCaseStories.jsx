import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, FileSearch, Building2 } from 'lucide-react';

export default function UseCaseStories() {
  const stories = [
    {
      role: "Attending Physician",
      icon: Stethoscope,
      bg: "bg-gradient-to-br from-rose-500/10 to-transparent",
      quote: "Before Zumm, I spent 15 minutes per patient reviewing Epic histories. Now, I glance at the structured timeline for 30 seconds and know exactly what questions to ask.",
      outcome: "Saves 2 hours of chart review per shift."
    },
    {
      role: "Claims Adjuster",
      icon: Building2,
      bg: "bg-gradient-to-br from-blue-500/10 to-transparent",
      quote: "Extracting damage estimates and finding fault contradictions used to be a manual slog. Zumm automatically flags inconsistencies instantly.",
      outcome: "Increased daily claim processing by 40%."
    },
    {
      role: "Paralegal",
      icon: FileSearch,
      bg: "bg-gradient-to-br from-emerald-500/10 to-transparent",
      quote: "Summarizing a 400-page deposition used to take me a full day. Zumm generates an executive brief and pulls all key citations in minutes.",
      outcome: "Eliminated weekend document review work."
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:flex justify-between items-end gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 border border-rose-200/50 dark:border-rose-800/50">
              Customer Stories
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">
              Real Impact. Real Workflows.
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
              Hear how enterprise teams are transforming extreme administrative burdens into competitive advantages.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border border-slate-200 dark:border-gray-800 rounded-3xl p-8 ${story.bg} relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-none hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center border border-slate-200 dark:border-gray-800 shadow-sm">
                  <story.icon className="w-6 h-6 text-slate-700 dark:text-gray-300" />
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-lg">
                  {story.role}
                </div>
              </div>
              
              <p className="text-slate-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-medium italic mb-8">
                "{story.quote}"
              </p>
              
              <div className="inline-flex bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg font-bold text-sm">
                {story.outcome}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
