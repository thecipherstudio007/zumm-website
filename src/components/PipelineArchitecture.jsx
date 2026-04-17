import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Zap, ShieldCheck, GitMerge, ChevronRight, FileJson, Split, Activity, Braces, ArrowRight } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';

export default function PipelineArchitecture() {
  const { industry } = useIndustry();
  const [activeStep, setActiveStep] = useState(0);

  const getDynamicContent = () => {
    if (industry === 'insurance') {
      return {
        zones: "'Damage Photos' or 'Adjuster Notes'",
        entities: "limits, liabilities, damages",
        located: "LOCATED: [POLICE_REP]",
        workers: ['WORKER_DMG', 'WORKER_LIAB', 'WORKER_POLICY'],
        schema: [
          { k: "liability_score", bad: '"about eighty percent"', good: "80" },
          { k: "impact_zone", bad: '"front fell off"', good: '"FRONT_BUMPER"' }
        ],
        blocks: ['DAMAGES', 'LIABILITY', 'COVERAGE']
      };
    } else if (industry === 'legal') {
      return {
        zones: "'Exhibits' or 'Depositions'",
        entities: "clauses, dates, precedents",
        located: "LOCATED: [EXHIBIT_B]",
        workers: ['WORKER_CLAUS', 'WORKER_DATES', 'WORKER_PRECED'],
        schema: [
          { k: "breach_date", bad: '"early september"', good: '"2023-09-05"' },
          { k: "clause_type", bad: '"they failed to pay"', good: '"NON_PAYMENT"' }
        ],
        blocks: ['CLAUSES', 'DATES', 'PRECEDENTS']
      };
    }
    return {
      zones: "'Medications' or 'Lab Results'",
      entities: "vitals, meds, history",
      located: "LOCATED: [LABS]",
      workers: ['WORKER_MEDS', 'WORKER_LABS', 'WORKER_VITALS'],
      schema: [
        { k: "blood_pressure", bad: '"120 over 80"', good: "[120, 80]" },
        { k: "status", bad: '"Patient seems fine"', good: '"STABLE"' }
      ],
      blocks: ['MEDS', 'LABS', 'VITALS']
    };
  };

  const c = getDynamicContent();

  const pillars = [
    {
      id: "mapping",
      icon: Network,
      title: "Contextual Mapping",
      subtitle: "Cost Efficiency Engine",
      description: `We don't feed blind pages to the LLM. The engine first crawls and semantically maps the document into distinct zones. By knowing exactly where ${c.zones} exist, we drop irrelevant pages and reduce token overhead by up to 90%.`,
      accent: "text-blue-500",
      bgClass: "bg-blue-500/10",
      borderClass: "border-blue-500/20",
      glow: "from-blue-500/20 to-transparent",
    },
    {
      id: "parallel",
      icon: Split,
      title: "Parallel Extraction",
      subtitle: "Speed Architecture",
      description: `Mapped zones are dispatched to independent AI sub-agents. Instead of reading sequentially, we extract critical entities (${c.entities}) simultaneously. This parallelization slashes processing time to seconds.`,
      accent: "text-indigo-500",
      bgClass: "bg-indigo-500/10",
      borderClass: "border-indigo-500/20",
      glow: "from-indigo-500/20 to-transparent",
    },
    {
      id: "validation",
      icon: ShieldCheck,
      title: "Deterministic Validation",
      subtitle: "Zero Hallucination",
      description: "Generative AI is kept strict. After data is extracted, deterministic rule-engines and schema validators take over—normalizing dates, enforcing data types, and stripping hallucinations before they reach your system.",
      accent: "text-emerald-500",
      bgClass: "bg-emerald-500/10",
      borderClass: "border-emerald-500/20",
      glow: "from-emerald-500/20 to-transparent",
    },
    {
      id: "synthesis",
      icon: GitMerge,
      title: "Unified Synthesis",
      subtitle: "Dashboard Ready Output",
      description: "Independent zone outputs are reconciled. Cross-section duplicates are collapsed, and the results are compiled into a unified, cleanly structured final JSON payload that injects flawlessly into your database.",
      accent: "text-purple-500",
      bgClass: "bg-purple-500/10",
      borderClass: "border-purple-500/20",
      glow: "from-purple-500/20 to-transparent",
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#0B1120] relative overflow-hidden transition-colors duration-500">
      
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-gray-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border border-slate-300 dark:border-white/10 shadow-sm"
          >
            <Activity className="w-3.5 h-3.5" /> Engine Architecture
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight font-display"
          >
            Deterministic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-indigo-500">Data Ops</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed"
          >
            LLMs alone guess structure, leading to hallucinations and skyrocketing compute costs. We built a rigorous operating system around the AI to guarantee enterprise stability.
          </motion.p>
        </div>

        {/* Interactive Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Menu list */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pillar, idx) => {
              const isActive = activeStep === idx;
              return (
                <div 
                  key={pillar.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 overflow-hidden group ${
                    isActive 
                      ? `bg-white dark:bg-slate-900 ${pillar.borderClass} shadow-xl` 
                      : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-white/[0.02] hover:border-slate-200 dark:hover:border-white/5'
                  }`}
                >
                  {/* Active highlight background glow */}
                  {isActive && (
                    <motion.div layoutId="activeGlow" className={`absolute inset-0 bg-gradient-to-r ${pillar.glow} opacity-30`} />
                  )}

                  <div className="relative flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? pillar.bgClass + ' ' + pillar.accent : 'bg-slate-200 dark:bg-gray-800 text-slate-500'
                    }`}>
                      <pillar.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                          Phase 0{idx + 1}
                        </span>
                        {isActive && <ChevronRight className={`w-3.5 h-3.5 ${pillar.accent}`} />}
                      </div>
                      <h3 className={`text-lg font-bold mb-2 transition-colors ${
                        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-gray-400'
                      }`}>
                        {pillar.title}
                      </h3>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed overflow-hidden pr-2"
                          >
                            {pillar.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visualizer Window */}
          <div className="lg:col-span-7 h-[400px] md:h-[500px]">
            <div className="w-full h-full bg-slate-900 dark:bg-black rounded-3xl border border-slate-800 dark:border-white/10 shadow-2xl relative overflow-hidden flex flex-col font-mono text-xs text-slate-300">
              
              {/* Terminal Header */}
              <div className="px-4 py-3 border-b border-slate-800 dark:border-white/10 bg-slate-950/50 flex items-center gap-2">
                <div className="flex gap-1.5 mr-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest flex-1 text-center font-bold">
                  sys.metrics.v4 — {pillars[activeStep].id.toUpperCase()}
                </div>
                <Network className="w-4 h-4 text-slate-600" />
              </div>

              {/* Dynamic Content Window */}
              <div className="flex-1 p-6 lg:p-8 relative">
                
                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                <AnimatePresence mode="wait">
                  
                  {activeStep === 0 && (
                    <motion.div
                      key={"step0"+industry}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 p-8 flex flex-col justify-center"
                    >
                      <div className="text-[10px] text-blue-400 mb-6 flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                           <FileJson className="w-4 h-4" />
                        </motion.div>
                        INDEXING DOCUMENT (42 PAGES)
                      </div>
                      
                      <div className="flex gap-4 items-end">
                        <div className="w-16 h-32 bg-slate-800 border border-slate-700 rounded-lg opacity-40 shrink-0" />
                        <div className="w-16 h-40 bg-slate-800 border border-slate-700 rounded-lg opacity-40 shrink-0" />
                        
                        <div className="relative">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 rounded-lg z-10"
                          />
                          <div className="w-20 h-48 bg-slate-800 rounded-lg p-2 flex flex-col gap-2 relative overflow-hidden">
                            <div className="h-4 bg-blue-500/30 rounded w-full" />
                            <div className="h-4 bg-slate-700 rounded w-3/4" />
                            <div className="h-4 bg-slate-700 rounded w-full" />
                          </div>
                   
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-3 py-1 rounded shadow-lg shadow-blue-500/20 whitespace-nowrap font-bold"
                          >
                            {c.located}
                          </motion.div>
                        </div>

                        <div className="w-16 h-24 bg-slate-800 border border-slate-700 rounded-lg opacity-40 shrink-0" />
                        <div className="w-16 h-32 bg-slate-800 border border-slate-700 rounded-lg opacity-40 shrink-0" />
                      </div>
                      <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center text-[10px]">
                        <span className="text-slate-500">Unnecessary pages dropped: 38</span>
                        <span className="text-emerald-400">Tokens saved: -89.4%</span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div
                      key={"step1"+industry}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 p-8 flex flex-col justify-center"
                    >
                      <div className="text-[10px] text-indigo-400 mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> DISPATCHING 3 PARALLEL WORKERS
                      </div>
                      
                      <div className="space-y-4 w-full max-w-md mx-auto">
                        {c.workers.map((name, i) => (
                          <div key={i} className="bg-slate-800/50 p-3 border border-slate-700/50 rounded-xl">
                            <div className="flex justify-between text-[10px] mb-2 font-bold">
                              <span className="text-slate-400">{name} ................</span>
                              <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: (i * 0.2) + 1 }}
                                className="text-emerald-400"
                              >
                                DONE (1.2s)
                              </motion.span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: i === 1 ? '90%' : '100%' }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                                className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key={"step2"+industry}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 p-8 flex flex-col justify-center"
                    >
                      <div className="text-[10px] text-emerald-400 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> ENFORCING SCHEMA VALIDATION
                      </div>

                      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-inner flex flex-col gap-3 font-mono text-sm leading-loose">
                        <div className="text-slate-500">{"{"}</div>
                        <div className="pl-4">
                           <span className="text-purple-400">"{c.schema[0].k}"</span>: <span className="text-amber-400 line-through decoration-red-500/70 block sm:inline">{c.schema[0].bad}</span>
                           <motion.span 
                             initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                             className="text-emerald-400 ml-2"
                           >
                             <ArrowRight className="w-3 h-3 inline mr-1 text-emerald-500" />{c.schema[0].good}
                           </motion.span>,
                        </div>
                        <div className="pl-4">
                           <span className="text-purple-400">"{c.schema[1].k}"</span>: <span className="text-amber-400 line-through decoration-red-500/70 block sm:inline">{c.schema[1].bad}</span>
                           <motion.span 
                             initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
                             className="text-emerald-400 ml-2"
                           >
                             <ArrowRight className="w-3 h-3 inline mr-1 text-emerald-500" />{c.schema[1].good}
                           </motion.span>
                        </div>
                        <div className="text-slate-500">{"}"}</div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key={"step3"+industry}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center"
                    >
                      <div className="flex gap-6 mb-8 mt-4 relative">
                        {/* Wires connecting */}
                        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -z-10" />
                        
                        {c.blocks.map((block, i) => (
                           <motion.div 
                             key={block}
                             initial={{ y: -20, opacity: 0 }} 
                             animate={{ y: 0, opacity: 1 }} 
                             transition={{ delay: i * 0.2 }}
                             className="bg-slate-800/80 border border-purple-500/30 text-purple-400 text-[10px] font-bold p-3 rounded-lg flex flex-col items-center gap-2 z-10 relative shadow-sm"
                           >
                              <div className="absolute inset-0 bg-slate-900 rounded-lg -z-10" />
                              <Braces className="w-4 h-4" /> {block}
                           </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="w-full max-w-sm bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-5 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                      >
                         <div className="text-purple-300 font-bold mb-3 flex items-center justify-center gap-2 text-sm">
                           <GitMerge className="w-4 h-4 text-purple-400" /> payload_unified.json
                         </div>
                         <div className="text-emerald-400 text-[10px] bg-emerald-500/10 border border-emerald-500/20 py-1.5 rounded uppercase tracking-wider font-bold">
                           READY FOR API INGESTION
                         </div>
                      </motion.div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
