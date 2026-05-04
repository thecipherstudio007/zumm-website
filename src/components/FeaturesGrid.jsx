import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Code2, GitMerge, Combine, Clock, ShieldCheck, Braces, ArrowRight } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' } })
};

/* ── Mini UI Mockups ── */
function JsonMockup({ industry }) {
  const data = {
    healthcare: [
      { key: "patient_id", val: "PT-40912", color: "amber-300" },
      { key: "diagnosis", val: "Type 2 Diabetes", color: "emerald-400" },
      { key: "icd_code", val: "E11.9", color: "blue-400" },
    ],
    insurance: [
      { key: "claim_id", val: "CLM-9102", color: "amber-300" },
      { key: "liability_est", val: "$4,500", color: "emerald-400" },
      { key: "risk_flag", val: "High", color: "orange-400" },
    ],
    legal: [
      { key: "case_id", val: "CV-2023-88R", color: "amber-300" },
      { key: "action_cause", val: "Breach of Contract", color: "emerald-400" },
      { key: "jurisdiction", val: "SDNY", color: "blue-400" },
    ]
  };

  const current = data[industry] || data.healthcare;

  return (
    <div className="mt-6 bg-slate-900 rounded-2xl p-4 font-mono text-xs leading-6 shadow-xl text-left overflow-hidden border border-slate-700/50">
      <div className="flex gap-1.5 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
      </div>
      <div className="text-slate-400">{"{"}</div>
      <AnimatePresence mode="popLayout">
        {current.map((item, i) => (
          <motion.div 
            key={item.key + industry}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="pl-3"
          >
            <span className="text-purple-400">"{item.key}"</span>
            <span className="text-slate-400">: </span>
            <span className={`text-${item.color}`}>"{item.val}"</span>
            <span className="text-slate-500">,</span>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="pl-3"><span className="text-purple-400">"confidence"</span><span className="text-slate-400">: </span><span className="text-emerald-400">0.99</span></div>
      <div className="text-slate-400">{"}"}</div>
    </div>
  );
}

function TimelineMockup({ industry }) {
  const timelines = {
    healthcare: [
      { date: 'Jan 14', label: 'Initial Diagnosis', color: 'bg-blue-500' },
      { date: 'Feb 03', label: 'Lab Results Filed', color: 'bg-indigo-500' },
      { date: 'Mar 20', label: 'Prescription Updated', color: 'bg-purple-500' },
      { date: 'Apr 11', label: 'Follow-up Scheduled', color: 'bg-violet-500' },
    ],
    insurance: [
      { date: 'Jan 14', label: 'First Notice of Loss', color: 'bg-blue-500' },
      { date: 'Jan 16', label: 'Adjuster Assigned', color: 'bg-indigo-500' },
      { date: 'Feb 02', label: 'Police Report Filed', color: 'bg-purple-500' },
      { date: 'Feb 10', label: 'Settlement Offer', color: 'bg-violet-500' },
    ],
    legal: [
      { date: 'Jan 14', label: 'Complaint Filed', color: 'bg-blue-500' },
      { date: 'Feb 10', label: 'Answer Served', color: 'bg-indigo-500' },
      { date: 'Mar 15', label: 'Discovery Opened', color: 'bg-purple-500' },
      { date: 'May 01', label: 'Deposition Request', color: 'bg-violet-500' },
    ]
  };

  const events = timelines[industry] || timelines.healthcare;

  return (
    <div className="mt-6 space-y-3">
      <AnimatePresence mode="popLayout">
        {events.map((e, i) => (
          <motion.div
            key={e.label + industry}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${e.color}`} />
            <span className="text-[11px] font-bold text-slate-400 w-10 shrink-0">{e.date}</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{e.label}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function AccuracyMockup() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {[
        { label: 'Field Accuracy', value: '99.1%', color: 'text-emerald-500' },
        { label: 'Schema Match', value: '100%', color: 'text-blue-500' },
        { label: 'Hallucinations', value: '0', color: 'text-purple-500' },
        { label: 'Avg Latency', value: '1.8s', color: 'text-amber-500' },
      ].map((m, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-100 dark:border-slate-700 text-center shadow-sm">
          <div className={`text-xl font-extrabold ${m.color}`}>{m.value}</div>
          <div className="text-[10px] font-semibold text-slate-500 mt-0.5 uppercase tracking-wide">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Component ── */
export default function FeaturesGrid() {
  const { industry } = useIndustry();

  const codeMappingContent = {
    healthcare: {
      title: "Medical Code Mapping",
      desc: "Stop manual lookups. Free-text clinical language is automatically normalized to ICD-10, SNOMED CT, RxNorm, and CPT codes.",
      tags: ['ICD-10', 'SNOMED CT', 'RxNorm', 'CPT', 'LOINC']
    },
    insurance: {
      title: "Policy Clause Mapping",
      desc: "Eliminate manual policy reading. Automatically map loss descriptions directly to ISO policy forms, coverage limits, and exclusion clauses.",
      tags: ['ISO Forms', 'Coverage Limits', 'Exclusions', 'Riders', 'Endorsements']
    },
    legal: {
      title: "Statutory & Case Mapping",
      desc: "Stop manual legal research on active files. Connect unstructured facts directly to statutory codes, liability frameworks, and binding case precedents.",
      tags: ['USC Codes', 'CFR Citations', 'Liability Rules', 'Local Rules', 'Precedents']
    }
  };

  const contextContent = {
    healthcare: [
      ['clinical-history.pdf', '42 pages'],
      ['lab-results-q1.pdf', '8 pages'],
      ['rx-summary.pdf', '3 pages']
    ],
    insurance: [
      ['police-report.pdf', '12 pages'],
      ['damage-photos.zip', '24 files'],
      ['adjuster-notes.pdf', '4 pages']
    ],
    legal: [
      ['complaint.pdf', '32 pages'],
      ['deposition-transcript.pdf', '180 pages'],
      ['exhibit-list.pdf', '5 pages']
    ]
  };

  const tlDesc = {
    healthcare: 'clinical visits, treatment events, or medical actions',
    insurance: 'loss events, claim submissions, or adjuster actions',
    legal: 'breach events, court filings, or deposition activities'
  };

  const mapping = codeMappingContent[industry] || codeMappingContent.healthcare;
  const files = contextContent[industry] || contextContent.healthcare;

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-950 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-5 border border-blue-100 dark:border-blue-800/50"
          >
            Core Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5 font-display"
          >
            From messy records to<br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-indigo-500">production-ready operations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}
            className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed"
          >
            Every capability is built around one goal: getting structured, validated, schema-compliant data into your stack - fast, reliably, at scale.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto">

          {/* Card 1 — Large: Structured Extraction */}
          <motion.div
             viewport={{ once: true }}
            className="md:col-span-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group hover:shadow-xl transition-shadow"
          >
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Automated Operational Workflows</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Eliminates hours of manual data entry. Any record, scan, or image becomes a clean, typed JSON object — aligned to your exact schema to power automated decision-making.</p>
            <JsonMockup industry={industry} />
          </motion.div>

          {/* Card 2 — Large: Timeline Generation */}
          <motion.div
             viewport={{ once: true }}
            className="md:col-span-7 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 overflow-hidden relative group hover:shadow-xl transition-shadow"
          >
            <div className="absolute -left-12 -bottom-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-colors" />
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Chronological Timeline Generation</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Replaces manual timeline construction in Excel. Zumm untangles multi-document histories and builds an ordered event timeline — {tlDesc[industry] || tlDesc.healthcare} — ready for instant review.</p>
            <TimelineMockup industry={industry} />
          </motion.div>

          {/* Card 3 — Accuracy Stats */}
          <motion.div
             viewport={{ once: true }}
            className="md:col-span-4 bg-gradient-to-br from-[var(--primary)]/5 to-indigo-500/5 dark:from-[var(--primary)]/10 dark:to-indigo-500/10 border border-[var(--primary)]/20 dark:border-[var(--primary)]/20 rounded-3xl p-8 overflow-hidden relative group hover:shadow-xl transition-shadow"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Deterministic Accuracy</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Schema validators enforce compliance after every extraction. Hallucinations are algorithmically rejected before data leaves the pipeline.</p>
            <AccuracyMockup />
          </motion.div>

          {/* Card 4 — Medical Code Mapping */}
          <motion.div
             viewport={{ once: true }}
            className="md:col-span-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative group hover:shadow-xl transition-shadow overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/15 transition-colors" />
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
              <GitMerge className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{mapping.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{mapping.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {mapping.tags.map(code => (
                  <motion.span 
                    key={code + industry} 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm"
                  >
                    {code}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 5 — Multi-Document Context */}
          <motion.div
             viewport={{ once: true }}
            className="md:col-span-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 relative group hover:shadow-xl transition-shadow overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-colors" />
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center mb-4">
              <Combine className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Cross-Record Contextual Engine</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Eliminate the need to manually cross-reference PDFs on dual monitors. Zumm analyzes dozens of files simultaneously, reconciling conflicts and surfacing what matters for operations.</p>
            <div className="mt-6 flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {files.map(([name, size], i) => (
                  <motion.div 
                    key={name + industry} 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 border border-slate-100 dark:border-slate-700 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <FileSearch className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{size}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
