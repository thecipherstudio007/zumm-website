import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';

export default function HealthCodesSection() {
  const { industry } = useIndustry();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, [industry]);

  const contentData = {
    healthcare: {
      tag: "Data Structuring",
      heading: "Standardized Medical Codes — Instantly Organized",
      p: "Zumm automatically detects and maps medical conditions into standardized coding systems without human intervention.",
      cta: "Explore structured insights",
      tabs: [{ id: 'icd10', label: 'ICD-10' }, { id: 'rxnorm', label: 'RxNorm' }, { id: 'snomed', label: 'SNOMED' }],
      col1: "Condition / Medication", col2: "Code", col3: "Status",
      color: "blue",
      data: [
        [
          { c1: 'Type 2 Diabetes Mellitus', c2: 'E11.9', c3: 'Mapped', style: 'emerald' },
          { c1: 'Essential Hypertension', c2: 'I10', c3: 'Mapped', style: 'emerald' },
          { c1: 'Chronic Kidney Disease', c2: 'N18.9', c3: 'Mapped', style: 'emerald' }
        ],
        [
          { c1: 'Metformin Hydrochloride', c2: '861004', c3: 'Verified', style: 'emerald' },
          { c1: 'Lisinopril 10mg', c2: '314076', c3: 'Verified', style: 'emerald' },
          { c1: 'Atorvastatin 20mg', c2: '259255', c3: 'Verified', style: 'emerald' }
        ],
        [
          { c1: 'Chest Pain', c2: '29857009', c3: 'Extracted', style: 'emerald' },
          { c1: 'Shortness of breath', c2: '267036007', c3: 'Extracted', style: 'emerald' },
          { c1: 'Tachycardia', c2: '3424008', c3: 'Extracted', style: 'emerald' }
        ]
      ]
    },
    insurance: {
      tag: "Fraud Prevention",
      heading: "Automated Fraud Detection",
      p: "AI highlights potential fraud indicators, extracting suspicious patterns and duplicate claims automatically for faster review.",
      cta: "Review risk factors",
      tabs: [{ id: 'fraud', label: 'Fraud Detection' }, { id: 'risk', label: 'Risk Flags' }, { id: 'anomalies', label: 'Anomalies' }],
      col1: "Indicator", col2: "Severity", col3: "Action",
      color: "red",
      data: [
        [
          { c1: 'Duplicate Billing Pattern', c2: 'High', c3: 'Flagged', style: 'red' },
          { c1: 'Inconsistent Service Dates', c2: 'Medium', c3: 'Review', style: 'orange' },
          { c1: 'Unusual Provider Distance', c2: 'Medium', c3: 'Review', style: 'orange' }
        ],
        [
          { c1: 'High Claim Velocity', c2: 'High', c3: 'Escalated', style: 'red' },
          { c1: 'Missing Authorization', c2: 'Critical', c3: 'Blocked', style: 'red' },
          { c1: 'Historically High Denials', c2: 'Low', c3: 'Logged', style: 'gray' }
        ],
        [
          { c1: 'Procedure Code Mismatch', c2: 'Medium', c3: 'Review', style: 'orange' },
          { c1: 'Weekend Emergency Surcharge', c2: 'Low', c3: 'Cleared', style: 'emerald' },
          { c1: 'Overlapping Admissions', c2: 'Critical', c3: 'Flagged', style: 'red' }
        ]
      ]
    },
    legal: {
      tag: "Document Analysis",
      heading: "Extract Critical Legal Obligations",
      p: "Automatically parse contracts to isolate key clauses, monitor obligations, and instantly flag potential agreement violations.",
      cta: "Analyze legal documents",
      tabs: [{ id: 'obligations', label: 'Key Obligations' }, { id: 'violations', label: 'Violations' }, { id: 'clauses', label: 'Critical Clauses' }],
      col1: "Entity / Clause", col2: "Category", col3: "Assessment",
      color: "purple",
      data: [
        [
          { c1: 'Monthly Software Delivery', c2: 'Milestone', c3: 'At Risk', style: 'orange' },
          { c1: 'Security Compliance Audit', c2: 'Regulatory', c3: 'Pending', style: 'gray' },
          { c1: 'Data Truncation Rules', c2: 'Privacy', c3: 'Compliant', style: 'emerald' }
        ],
        [
          { c1: 'Failure to Deliver (45 days)', c2: 'Breach', c3: 'Likely', style: 'red' },
          { c1: 'Unauthorized Subcontracting', c2: 'Contractual', c3: 'Confirmed', style: 'red' },
          { c1: 'Missing Uptime SLA', c2: 'Performance', c3: 'Review', style: 'orange' }
        ],
        [
          { c1: 'Mutual Indemnification', c2: 'Liability', c3: 'Standard', style: 'emerald' },
          { c1: 'Arbitration Agreement', c2: 'Dispute', c3: 'Standard', style: 'emerald' },
          { c1: 'Non-Compete Expansion', c2: 'Restrictive', c3: 'Flagged', style: 'orange' }
        ]
      ]
    }
  };

  const curr = contentData[industry] || contentData.healthcare;

  return (
    <section className="py-24 bg-[#0B1120] relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 mesh-gradient-dark opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Left side: Content */}
        <div className="flex-1 space-y-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${curr.color}-500/10 text-${curr.color}-400 text-sm font-semibold border border-${curr.color}-500/20`}>
             {industry === 'insurance' ? <ShieldAlert className="w-4 h-4" /> : industry === 'legal' ? <FileText className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
             {curr.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white font-display">
            {curr.heading}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
            {curr.p}
          </p>
          <button className="flex items-center gap-2 text-[var(--primary-light)] font-bold hover:gap-3 transition-all">
             {curr.cta} <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right side: Interactive UI */}
        <div className="flex-1 w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl p-6 shadow-xl relative">
          
          <div className="flex gap-2 mb-6 bg-white dark:bg-gray-950 p-1 rounded-xl w-fit shadow-sm border border-slate-100 dark:border-gray-800">
             {curr.tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    activeTab === idx 
                      ? 'bg-[var(--primary)] text-white shadow-md' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                   {tab.label}
                </button>
             ))}
          </div>

          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden shadow-sm">
             <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-100/50 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
               <div className="col-span-6">{curr.col1}</div>
               <div className="col-span-3">{curr.col2}</div>
               <div className="col-span-3 text-right">{curr.col3}</div>
             </div>

             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab + industry}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.2 }}
                 className="divide-y divide-slate-100 dark:divide-gray-800"
               >
                 {curr.data[activeTab].map((row, i) => (
                   <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors items-center">
                     <div className="col-span-6 text-sm font-semibold text-slate-800 dark:text-gray-200">{row.c1}</div>
                     <div className="col-span-3">
                       <span className="bg-[var(--primary)]/10 text-[var(--primary-dark)] dark:text-[var(--primary-light)] font-mono text-xs px-2 py-1 rounded font-bold">
                         {row.c2}
                       </span>
                     </div>
                     <div className={`col-span-3 text-right flex items-center justify-end gap-1.5 text-xs font-semibold ${
                        row.style === 'red' ? 'text-red-500' :
                        row.style === 'orange' ? 'text-orange-500' :
                        row.style === 'gray' ? 'text-slate-500 dark:text-gray-400' :
                        'text-emerald-500'
                     }`}>
                       {row.style === 'red' || row.style === 'orange' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />} {row.c3}
                     </div>
                   </div>
                 ))}
               </motion.div>
             </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
