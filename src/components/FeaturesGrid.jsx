import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/animations';
import { FileSearch, Code2, GitMerge, Combine, LayoutDashboard, Puzzle } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      colSpan: "md:col-span-2 lg:col-span-2",
      title: "AI Report Summarization",
      desc: "Generate concise clinical summaries from long reports",
      icon: FileSearch,
      bg: "bg-gradient-to-br from-gray-50 dark:from-gray-900 to-gray-100 dark:to-gray-800",
      highlight: true
    },
    {
      colSpan: "md:col-span-1 lg:col-span-1",
      title: "Structured Data Extraction",
      desc: "Convert unstructured documents into clean, structured data",
      icon: Code2,
      bg: "bg-gray-50 dark:bg-gray-900"
    },
    {
      colSpan: "md:col-span-1 lg:col-span-1",
      title: "Medical Code Mapping",
      desc: "Automatically map conditions to ICD-10, SNOMED, RxNorm",
      icon: GitMerge,
      bg: "bg-gray-50 dark:bg-gray-900"
    },
    {
      colSpan: "md:col-span-2 lg:col-span-1",
      title: "Multi-Document Context",
      desc: "Cross-reference entities, timelines, and facts across dozens of disjointed files simultaneously.",
      icon: Combine,
      bg: "bg-gray-50 dark:bg-gray-900"
    },
    {
      colSpan: "md:col-span-3 lg:col-span-2",
      title: "Timeline Generation",
      desc: "View patient journey in chronological order",
      icon: LayoutDashboard,
      bg: "bg-gradient-to-tr from-[var(--primary)]/5 dark:from-[var(--primary)]/10 to-transparent",
      highlight: true
    },
    {
      colSpan: "md:col-span-3 lg:col-span-1",
      title: "API & SDK Integrations",
      desc: "Headless first. Embed Zumm's intelligence directly into your existing software via REST API or Node/Python SDKs.",
      icon: Puzzle,
      bg: "bg-gray-50 dark:bg-gray-900"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-200/50 dark:border-blue-800/50">
            Core Intelligence
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">Everything you need to automate</h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            From medical record summarization to insurance claim extraction, Zumm's engine handles it all with perfect accuracy.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={fadeIn}
              className={`p-8 rounded-3xl border border-slate-200/60 dark:border-white/5 relative overflow-hidden group hover:border-[var(--primary)]/50 dark:hover:border-[var(--primary)]/50 transition-all hover:shadow-2xl hover:shadow-[var(--primary)]/5 ${feature.bg} ${feature.colSpan}`}
            >
              {feature.highlight && (
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--primary)] opacity-10 blur-[40px] group-hover:opacity-20 transition-opacity" />
              )}
              
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 border border-slate-300/50 dark:border-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-[var(--primary-light)]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display">{feature.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
