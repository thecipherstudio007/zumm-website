import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Search, ArrowRight, MousePointerClick } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';

export default function PdfNavigationSection() {
  const { industry } = useIndustry();

  const labels = {
    healthcare: {
      tag: "Traceability & Verifiability",
      heading: "Go Directly to the Source",
      p: "Click any extracted insight and instantly jump to the exact highlighted section in the original PDF. No more manual searching through long reports just to verify hallucination-free answers.",
      pdfName: "patient_chart_v2.pdf",
      highlightTitle: "Diagnosis: Type 2 Diabetes",
      highlightSnippet: "Patient presents with elevated HbA1c levels of 8.2% and reports increased thirst..."
    },
    insurance: {
      tag: "Audit-Ready Claims",
      heading: "Go Directly to the Source",
      p: "Click any extracted policy detail or claim factor and instantly jump to the exact highlighted section. No more manual searching through long legal policies.",
      pdfName: "master_policy_v4.pdf",
      highlightTitle: "Coverage Exclusion",
      highlightSnippet: "Pre-existing conditions documented prior to the initialization of the policy term are explicitly excluded..."
    },
    legal: {
      tag: "Evidence Tracing",
      heading: "Go Directly to the Source",
      p: "Click any insight and instantly jump to the exact section in the original document. No need to manually search through long legal files.",
      pdfName: "master_contract_v2.pdf",
      highlightTitle: "Indemnification",
      highlightSnippet: "Party A assumes all liability regarding damages incurred post-delivery spanning the initial 90 day term..."
    }
  };

  const curr = labels[industry] || labels.healthcare;
  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute left-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Text Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-semibold">
             <Search className="w-4 h-4" />
             {curr.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white font-display">
            {curr.heading}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
            {curr.p}
          </p>
          <ul className="space-y-3 pt-4">
             {['100% Traceable extractions', 'Auto-scrolls to exact page and paragraph', 'Prevents AI hallucinations'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-gray-300 font-medium">
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                   {item}
                </li>
             ))}
          </ul>
        </div>

        {/* Interactive UI Mock */}
        <div className="flex flex-col sm:flex-row gap-4 h-[450px] bg-slate-100 dark:bg-gray-900 p-4 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-xl">
          
          {/* Insights Panel */}
          <div className="w-full sm:w-1/3 bg-white dark:bg-gray-950 rounded-2xl border border-slate-200 dark:border-gray-800 p-4 flex flex-col gap-3 shadow-sm">
             <h4 className="font-bold text-slate-800 dark:text-white text-sm pb-2 border-b border-slate-100 dark:border-gray-800">Key Extracted Clauses</h4>
             
             <div className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 p-3 rounded-xl opacity-50 blur-[1px]">
               <div className="h-2 w-3/4 bg-slate-300 dark:bg-gray-600 rounded mb-2" />
               <div className="h-2 w-1/2 bg-slate-300 dark:bg-gray-600 rounded" />
             </div>

             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="bg-blue-50 dark:bg-blue-900/20 border-2 border-[var(--primary)] p-3 rounded-xl cursor-pointer relative group"
             >
               <MousePointerClick className="w-5 h-5 absolute -right-2 -top-2 text-[var(--primary)] animate-bounce" />
               <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{curr.highlightTitle}</h5>
               <p className="text-xs text-slate-600 dark:text-gray-300 mb-3">{curr.highlightSnippet.substring(0,60)}...</p>
               <button className="text-[10px] font-bold text-white bg-[var(--primary)] px-2 py-1 rounded shadow-sm w-full flex justify-center items-center gap-1">
                 View in Report <ArrowRight className="w-3 h-3" />
               </button>
             </motion.div>

             <div className="bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 p-3 rounded-xl opacity-50 blur-[1px]">
               <div className="h-2 w-2/3 bg-slate-300 dark:bg-gray-600 rounded mb-2" />
               <div className="h-2 w-full bg-slate-300 dark:bg-gray-600 rounded" />
             </div>
          </div>

          {/* PDF Viewer Mock */}
          <div className="w-full sm:w-2/3 bg-white dark:bg-gray-950 rounded-2xl border border-slate-200 dark:border-gray-800 flex flex-col overflow-hidden shadow-sm relative">
             <div className="bg-slate-100 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 p-3 flex justify-between items-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
               <div className="flex items-center gap-2"><FileSearch className="w-4 h-4" /> {curr.pdfName}</div>
               <div>Page 12 / 84</div>
             </div>
             
             <div className="p-6 flex-1 bg-slate-50 dark:bg-[#1C1C1E] overflow-hidden relative flex justify-center">
                {/* PDF Page Outline */}
                <div className="w-full max-w-sm bg-white dark:bg-gray-200 shadow-md h-[800px] border border-slate-300 relative -top-10 transition-transform duration-1000 transform translate-y-12">
                   {/* Blur paragraphs top */}
                   <div className="p-8 space-y-4 opacity-30">
                     <div className="h-2 w-full bg-slate-400 rounded" />
                     <div className="h-2 w-5/6 bg-slate-400 rounded" />
                     <div className="h-2 w-4/6 bg-slate-400 rounded" />
                     <div className="h-2 w-full bg-slate-400 rounded" />
                   </div>

                   {/* Highlighted section */}
                   <div className="px-8 py-4 relative group">
                      <div className="absolute inset-0 bg-yellow-200/50 mix-blend-multiply border-l-4 border-yellow-400" />
                      <div className="relative space-y-3">
                        <div className="text-[10px] font-bold text-slate-800 uppercase mb-2">{curr.highlightTitle}</div>
                        <div className="h-1.5 w-full bg-slate-600 rounded" />
                        <div className="h-1.5 w-5/6 bg-slate-600 rounded" />
                        <div className="h-1.5 w-full bg-slate-600 rounded" />
                        <div className="h-1.5 w-3/4 bg-slate-600 rounded" />
                      </div>
                   </div>

                   {/* Blur paragraphs bottom */}
                   <div className="p-8 space-y-4 opacity-30">
                     <div className="h-2 w-full bg-slate-400 rounded" />
                     <div className="h-2 w-full bg-slate-400 rounded" />
                     <div className="h-2 w-2/3 bg-slate-400 rounded" />
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
