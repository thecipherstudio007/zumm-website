import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Sparkles } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';

export default function DocumentChatSection() {
  const { industry } = useIndustry();
  const [activeQuery, setActiveQuery] = useState(0);

  // Reset selected query when industry changes
  useEffect(() => {
    setActiveQuery(0);
  }, [industry]);

  const queriesData = {
    healthcare: [
      {
        q: "What are the patient's diagnoses?",
        a: "The patient has 3 active diagnoses documented:\n\n1. **Type 2 Diabetes Mellitus** (E11.9)\n2. **Essential Hypertension** (I10)\n3. **Hyperlipidemia** (E78.5)\n\nThese were confirmed during the latest primary care encounter on Oct 14th."
      },
      {
        q: "Show recent medications",
        a: "Recent prescriptions extracted from the discharge summary:\n\n- **Lisinopril 10mg** (Daily)\n- **Metformin 500mg** (Twice daily)\n- **Atorvastatin 20mg** (Nightly)"
      },
      {
        q: "What are the risk factors?",
        a: "Based on the clinical notes, the following risk factors are present:\n\n- **Family history** of premature coronary artery disease\n- **Current smoker** (1 pack/day)\n- **Sedentary lifestyle**\n- Elevated cardiovascular risk due to combined hypertension and smoking status."
      }
    ],
    insurance: [
      {
        q: "What is the claim amount?",
        a: "The total requested claim amount is **$12,500.00** submitted on Nov 12th by Premium Health Coverage policyholder."
      },
      {
        q: "Is this claim high risk?",
        a: "This claim has been flagged as **Medium Risk**.\n\nContributing factors:\n- **High claim value** relative to policy averages.\n- **Missing documentation** (Invoice #4021 is illegible).\n- **Repeated claims** (3 similar orthopedic claims in past 18 months)."
      },
      {
        q: "Show missing documents",
        a: "The following documents are missing or fail validation:\n\n- **Itemized Hospital Invoice** (Required for amounts > $5,000)\n- **Provider Attestation Form** (Missing signature on Page 4)"
      }
    ],
    legal: [
      {
        q: "What is the main issue in this case?",
        a: "The primary legal issue in *Smith vs ABC Corp* is an alleged **Breach of Agreement**.\n\nThe plaintiff claims the defendant failed to deliver required software milestones per Section 4.2 of the Master Contract."
      },
      {
        q: "What are the key arguments?",
        a: "Key arguments extracted from the preliminary filings:\n\n**Plaintiff (Smith)**:\n- Deliverables were 45 days late.\n- Code failed to pass security compliance audits.\n\n**Defendant (ABC Corp)**:\n- Delays were caused by plaintiff's scope changes via email.\n- Security compliance was not explicitly defined in the original SOW."
      },
      {
        q: "Show important clauses",
        a: "Relevant clauses referenced in this dispute:\n\n- **Sec 4.2 (Delivery schedule)**: Requires milestones to be delivered net-30.\n- **Sec 12.1 (Indemnification)**: Limits liability to the total contract value.\n- **Sec 8.4 (Scope changes)**: Requires written SOW amendments for scope modifications."
      }
    ]
  };

  const queries = queriesData[industry] || queriesData.healthcare;

  const descriptions = {
    healthcare: "Use natural language to instantly find insights from complex medical records. Stop reading hundreds of pages and simply ask the Zumm Engine to analyze, find risks, or list medications.",
    insurance: "Use natural language to instantly find insights from complex claim files. Stop manually reviewing policy coverage and simply ask the Zumm Engine to check amounts, risks, or missing documents.",
    legal: "Use natural language to instantly find insights from complex case files. Stop reading hundreds of pages of discovery and simply ask the Zumm Engine to extract key insights or find clauses."
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-gray-900 border-y border-slate-200/60 dark:border-gray-800 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Chat UI Mock */}
        <div className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 shadow-2xl rounded-3xl overflow-hidden flex flex-col w-full h-auto min-h-[500px]">
          
          <div className="bg-slate-100 dark:bg-gray-900 p-4 border-b border-slate-200 dark:border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white leading-tight">Zumm AI Agent</h3>
              <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1"><Sparkles className="w-3 h-3"/> Active on {industry === 'healthcare' ? '412 page Medical Record' : industry === 'insurance' ? '128 page Claim File' : '840 page Discovery File'}</p>
            </div>
          </div>

          <div className="flex-1 p-6 space-y-6 bg-slate-50 dark:bg-black/20 overflow-visible">
             
             <AnimatePresence mode="wait">
               <motion.div 
                 key={activeQuery}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-6"
               >
                 {/* User Bubble */}
                 <div className="flex justify-end">
                   <div className="bg-[var(--primary)] text-white rounded-2xl rounded-tr-sm px-5 py-3 text-sm shadow-md max-w-[80%]">
                     {queries[activeQuery].q}
                   </div>
                 </div>

                 {/* AI Bubble */}
                 <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-gray-800 flex items-center justify-center shrink-0">
                     <Bot className="w-4 h-4 text-slate-600 dark:text-gray-400" />
                   </div>
                   <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 rounded-2xl rounded-tl-sm p-5 text-sm shadow-sm whitespace-pre-wrap leading-relaxed w-full">
                     {queries[activeQuery].a}

                     <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center gap-2">
                       <span className="text-xs text-slate-400 font-semibold uppercase">Citations:</span>
                       <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded cursor-pointer hover:underline">Page 12</span>
                       <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded cursor-pointer hover:underline">Page 45</span>
                     </div>
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>

          </div>

          <div className="p-4 bg-white dark:bg-gray-950 border-t border-slate-200 dark:border-gray-800 mt-auto">
             <div className="flex flex-wrap gap-2 mb-3 pb-1">
                {queries.map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveQuery(i)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      activeQuery === i 
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary-dark)] dark:text-[var(--primary-light)]' 
                        : 'bg-slate-50 dark:bg-gray-900 border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-400 hover:border-slate-300 dark:hover:border-gray-700'
                    }`}
                  >
                    {q.q}
                  </button>
                ))}
             </div>
             <div className="relative">
               <input 
                 type="text" 
                 disabled
                 placeholder="Ask a question..." 
                 className="w-full bg-slate-100 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] opacity-50 cursor-not-allowed"
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--primary)] text-white rounded-lg opacity-50 cursor-not-allowed">
                 <Send className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 lg:pl-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-semibold">
             <MessageSquare className="w-4 h-4" />
             Conversational AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white font-display">
            Ask Anything About the {industry === 'healthcare' ? 'Intelligence Profile' : industry === 'insurance' ? 'Claim Data' : 'Case Intelligence'}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
            {descriptions[industry] || descriptions.healthcare}
          </p>
        </div>

      </div>
    </section>
  );
}
