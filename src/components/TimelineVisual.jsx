import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIndustry } from '../context/IndustryContext';
import { Calendar, ChevronRight } from 'lucide-react';

export default function TimelineVisual() {
  const { industry } = useIndustry();
  const [hoveredNode, setHoveredNode] = useState(null);

  const timelines = {
    healthcare: [
      { date: "Oct 12, 2023", title: "Initial Consultation", desc: "Patient presented with acute lower back pain." },
      { date: "Oct 15, 2023", title: "MRI Scan", desc: "Results showed L4-L5 disc herniation." },
      { date: "Nov 02, 2023", title: "Surgical Intervention", desc: "Microdiscectomy performed successfully." },
      { date: "Dec 10, 2023", title: "Follow-up", desc: "Patient reported 90% reduction in pain." }
    ],
    insurance: [
      { date: "Jan 05, 2024", title: "Policy Inception", desc: "Comprehensive auto policy activated." },
      { date: "Mar 12, 2024", title: "Incident Date", desc: "Collision reported at Main St intersection." },
      { date: "Mar 14, 2024", title: "Claim Filed", desc: "Police report and photos submitted." },
      { date: "Mar 18, 2024", title: "Settlement Offer", desc: "Adjuster evaluated at $8,400." }
    ],
    legal: [
      { date: "Aug 20, 2022", title: "Contract Signed", desc: "NDA and SLA executed by both parties." },
      { date: "Sep 15, 2023", title: "Alleged Breach", desc: "Unauthorized data sharing reported." },
      { date: "Oct 01, 2023", title: "Cease & Desist", desc: "Formal notice served to defendant." },
      { date: "Feb 14, 2024", title: "Deposition", desc: "Key witness admitted to protocol deviation." }
    ]
  };

  const currentTimeline = timelines[industry] || timelines.healthcare;

  return (
    <section className="py-24 bg-slate-50 glow-top-primary dark:bg-gray-900 border-t border-slate-200/60 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      {/* Safe Background Tint Layer */}
      <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.03] dark:hidden pointer-events-none"></div>
      <div className="absolute inset-0 hidden dark:block bg-gray-900/30 pointer-events-none"></div>
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-900 dark:text-white font-display">
            See the full patient journey
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg mb-8 max-w-lg">
            Encounters, Diagnoses, Medications, and Observations — all organized chronologically for quick understanding.
          </p>
          <ul className="space-y-4">
            {['Automatically orders events by date', 'Links back to source documents', 'Reduce manual chart review and administrative workload significantly'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-900 dark:text-white font-medium">
                <ChevronRight className="w-5 h-5 text-[var(--primary)]" /> {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline Visual */}
        <div className="relative pl-8 md:pl-16 py-12">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-16 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[var(--primary)]/50 to-transparent" />

          <div className="space-y-12">
            {currentTimeline.map((node, i) => (
              <div 
                key={i}
                className="relative pl-10"
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Point */}
                <div className={`absolute left-[-5px] top-1.5 w-3 h-3 rounded-full transition-all duration-300 ${hoveredNode === i ? 'bg-[var(--primary-light)] scale-150' : 'bg-gray-700 border-2 border-slate-200/60 dark:border-gray-900'}`} />
                
                <div className="flex items-center gap-2 text-sm font-mono text-[var(--primary-light)] mb-1">
                  <Calendar className="w-4 h-4" />
                  {node.date}
                </div>
                
                <h4 className={`text-xl font-bold mb-2 transition-colors ${hoveredNode === i ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-gray-300'}`}>
                  {node.title}
                </h4>
                
                <AnimatePresence>
                  {(hoveredNode === i || true) && (
                    <motion.p 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="text-slate-600 dark:text-gray-400 text-sm overflow-hidden"
                    >
                      {node.desc}
                    </motion.p>
                  )}
                </AnimatePresence>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
