import React, { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import {
  FileUp, Database, Activity, FileCheck, MessageSquare, 
  ArrowRight, ShieldCheck, Clock, FileJson, Search,
  CheckCircle2, BrainCircuit, FileText, Link as LinkIcon,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import DemoButton from '../components/DemoButton';

/* ═══════════════════════════════════════════════
   STEP CARD WRAPPER
   ═══════════════════════════════════════════════ */

function StepCard({ step, title, outcome, badge, isActive, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative bg-white dark:bg-gray-900/80 rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${
        isActive
          ? 'border-[var(--primary)]/40 shadow-xl shadow-[var(--primary)]/5 dark:shadow-[var(--primary)]/10'
          : 'border-slate-200/60 dark:border-white/[0.06] shadow-sm'
      }`}
    >
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40" />
      )}

      <div className="px-6 md:px-8 pt-6 md:pt-8 pb-0">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-white bg-[var(--primary)] px-3 py-1 rounded-full shadow-sm">
            Step {step}
          </span>
          {badge && (
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${badge.className}`}>
              {badge.icon && <badge.icon className="w-3 h-3 inline mr-1" />}
              {badge.text}
            </span>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {title}
        </h3>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-700 dark:text-slate-300 font-semibold mb-6">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Outcome: {outcome}
        </div>
      </div>

      <div className="px-6 md:px-8 py-6 md:py-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
        {children}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MOCKUP COMPONENTS
   ═══════════════════════════════════════════════ */

const FileDropMockup = () => (
  <div className="border-2 border-dashed border-slate-300 dark:border-gray-700 rounded-2xl p-8 bg-white dark:bg-gray-900 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-white/[0.02]" />
    <FileUp className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
    <h4 className="font-bold text-slate-800 dark:text-gray-200 mb-2">Upload Claim Record Set</h4>
    <p className="text-sm text-slate-500 dark:text-gray-500 mb-6">Drag & drop complex medical files here</p>
    <div className="flex flex-wrap justify-center gap-2">
      {['PDF', 'Scanned Records', 'Excel / CSV', 'FHIR / JSON'].map((type) => (
        <span key={type} className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-400">
          {type}
        </span>
      ))}
    </div>
  </div>
);

const ExtractedDataMockup = () => (
  <div className="space-y-3">
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-purple-500" />
      <div className="flex justify-between items-start mb-2">
        <h5 className="font-bold text-sm text-slate-800 dark:text-gray-200">Type 2 Diabetes Mellitus</h5>
        <span className="text-[10px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">ICD-10: E11.9</span>
      </div>
      <div className="flex gap-2">
        <span className="text-xs bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded text-slate-600 dark:text-gray-400">Diagnosed: 2022-04-12</span>
        <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Active</span>
      </div>
    </div>
    
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-slate-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500" />
      <div className="flex justify-between items-start mb-2">
        <h5 className="font-bold text-sm text-slate-800 dark:text-gray-200">Metformin Hydrochloride</h5>
        <span className="text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">RxNorm: 860975</span>
      </div>
      <div className="text-xs text-slate-500 dark:text-gray-500 flex items-center gap-1.5">
        <Database className="w-3.5 h-3.5" /> FHIR Resource: MedicationRequest
      </div>
    </div>
  </div>
);

const TimelineMockup = () => (
  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-slate-200 dark:border-gray-800 relative">
    <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-gray-800" />
    
    <div className="space-y-6 relative z-10">
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
          <Activity className="w-4 h-4 text-red-500" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-400 mb-0.5">Oct 12, 2023 • ER Visit</div>
          <h5 className="font-bold text-sm text-slate-800 dark:text-gray-200">Patient admitted after MVA</h5>
          <p className="text-xs text-slate-500 mt-1">Reported severe lower back pain and restricted mobility.</p>
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
          <Search className="w-4 h-4 text-blue-500" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-400 mb-0.5">Oct 14, 2023 • Imaging</div>
          <h5 className="font-bold text-sm text-slate-800 dark:text-gray-200">MRI Lumbar Spine</h5>
          <p className="text-xs text-slate-500 mt-1">L4-L5 disc herniation with nerve root compression.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-400 mb-0.5">Nov 05, 2023 • Procedure</div>
          <h5 className="font-bold text-sm text-slate-800 dark:text-gray-200">L4-L5 Microdiscectomy</h5>
          <span className="inline-block mt-1 text-[10px] bg-slate-100 dark:bg-gray-800 px-2 py-0.5 rounded text-slate-600 dark:text-gray-400">SNOMED: 397123000</span>
        </div>
      </div>
    </div>
  </div>
);

const TraceabilityMockup = () => (
  <div className="grid grid-cols-2 gap-4 bg-slate-900 rounded-xl p-2 border border-slate-800 overflow-hidden">
    {/* Left: Source Document */}
    <div className="bg-white rounded-lg p-4 relative h-48 overflow-hidden opacity-90">
      <div className="text-[10px] text-gray-400 mb-2 font-mono">Record: IMAGING_REPORT.pdf • Page 4</div>
      <div className="w-3/4 h-2 bg-gray-200 rounded mb-2" />
      <div className="w-full h-2 bg-gray-200 rounded mb-2" />
      <div className="relative mt-4">
        <div className="absolute -inset-1 bg-yellow-200/50 border border-yellow-400 rounded" />
        <p className="text-[10px] text-gray-800 relative z-10 font-serif leading-relaxed">
          "Patient presents with acute exacerbation of chronic lower back pain following the accident on 10/12. MRI confirms L4-L5 herniation."
        </p>
      </div>
      <div className="w-5/6 h-2 bg-gray-200 rounded mt-4 mb-2" />
      <div className="w-2/3 h-2 bg-gray-200 rounded" />
    </div>

    {/* Right: Extracted Insight */}
    <div className="flex flex-col justify-center">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
          <LinkIcon className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Source Verified</span>
        </div>
        <div className="text-sm text-white font-medium mb-1">Pre-existing Condition Exacerbated</div>
        <div className="text-xs text-slate-400 mb-3">Chronic back pain worsened by recent MVA.</div>
        <div className="flex items-center gap-2 mt-auto">
          <button className="text-[10px] bg-[var(--primary)] text-white px-2 py-1 rounded font-bold hover:bg-blue-600 transition">Jump to Source</button>
          <span className="text-[10px] text-slate-500 font-mono">Confidence: 99%</span>
        </div>
      </div>
    </div>
  </div>
);

const ChatMockup = () => (
  <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col h-full">
    <div className="p-3 border-b border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-black/20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-[var(--primary)]" />
        <span className="text-xs font-bold text-slate-700 dark:text-gray-300">File Q&A: Claim #8821</span>
      </div>
      <Download className="w-4 h-4 text-slate-400" />
    </div>
    <div className="p-4 space-y-4 flex-grow bg-slate-50/50 dark:bg-transparent">
      {/* User Msg */}
      <div className="flex justify-end">
        <div className="bg-[var(--primary)] text-white text-xs px-3 py-2 rounded-lg rounded-tr-none max-w-[80%]">
          Are there any prior knee injuries noted before the 2024 accident?
        </div>
      </div>
      {/* AI Msg */}
      <div className="flex justify-start">
        <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 text-xs px-3 py-2 rounded-lg rounded-tl-none max-w-[90%] shadow-sm leading-relaxed">
          Yes. A physical therapy note from <strong className="text-[var(--primary)]">March 2022 (Page 42)</strong> mentions a "right medial meniscus tear" treated conservatively. This predates the 2024 claim.
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-gray-700 flex gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] bg-slate-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-gray-400 hover:text-[var(--primary)] cursor-pointer">
              <FileText className="w-3 h-3" /> View Page 42
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  
  const stepRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const stepsInView = stepRefs.map(ref => useInView(ref, { margin: '-100px' }));
  const activeStep = stepsInView.reduce((acc, inView, idx) => inView ? idx + 1 : acc, 1);

  const flowIcons = [FileUp, Database, Activity, FileCheck, MessageSquare];

  function VerticalPipelineLine({ scrollYProgress }) {
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (
      <div className="absolute left-[30px] md:left-[60px] top-6 bottom-6 w-1 -translate-x-1/2">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800/50 rounded-full" />
        <motion.div
          className="absolute top-0 w-full h-full bg-gradient-to-b from-[var(--primary)] via-indigo-500 to-purple-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          style={{ scaleY, originY: 0 }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden">
      <SEO
        title="How It Works — Medical Record Intelligence"
        description="See how Zumm turns complex patient records into structured, source-backed insights, timelines, and coded data in minutes."
      />

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 relative px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-purple-500/5 dark:from-[var(--primary)]/10 dark:to-purple-500/10 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-sm mb-6 border border-[var(--primary)]/20 shadow-sm">
              <BrainCircuit className="w-4 h-4" />
              For Claims, Legal & Review Teams
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-[1.1] mb-6"
          >
            Turn complex patient records into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-600">
              structured, source-backed insights
            </span>{' '}in minutes.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed mb-10 max-w-3xl mx-auto font-medium"
          >
            Stop drowning in 300-page medical PDFs. Our intelligence engine extracts coded data, builds interactive timelines, and links every fact to its exact source page.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <DemoButton
              label="See a Demo"
              className="px-8 py-4 rounded-full bg-[var(--primary)] text-white font-bold text-lg hover:bg-[var(--primary-dark)] transition-all shadow-xl shadow-[var(--primary)]/20 hover:-translate-y-1"
            />
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {[
              { icon: FileCheck, text: "100% Page-Level Traceability", color: "text-emerald-500" },
              { icon: Database, text: "ICD-10 & SNOMED Coding", color: "text-indigo-500" },
              { icon: Activity, text: "Interactive Chronologies", color: "text-[var(--primary)]" }
            ].map((stat, i) => (
              <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                <stat.icon className={`w-4 h-4 ${stat.color}`} /> {stat.text}
              </span>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ═══ WORKFLOW STEPS ═══ */}
      <section className="py-16 md:py-24 px-4 md:px-20 lg:px-48 relative" ref={containerRef}>
        <div className="max-w-6xl mx-auto relative group">
          
          <VerticalPipelineLine scrollYProgress={scrollYProgress} />

          {/* START NODE */}
          <div className="absolute left-[30px] md:left-[60px] -top-10 flex flex-col items-center -translate-x-1/2 z-10 bg-white dark:bg-gray-950 pb-2">
            <motion.div 
              animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.5)', '0 0 0px rgba(59,130,246,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 rounded-full bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center bg-white dark:bg-gray-950"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2 whitespace-nowrap bg-white dark:bg-gray-950 px-1 rounded">Data Ingress</span>
          </div>

          <div className="space-y-16 lg:space-y-24">

            {/* STEP 1 */}
            <div ref={stepRefs[0]} className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 items-start">
              <div className="relative flex justify-center w-full pt-8 h-full">
                <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 shadow-xl ${
                  activeStep >= 1 ? 'bg-white dark:bg-gray-900 border-[var(--primary)] shadow-[var(--primary)]/20' : 'bg-slate-50 dark:bg-gray-900 border-slate-200 dark:border-gray-800'
                }`}>
                  <FileUp className={`w-6 h-6 md:w-7 md:h-7 ${activeStep >= 1 ? 'text-[var(--primary)]' : 'text-slate-300'}`} />
                </div>
              </div>
              <StepCard
                step="01"
                title="Upload Complex Medical Files"
                outcome="Upload entire patient files or claim document sets"
                isActive={stepsInView[0]}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                      Don't worry about formatting or file types. Drop massive, unstructured patient records directly into the platform. Zumm ingests diverse medical documentation simultaneously.
                    </p>
                    <ul className="space-y-3 mb-6">
                      {['Scanned PDFs & Faxes', 'Native Digital Medical Records', 'Excel & CSV Claim Logs', 'Structured FHIR / JSON / XML'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-100 dark:bg-black/30 rounded-2xl border border-slate-200 dark:border-white/5">
                    <FileDropMockup />
                  </div>
                </div>
              </StepCard>
            </div>

            {/* STEP 2 */}
            <div ref={stepRefs[1]} className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 items-start">
              <div className="relative flex justify-center w-full pt-8 h-full">
                <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 shadow-xl ${
                  activeStep >= 2 ? 'bg-white dark:bg-gray-900 border-[var(--primary)] shadow-[var(--primary)]/20' : 'bg-slate-50 dark:bg-gray-900 border-slate-200 dark:border-gray-800'
                }`}>
                  <Database className={`w-6 h-6 md:w-7 md:h-7 ${activeStep >= 2 ? 'text-[var(--primary)]' : 'text-slate-300'}`} />
                </div>
              </div>
              <StepCard
                step="02"
                title="AI Extracts Structured Clinical Data"
                outcome="Raw records become structured, code-ready data"
                isActive={stepsInView[1]}
                badge={{ text: 'FHIR Native', icon: Database, className: 'text-purple-600 bg-purple-500/10 border-purple-500/20' }}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 p-4 bg-slate-100 dark:bg-black/30 rounded-2xl border border-slate-200 dark:border-white/5">
                    <ExtractedDataMockup />
                  </div>
                  <div className="order-1 md:order-2">
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                      The AI intelligently identifies and categorizes critical clinical data across hundreds of pages. It doesn't just read—it maps medical concepts to standard terminologies automatically.
                    </p>
                    <div className="bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-slate-200 dark:border-gray-800 mb-4">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Extracted & Coded Entities</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[11px] font-medium px-2 py-1 rounded bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300">Diagnoses (ICD-10)</span>
                        <span className="text-[11px] font-medium px-2 py-1 rounded bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300">Medications (RxNorm)</span>
                        <span className="text-[11px] font-medium px-2 py-1 rounded bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300">Procedures (SNOMED CT)</span>
                        <span className="text-[11px] font-medium px-2 py-1 rounded bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300">Patient Demographics</span>
                        <span className="text-[11px] font-medium px-2 py-1 rounded bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300">Clinical Events</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StepCard>
            </div>

            {/* STEP 3 */}
            <div ref={stepRefs[2]} className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 items-start">
              <div className="relative flex justify-center w-full pt-8 h-full">
                <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 shadow-xl ${
                  activeStep >= 3 ? 'bg-white dark:bg-gray-900 border-[var(--primary)] shadow-[var(--primary)]/20' : 'bg-slate-50 dark:bg-gray-900 border-slate-200 dark:border-gray-800'
                }`}>
                  <Activity className={`w-6 h-6 md:w-7 md:h-7 ${activeStep >= 3 ? 'text-[var(--primary)]' : 'text-slate-300'}`} />
                </div>
              </div>
              <StepCard
                step="03"
                title="Build Timeline & Clinical Story"
                outcome="Instant patient journey understanding"
                isActive={stepsInView[2]}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                      Zumm analyzes dates and events across the entire record set to synthesize a perfect chronological timeline. Understand the flow of treatments, accident impacts, and diagnosis progression instantly.
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mt-0.5">
                          <Clock className="w-4 h-4 text-[var(--primary)]" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-800 dark:text-gray-200">Chronological Sequencing</h5>
                          <p className="text-xs text-slate-500">Automatically orders events even if the original records are completely out of order.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mt-0.5">
                          <BrainCircuit className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-slate-800 dark:text-gray-200">Workflow Visualization</h5>
                          <p className="text-xs text-slate-500">See exactly how prior incidents connect to current claims and treatments.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-100 dark:bg-black/30 rounded-2xl border border-slate-200 dark:border-white/5">
                    <TimelineMockup />
                  </div>
                </div>
              </StepCard>
            </div>

            {/* STEP 4 */}
            <div ref={stepRefs[3]} className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 items-start">
              <div className="relative flex justify-center w-full pt-8 h-full">
                <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 shadow-xl ${
                  activeStep >= 4 ? 'bg-white dark:bg-gray-900 border-[var(--primary)] shadow-[var(--primary)]/20' : 'bg-slate-50 dark:bg-gray-900 border-slate-200 dark:border-gray-800'
                }`}>
                  <FileCheck className={`w-6 h-6 md:w-7 md:h-7 ${activeStep >= 4 ? 'text-[var(--primary)]' : 'text-slate-300'}`} />
                </div>
              </div>
              <StepCard
                step="04"
                title="Validate with Source-Backed Evidence"
                outcome="Fully auditable, trustworthy AI outputs"
                isActive={stepsInView[3]}
                badge={{ text: 'Crucial Differentiator', icon: ShieldCheck, className: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20' }}
              >
                <div className="mb-8 text-center max-w-2xl mx-auto">
                  <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
                    Never trust a summary without proof. Every single data point, diagnosis, and event is hard-linked to the exact paragraph on the exact page of the original medical file.
                  </p>
                </div>
                
                <div className="w-full">
                  <TraceabilityMockup />
                </div>

                <div className="flex justify-center mt-6 gap-6 flex-wrap">
                  <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Click to jump to source
                  </span>
                  <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Highlighted evidence
                  </span>
                  <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Human validation required
                  </span>
                </div>
              </StepCard>
            </div>

            {/* STEP 5 */}
            <div ref={stepRefs[4]} className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 items-start">
              <div className="relative flex justify-center w-full pt-8 h-full">
                <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 shadow-xl ${
                  activeStep >= 5 ? 'bg-white dark:bg-gray-900 border-[var(--primary)] shadow-[var(--primary)]/20' : 'bg-slate-50 dark:bg-gray-900 border-slate-200 dark:border-gray-800'
                }`}>
                  <MessageSquare className={`w-6 h-6 md:w-7 md:h-7 ${activeStep >= 5 ? 'text-[var(--primary)]' : 'text-slate-300'}`} />
                </div>
              </div>
              <StepCard
                step="05"
                title="Explore, Chat, and Export"
                outcome="Action-ready insights, not just summaries"
                isActive={stepsInView[4]}
              >
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                  <div className="flex flex-col justify-center">
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                      Interact with the medical record via a natural language AI chat that is strictly grounded in the uploaded data. Ask complex medical or legal questions and get answers cited directly to the source.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-gray-900/50 p-4 rounded-xl border border-slate-200 dark:border-gray-800">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Export Formats</h5>
                        <div className="flex gap-2">
                          <span className="flex items-center gap-1.5 text-xs font-bold bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm"><FileText className="w-3.5 h-3.5 text-red-500"/> PDF</span>
                          <span className="flex items-center gap-1.5 text-xs font-bold bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm"><Database className="w-3.5 h-3.5 text-emerald-500"/> Excel</span>
                          <span className="flex items-center gap-1.5 text-xs font-bold bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm"><FileJson className="w-3.5 h-3.5 text-purple-500"/> JSON/FHIR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-full min-h-[250px]">
                    <ChatMockup />
                  </div>
                </div>
              </StepCard>
            </div>

            {/* END NODE */}
            <div className="absolute left-[30px] md:left-[60px] -bottom-14 flex flex-col items-center -translate-x-1/2 z-10 bg-white dark:bg-gray-950 pt-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 whitespace-nowrap bg-white dark:bg-gray-950 px-1 rounded">Delivery Complete</span>
              <motion.div 
                animate={{ boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 20px rgba(168,85,247,0.5)', '0 0 0px rgba(168,85,247,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center bg-white dark:bg-gray-950"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 px-6 relative bg-slate-50 dark:bg-gray-900/30 border-t border-slate-200/60 dark:border-white/5">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Ready to completely transform your review process?
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
            Upload a 300-page patient file and get a structured, coded, source-backed timeline and insights in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <DemoButton
              label="Schedule a Demo"
              className="px-8 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-lg transition-all shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:-translate-y-0.5"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
