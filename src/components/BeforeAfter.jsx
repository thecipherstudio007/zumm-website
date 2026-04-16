import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XCircle, CheckCircle2, FileText, AlertCircle, Blocks, FileMinus, History, 
  Database, Clock, Workflow, MessageSquare, Activity, Search, LayoutTemplate,
  Zap, ArrowRight, BrainCircuit, ShieldCheck, AlignLeft, Send, Sparkles, Terminal, DownloadCloud, Cpu, FileStack
} from 'lucide-react';

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState('structured');

  const beforePoints = [
    { icon: FileText, text: "Unstructured, inconsistent document data" },
    { icon: AlertCircle, text: "Manual extraction with frequent errors" },
    { icon: Blocks, text: "Data scattered across multiple files and formats" },
    { icon: FileMinus, text: "No standardized or schema-based output" },
    { icon: History, text: "No reliable timeline or insights" }
  ];

  const afterPoints = [
    { icon: CheckCircle2, text: "Up to 99%+ accurate structured data extraction" },
    { icon: Database, text: "Schema-based outputs (consistent, validated data)" },
    { icon: Clock, text: "Chronological timeline view across all documents" },
    { icon: Workflow, text: "Workflow view to automate and manage processes" },
    { icon: MessageSquare, text: "AI assistant chatbot to query and find insights instantly" },
    { icon: Activity, text: "Extract and identify clinical codings (ICD, etc.)" },
    { icon: Search, text: "Unified, searchable data across all sources" },
    { icon: LayoutTemplate, text: "Outputs ready for dashboards, APIs, and reports" }
  ];

  const tabs = [
    { id: 'structured', label: 'Structured Data', icon: Database },
    { id: 'timeline', label: 'Timeline View', icon: Clock },
    { id: 'workflow', label: 'Workflow', icon: Workflow },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare }
  ];

  return (
    <>
      {/* Full-Width Metrics Divider */}
      <div className="w-full bg-white dark:bg-[#0B1120] border-y border-slate-200 dark:border-white/5 py-12 md:py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y md:divide-y-0 lg:divide-x divide-slate-100 dark:divide-white/5">
            {/* Metric 1 */}
            <div className="flex flex-col gap-4 lg:px-8 group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Accuracy
                  </span>
                </div>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-slate-900 dark:text-white font-display text-2xl lg:text-3xl font-extrabold tracking-tight">99%+</h3>
                <p className="text-slate-500 dark:text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Structured Accuracy</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col gap-4 pt-8 md:pt-0 lg:px-8 group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Structure
                  </span>
                </div>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-slate-900 dark:text-white font-display text-2xl lg:text-3xl font-extrabold tracking-tight">Schema</h3>
                <p className="text-slate-500 dark:text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Reliable Extraction</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col gap-4 pt-8 lg:pt-0 lg:px-8 group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                  <FileStack className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Input
                  </span>
                </div>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-slate-900 dark:text-white font-display text-2xl lg:text-3xl font-extrabold tracking-tight">Mixed</h3>
                <p className="text-slate-500 dark:text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Multi-Format Files</p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col gap-4 pt-8 lg:pt-0 lg:px-8 group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-100 dark:border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Workflow className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    Output
                  </span>
                </div>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-slate-900 dark:text-white font-display text-2xl lg:text-3xl font-extrabold tracking-tight">Ready</h3>
                <p className="text-slate-500 dark:text-gray-400 font-semibold text-[10px] sm:text-xs uppercase tracking-wider">Workflow Sync</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24 bg-slate-50 dark:bg-[#0B1120] relative overflow-hidden transition-colors duration-500 border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest mb-4 border border-[var(--primary)]/20">
              Transformation
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white font-display">
              The Zumm Advantage
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg mb-12">
              Don't just extract data — gain a complete operating system for structured intelligence. Ensure your workflows output precision and reliability.
            </p>
          </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-20">
          
          {/* Before Zumm (Left Col - narrower) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-lg h-full flex flex-col"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-400 opacity-[0.03] dark:opacity-[0.05] blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center border border-red-100 dark:border-red-500/20">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Before Zumm</h3>
            </div>

            <ul className="space-y-6 mb-8">
              {beforePoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <point.icon className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-gray-400 font-medium text-[15px] leading-relaxed">{point.text}</span>
                </li>
              ))}
            </ul>
            
            {/* Visual Rep: Messy UI mockup */}
            <div className="mt-auto opacity-40 select-none grayscale transition-all duration-1000 blur-[0.5px]">
              <div className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-inner">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200 dark:border-white/10">
                   <div className="w-24 h-3 bg-slate-300 dark:bg-slate-700 rounded" />
                   <div className="w-12 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
                {/* Scattered unaligned blocks */}
                <div className="flex gap-3 mb-4">
                  <div className="h-16 w-1/3 bg-slate-200 dark:bg-slate-800 rounded flex flex-col justify-end p-2 border border-red-400/30">
                     <div className="h-1.5 w-1/2 bg-red-400/50 rounded" />
                  </div>
                  <div className="h-12 w-2/3 bg-slate-200 dark:bg-slate-800 rounded mt-4 border border-dashed border-slate-400/30" />
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-1/2 bg-slate-200 dark:bg-slate-800 rounded translate-x-4 border border-red-400/30" />
                  <div className="h-14 w-1/2 bg-slate-200 dark:bg-slate-800 rounded translate-x-2 -translate-y-2 opacity-70" />
                </div>
                {/* Error marker */}
                <div className="flex items-center gap-1.5 mt-5 text-[9px] text-red-500 font-bold justify-center w-full bg-red-100 dark:bg-red-500/10 p-2 rounded">
                   <AlertCircle className="w-3.5 h-3.5" /> EXTRACTION FAILED/MANUAL REVIEW REQ.
                </div>
              </div>
            </div>
          </motion.div>

          {/* With Zumm (Right Col - wider) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-500/30 rounded-3xl p-6 md:p-8 lg:p-10 relative shadow-2xl shadow-blue-500/10 overflow-hidden group h-full flex flex-col"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 opacity-[0.03] dark:opacity-[0.08] blur-[120px] rounded-full pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-1000"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">With Zumm</h3>
              </div>
              <div className="inline-flex max-w-fit items-center gap-2 text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" /> INTERACTIVE PLATFORM
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mb-10">
              {afterPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full p-1 bg-blue-50 dark:bg-blue-500/10">
                    <point.icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  </div>
                  <span className="text-slate-800 dark:text-gray-200 font-medium text-[13px] leading-snug">{point.text}</span>
                </li>
              ))}
            </ul>

            {/* Interactive Product Platform Mockup */}
            <div className="mt-auto bg-slate-50 dark:bg-[#0B1120] rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner overflow-hidden flex flex-col h-[350px]">
              
              {/* Tabs header */}
              <div className="flex overflow-x-auto border-b border-slate-200 dark:border-white/10 hide-scrollbar bg-white dark:bg-slate-900/50">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold transition-all whitespace-nowrap border-b-[3px]
                      ${activeTab === tab.id 
                        ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[var(--primary)]' : ''}`} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Area */}
              <div className="flex-1 relative p-5 md:p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  
                  {activeTab === 'structured' && (
                    <motion.div 
                      key="structured"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 p-5 md:p-6 flex flex-col"
                    >
                      {/* JSON/Table UI mockup */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Medical Record Schema v2.1</span>
                        <div className="flex gap-2">
                           <div className="px-3 py-1 rounded bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">100% VALID</div>
                        </div>
                      </div>
                      <div className="bg-slate-900 rounded-xl p-5 font-mono text-[11px] md:text-sm text-slate-300 flex-1 overflow-hidden border border-slate-700 shadow-xl relative w-full leading-loose">
                         <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-light)] to-transparent opacity-50" />
                         <span className="text-pink-400">"patient"</span>: {"{"}<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">"id"</span>: <span className="text-emerald-300">"PT-99382"</span>,<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">"diagnoses"</span>: [<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}<span className="text-pink-400">"code"</span>: <span className="text-emerald-300">"I10"</span>, <span className="text-pink-400">"desc"</span>: <span className="text-emerald-300">"Hypertension"</span>{"}"},<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{"}<span className="text-pink-400">"code"</span>: <span className="text-emerald-300">"E11.9"</span>, <span className="text-pink-400">"desc"</span>: <span className="text-emerald-300">"Type 2 DM"</span>{"}"}<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;],<br/>
                         &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">"extracted_by"</span>: <span className="text-blue-300">"Zumm Intel v4"</span><br/>
                         {"}"}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'timeline' && (
                    <motion.div 
                      key="timeline"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 p-5 md:p-6 overflow-hidden flex flex-col justify-center"
                    >
                      <div className="relative border-l-2 border-slate-300 dark:border-slate-700 ml-4 space-y-6">
                        
                        <div className="relative pl-6">
                          <div className="absolute w-3.5 h-3.5 bg-[var(--primary)] rounded-full -left-[8.5px] top-1.5 shadow-[0_0_10px_var(--primary)] border-[3px] border-white dark:border-slate-900" />
                          <div className="text-[10px] font-bold text-[var(--primary)] mb-1 uppercase tracking-wider">Oct 12, 2023</div>
                          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                             <div className="text-sm font-bold text-slate-800 dark:text-white">Initial Cardiology Consult</div>
                             <div className="text-xs text-slate-500 mt-1.5 line-clamp-2">Patient reports shortness of breath. History of HTN noted...</div>
                          </div>
                        </div>

                        <div className="relative pl-6">
                          <div className="absolute w-3.5 h-3.5 bg-emerald-500 rounded-full -left-[8.5px] top-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)] border-[3px] border-white dark:border-slate-900" />
                          <div className="text-[10px] font-bold text-emerald-500 mb-1 uppercase tracking-wider">Oct 15, 2023</div>
                          <div className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                             <div>
                               <div className="text-sm font-bold text-slate-800 dark:text-white">Lab Results Uploaded</div>
                               <div className="text-xs text-slate-500 mt-1.5">Lipid panel indicates elevated LDL.</div>
                             </div>
                             <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-500/20">
                               <FileText className="w-5 h-5 text-emerald-500" />
                             </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'workflow' && (
                    <motion.div 
                      key="workflow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 p-5 md:p-6 flex flex-col justify-center gap-5"
                    >
                       <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm relative z-10 w-4/5 max-w-sm">
                          <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center"><DownloadCloud className="w-4 h-4 text-blue-500" /></div>
                          <div className="text-xs md:text-sm font-semibold text-slate-800 dark:text-white">Document Ingested</div>
                          <div className="ml-auto text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700 px-1 rounded">0s</div>
                          
                          {/* Connection line down */}
                          <div className="absolute left-7 top-full w-[2px] h-5 bg-slate-200 dark:bg-slate-700 -z-10" />
                       </div>
                       
                       <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm relative ml-8 z-10 w-4/5 max-w-sm">
                          <div className="w-8 h-8 rounded-md bg-[var(--primary)]/20 flex items-center justify-center"><BrainCircuit className="w-4 h-4 text-[var(--primary)]" /></div>
                          <div className="text-xs md:text-sm font-semibold text-slate-800 dark:text-white">AI Structuring</div>
                          <div className="ml-auto text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700 px-1 rounded">1.2s</div>

                          <div className="absolute left-7 top-full w-[2px] h-5 bg-slate-200 dark:bg-slate-700 -z-10" />
                       </div>

                       <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 p-3.5 rounded-lg border border-emerald-200 dark:border-emerald-500/30 shadow-sm relative ml-16 z-10 w-4/5 max-w-sm">
                          <div className="w-8 h-8 rounded-md bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]"><CheckCircle2 className="w-4 h-4" /></div>
                          <div className="text-xs md:text-sm font-bold text-emerald-800 dark:text-emerald-400">Validated Payload Delivery</div>
                          <div className="ml-auto text-[10px] font-mono text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/30 px-1 rounded bg-emerald-100 dark:bg-emerald-500/20">2.0s</div>
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'chat' && (
                    <motion.div 
                      key="chat"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 p-5 md:p-6 flex flex-col"
                    >
                      <div className="flex-1 space-y-5 overflow-hidden flex flex-col justify-end mb-4">
                        <div className="flex gap-3 items-end justify-end">
                           <div className="bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600 text-xs md:text-sm px-4 py-3 rounded-2xl rounded-br-sm max-w-[85%]">
                              Did the patient have a history of diabetes prior to the 2023 accident?
                           </div>
                           <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 shadow-inner flex shrink-0" />
                        </div>
                        <div className="flex gap-3 items-start">
                           <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0 shadow-[0_0_15px_var(--primary-light)]">
                             <BrainCircuit className="w-4 h-4 text-white" />
                           </div>
                           <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 border border-[var(--primary)]/20 text-slate-800 dark:text-white text-xs md:text-sm px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%] leading-relaxed">
                              <span className="font-bold block mb-1">Yes, but not documented properly.</span>
                              Review of <span className="text-[var(--primary)] font-semibold cursor-pointer hover:underline">Exhibit B (Pg 4)</span> shows a mention of "mild unmanaged sugars" from a 2021 exam. <br/><br/>An <span className="px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">ICD: E11.9</span> code was derived from this record.
                           </div>
                        </div>
                      </div>
                      <div className="mt-auto relative w-full pt-2">
                        <input type="text" placeholder="Query timeline, codes, or evidence..." className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-sm rounded-full pl-5 pr-12 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)]" disabled />
                        <div className="absolute right-1.5 top-3.5 w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center cursor-pointer shadow-md transform hover:scale-105 transition-transform">
                          <Send className="w-4 h-4 text-white -translate-x-[1px] translate-y-[1px]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </>
  );
}
