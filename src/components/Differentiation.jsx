import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2, AlertTriangle, ShieldCheck, AlignLeft, Braces, Layers, Database, Scale, ShieldAlert } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';

export default function Differentiation() {
  const { industry } = useIndustry();

  const mockData = {
    healthcare: {
      prose: "Here is the information you requested from the medical chart: The patient's blood pressure is 120/80 and they were diagnosed with Type 2 Diabetes on 10/12/2023. They are prescribed Metformin...",
      jsonKey: "vitals",
      jsonFields: [
        { k: "blood_pressure", v: "120/80" },
        { k: "diagnosis", v: "E11.9" },
        { k: "medication", v: "Metformin" }
      ],
      unifiedLabel: "Unified Patient Record"
    },
    insurance: {
      prose: "According to the police report and the adjuster notes, the policyholder struck a guardrail on 11/14/2023 going roughly 45mph. The front bumper is detached and the claimant is requesting immediate payout...",
      jsonKey: "claim_assessment",
      jsonFields: [
        { k: "liability_fault", v: "Policyholder" },
        { k: "point_of_impact", v: "Front Bumper" },
        { k: "est_speed_mph", v: "45" }
      ],
      unifiedLabel: "Unified Claim Dossier"
    },
    legal: {
      prose: "The plaintiff's complaint alleges that the defendant failed to deliver the 500 units of steel by the September 1st deadline, constituting a material breach of Section 4(a) of the supply agreement...",
      jsonKey: "contract_clauses",
      jsonFields: [
        { k: "breach_alleged", v: "Failure to Deliver" },
        { k: "clause_violated", v: "Sec 4(a)" },
        { k: "date_of_breach", v: "09/01" }
      ],
      unifiedLabel: "Unified Case File"
    }
  };

  const currentMock = mockData[industry] || mockData.healthcare;

  const getComparisons = () => {
    const accuracyTitle = industry === 'healthcare' ? "Clinical Precision" : industry === 'insurance' ? "Underwriting Precision" : "Clausal Precision";
    const outputDesc = industry === 'healthcare' ? "What your EHR actually receives." : industry === 'insurance' ? "What your claim systems actually receive." : "What your case management receives.";
    
    return [
      {
        title: accuracyTitle,
        desc: "How the engine processes and extracts information.",
        generic: {
          label: "Basic Generative AI",
          icon: AlertTriangle,
          bg: "bg-red-50/50 dark:bg-red-950/20",
          border: "border-red-100 dark:border-red-900/30",
          text: "text-red-600 dark:text-red-400",
          points: [
            "Black-box generation prone to hallucinations.",
            "Struggles with rigid formatting constraints.",
            "Requires constant prompt engineering and tweaking."
          ],
          mockup: (
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl p-4 border border-red-100 dark:border-red-900/50 shadow-sm opacity-80 h-32 flex flex-col justify-center">
              <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded mb-3" />
              <div className="h-2 w-5/6 bg-red-200 dark:bg-red-900/60 rounded mb-3" />
              <div className="h-2 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
              <span className="text-[10px] text-red-500 mt-2 font-bold uppercase tracking-wider block text-center">Unverifiable Output</span>
            </div>
          )
        },
        zumm: {
          label: "The Zumm Standard",
          icon: ShieldCheck,
          bg: "bg-emerald-50/50 dark:bg-emerald-900/20",
          border: "border-emerald-100 dark:border-emerald-900/30",
          text: "text-emerald-600 dark:text-emerald-400",
          points: [
            "Deterministic pipeline separates extraction from validation.",
            "Algorithmically enforces strict data schemas.",
            "Zero hallucination guarantee on structured fields."
          ],
          mockup: (
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900/50 shadow-sm h-32 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10 text-emerald-500"><ShieldCheck size={48} /></div>
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 <div className="h-2 w-20 bg-emerald-100 dark:bg-emerald-900/60 rounded" />
               </div>
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 <div className="h-2 w-32 bg-emerald-100 dark:bg-emerald-900/60 rounded" />
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 <div className="h-2 w-24 bg-emerald-100 dark:bg-emerald-900/60 rounded" />
               </div>
               <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-4 font-bold uppercase tracking-wider block text-center">100% Schema Compliant</span>
            </div>
          )
        }
      },
      {
        title: "Standardized Output",
        desc: outputDesc,
        generic: {
          label: "Conversational Copilots",
          icon: AlignLeft,
          bg: "bg-orange-50/50 dark:bg-orange-950/20",
          border: "border-orange-100 dark:border-orange-900/30",
          text: "text-orange-600 dark:text-orange-400",
          points: [
            "Outputs conversational prose or markdown.",
            "Requires human review to parse into databases.",
            "Inconsistent structure breaks automated workflows."
          ],
          mockup: (
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl p-4 border border-orange-100 dark:border-orange-900/50 shadow-sm h-32 text-[10px] text-slate-500 dark:text-slate-400 font-mono overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div key={industry} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {currentMock.prose}
                </motion.div>
              </AnimatePresence>
            </div>
          )
        },
        zumm: {
          label: "Zumm Automation",
          icon: Braces,
          bg: "bg-blue-50/50 dark:bg-blue-900/20",
          border: "border-blue-100 dark:border-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
          points: [
            "Outputs strict, deeply nested JSON payloads.",
            "Ready for immediate API ingestion (No-code/Low-code).",
            "Keys, arrays, and types are strongly strictly typed."
          ],
          mockup: (
            <div className="mt-6 bg-slate-900 rounded-xl p-4 shadow-sm h-32 text-xs font-mono overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={industry} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="text-purple-400">"{currentMock.jsonKey}"</span>: {"{"}<br/>
                  {currentMock.jsonFields.map((f, i) => (
                    <div key={i}>
                      &nbsp;&nbsp;<span className="text-blue-400">"{f.k}"</span>: <span className="text-emerald-400">"{f.v}"</span>{i < 2 ? ',' : ''}
                    </div>
                  ))}
                  {"}"}
                </motion.div>
              </AnimatePresence>
            </div>
          )
        }
      },
      {
        title: "Large-Scale Processing",
        desc: "Handling massive, disjointed document sets.",
        generic: {
          label: "Standard Ingestion",
          icon: Layers,
          bg: "bg-rose-50/50 dark:bg-rose-950/20",
          border: "border-rose-100 dark:border-rose-900/30",
          text: "text-rose-600 dark:text-rose-400",
          points: [
            "Limited by single prompt context windows.",
            "Loses track of facts across long 100+ page PDFs.",
            "Cannot naturally synthesize across multiple files."
          ],
          mockup: (
            <div className="mt-6 h-32 flex items-center justify-center relative">
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-20 bg-white dark:bg-gray-800 border border-rose-200 dark:border-rose-800 rounded shadow animate-pulse rotate-[-10deg]" />
                 <div className="w-16 h-20 bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-800 rounded shadow absolute top-4 rotate-[5deg] opacity-50" />
                 <div className="w-16 h-20 bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-800 rounded shadow absolute top-2 right-10 rotate-[15deg] opacity-20" />
               </div>
               <div className="bg-red-100 dark:bg-red-900/80 text-red-600 dark:text-red-300 px-3 py-1 text-[10px] rounded-full font-bold uppercase z-10 shadow border border-red-200 dark:border-red-800">Token Limit Reached</div>
            </div>
          )
        },
        zumm: {
          label: "Zumm Multi-Document Pipeline",
          icon: Database,
          bg: "bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10",
          border: "border-[var(--primary)]/20",
          text: "text-[var(--primary-dark)] dark:text-[var(--primary-light)]",
          points: [
            "Intelligent semantic indexing drops irrelevant pages.",
            "Cross-references entities across dozens of files seamlessly.",
            "Outputs unified timelines covering years of history."
          ],
          mockup: (
            <div className="mt-6 h-32 flex flex-col items-center justify-center relative">
              <div className="flex gap-2 mb-4">
                 {[1,2,3].map(i => <div key={i} className="w-8 h-10 bg-white dark:bg-slate-800 border border-[var(--primary)]/30 rounded shadow-sm" />)}
              </div>
              <div className="w-0 h-4 border-l-2 border-dashed border-[var(--primary)]/50 mb-2" />
              <div className="bg-[var(--primary)] text-white px-6 py-1.5 text-[11px] rounded flex items-center gap-2 font-bold shadow-lg shadow-[var(--primary)]/20">
                <Database className="w-3 h-3" /> 
                <AnimatePresence mode="popLayout">
                  <motion.span key={industry} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {currentMock.unifiedLabel}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          )
        }
      }
    ];
  };

  const comparisons = getComparisons();

  return (
    <section className="py-24 md:py-32 bg-slate-50 dark:bg-[#0B1120] relative border-y border-slate-200/60 dark:border-white/5 transition-colors duration-500 overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[var(--primary)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border border-slate-300 dark:border-white/10 shadow-sm"
          >
            The Zumm Difference
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight font-display"
          >
            Why Choose Zumm?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed"
          >
            Generic AI wrappers process text into conversational prose. Zumm operates as a deterministic engine, processing chaotic documents into structured, {industry === 'healthcare' ? 'clinical' : industry === 'insurance' ? 'actuarial' : 'legal'} truths.
          </motion.p>
        </div>

        {/* Comparison Stack */}
        <div className="space-y-12">
          {comparisons.map((comp, idx) => (
            <motion.div 
              key={idx + industry}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
            >
              {/* Desktop View: Massive Split Card */}
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-[2.5rem] shadow-xl overflow-hidden hidden md:flex">
                
                {/* Left Side: Generic */}
                <div className={`w-1/2 p-10 lg:p-14 border-r border-slate-200 dark:border-gray-800 ${comp.generic.bg} relative`}>
                  <div className="absolute top-6 left-6 flex items-center gap-2 opacity-50">
                    <XCircle className={`w-4 h-4 ${comp.generic.text}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${comp.generic.text}`}>Generic AI</span>
                  </div>
                  
                  <div className="mt-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${comp.generic.border} bg-white dark:bg-gray-800 shadow-sm ${comp.generic.text}`}>
                      <comp.generic.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-200 mb-6">{comp.title}</h3>
                    <ul className="space-y-4">
                      {comp.generic.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <XCircle className={`w-5 h-5 shrink-0 mt-0.5 opacity-60 ${comp.generic.text}`} />
                          <span className="text-sm font-medium text-slate-600 dark:text-gray-400 leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    {comp.generic.mockup}
                  </div>
                </div>

                {/* Right Side: Zumm */}
                <div className={`w-1/2 p-10 lg:p-14 ${comp.zumm.bg} relative`}>
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${comp.zumm.text}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${comp.zumm.text}`}>The Zumm Standard</span>
                  </div>

                  <div className="mt-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${comp.zumm.border} bg-white dark:bg-gray-800 shadow-xl ${comp.zumm.text}`}>
                      <comp.zumm.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-display">{comp.zumm.label}</h3>
                    <ul className="space-y-4">
                      {comp.zumm.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${comp.zumm.text}`} />
                          <span className="text-sm font-bold text-slate-700 dark:text-gray-200 leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    {comp.zumm.mockup}
                  </div>
                </div>
              </div>

              {/* Mobile View: Stacked Cards */}
              <div className="md:hidden space-y-4">
                <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg">
                  <div className={`p-6 border-b border-slate-200 dark:border-gray-800 ${comp.generic.bg}`}>
                    <div className="flex items-center gap-2 mb-6 opacity-60">
                      <XCircle className={`w-4 h-4 ${comp.generic.text}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${comp.generic.text}`}>Generic AI: {comp.title}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {comp.generic.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle className={`w-4 h-4 shrink-0 mt-0.5 opacity-60 ${comp.generic.text}`} />
                          <span className="text-xs text-slate-600 dark:text-gray-400">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    {comp.generic.mockup}
                  </div>
                  
                  <div className={`p-6 ${comp.zumm.bg}`}>
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle2 className={`w-4 h-4 ${comp.zumm.text}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${comp.zumm.text}`}>Zumm: {comp.zumm.label}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {comp.zumm.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${comp.zumm.text}`} />
                          <span className="text-xs font-bold text-slate-700 dark:text-gray-200">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    {comp.zumm.mockup}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

