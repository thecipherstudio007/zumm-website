import React from 'react';
import { motion } from 'framer-motion';
import {
  FileUp,
  ScanText,
  Map,
  Cpu,
  Merge,
  LayoutDashboard,
  ArrowRight,
  Lock,
  Zap,
  Search,
  Layers,
  Wrench,
  ShieldCheck,
  GitMerge
} from 'lucide-react';
import SEO from '../components/SEO';
import DemoButton from '../components/DemoButton';

export default function HowItWorks() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const flowSteps = [
    { icon: FileUp, label: "Upload" },
    { icon: ScanText, label: "Prepare" },
    { icon: Map, label: "Map" },
    { icon: Cpu, label: "Extract" },
    { icon: Merge, label: "Combine" },
    { icon: LayoutDashboard, label: "Deliver" }
  ];

  const pipelineSteps = [
    {
      step: "01",
      title: "Upload & Preparation",
      icon: FileUp,
      description: "Upload your medical document once. Zumm securely receives it, cleans the text, and optimizes it for AI processing.",
      details: [
        "Supports PDFs, scanned charts, and multi-page records",
        "Text is cleaned and structured to improve processing accuracy",
        "Your document never needs to be re-uploaded or split manually"
      ],
      badge: { icon: Lock, text: "HIPAA Compliant", color: "emerald" }
    },
    {
      step: "02",
      title: "Smart Document Mapping",
      icon: Map,
      description: "The AI reads through your entire document once and creates a structured map — identifying exactly where key medical data lives.",
      details: [
        "Locates medications, lab results, visit notes, and diagnoses",
        "Maps each category to specific page ranges",
        "Uses an LLM to understand document structure intelligently"
      ],
      callout: {
        icon: Zap,
        title: "Why this matters",
        text: "Instead of re-reading the entire document for every question, the AI now knows exactly where to look. This dramatically reduces processing time and cost."
      }
    },
    {
      step: "03",
      title: "Efficient Caching",
      icon: Zap,
      accent: "indigo",
      description: "After the first read, your document is cached in memory. Every future step reuses this cached version instead of reading from scratch.",
      details: [
        "Reduces token usage by up to 90%",
        "Speeds up every subsequent processing step",
        "Cached securely — automatically cleared after processing"
      ]
    },
    {
      step: "04",
      title: "Parallel Data Extraction",
      icon: Cpu,
      isCore: true,
      description: "Each section of your document is processed independently and in parallel. Only the relevant pages are used — not the full document every time.",
      subSteps: [
        {
          icon: Search,
          title: "Extract",
          text: "The AI gathers all raw medical information from the relevant pages — diagnoses, medications, lab values, and clinical notes."
        },
        {
          icon: Layers,
          title: "Structure",
          text: "Extracted data is converted into organized, structured formats ready for your dashboard and reports."
        },
        {
          icon: Wrench,
          title: "Fix (if needed)",
          text: "If anything is missing or incorrectly formatted, it is automatically detected and corrected before moving forward.",
          accent: "orange"
        }
      ],
      callout: {
        icon: ShieldCheck,
        title: "Built-in accuracy",
        text: "By separating extraction from formatting, the AI avoids the hallucination problems that occur when doing everything in a single step."
      }
    },
    {
      step: "05",
      title: "Combine & Clean",
      icon: Merge,
      description: "All individually processed sections are merged together into a single, unified dataset.",
      details: [
        "Duplicate entries are detected and removed",
        "Inconsistent data is reconciled automatically",
        "Final structure is validated before delivery"
      ]
    },
    {
      step: "06",
      title: "Final Output",
      icon: LayoutDashboard,
      description: "Your structured medical data is ready. Clean, searchable, and formatted for immediate use in your dashboard.",
      details: [
        "Delivered as structured, application-ready data",
        "Fully searchable and filterable by category",
        "Ready for clinical review, reporting, or EHR integration"
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden">
      <SEO
        title="How It Works - From Document to Insight"
        description="Learn how Zumm processes medical documents step-by-step — from upload to structured, searchable clinical data in minutes."
      />

      {/* Hero */}
      <section className="pt-32 pb-20 relative px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent dark:from-[var(--primary)]/10 dark:to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-sm mb-6 border border-[var(--primary)]/20">
              <Cpu className="w-4 h-4" />
              How It Works
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
              From Raw Documents to <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-600">
                Structured Insights
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
              Your medical document goes through 6 clear steps — uploaded once, processed intelligently, and delivered as clean, structured data.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center justify-center">
              <DemoButton
                label="Get a Demo"
                className="px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-bold text-lg hover:bg-[var(--primary-dark)] transition-transform shadow-lg shadow-[var(--primary)]/20 hover:-translate-y-0.5"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Flow Strip */}
      <section className="py-10 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-gray-900/20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-2 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-gray-800 -translate-y-1/2 z-0" />

            {flowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  key={step.label}
                  className="relative z-10 flex flex-col items-center gap-3 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 flex items-center justify-center shadow-sm group-hover:border-[var(--primary)] group-hover:shadow-[var(--primary)]/20 group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="font-bold text-slate-600 dark:text-gray-400 text-xs tracking-wider uppercase group-hover:text-[var(--primary)] transition-colors duration-300">{step.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pipeline Timeline */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto relative">

          {/* Vertical Line */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-[var(--primary)]/30 to-slate-200 dark:from-gray-800 dark:via-[var(--primary)]/30 dark:to-gray-800" />

          {pipelineSteps.map((step, idx) => {
            const StepIcon = step.icon;
            const isLast = idx === pipelineSteps.length - 1;
            return (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
                className={`relative pl-16 md:pl-32 ${isLast ? 'pb-10' : 'pb-20'}`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-6 md:left-12 mt-2 ring-4 ring-white dark:ring-gray-950 shadow-sm -translate-x-1.5 ${
                  step.isCore
                    ? 'w-6 h-6 rounded-full bg-white dark:bg-gray-950 border-4 border-[var(--primary)] -translate-x-2.5 ring-[var(--primary)]/20 shadow-lg'
                    : 'w-4 h-4 rounded-full bg-[var(--primary)]'
                }`} />

                {/* Step Label */}
                <span className="inline-block text-[var(--primary)] font-bold tracking-widest text-xs uppercase mb-3 bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20">
                  Step {step.step}
                </span>

                {/* Title */}
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">{step.title}</h3>

                {/* Description */}
                <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-6">{step.description}</p>

                {/* Bullet Details */}
                {step.details && (
                  <ul className="space-y-2.5 mb-6">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Badge */}
                {step.badge && (
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-gray-500">
                    <step.badge.icon className={`w-4 h-4 text-${step.badge.color}-500`} />
                    {step.badge.text}
                  </div>
                )}

                {/* Sub-Steps (for Step 04) */}
                {step.subSteps && (
                  <div className="space-y-4 mb-6">
                    {step.subSteps.map((sub, sIdx) => {
                      const SubIcon = sub.icon;
                      const accentColor = sub.accent || 'primary';
                      const iconBg = sub.accent === 'orange' ? 'bg-orange-500/10' : (sIdx === 0 ? 'bg-slate-100 dark:bg-gray-800' : 'bg-[var(--primary)]/10');
                      const iconColor = sub.accent === 'orange' ? 'text-orange-500' : (sIdx === 0 ? 'text-slate-700 dark:text-gray-300' : 'text-[var(--primary)]');
                      const hoverBorder = sub.accent === 'orange' ? 'hover:border-orange-500/50' : 'hover:border-[var(--primary)]/50';

                      return (
                        <div key={sIdx} className={`bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 ${hoverBorder} transition-colors shadow-sm`}>
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                              <SubIcon className={`w-5 h-5 ${iconColor}`} />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">{sub.title}</h4>
                              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">{sub.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Callout Box */}
                {step.callout && (
                  <div className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/5 rounded-2xl p-6 flex gap-4">
                    <step.callout.icon className="w-6 h-6 text-[var(--primary)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{step.callout.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{step.callout.text}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why It's Different */}
      <section className="py-24 bg-slate-50 dark:bg-gray-900/30 border-t border-slate-200/60 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Why This Approach Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              Traditional AI tools read your entire document for every question. Zumm reads it once, maps it, and processes each section independently — faster, cheaper, and more accurate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Up to 90% Cost Reduction</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                Your document is cached after the first read. Every subsequent step reuses cached tokens instead of reprocessing — saving significant cost.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Zero Hallucination Design</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                Extraction and formatting are handled in separate steps. This prevents the AI from mixing facts with formatting — a common source of errors.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                <GitMerge className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Dashboard-Ready Output</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                The final output isn't a wall of text. It's clean, structured data — searchable, filterable, and ready for clinical review or EHR integration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
