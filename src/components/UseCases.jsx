import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIndustry } from '../context/IndustryContext';
import { fadeIn } from '../utils/animations';
import { FileText, Stethoscope, HeartPulse, ShieldAlert, HeartHandshake, Eye, Gavel, FileSignature, Scale } from 'lucide-react';

export default function UseCases() {
  const { industry } = useIndustry();

  const useCasesContent = {
    healthcare: [
      { title: "Patient Summaries", desc: "Synthesize years of medical history into a single, structured 1-page overview.", icon: FileText },
      { title: "Clinical Decision Support", desc: "Extract vital signs and lab anomalies to highlight critical risks instantly.", icon: HeartPulse },
      { title: "EMR Integration", desc: "Push extracted ICD-10 codes and data directly to Epic or Cerner.", icon: Stethoscope }
    ],
    insurance: [
      { title: "Claim Analysis", desc: "Extract core facts from police reports, photos, and witness statements automatically.", icon: FileText },
      { title: "Risk Detection", desc: "Identify high-risk applications before underwriting by flagging historical anomalies.", icon: ShieldAlert },
      { title: "Fraud Signals", desc: "Cross-reference multiple documents to detect timeline inconsistencies.", icon: Eye }
    ],
    legal: [
      { title: "Case Summarization", desc: "Distill hundreds of pages of trial briefs into chronological, searchable summaries.", icon: Gavel },
      { title: "Evidence Extraction", desc: "Automatically surface key entities, dates, and contradiction points.", icon: Eye },
      { title: "Timeline Building", desc: "Construct a verified order of events directly from deposition transcripts.", icon: Scale }
    ]
  };

  const currentCases = useCasesContent[industry];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">
            Built for <span className="text-[var(--primary)] capitalize">{industry}</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">Industry-specific models designed to handle your exact domain vocabulary and workflows.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {currentCases.map((uc, i) => (
              <motion.div
                key={uc.title + industry}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/5 p-8 rounded-3xl hover:border-[var(--primary)]/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary-dark)]/20 border border-[var(--primary)]/30 flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] transition-colors">
                  <uc.icon className="w-6 h-6 text-[var(--primary-light)] group-hover:text-slate-900 dark:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-display">{uc.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
