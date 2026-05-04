import React from 'react';
import { motion } from 'framer-motion';
import { Workflow, Calendar, MoveRight } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';

export default function WorkflowVisualSection() {
  const { industry } = useIndustry();

  const nodesData = {
    healthcare: [
      { type: 'Encounter', date: 'Oct 01', summary: 'Initial ER Visit', color: 'bg-blue-500' },
      { type: 'Procedure', date: 'Oct 02', summary: 'Emergency Surgery', color: 'bg-indigo-500' },
      { type: 'Diagnosis', date: 'Oct 05', summary: 'Post-op Infection', color: 'bg-red-500' },
      { type: 'Medication', date: 'Oct 05', summary: 'Antibiotics IV', color: 'bg-emerald-500' },
      { type: 'Observation', date: 'Oct 12', summary: 'Cleared & Discharged', color: 'bg-purple-500' }
    ],
    insurance: [
      { type: 'Submitted', date: 'Nov 12', summary: 'Claim Filed', color: 'bg-blue-500' },
      { type: 'Document', date: 'Nov 14', summary: 'Documents Uploaded', color: 'bg-indigo-500' },
      { type: 'Review', date: 'Nov 15', summary: 'Adjuster Review', color: 'bg-emerald-500' },
      { type: 'Flagged', date: 'Nov 18', summary: 'Anomaly Detected', color: 'bg-red-500' },
      { type: 'Decision', date: 'Nov 22', summary: 'Pending Approval', color: 'bg-purple-500' }
    ],
    legal: [
      { type: 'Filing', date: 'Jan 04', summary: 'Complaint Filed', color: 'bg-blue-500' },
      { type: 'Discovery', date: 'Feb 12', summary: 'Evidence Gathered', color: 'bg-indigo-500' },
      { type: 'Hearing', date: 'Mar 01', summary: 'Motion Hearing', color: 'bg-emerald-500' },
      { type: 'Event', date: 'Apr 15', summary: 'Deposition', color: 'bg-orange-500' },
      { type: 'Judgment', date: 'May 20', summary: 'Ruling Issued', color: 'bg-purple-500' }
    ]
  };

  const headings = {
    healthcare: "Visualize the Entire Patient Journey",
    insurance: "Track the Full Lifecycle of a Claim",
    legal: "Track the Entire Case Progression"
  };

  const descriptions = {
    healthcare: "Stop manually copying dates from 50 different patient records. Zumm automatically constructs a chronological event map spanning years of history, saving you days of manual reconstruction.",
    insurance: "Stop piecing together timelines from scattered claim files. Zumm instantly builds a chronological lifecycle of the claim, eliminating hours of manual date cross-referencing.",
    legal: "Stop manually building case chronologies in Excel. Zumm automatically extracts and maps events from messy discovery files to build a perfect chronological timeline instantly."
  };

  const nodes = nodesData[industry] || nodesData.healthcare;

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1120] border-y border-slate-200/60 dark:border-gray-800 relative overflow-hidden transition-colors duration-500">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        <div className="mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6 border border-indigo-100 dark:border-indigo-900/30">
            <Workflow className="w-4 h-4" /> Workflow Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">
            {headings[industry] || headings.healthcare}
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {descriptions[industry] || descriptions.healthcare}
          </p>
        </div>

        {/* Node UI Board */}
        <div className="relative py-12 px-4 flex gap-4 md:gap-8 justify-center overflow-x-auto no-scrollbar scroll-smooth">
          
          {/* Connector Line mapping across */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent -translate-y-1/2 z-0 hidden md:block" />

          {nodes.map((node, i) => (
            <motion.div 
              key={i}
              drag
              dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative z-10 min-w-[200px] bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-2xl p-4 cursor-grab active:cursor-grabbing hover:border-[var(--primary)] transition-all group shadow-xl hover:shadow-2xl"
            >
              {/* Connector Pin */}
              <div className="hidden md:block absolute -left-10 top-1/2 -translate-y-1/2 text-slate-300 dark:text-gray-700">
                {i !== 0 && <MoveRight className="w-8 h-8" />}
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`text-[10px] font-bold text-white uppercase tracking-wider px-2 py-0.5 rounded ${node.color}`}>
                  {node.type}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono font-semibold text-slate-500 dark:text-gray-400">
                   <Calendar className="w-3 h-3" /> {node.date}
                </span>
              </div>
              
              <h4 className="font-bold text-slate-900 dark:text-white text-left text-lg leading-tight group-hover:text-[var(--primary)] transition-colors">
                {node.summary}
              </h4>

              {/* Decorative bottom line */}
              <div className={`mt-4 h-1 w-full rounded-full ${node.color} opacity-30`} />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
