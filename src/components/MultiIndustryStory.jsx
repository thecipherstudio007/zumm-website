import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Scale, ArrowRight } from 'lucide-react';

export default function MultiIndustryStory() {
  const industries = [
    {
      title: "Healthcare",
      icon: Activity,
      color: "text-rose-500",
      bgLight: "bg-rose-50 dark:bg-rose-500/10",
      borderColor: "border-rose-100 dark:border-rose-500/20",
      description: "Patient insights & timelines",
      stats: "Reduce chart review time by 60%",
      imagePath: "clinical-records.pdf"
    },
    {
      title: "Insurance",
      icon: ShieldCheck,
      color: "text-blue-500",
      bgLight: "bg-blue-50 dark:bg-blue-500/10",
      borderColor: "border-blue-100 dark:border-blue-500/20",
      description: "Claims extraction & risk analysis",
      stats: "Process accident claims 5x faster",
      imagePath: "claim-form-104.pdf"
    },
    {
      title: "Legal",
      icon: Scale,
      color: "text-emerald-500",
      bgLight: "bg-emerald-50 dark:bg-emerald-500/10",
      borderColor: "border-emerald-100 dark:border-emerald-500/20",
      description: "Case summarization & evidence structuring",
      stats: "Find deposition contradictions instantly",
      imagePath: "v-smith-deposition.pdf"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-gray-950 relative border-t border-slate-200/60 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-200/50 dark:border-blue-800/50">
              Broad Domain Support
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white font-display">
              One AI Platform. <span className="text-[var(--primary)]">Multiple Industries.</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
              Zumm's underlying large language models are heavily fine-tuned across disparate, highly-regulated domains to understand domain-specific nuances perfectly.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((ind, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col h-full relative overflow-hidden"
             >
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-100 dark:bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 pointer-events-none" />
               
               <div className={`w-14 h-14 rounded-2xl ${ind.bgLight} ${ind.borderColor} border flex items-center justify-center mb-6`}>
                 <ind.icon className={`w-7 h-7 ${ind.color}`} />
               </div>
               
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{ind.title}</h3>
               <p className="text-slate-600 dark:text-gray-400 font-medium mb-6 flex-1">{ind.description}</p>
               
               <div className="bg-slate-50 dark:bg-black/30 p-4 rounded-xl border border-slate-200/60 dark:border-white/5 mb-6">
                 <div className="flex items-center gap-2 mb-2 text-xs font-mono text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Simulated Input
                 </div>
                 <div className="text-sm font-mono text-[var(--primary)] truncate bg-[var(--primary)]/10 px-2 py-1 rounded">
                   {ind.imagePath}
                 </div>
               </div>

               <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-6 mt-auto">
                 <span className="text-sm font-bold text-slate-800 dark:text-gray-300">{ind.stats}</span>
                 <ArrowRight className={`w-5 h-5 ${ind.color} group-hover:translate-x-1 transition-transform`} />
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
