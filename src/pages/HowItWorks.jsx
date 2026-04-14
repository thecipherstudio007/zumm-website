import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileUp, 
  BrainCircuit, 
  Target, 
  FileJson, 
  ArrowRight,
  ShieldCheck,
  Search,
  Layers,
  Wrench,
  GitMerge,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import SEO from '../components/SEO';
import DemoButton from '../components/DemoButton';

export default function HowItWorks() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const steps = [
    { icon: FileUp, label: "Upload" },
    { icon: BrainCircuit, label: "Understand" },
    { icon: Target, label: "Extract" },
    { icon: Layers, label: "Structure" },
    { icon: FileJson, label: "Deliver" }
  ];

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden">
      <SEO 
        title="How It Works - From Document to Insight" 
        description="Learn how Zumm's multi-stage AI maps, extracts, and structures massive medical documents with zero-hallucination accuracy in minutes."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent dark:from-[var(--primary)]/10 dark:to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-sm mb-6 border border-[var(--primary)]/20">
              <BrainCircuit className="w-4 h-4" />
              Processing Pipeline
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
              From Raw Documents to <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-600">
                Structured Insights
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed mb-10 max-w-3xl mx-auto font-medium">
              Zumm intelligently processes massive medical charts using multi-stage AI loops to map, extract, and strictly validate information—delivering perfect clinical structure in minutes.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <DemoButton 
                label="Get a Demo"
                className="px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-bold text-lg hover:bg-[var(--primary-dark)] transition-transform shadow-lg shadow-[var(--primary)]/20 hover:-translate-y-0.5" 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* High-Level Flow Sequence */}
      <section className="py-12 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-gray-900/20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-gray-800 -translate-y-1/2 z-0" />
            
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  key={step.label} 
                  className="relative z-10 flex flex-col items-center gap-4 bg-white dark:bg-gray-950 p-3 md:p-0 md:bg-transparent md:dark:bg-transparent rounded-2xl group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 flex items-center justify-center shadow-sm group-hover:border-[var(--primary)] group-hover:shadow-[var(--primary)]/20 group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-6 h-6 text-[var(--primary)] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-gray-300 text-sm tracking-wide group-hover:text-[var(--primary)] transition-colors duration-300">{step.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Core Pipeline Vertical Timeline */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto relative cursor-default">
          
          {/* Vertical Anchor Line */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-[var(--primary)]/30 to-slate-200 dark:from-gray-800 dark:via-[var(--primary)]/30 dark:to-gray-800" />

          {/* Stage 0 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="relative pl-16 md:pl-32 pb-20 group"
          >
            <div className="absolute left-6 md:left-12 w-4 h-4 rounded-full bg-[var(--primary)] -translate-x-1.5 mt-2 ring-4 ring-white dark:ring-gray-950 shadow-sm" />
            <span className="inline-block text-[var(--primary)] font-bold tracking-widest text-xs uppercase mb-3 bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20">Stage 0</span>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Secure Document Upload</h3>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
              You securely upload your massive PDF or medical chart exactly once. The file is temporarily encrypted and placed into our isolated processing buffers. 
              <strong> You never have to slice, chunk, or re-upload the document again.</strong>
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-gray-500">
              <Lock className="w-4 h-4 text-emerald-500" /> HIPAA Compliant Memory Transit
            </div>
          </motion.div>

          {/* Stage 1 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="relative pl-16 md:pl-32 pb-20"
          >
            <div className="absolute left-6 md:left-12 w-4 h-4 rounded-full bg-[var(--primary)] -translate-x-1.5 mt-2 ring-4 ring-white dark:ring-gray-950 shadow-sm" />
            <span className="inline-block text-[var(--primary)] font-bold tracking-widest text-xs uppercase mb-3 bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20">Stage 1</span>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Intelligent Document Mapping</h3>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
              Instead of blindly extracting text page-by-page, the system reads through the entire architecture once. It maps the biological layout of the chart, dynamically generating a <strong>structured index outlining which sections live on which exact pages.</strong>
            </p>
            <div className="bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/5 rounded-2xl p-6 flex gap-4">
              <Zap className="w-6 h-6 text-[var(--primary)] shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Efficiency Advantage</h4>
                <p className="text-sm text-slate-600 dark:text-gray-400">This completely avoids forcing the AI to blindly re-read massive irrelevant chunks of the document over and over. It cuts processing costs exponentially.</p>
              </div>
            </div>
          </motion.div>

          {/* Stage 2 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="relative pl-16 md:pl-32 pb-20"
          >
            <div className="absolute left-6 md:left-12 w-6 h-6 rounded-full bg-white dark:bg-gray-950 border-4 border-[var(--primary)] -translate-x-2.5 mt-1 ring-4 ring-[var(--primary)]/20 shadow-lg" />
            <span className="inline-block text-[var(--primary)] font-bold tracking-widest text-xs uppercase mb-3 bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20">Stage 2 — Core Engine</span>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Targeted Extraction & Control</h3>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-8">
              Utilizing the internal structural map from Stage 1, Zumm executes targeted extraction runs perfectly bounded around context. Sections are executed concurrently, relying heavily on a multi-pass structure.
            </p>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-white/10 rounded-[2rem] p-6 lg:p-8 hover:border-[var(--primary)]/50 transition-colors shadow-sm">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 text-slate-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pass A — Inventory Generation</h4>
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                      Pulls out raw scattered medical entities (SNOMED codes, diagnoses, random lab values) without formatting, ensuring absolutely nothing is left behind across boundaries.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-white/10 rounded-[2rem] p-6 lg:p-8 hover:border-[var(--primary)]/50 transition-colors shadow-sm">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pass B — Structured Blueprint</h4>
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                      Morphs the fragmented inventory generated natively in Pass A into strict, application-grade JSON schemas obeying exact data validation logics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-white/10 rounded-[2rem] p-6 lg:p-8 hover:border-orange-500/50 transition-colors shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-[0.03] rounded-bl-full pointer-events-none" />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pass C — Self-Repair</h4>
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                      If formatting strictly fails API schema requirements, a dedicated isolated intelligence loop auto-corrects corrupted nodes immediately before allowing pipeline passage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-slate-800 text-white rounded-2xl p-6 text-sm flex gap-4 border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <p className="leading-relaxed">
                <strong className="text-white">Smart Pagination:</strong> If a complicated medical table spans across pages 4 and 5, our boundaries explicitly instruct the Intelligence loop to pull those pages together securely. If a category doesn't exist anywhere—it bounds gracefully.
              </p>
            </div>
          </motion.div>

          {/* Stage 3 */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="relative pl-16 md:pl-32 pb-10"
          >
            <div className="absolute left-6 md:left-12 w-4 h-4 rounded-full bg-[var(--primary)] -translate-x-1.5 mt-2 ring-4 ring-white dark:ring-gray-950 shadow-sm" />
            <span className="inline-block text-[var(--primary)] font-bold tracking-widest text-xs uppercase mb-3 bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20">Stage 3</span>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Assembly & Delivery</h3>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
              The isolated processed JSON objects are syntactically stitched together completely mathematically without triggering additional AI computation costs. 
            </p>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
              The dashboard consumes the cleanly validated layout, and the insights are ready instantly.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Output / differentiation Section */}
      <section className="py-24 bg-slate-50 dark:bg-gray-900/30 border-t border-slate-200/60 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              An Architectural Leap Forward
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              Zumm doesn't rely on generic LLM text walls. We are a unified enterprise processing engine designed exclusively for dense, life-critical clinical literature.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Persistent Caching</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                By loading the document context securely exactly once and mapping physical tokens back iteratively utilizing cached state matrices, cost profiles drop up to ~80% versus traditional linear querying.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Multi-Pass Validation</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                Singular prompts force models to hallucinate. Segregating reading (extraction) from writing (formatting) guarantees factual adherence and completely isolates formatting parameters from analytic intelligence.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                <GitMerge className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Format-Ready Outputs</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                The conclusion of the pipeline isn't a conversational textual blob. The delivery matrix guarantees perfectly nested JSON arrays optimized exclusively for Dashboard rendering and EHR transit.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
