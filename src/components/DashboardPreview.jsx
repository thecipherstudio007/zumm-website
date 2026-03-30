import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, fadeIn } from '../utils/animations';
import { useIndustry } from '../context/IndustryContext';
import { Activity, Code, Clock, User, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function DashboardPreview() {
  const { industry } = useIndustry();

  const uiContent = {
    healthcare: {
      name: "John Doe", type: "Patient Record", details: "DOB: 05/12/1980 | MRN: 9821-A",
      vitals: "BP: 120/80 | HR: 72 bpm | Temp: 98.6°F",
      codes: ["ICD-10: I10 (Hypertension)", "ICD-10: E11 (Type 2 Diabetes)"]
    },
    insurance: {
      name: "Claim #882-AZ", type: "Auto Liability", details: "Date: 10/12/2023 | Status: Under Review",
      vitals: "Est. Damage: $4,500 | Driver: Insured | Fault: Undetermined",
      codes: ["Flag: Prior claim matched (2021)", "Flag: Late reporting"]
    },
    legal: {
      name: "Smith v. ACME Corp", type: "Civil Litigation", details: "Filed: 08/20/2022 | Court: 9th District",
      vitals: "Cause: Breach of Contract | Damages Wanted: $1.2M",
      codes: ["Citation: 15 U.S.C. § 45", "Citation: 42 U.S.C. § 1983"]
    }
  };

  const curr = uiContent[industry] || uiContent.healthcare;

  return (
    <section className="py-32 bg-slate-50 glow-top-primary dark:bg-gray-900 border-y border-slate-200/60 dark:border-white/5 relative overflow-hidden hidden md:block transition-colors duration-500">
      {/* Safe Background Tint Layer */}
      <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.03] dark:hidden pointer-events-none"></div>
      <div className="absolute inset-0 hidden dark:block bg-gray-900/30 pointer-events-none"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[var(--primary)]/20 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">Intelligence at a Glance</h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg">Your processed documents compiled into an elegant, actionable interface.</p>
        </div>

        {/* 3D Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="perspective-1000 w-full max-w-5xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-950 rounded-2xl border border-slate-300/50 dark:border-gray-700 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            
            {/* Top Bar */}
            <div className="h-12 bg-gray-50 dark:bg-gray-900 border-b border-slate-200/60 dark:border-gray-800 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto bg-white dark:bg-gray-950 border border-slate-200/60 dark:border-gray-800 rounded-md px-32 py-1 text-xs text-gray-500 dark:text-gray-500 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3"/> zumm.ai/dashboard
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 min-h-[500px]">
              
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-slate-200/60 dark:border-gray-800 p-6 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex text-slate-900 dark:text-white items-center justify-center font-bold">Z</div>
                  <span className="font-bold text-slate-900 dark:text-white tracking-wide">ZUMM Workspace</span>
                </div>
                
                <nav className="space-y-2 flex-1">
                  {['Dashboard', 'Documents', 'Entities extracted', 'Timelines', 'Settings'].map((item, i) => (
                    <div key={i} className={`px-4 py-2 rounded-lg text-sm font-medium ${i === 0 ? 'bg-[var(--primary)] text-slate-900 dark:text-white' : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white hover:bg-white/5'}`}>
                      {item}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Data View */}
              <div className="flex-1 bg-white dark:bg-gray-950 p-8 grid grid-cols-3 gap-6">
                
                <div className="col-span-2 space-y-6">
                  {/* Header Card */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 rounded-xl p-6 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-6 h-6 text-slate-600 dark:text-gray-400" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">{curr.name}</h2>
                        <span className="px-2 py-0.5 rounded text-xs bg-[var(--primary-dark)] text-[var(--primary-light)] font-bold">{curr.type}</span>
                      </div>
                      <p className="text-slate-600 dark:text-gray-400 text-sm">{curr.details}</p>
                    </div>
                    <button className="px-4 py-2 bg-[var(--primary)] text-slate-900 dark:text-white text-sm font-bold rounded-lg">Download JSON</button>
                  </div>

                  {/* Summary Block */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-4 flex items-center gap-2 font-display">
                      <FileText className="w-4 h-4"/> AI Summary
                    </h3>
                    <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed">
                      Document analysis completed. Processed 142 pages in 4.2 seconds. Identified 3 core discrepancies and 12 verifiable timeline events. Confidence score is 99.4%.
                    </p>
                    <div className="mt-4 p-3 bg-white dark:bg-gray-950 rounded-lg border border-slate-200/60 dark:border-gray-800 text-sm text-[var(--primary-light)] font-mono">
                      {curr.vitals}
                    </div>
                  </div>

                  {/* Extracted Codes */}
                  <div className="bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-4 flex items-center gap-2 font-display">
                      <Code className="w-4 h-4"/> Mapped Entities
                    </h3>
                    <div className="space-y-2">
                      {curr.codes.map((code, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 bg-white dark:bg-gray-950 rounded border border-slate-200/60 dark:border-gray-800 text-sm text-slate-700 dark:text-gray-300 font-mono">
                          <CheckCircle2 className="w-4 h-4 text-green-400"/> {code}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Sidebar Timeline */}
                <div className="col-span-1 bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-gray-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500 mb-6 flex items-center gap-2 font-display">
                    <Clock className="w-4 h-4"/> Auto-Timeline
                  </h3>
                  
                  <div className="relative pl-6 space-y-6">
                    <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-100 dark:bg-gray-800" />
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="relative">
                        <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-[var(--primary)] ring-4 ring-gray-900" />
                        <div className="text-xs text-[var(--primary-light)] mb-1 font-mono">Event {item}</div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded mb-2" />
                        <div className="w-3/4 h-2 bg-gray-100 dark:bg-gray-800 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}


