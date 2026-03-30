import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, FileText, Clock, Database, CheckCircle2, ArrowRight, UploadCloud, Stethoscope } from 'lucide-react';
import DemoButton from './DemoButton';

const pillars = [
  { icon: FileText, title: "AI Report Summarization", desc: "Convert 100+ page long medical reports into concise insights, highlighting critical diagnoses, risks, and outcomes." },
  { icon: Database, title: "Structured Patient Data", desc: "Instantly parse unstructured narratives into standardized JSON, extracting codes (ICD-10, SNOMED) and vitals." },
  { icon: Clock, title: "Patient Timeline View", desc: "Automatically reconstruct chronological patient journeys from scattered historical records and follow-ups." },
  { icon: Stethoscope, title: "Administrative Work Reduction", desc: "Automate repetitive chart reviews and documentation, saving your teams 60–80% of manual effort." },
  { icon: UploadCloud, title: "Multi-Source Integrations", desc: "Directly sync extracted intelligence from labs, imaging, and notes into your existing EMR/EHR (Epic-ready)." },
];

export default function HealthcareSolution() {
  const [activeTab, setActiveTab] = useState(0);

  // Auto cycle tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab(prev => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-6 border border-blue-500/20">
          <Activity className="w-4 h-4" /> AI-Powered Healthcare Accelerator
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-[1.15] mb-6">
          Reduce Administrative Burden. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Focus on Patient Care.</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-gray-400 mb-10 leading-relaxed">
          Zumm transforms complex patient records into structured insights, timelines, and clinical summaries — helping healthcare teams save hours on documentation and decision-making.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <DemoButton className="px-8 py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all text-lg flex items-center gap-2">
            Accelerate Workflows <ArrowRight className="w-5 h-5" />
          </DemoButton>
        </div>
      </motion.div>

      {/* Two Column Layout: Pillars & Interactive Visualization */}
      <div className="grid lg:grid-cols-2 gap-16 items-start mt-12">
        
        {/* Left Column: Pillars */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-gray-800 pb-4">
            Core Workflow Efficiencies
          </h3>
          <div className="space-y-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="flex gap-4 group">
                  <div className="mt-1 shrink-0 w-12 h-12 rounded-2xl bg-slate-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/5 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{pillar.title}</h4>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Visualization UI */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative bg-slate-50 dark:bg-[#0B1120] rounded-3xl border border-slate-200/50 dark:border-gray-800 p-8 overflow-hidden shadow-2xl shadow-slate-200/40 dark:shadow-none"
        >
          {/* Tabs for Visualization */}
          <div className="flex gap-2 mb-8 bg-white dark:bg-gray-900/50 p-1.5 rounded-xl border border-slate-200 dark:border-gray-800 w-max">
            <button 
              onClick={() => setActiveTab(0)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 0 ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Patient Timeline
            </button>
            <button 
              onClick={() => setActiveTab(1)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 1 ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Structured Extraction
            </button>
          </div>

          <div className="h-[420px] relative">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div 
                  key="timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-gray-700 before:to-transparent"
                >
                  {/* Timeline Nodes */}
                  {[
                    { date: "Oct 12, 2023", event: "Initial Diagnosis", details: "Patient presented with acute symptoms. Lab tests ordered and initial MRI scheduled." },
                    { date: "Nov 05, 2023", event: "Treatment Phase 1", details: "Commenced prescribed medication protocol. Vitals stabilized." },
                    { date: "Jan 20, 2024", event: "Follow-up & Recovery", details: "Significant improvement noted in latest scan. Discharged to standard care." }
                  ].map((node, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-900 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-900 p-4 rounded-2xl border border-slate-200 dark:border-gray-800 group-hover:border-blue-500/50 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">{node.event}</span>
                          <span className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">{node.date}</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-gray-400">{node.details}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div 
                  key="structured"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="h-full flex flex-col gap-4"
                >
                  <div className="flex-1 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-5 overflow-hidden flex flex-col shadow-xl">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-500" />
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">Unstructured Note Parse</span>
                      </div>
                      <span className="text-xs font-mono bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">confidence: 99.8%</span>
                    </div>
                    
                     <div className="grid grid-cols-2 gap-4 flex-1">
                        {/* Vitals Card */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-slate-50 dark:bg-[#0F172A] rounded-xl p-4 border border-slate-100 dark:border-white/5"
                        >
                          <h5 className="text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400 font-semibold mb-3">Extracted Vitals</h5>
                          <div className="space-y-2">
                             <div className="flex justify-between items-center"><span className="text-sm text-slate-600 dark:text-gray-300">BP</span><span className="text-sm font-mono text-slate-900 dark:text-white">120/80 mmHg</span></div>
                             <div className="flex justify-between items-center"><span className="text-sm text-slate-600 dark:text-gray-300">Heart Rate</span><span className="text-sm font-mono text-slate-900 dark:text-white">72 bpm</span></div>
                             <div className="flex justify-between items-center"><span className="text-sm text-slate-600 dark:text-gray-300">Temp</span><span className="text-sm font-mono text-slate-900 dark:text-white">98.6 °F</span></div>
                          </div>
                        </motion.div>
                        
                        {/* Codes Card */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-slate-50 dark:bg-[#0F172A] rounded-xl p-4 border border-slate-100 dark:border-white/5"
                        >
                          <h5 className="text-xs uppercase tracking-wider text-slate-500 dark:text-gray-400 font-semibold mb-3">Medical Codes</h5>
                          <div className="space-y-2">
                             <div className="flex justify-between items-center"><span className="text-sm text-slate-600 dark:text-gray-300">Hypertension</span><span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">ICD-10: I10</span></div>
                             <div className="flex justify-between items-center"><span className="text-sm text-slate-600 dark:text-gray-300">Type 2 DM</span><span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">ICD-10: E11.9</span></div>
                          </div>
                        </motion.div>
                        
                        {/* JSON Output Visualization */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="col-span-2 bg-[#1E293B] rounded-xl p-4 mt-2 overflow-hidden border border-slate-700/50"
                        >
                          <h5 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Automated JSON Payload</h5>
                          <pre className="text-[10px] sm:text-xs font-mono text-emerald-400 overflow-x-auto">
{`{
  "patient_id": "P-98421",
  "encounter_date": "2024-03-22",
  "diagnoses": [
    {"condition": "Hypertension", "code": "I10"},
    {"condition": "Type 2 DM", "code": "E11.9"}
  ],
  "action_items": "Schedule follow-up MRI"
}`}
                          </pre>
                        </motion.div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl -z-10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-3xl -z-10 rounded-full"></div>
        </motion.div>

      </div>
    </div>
  );
}
