import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  FileUp, ScanText, Map, Cpu, Merge, LayoutDashboard,
  ArrowDown, Lock, Zap, Search, Layers, Wrench,
  ShieldCheck, GitMerge, ChevronRight, Sparkles,
  CheckCircle2, AlertTriangle, FileJson, Terminal,
  ArrowRight, Braces, Eye, User, Pill, FlaskConical,
  Stethoscope, Activity, Gavel, Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIndustry } from '../context/IndustryContext';
import SEO from '../components/SEO';
import DemoButton from '../components/DemoButton';

/* ═══════════════════════════════════════════════
   TYPING EFFECT HOOK
   ═══════════════════════════════════════════════ */

function useTypingEffect(text, speed = 18, trigger = false) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger) { setDisplayed(''); setDone(false); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, trigger]);

  return { displayed, done };
}

/* ═══════════════════════════════════════════════
   JSON TYPING COMPONENT
   ═══════════════════════════════════════════════ */

function JsonTyping({ lines, trigger, speed = 25 }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!trigger) { setVisibleLines(0); return; }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) clearInterval(interval);
    }, speed * 3);
    return () => clearInterval(interval);
  }, [trigger, lines.length, speed]);

  return (
    <div className="font-mono text-[13px] leading-[1.7] select-text">
      {lines.map((line, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -8 }}
          animate={idx < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.15 }}
        >
          {line}
        </motion.div>
      ))}
      {visibleLines < lines.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-[var(--primary)] ml-0.5 rounded-sm"
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   INSTRUCTION PROMPT COMPONENT
   ═══════════════════════════════════════════════ */

function InstructionPrompt({ text, trigger }) {
  const { displayed, done } = useTypingEffect(text, 20, trigger);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2.5">
        <Terminal className="w-3.5 h-3.5 text-[var(--primary)]" />
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">Example Prompt</span>
      </div>
      <div className="bg-slate-900 dark:bg-black/60 rounded-xl px-5 py-4 border border-slate-800 dark:border-white/10 shadow-lg shadow-black/10">
        <span className="text-emerald-400 font-mono text-sm">
          {displayed}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 rounded-sm align-middle"
            />
          )}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-1"
        style={{ originY: 0 }}
      >
        <div className="w-0.5 h-10 bg-gradient-to-b from-[var(--primary)]/60 to-[var(--primary)]/20 rounded-full" />
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[var(--primary)]/60" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   STEP CARD WRAPPER
   ═══════════════════════════════════════════════ */

function StepCard({ step, title, badge, accent = 'primary', children, isActive }) {
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
      {/* Top glow when active */}
      {isActive && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-40" />
      )}

      {/* Header */}
      <div className="px-6 md:px-8 pt-6 md:pt-8 pb-0">
        <div className="min-w-0 flex-grow">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full border border-[var(--primary)]/20">
              Step {step}
            </span>
            {badge && (
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${badge.className}`}>
                {badge.icon && <badge.icon className="w-3 h-3 inline mr-1" />}
                {badge.text}
              </span>
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-8 py-6 md:py-8">
        {children}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   OUTPUT PANEL (right column)
   ═══════════════════════════════════════════════ */

function OutputPanel({ label, icon: Icon = FileJson, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <Icon className="w-3.5 h-3.5 text-amber-500" />
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">{label || 'Output'}</span>
      </div>
      <div className="bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-200/60 dark:border-white/[0.06] overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-200/60 dark:border-white/5 bg-slate-100/50 dark:bg-white/[0.02]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="p-4 md:p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ANIMATED MAPPING ITEM
   ═══════════════════════════════════════════════ */

function MappingItem({ icon: Icon, label, pages, delay, trigger }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white dark:bg-gray-900/50 border border-slate-200/60 dark:border-white/5 group hover:border-[var(--primary)]/30 transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-[var(--primary)]" />
        </div>
        <span className="text-sm font-semibold text-slate-800 dark:text-gray-200">{label}</span>
      </div>
      <span className="text-xs font-mono text-slate-500 dark:text-gray-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md">
        {pages}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   EXTRACTION PARTICLE
   ═══════════════════════════════════════════════ */

function ExtractionItem({ text, delay, trigger, color = 'primary' }) {
  const colors = {
    primary: 'border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)]',
    emerald: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    purple: 'border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400',
    amber: 'border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={trigger ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay, type: 'spring', stiffness: 200, damping: 20 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium ${colors[color]}`}
    >
      <Search className="w-3 h-3" />
      {text}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   VALIDATION LINE
   ═══════════════════════════════════════════════ */

function ValidationLine({ original, fixed, delay, trigger }) {
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    if (!trigger) { setShowFixed(false); return; }
    const timer = setTimeout(() => setShowFixed(true), (delay + 0.5) * 1000);
    return () => clearTimeout(timer);
  }, [trigger, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={trigger ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay }}
      className="flex items-start gap-3 py-2"
    >
      <AnimatePresence mode="wait">
        {!showFixed ? (
          <motion.div
            key="error"
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 flex-1"
          >
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-sm text-red-400 font-mono line-through decoration-red-400/50">{original}</span>
          </motion.div>
        ) : (
          <motion.div
            key="fixed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 flex-1"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-sm text-emerald-400 font-mono">{fixed}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MERGE BLOCK ANIMATION
   ═══════════════════════════════════════════════ */

function MergeBlock({ label, color, delay, trigger }) {
  const [merged, setMerged] = useState(false);
  useEffect(() => {
    if (!trigger) { setMerged(false); return; }
    const timer = setTimeout(() => setMerged(true), (delay + 1.2) * 1000);
    return () => clearTimeout(timer);
  }, [trigger, delay]);

  const colorMap = {
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.9 }}
      animate={trigger ? { opacity: 1, x: 0, scale: merged ? 0.95 : 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className={`px-4 py-2.5 rounded-xl border text-sm font-mono font-medium flex items-center justify-between ${colorMap[color]}`}
    >
      <span><Braces className="w-3.5 h-3.5 inline mr-1.5" />{label}</span>
      {merged && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION PIPELINE LANE
   Shows each section's own Extract → Structure → Fix pipeline
   ═══════════════════════════════════════════════ */

function SectionPipelineLane({ icon: Icon, title, pages, color, prompt, extractedItems, jsonPreview, fix, delay, trigger }) {
  const [expanded, setExpanded] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!trigger) { setPhase(0); return; }
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), (delay + 0.4) * 1000));
    timers.push(setTimeout(() => setPhase(2), (delay + 1.2) * 1000));
    timers.push(setTimeout(() => setPhase(3), (delay + 2.0) * 1000));
    timers.push(setTimeout(() => setPhase(4), (delay + 2.8) * 1000));
    return () => timers.forEach(clearTimeout);
  }, [trigger, delay]);

  const colorMap = {
    blue:    { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-600 dark:text-blue-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400' },
    purple:  { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-600 dark:text-purple-400' },
    amber:   { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-600 dark:text-amber-400' },
  };
  const c = colorMap[color] || colorMap.blue;

  const phaseLabels = ['Queued', 'Extracting...', 'Structuring...', 'Validating...', 'Complete'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        phase === 4
          ? `${c.border} ${c.bg}`
          : 'border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-gray-900/50'
      }`}
    >
      {/* ─── ALWAYS VISIBLE: Title + Prompt + Status ─── */}
      <div className="px-5 pt-5 pb-4">
        {/* Top row: icon, title, pages, status */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-4 h-4 ${c.text}`} />
          </div>
          <div className="flex-grow min-w-0 flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-slate-800 dark:text-gray-200">{title}</span>
            <span className="text-[11px] font-mono text-slate-400 dark:text-gray-600 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md">{pages}</span>
          </div>
          {/* Phase badge */}
          {phase === 4 ? (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] font-bold text-emerald-500">Done</span>
            </motion.div>
          ) : phase > 0 ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className={`w-3 h-3 rounded-full border-2 border-t-transparent ${
                  phase === 1 ? 'border-amber-500' : phase === 2 ? 'border-[var(--primary)]' : 'border-orange-500'
                }`}
              />
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">{phaseLabels[phase]}</span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-400 dark:text-gray-600 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5">Queued</span>
          )}
        </div>

        {/* PROMPT — always visible */}
        <div className="flex items-start gap-2 mb-3">
          <Terminal className="w-3.5 h-3.5 text-amber-500 mt-1 shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-500">Example Prompt</span>
        </div>
        <div className="bg-slate-900 dark:bg-black/60 rounded-xl px-4 py-3 border border-slate-800 dark:border-white/10">
          <span className="text-emerald-400 font-mono text-[13px] leading-relaxed">{prompt}</span>
        </div>

        {/* Extracted items — show after phase 1 */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-1.5 mt-3"
          >
            {extractedItems.map((item, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border ${c.bg} ${c.border} ${c.text}`}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      {/* ─── EXPAND: Structure + Fix detail ─── */}
      <div className="px-5 pb-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-gray-500 hover:text-[var(--primary)] transition-colors mb-3"
        >
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.15 }}>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>
          {expanded ? 'Hide' : 'Show'} structure & validation detail
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3 border-t border-slate-100 dark:border-white/5 pt-3">
              {/* Structure phase */}
              <div className={`rounded-xl p-3.5 transition-all ${phase >= 2 ? 'bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5' : 'opacity-30'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Braces className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">Structured Output</span>
                  {phase >= 3 && <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />}
                </div>
                {phase >= 2 && (
                  <div className="bg-slate-900 dark:bg-black/50 rounded-lg px-3 py-2.5 font-mono text-[11px] leading-[1.7]">
                    {jsonPreview.map((line, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.08 }}>
                        <span className="text-purple-400">{line}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fix phase */}
              {fix && (
                <div className={`rounded-xl p-3.5 transition-all ${phase >= 3 ? 'bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5' : 'opacity-30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Auto-Correction</span>
                    {phase >= 4 && <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto" />}
                  </div>
                  {phase >= 3 && (
                    <div className="space-y-1.5 font-mono text-[12px]">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="text-red-400 line-through decoration-red-400/50">{fix.from}</span>
                      </div>
                      {phase >= 4 && (
                        <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span className="text-emerald-400">{fix.to}</span>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function Architecture() {

  /* Each step uses useInView to trigger animations */
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const step5Ref = useRef(null);
  const step6Ref = useRef(null);
  const step7Ref = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const step1InView = useInView(step1Ref, { margin: '-100px' });
  const step2InView = useInView(step2Ref, { margin: '-100px' });
  const step3InView = useInView(step3Ref, { margin: '-100px' });
  const step4InView = useInView(step4Ref, { margin: '-100px' });
  const step5InView = useInView(step5Ref, { margin: '-100px' });
  const step6InView = useInView(step6Ref, { margin: '-100px' });
  const step7InView = useInView(step7Ref, { margin: '-100px' });


  /* Mini-flow steps for the sidebar */
  const flowSteps = [
    { icon: FileUp, label: 'Upload', step: 1 },
    { icon: Map, label: 'Map', step: 2 },
    { icon: Search, label: 'Extract', step: 3 },
    { icon: Braces, label: 'Structure', step: 4 },
    { icon: ShieldCheck, label: 'Validate', step: 5 },
    { icon: Merge, label: 'Combine', step: 6 },
    { icon: LayoutDashboard, label: 'Output', step: 7 },
  ];

  /* ═══════════════════════════════════════════════
     VERTICAL PIPELINE TRACK (SIDEBAR LINE)
     ═══════════════════════════════════════════════ */

  function VerticalPipelineLine({ scrollYProgress }) {
    const scaleY = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });

    return (
      <div className="absolute left-[50px] lg:left-[60px] top-4 bottom-4 w-1 -translate-x-1/2">
        {/* Background Track */}
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800/50 rounded-full" />
        
        {/* Active Progress */}
        <motion.div
          className="absolute top-0 w-full h-full bg-gradient-to-b from-[var(--primary)] via-purple-500 to-indigo-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          style={{ 
            scaleY,
            originY: 0
          }}
        />
      </div>
    );
  }

  function PipelineStepNode({ icon: Icon, label, step, activeStep, isCurrent }) {
    const isActive = activeStep >= step;
    
    return (
      <div className="relative flex items-start justify-center w-full pt-8 h-full">
        <motion.div
          animate={isCurrent ? { scale: 1.15 } : { scale: 1 }}
          className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 shadow-xl ${
            isActive
              ? 'bg-white dark:bg-gray-900 border-[var(--primary)] shadow-[var(--primary)]/20'
              : 'bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 shadow-black/5'
          }`}
        >
          <Icon className={`w-6 h-6 transition-colors duration-500 ${
            isActive ? 'text-[var(--primary)]' : 'text-slate-300 dark:text-gray-700'
          }`} />

          {/* Active pulse */}
          {isCurrent && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-[var(--primary)]/20"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Step Number Badge - Moved to left to avoid card overlap */}
          <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border shadow-sm ${
            isActive ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-slate-100 dark:bg-gray-800 text-slate-400 border-slate-200 dark:border-gray-700'
          }`}>
            {step}
          </div>
        </motion.div>

        {/* Floating Label - Only visible on desktop */}
        <div className="hidden lg:block absolute right-[115%] top-4 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 pointer-events-none text-right">
          <span className={`text-[10px] font-extrabold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-xl ${
            isActive ? 'text-[var(--primary)]' : 'text-slate-400'
          }`}>
            {label}
          </span>
        </div>
      </div>
    );
  }

  const { industry } = useIndustry();

  // Industry-specific data content
  const content = {
    healthcare: {
      step1: {
        file: 'patient_records.pdf',
        stats: '42 pages · 2.4 MB',
        items: ['Text is cleaned and optimized', 'Pages are indexed for navigation', 'Record cached for reuse']
      },
      step2: {
        prompt: 'Scan the entire record and locate all key medical sections — map each to its page range.',
        mapping: [
          { icon: User, label: 'Demographics', pages: 'Pages 1–2' },
          { icon: Pill, label: 'Medications', pages: 'Pages 5–7' },
          { icon: FlaskConical, label: 'Lab Results', pages: 'Pages 8–12' },
          { icon: Stethoscope, label: 'Visit Notes', pages: 'Pages 13–28' },
          { icon: Activity, label: 'Vital Signs', pages: 'Pages 29–31' },
          { icon: ShieldCheck, label: 'Allergies & Risks', pages: 'Pages 32–34' }
        ]
      },
      step3: {
        lanes: [
          {
            icon: Pill, title: 'Medications', pages: 'Pages 5–7', color: 'blue',
            prompt: 'Example Prompt: Extract all medication names, dosages, frequencies, and prescribers from pages 5–7.',
            extractedItems: ['Albuterol HFA 90mcg', 'Metformin 500mg', 'Lisinopril 10mg'],
            jsonPreview: ['{ "name": "Albuterol HFA",', '  "dose": "90mcg/inh",', '  "frequency": "Q4H PRN",', '  "prescriber": "Dr. Williams" }'],
            fix: { from: '"dose": "5 mg twice"', to: '"dose": "5mg", "freq": "BID"' }
          },
          {
            icon: FlaskConical, title: 'Lab Results', pages: 'Pages 8–12', color: 'emerald',
            prompt: 'Example Prompt: Extract all lab test names, values, units, reference ranges, and flags from pages 8–12.',
            extractedItems: ['HbA1c: 7.2%', 'Creatinine: 1.1 mg/dL', 'eGFR: 85 mL/min'],
            jsonPreview: ['{ "test": "HbA1c",', '  "value": 7.2,', '  "unit": "%",', '  "flag": "HIGH" }'],
            fix: { from: '"value": "seven point two"', to: '"value": 7.2, "unit": "%"' }
          },
          {
            icon: Stethoscope, title: 'Visit Notes', pages: 'Pages 13–28', color: 'purple',
            prompt: 'Example Prompt: Extract all clinical findings, assessment plans, and physician observations from pages 13–28.',
            extractedItems: ['Asthma Exacerbation', 'Metabolic Syndrome', 'Physical Exam: Normal'],
            jsonPreview: ['{ "assessment": "Stable",', '  "plan": "Continue current regimen",', '  "follow_up": "90 days" }'],
            fix: { from: '"status": "ok"', to: '"status": "Stable", "validated": true' }
          },
          {
            icon: Activity, title: 'Vital Signs', pages: 'Pages 29–31', color: 'amber',
            prompt: 'Example Prompt: Extract all blood pressure, pulse, temperature, and respiration records from pages 29–31.',
            extractedItems: ['BP: 138/84', 'Pulse: 72 bpm', 'Temp: 98.6°F'],
            jsonPreview: ['{ "bp_systolic": 138,', '  "bp_diastolic": 84,', '  "pulse": 72,', '  "temp": 98.6 }'],
            fix: null
          }
        ]
      },
      json4: [
        <span key={0} className="text-slate-400">{'{'}</span>,
        <span key={1}> <span className="text-purple-400">"medications"</span><span className="text-slate-400">: [{'{'}</span></span>,
        <span key={2}>   <span className="text-purple-400">"name"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"Albuterol HFA"</span><span className="text-slate-400">,</span></span>,
        <span key={3}>   <span className="text-purple-400">"frequency"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"Q4H PRN"</span></span>,
        <span key={4}> <span className="text-slate-400">{'}],'}</span></span>,
        <span key={5}> <span className="text-purple-400">"labResults"</span><span className="text-slate-400">: [{'{'}</span></span>,
        <span key={6}>   <span className="text-purple-400">"test"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"HbA1c"</span><span className="text-slate-400">,</span></span>,
        <span key={7}>   <span className="text-purple-400">"flag"</span><span className="text-slate-400">:</span> <span className="text-amber-400">"HIGH"</span></span>,
        <span key={8}> <span className="text-slate-400">{'}]'}</span></span>,
        <span key={9} className="text-slate-400">{'}'}</span>,
      ],
      json7: [
        <span key={0} className="text-slate-400">{'{'}</span>,
        <span key={1}> <span className="text-purple-400">"patientSummary"</span><span className="text-slate-400">: {'{'}</span></span>,
        <span key={2}>   <span className="text-purple-400">"conditions"</span><span className="text-slate-400">:</span> <span className="text-amber-400">4</span> <span className="text-slate-600">active</span><span className="text-slate-400">,</span></span>,
        <span key={3}>   <span className="text-purple-400">"medications"</span><span className="text-slate-400">:</span> <span className="text-amber-400">8</span> <span className="text-slate-600">current</span><span className="text-slate-400">,</span></span>,
        <span key={4}>   <span className="text-purple-400">"status"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"VALIDATED"</span></span>,
        <span key={5}> <span className="text-slate-400">{'}'}</span></span>,
        <span key={6} className="text-slate-400">{'}'}</span>,
      ]
    },
    insurance: {
      step1: {
        file: 'claim_request_482.pdf',
        stats: '28 pages · 1.8 MB',
        items: ['Extract Policy coverage bounds', 'Optimize incident report text', 'Cross-examine claim history']
      },
      step2: {
        prompt: 'Map the claim file to locate Policy Scope, Incident Details, Damage Assessments, and repair Quotes.',
        mapping: [
          { icon: FileUp, label: 'Policy Scope', pages: 'Pages 1–3' },
          { icon: AlertTriangle, label: 'Incident Report', pages: 'Pages 4–8' },
          { icon: Wrench, label: 'Damage Assessment', pages: 'Pages 9–14' },
          { icon: User, label: 'Witness Accounts', pages: 'Pages 15–18' },
          { icon: FileJson, label: 'Repair Quotes', pages: 'Pages 19–25' },
          { icon: ShieldCheck, label: 'Policy Proofs', pages: 'Pages 26–28' }
        ]
      },
      step3: {
        lanes: [
          {
            icon: ShieldCheck, title: 'Coverage Scope', pages: 'Pages 1–3', color: 'purple',
            prompt: 'Identify liability limits and exclusionary clauses from the policy record.',
            extractedItems: ['Limit: $500,000', 'Glass Exclusion: Yes', 'Collision Deductible: $500'],
            jsonPreview: ['{ "coverage": "Comprehensive",', '  "limit": 500000,', '  "deductible": 500,', '  "exclusions": ["Glass"] }'],
            fix: { from: '"limit": "half million"', to: '"limit": 500000' }
          },
          {
            icon: AlertTriangle, title: 'Incident Audit', pages: 'Pages 4–8', color: 'amber',
            prompt: 'Example Prompt: Analyze the incident report on pages 4–8 to extract exact date, time, location, and contributing factors.',
            extractedItems: ['Date: 2024-03-12', 'Time: 14:15', 'Factor: Distraction'],
            jsonPreview: ['{ "date": "2024-03-12",', '  "cause": "Distracted Driving",', '  "police_ref": "B9201" }'],
            fix: { from: '"time": "2pm"', to: '"time": "14:15", "format": "24h"' }
          },
          {
            icon: Wrench, title: 'Damage Audit', pages: 'Pages 9–14', color: 'emerald',
            prompt: 'Example Prompt: Calculate impact severity and structural damage costs from field reports on pages 9–14.',
            extractedItems: ['Impact velocity: 45mph', 'Structural Frame: High', 'Paint Match: Standard'],
            jsonPreview: ['{ "severity": "High",', '  "estimated_cost": 12400,', '  "parts_ready": true,', '  "labor_hours": 32 }'],
            fix: null
          }
        ]
      },
      json4: [
        <span key={0} className="text-slate-400">{'{'}</span>,
        <span key={1}> <span className="text-purple-400">"coverage"</span><span className="text-slate-400">: {'{'}</span></span>,
        <span key={2}>   <span className="text-purple-400">"limit"</span><span className="text-slate-400">:</span> <span className="text-amber-400">500000</span><span className="text-slate-400">,</span></span>,
        <span key={3}>   <span className="text-purple-400">"type"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"Comprehensive"</span></span>,
        <span key={4}> <span className="text-slate-400">{'},'}</span></span>,
        <span key={5}> <span className="text-purple-400">"damage"</span><span className="text-slate-400">: {'{'}</span></span>,
        <span key={6}>   <span className="text-purple-400">"cost"</span><span className="text-slate-400">:</span> <span className="text-amber-400">12400</span><span className="text-slate-400">,</span></span>,
        <span key={7}>   <span className="text-purple-400">"severity"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"High"</span></span>,
        <span key={8}> <span className="text-slate-400">{'}'}</span></span>,
        <span key={9} className="text-slate-400">{'}'}</span>,
      ],
      json7: [
        <span key={0} className="text-slate-400">{'{'}</span>,
        <span key={1}> <span className="text-purple-400">"claimSummary"</span><span className="text-slate-400">: {'{'}</span></span>,
        <span key={2}>   <span className="text-purple-400">"policy"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"✔ Validated"</span><span className="text-slate-400">,</span></span>,
        <span key={3}>   <span className="text-purple-400">"loss"</span><span className="text-slate-400">:</span> <span className="text-amber-400">"$12,400"</span><span className="text-slate-400">,</span></span>,
        <span key={4}>   <span className="text-purple-400">"status"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"APPROVED"</span></span>,
        <span key={5}> <span className="text-slate-400">{'}'}</span></span>,
        <span key={6} className="text-slate-400">{'}'}</span>,
      ]
    },
    legal: {
      step1: {
        file: 'deposition_brief_v2.pdf',
        stats: '112 pages · 8.6 MB',
        items: ['Clean transcript punctuation', 'Index testimony entities', 'Cache precedent references']
      },
      step2: {
        prompt: 'Perform legal record mapping for Witness Testimony, Expert Evidence, Trial Motions, and Exhibits.',
        mapping: [
          { icon: Gavel, label: 'Trial Motions', pages: 'Pages 1–15' },
          { icon: User, label: 'Witness Statements', pages: 'Pages 16–45' },
          { icon: Search, label: 'Evidence Logs', pages: 'Pages 46–80' },
          { icon: Scale, label: 'Expert Testimony', pages: 'Pages 81–100' },
          { icon: Braces, label: 'Legal Citations', pages: 'Pages 101–112' }
        ]
      },
      step3: {
        lanes: [
          {
            icon: User, title: 'Witness Testimony', pages: 'Pages 16–45', color: 'blue',
            prompt: 'Extract all contradiction points and verified facts from witness transcripts.',
            extractedItems: ['Witness A: "Light was Red"', 'Witness B: "Light was Green"', 'Time of event: 18:42'],
            jsonPreview: ['{ "witness": "John Doe",', '  "contradiction": true,', '  "fact": "Time = 18:42",', '  "confidence": 0.98 }'],
            fix: { from: '"time": "6:42 PM"', to: '"time": "18:42", "military": true' }
          },
          {
            icon: ShieldCheck, title: 'Case Precedence', pages: 'Pages 101–112', color: 'purple',
            prompt: 'Identify all case citations and verify their current legal validity (Shepardize).',
            extractedItems: ['State v. Miller (1994)', 'Regal v. Trans (2012)', 'Rule 11.4 Compliance'],
            jsonPreview: ['{ "citation": "Miller v. State",', '  "year": 1994,', '  "validity": "STABLE",', '  "mention": "pp 104" }'],
            fix: null
          }
        ]
      },
      json4: [
        <span key={0} className="text-slate-400">{'{'}</span>,
        <span key={1}> <span className="text-purple-400">"testimony"</span><span className="text-slate-400">: {'{'}</span></span>,
        <span key={2}>   <span className="text-purple-400">"witness"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"John Doe"</span><span className="text-slate-400">,</span></span>,
        <span key={3}>   <span className="text-purple-400">"fact"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"Time=18:42"</span></span>,
        <span key={4}> <span className="text-slate-400">{'},'}</span></span>,
        <span key={5}> <span className="text-purple-400">"citations"</span><span className="text-slate-400">: {'{'}</span></span>,
        <span key={6}>   <span className="text-purple-400">"count"</span><span className="text-slate-400">:</span> <span className="text-amber-400">14</span><span className="text-slate-400">,</span></span>,
        <span key={7}>   <span className="text-purple-400">"valid"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">true</span></span>,
        <span key={8}> <span className="text-slate-400">{'}'}</span></span>,
        <span key={9} className="text-slate-400">{'}'}</span>,
      ],
      json7: [
        <span key={0} className="text-slate-400">{'{'}</span>,
        <span key={1}> <span className="text-purple-400">"caseCounsel"</span><span className="text-slate-400">: {'{'}</span></span>,
        <span key={2}>   <span className="text-purple-400">"witnesses"</span><span className="text-slate-400">:</span> <span className="text-amber-400">3</span><span className="text-slate-400">,</span></span>,
        <span key={3}>   <span className="text-purple-400">"evidence"</span><span className="text-slate-400">:</span> <span className="text-amber-400">12</span><span className="text-slate-400">,</span></span>,
        <span key={4}>   <span className="text-purple-400">"status"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"READY"</span></span>,
        <span key={5}> <span className="text-slate-400">{'}'}</span></span>,
        <span key={6} className="text-slate-400">{'}'}</span>,
      ]
    }
  };

  const activeContent = content[industry] || content.healthcare;

  // Determine active step based on scroll
  const activeStep = step7InView ? 7 : 
                     step6InView ? 6 : 
                     step5InView ? 5 : 
                     step4InView ? 4 : 
                     step3InView ? 3 : 
                     step2InView ? 2 : 1;

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden">
      <SEO
        title="Platform Architecture — AI Pipeline Explained"
        description="See exactly how Zumm transforms raw information into cognitive intelligence, step by step. A transparent look inside our AI processing pipeline."
      />

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 relative px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-purple-500/5 dark:from-[var(--primary)]/10 dark:to-purple-500/10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — headline */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-sm mb-6 border border-[var(--primary)]/20">
                  <Eye className="w-4 h-4" />
                  Transparent AI
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-[1.1] mb-6"
              >
                See Every Prompt,{' '}<br className="hidden md:block" />
                Every{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-600">
                  Transformation
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg font-medium"
              >
                No black boxes. Watch exactly how each AI instruction synthesizes, structures, and validates your intelligence — step by step, section by section.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <DemoButton
                  label="Get a Demo"
                  className="px-7 py-3.5 rounded-full bg-[var(--primary)] text-white font-bold text-base hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-[var(--primary)]/20 hover:-translate-y-0.5"
                />
                <Link to="/pricing" className="px-7 py-3.5 rounded-full bg-white dark:bg-gray-900 text-slate-900 dark:text-white font-bold text-base border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  View Pricing <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-sm transition-colors hover:bg-slate-200 dark:hover:bg-white/10 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-[var(--primary)]" /> 7 pipeline steps
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-sm transition-colors hover:bg-slate-200 dark:hover:bg-white/10 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> 90% cost reduction
                </span>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-sm transition-colors hover:bg-slate-200 dark:hover:bg-white/10 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Zero hallucination
                </span>
              </motion.div>
            </div>

            {/* Right — mini terminal preview */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-slate-900 dark:bg-black/80 rounded-2xl border border-slate-800 dark:border-white/10 shadow-2xl shadow-black/20 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800 dark:border-white/5 bg-slate-950/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="ml-3 text-xs text-slate-500 font-mono">zumm-pipeline</span>
                </div>
                <div className="p-5 space-y-3 font-mono text-sm">
                  <div className="text-slate-500">{'>'} Processing patient_records.pdf <span className="text-emerald-400">(42 pages)</span></div>
                  <div className="text-slate-500">{'>'} Mapping sections...</div>
                  <div className="pl-4 text-[var(--primary)]">→ Medications <span className="text-slate-600">pages 5–7</span></div>
                  <div className="pl-4 text-[var(--primary)]">→ Lab Results <span className="text-slate-600">pages 8–12</span></div>
                  <div className="pl-4 text-[var(--primary)]">→ Conditions <span className="text-slate-600">pages 13–28</span></div>
                  <div className="text-slate-500">{'>'} Running parallel extraction...</div>
                  <div className="text-amber-400">{'>'} Example Prompt: <span className="text-emerald-400">"Extract all medication names, dosages, and frequencies from pages 5–7"</span></div>
                  <div className="text-slate-500">{'>'} Structuring → JSON</div>
                  <div className="text-slate-500">{'>'} Validating...</div>
                  <div className="text-emerald-400 font-bold">{'✓'} patientSummary.json ready</div>
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-2.5 h-4 bg-emerald-400 rounded-sm" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PIPELINE STEPS ═══ */}
      <section className="py-16 md:py-32 px-4 md:px-40 lg:px-48 relative" ref={containerRef}>
        <div className="max-w-7xl mx-auto relative group">
          
          {/* Vertical Highway Line */}
          <VerticalPipelineLine scrollYProgress={scrollYProgress} />

          {/* START NODE */}
          <div className="absolute left-[50px] lg:left-[60px] -top-16 flex flex-col items-center -translate-x-1/2">
            <motion.div 
              animate={{ boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.5)', '0 0 0px rgba(59,130,246,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-3 whitespace-nowrap">Data Ingress</span>
          </div>

          <div className="space-y-20 lg:space-y-40">

            {/* ── STEP 1: Record Input ── */}
            <div ref={step1Ref} className="grid grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] gap-4 lg:gap-0 items-start group">
              <PipelineStepNode {...flowSteps[0]} activeStep={activeStep} isCurrent={activeStep === 1} />
              <StepCard
                step="01"
                title={industry === 'legal' ? 'Legal Record Upload' : industry === 'insurance' ? 'Claim File Upload' : 'Record Upload'}
                badge={{ text: 'HIPAA Secure', icon: Lock, className: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20' }}
                isActive={step1InView}
              >
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                  {industry === 'legal' ? 'Upload trial briefs, depositions, or case files. Zumm securely cleans and indexes the legal text for precision extraction.' : 
                   industry === 'insurance' ? 'Upload claim forms, incident reports, and repair quotes. Zumm prepares the file for automated policy and damage analysis.' : 
                   'Upload your medical record once. Zumm securely receives it, cleans the text, and prepares it for intelligent processing.'}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: Record visualization */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={step1InView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-slate-50 dark:bg-black/30 rounded-xl border border-slate-200/60 dark:border-white/[0.06] p-5 relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                          <FileUp className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800 dark:text-gray-200">{activeContent.step1.file}</div>
                          <div className="text-xs text-slate-500 dark:text-gray-500">{activeContent.step1.stats}</div>
                        </div>
                      </div>

                      {/* Page thumbnails */}
                      <div className="flex gap-2 overflow-hidden">
                        {[1, 2, 3, 4, 5].map((p) => (
                          <motion.div
                            key={p}
                            initial={{ opacity: 0, y: 10 }}
                            animate={step1InView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 + p * 0.1 }}
                            className="w-12 h-16 rounded-md bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 flex-shrink-0 flex items-center justify-center"
                          >
                            <div className="space-y-0.5 w-6">
                              {[0, 1, 2].map(l => (
                                <div key={l} className="h-0.5 bg-slate-200 dark:bg-gray-600 rounded-full" style={{ width: `${70 + Math.random() * 30}%` }} />
                              ))}
                            </div>
                          </motion.div>
                        ))}
                        <div className="w-12 h-16 rounded-md bg-slate-100 dark:bg-gray-800/50 flex items-center justify-center text-xs text-slate-400 dark:text-gray-600 font-bold flex-shrink-0">
                          +{industry === 'legal' ? '107' : industry === 'insurance' ? '23' : '37'}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: What happens */}
                  <div className="space-y-3">
                    {activeContent.step1.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 15 }}
                        animate={step1InView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + idx * 0.15 }}
                        className="flex items-center gap-3 py-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-gray-300 font-medium">{item}</span>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={step1InView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 }}
                      className="flex items-center gap-2 mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Cached in memory — 90% cost reduction for all following steps
                    </motion.div>
                  </div>
                </div>
              </StepCard>
            </div>

            {/* ── STEP 2: Understanding / Mapping ── */}
            <div ref={step2Ref} className="grid grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] gap-4 lg:gap-0 items-start group">
              <PipelineStepNode {...flowSteps[1]} activeStep={activeStep} isCurrent={activeStep === 2} />
              <StepCard 
                step="02" 
                title={industry === 'legal' ? 'Strategic Case Mapping' : industry === 'insurance' ? 'Policy & Claim Mapping' : 'Smart Information Mapping'} 
                isActive={step2InView}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: Instruction */}
                  <div className="space-y-5">
                    <InstructionPrompt
                      text={activeContent.step2.prompt}
                      trigger={step2InView}
                    />
                    <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      {industry === 'legal' ? 'The AI indexes the entire legal brief once to identify key sections like witness testimony and case law.' : 
                       industry === 'insurance' ? 'The AI creates a structured map of the claim file, identifying where damage evidence and witness statements are located.' : 
                       'The AI reads through your entire record once and creates a structured map — identifying exactly where each type of medical data lives.'}
                    </p>
                  </div>

                  {/* Right: Output */}
                  <OutputPanel label="Record Map" icon={Map}>
                    <div className="space-y-2">
                      {activeContent.step2.mapping.map((item, idx) => (
                        <MappingItem key={idx} icon={item.icon} label={item.label} pages={item.pages} delay={0.3 + (idx * 0.1)} trigger={step2InView} />
                      ))}
                    </div>
                  </OutputPanel>
                </div>

                {/* Callout */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={step2InView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.5 }}
                  className="mt-6 bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10 rounded-xl p-4 flex gap-3 border border-[var(--primary)]/10"
                >
                  <Zap className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Why this matters</h4>
                    <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                      Instead of re-reading the entire file for every question, the AI now knows exactly where to look. Each section is processed independently using only its relevant pages.
                    </p>
                  </div>
                </motion.div>
              </StepCard>
            </div>

            {/* ── STEP 3: Parallel Section Processing ── */}
            <div ref={step3Ref} className="grid grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] gap-4 lg:gap-0 items-start group">
              <PipelineStepNode {...flowSteps[2]} activeStep={activeStep} isCurrent={activeStep === 3} />
              <StepCard step="03" title="Parallel Section Processing" isActive={step3InView}
                badge={{ text: 'Core Engine', icon: Zap, className: 'text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20' }}
              >
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                  Each section runs its own independent AI pipeline — <strong className="text-slate-800 dark:text-gray-200">with its own prompt, extraction, structuring, and validation</strong>. All sections process in parallel, using only their relevant pages.
                </p>

                {/* Parallel lanes overview */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={step3InView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 }}
                  className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/5 px-4 py-2.5 rounded-xl border border-[var(--primary)]/15"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Each section below is a separate AI call — running simultaneously</span>
                </motion.div>

                {/* Section Pipeline Lanes */}
                <div className="space-y-4">
                  {activeContent.step3.lanes.map((lane, idx) => (
                    <SectionPipelineLane
                      key={idx}
                      icon={lane.icon}
                      title={lane.title}
                      pages={lane.pages}
                      color={lane.color}
                      prompt={lane.prompt}
                      extractedItems={lane.extractedItems}
                      jsonPreview={lane.jsonPreview}
                      fix={lane.fix}
                      delay={idx * 0.3}
                      trigger={step3InView}
                    />
                  ))}
                </div>

                {/* Callout */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={step3InView ? { opacity: 1 } : {}}
                  transition={{ delay: 2.5 }}
                  className="mt-6 bg-slate-50 dark:bg-white/[0.02] rounded-xl p-4 flex gap-3 border border-slate-200/60 dark:border-white/5"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Built-in accuracy</h4>
                    <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                      By separating extraction → structuring → fixing into distinct prompts for each section, the AI avoids hallucination and formatting errors that occur when doing everything in a single call.
                    </p>
                  </div>
                </motion.div>
              </StepCard>
            </div>

            {/* ── STEP 4: Structuring (Full JSON Preview) ── */}
            <div ref={step4Ref} className="grid lg:grid-cols-[120px_1fr] gap-0 items-start">
              <PipelineStepNode {...flowSteps[3]} activeStep={activeStep} isCurrent={activeStep === 4} />
              <StepCard 
                step="04" 
                title={industry === 'legal' ? 'Combined Evidence JSON' : industry === 'insurance' ? 'Unified Claim JSON' : 'Combined Structured Output'} 
                isActive={step4InView}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: Explanation */}
                  <div className="space-y-5">
                    <InstructionPrompt
                      text={industry === 'legal' ? 'All case evidence and expert testimony are now structured. Here is the unified case brief.' : 
                            industry === 'insurance' ? 'All damage assessments and policy mappings are now structured. Here is the unified claim summary.' : 
                            'All per-section results are now structured and validated. Here is the combined output so far.'}
                      trigger={step4InView}
                    />
                    <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      Each section's individually extracted, structured, and validated data is now ready to be merged. Below is a preview of the structured output.
                    </p>

                    {/* Transformation visual */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={step4InView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3 text-sm">
                        <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 font-mono text-xs border border-slate-200 dark:border-white/10">
                          Per-section results
                        </span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4 text-[var(--primary)]" />
                        </motion.div>
                        <span className="px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] font-mono text-xs border border-[var(--primary)]/20 font-bold">
                          {'{ } Unified JSON'}
                        </span>
                      </div>

                      {/* Section status chips */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(industry === 'legal' ? ['Motions', 'Evidence', 'Testimony', 'Citations'] : 
                          industry === 'insurance' ? ['Policy', 'Incident', 'Damage', 'Quotes'] : 
                          ['Medications', 'Labs', 'Conditions', 'Vitals']).map((section, idx) => (
                          <motion.div
                            key={section}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={step4InView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.8 + idx * 0.12 }}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {section}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: JSON Output */}
                  <OutputPanel label="Structured Output" icon={Braces}>
                    <JsonTyping lines={activeContent.json4} trigger={step4InView} speed={30} />
                  </OutputPanel>
                </div>
              </StepCard>
            </div>

            {/* ── STEP 5: Verification & Fixing ── */}
            <div ref={step5Ref} className="grid grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] gap-4 lg:gap-0 items-start group">
              <PipelineStepNode {...flowSteps[4]} activeStep={activeStep} isCurrent={activeStep === 5} />
              <StepCard 
                step="05" 
                title={industry === 'legal' ? 'Legal Consistency Validation' : industry === 'insurance' ? 'Policy Compliance Check' : 'Cross-Section Validation'} 
                isActive={step5InView}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: Instruction */}
                  <div className="space-y-5">
                    <InstructionPrompt
                      text={industry === 'legal' ? 'Run case consistency check — identify witness contradictions and verify citation stability.' : 
                            industry === 'insurance' ? 'Run policy compliance check — verify damage estimates against policy coverage and limits.' : 
                            'Run final cross-section validation — check for conflicts between sections, duplicate entries, and missing references.'}
                      trigger={step5InView}
                    />
                    <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      {industry === 'legal' ? 'A final pass checks for witness statement consistency across different depositions and validates citations.' : 
                       industry === 'insurance' ? 'A final pass compares damage assessments with coverage limits to identify exclusions or over-limit estimates.' : 
                       'After each section completes its own extraction and per-section fixing, a final validation pass checks for cross-section conflicts.'}
                    </p>
                  </div>

                  {/* Right: Validation animation */}
                  <OutputPanel label="Cross-Validation Results" icon={ShieldCheck}>
                    <div className="space-y-1">
                      <ValidationLine
                        original={industry === 'legal' ? 'Duplicate: Witness A testimony ref' : industry === 'insurance' ? 'Overload: Windshield damage claim' : 'Duplicate: "Lisinopril" in meds & procedures'}
                        fixed={industry === 'legal' ? 'Linked: Exhibit A → Testimony p.14' : industry === 'insurance' ? 'Exclusion: Handled via Section 4b' : 'Linked: meds.Lisinopril → procedures[2]'}
                        delay={0.3}
                        trigger={step5InView}
                      />
                      <ValidationLine
                        original={industry === 'legal' ? 'Missing: Case law year verification' : industry === 'insurance' ? 'Missing: Repair shop EIN' : 'Missing: provider ref in lab result #3'}
                        fixed={industry === 'legal' ? 'Resolved: Miller v. State (1994)' : industry === 'insurance' ? 'Resolved: EIN found in header' : 'Resolved: labResults[3].provider = "Dr. Patel"'}
                        delay={0.6}
                        trigger={step5InView}
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={step5InView ? { opacity: 1 } : {}}
                      transition={{ delay: 2 }}
                      className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Validation complete — All conflicts resolved
                    </motion.div>
                  </OutputPanel>
                </div>
              </StepCard>
            </div>

            {/* ── STEP 6: Smart Structuring ── */}
            <div ref={step6Ref} className="grid grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] gap-4 lg:gap-0 items-start group">
              <PipelineStepNode {...flowSteps[5]} activeStep={activeStep} isCurrent={activeStep === 6} />
              <StepCard 
                step="06" 
                title={industry === 'legal' ? 'Case Synthesis' : industry === 'insurance' ? 'Claim Consolidation' : 'Merge & Deduplicate'} 
                isActive={step6InView}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: Instruction */}
                  <div className="space-y-5">
                    <InstructionPrompt
                      text={industry === 'legal' ? 'Synthesize all validated brief sections into one unified Case Counsel report.' : 
                            industry === 'insurance' ? 'Consolidate all validated claim sections into one unified Loss Adjuster report.' : 
                            'Merge all validated sections into one unified patient summary. Remove duplicates and reconcile any conflicts.'}
                      trigger={step6InView}
                    />
                    <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                      All individually processed sections are combined into a single, unified dataset.
                    </p>
                  </div>

                  {/* Right: Merge visualization */}
                  <OutputPanel label="Merging Sections" icon={GitMerge}>
                    <div className="space-y-2 relative">
                      <MergeBlock label={industry === 'legal' ? 'brief_facts.json' : 'policy_limits.json'} color="blue" delay={0} trigger={step6InView} />
                      <MergeBlock label={industry === 'legal' ? 'testimony.json' : 'damage_calc.json'} color="emerald" delay={0.15} trigger={step6InView} />
                      <MergeBlock label="final_synthesis.json" color="purple" delay={0.45} trigger={step6InView} />

                      {/* Merged result appears */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={step6InView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 2, duration: 0.5, type: 'spring' }}
                        className="mt-4 px-4 py-3 rounded-xl bg-[var(--primary)]/10 border-2 border-[var(--primary)]/30 text-sm font-mono font-bold text-[var(--primary)] flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        {industry === 'legal' ? 'caseCounsel.json ready' : industry === 'insurance' ? 'lossAdjustment.json ready' : 'patientSummary.json ready'}
                      </motion.div>
                    </div>
                  </OutputPanel>
                </div>
              </StepCard>
            </div>

            {/* ── STEP 7: Unified Final Output ── */}
            <div ref={step7Ref} className="grid grid-cols-[100px_1fr] lg:grid-cols-[120px_1fr] gap-4 lg:gap-0 items-start group">
              <PipelineStepNode {...flowSteps[6]} activeStep={activeStep} isCurrent={activeStep === 7} />
              <StepCard step="07" title="Final Delivery" isActive={step7InView}
                badge={{ text: 'Dashboard Ready', icon: Sparkles, className: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' }}
              >
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                  {industry === 'legal' ? 'Your case synthesis is ready for review in the Counsel Dashboard.' : 
                   industry === 'insurance' ? 'Your claim loss adjustment report is ready for final approval.' : 
                   'Your complete, validated patient summary is ready for immediate use.'}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: Final JSON */}
                  <OutputPanel label="Final Report" icon={FileJson}>
                    <JsonTyping lines={activeContent.json7} trigger={step7InView} speed={25} />
                  </OutputPanel>

                  {/* Right: Dashboard preview */}
                  {industry === 'healthcare' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={step7InView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-200/60 dark:border-white/[0.06] shadow-lg overflow-hidden"
                  >
                    {/* Dashboard header */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/80 dark:bg-white/[0.02] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4 text-[var(--primary)]" />
                        <span className="text-sm font-bold text-slate-800 dark:text-gray-200">Patient Dashboard</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">LIVE</span>
                    </div>

                    {/* Dashboard body */}
                    <div className="p-4 space-y-3">
                      {/* Patient header */}
                      <motion.div initial={{ opacity: 0 }} animate={step7InView ? { opacity: 1 } : {}} transition={{ delay: 1.3 }}
                        className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/5">
                        <div className="w-9 h-9 rounded-full bg-[var(--primary)]/15 flex items-center justify-center">
                          <User className="w-4 h-4 text-[var(--primary)]" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800 dark:text-gray-200">James Mitchell, 54</div>
                          <div className="text-[11px] text-slate-500 dark:text-gray-500">MRN: 4820193 · Last visit: Mar 15, 2024</div>
                        </div>
                      </motion.div>

                      {/* Conditions row */}
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={step7InView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.5 }}>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-600 mb-1.5">Active Conditions</div>
                        <div className="flex flex-wrap gap-1.5">
                          {['Type 2 Diabetes', 'Hypertension', 'Asthma', 'Hyperlipidemia'].map((c, i) => (
                            <span key={i} className="text-[11px] font-medium px-2 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">{c}</span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Medications row */}
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={step7InView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1.7 }}>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-600 mb-1.5">Medications</div>
                        <div className="space-y-1">
                          {[{name: 'Metformin', dose: '500mg BID'}, {name: 'Lisinopril', dose: '10mg QD'}, {name: 'Albuterol', dose: '90mcg PRN'}].map((m, i) => (
                            <div key={i} className="flex items-center justify-between text-[12px] px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.02]">
                              <span className="font-medium text-slate-700 dark:text-gray-300">{m.name}</span>
                              <span className="font-mono text-slate-500 dark:text-gray-500 text-[11px]">{m.dose}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                  ) : (
                    <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-70">
                      <LayoutDashboard className="w-12 h-12 text-slate-400 mb-4" />
                      <p className="text-sm font-medium text-slate-500">Dashboard preview for {industry} coming soon</p>
                    </div>
                  )}
                </div>
              </StepCard>
            </div>

            {/* END NODE */}
            <div className="absolute left-[50px] lg:left-[60px] -bottom-20 hidden lg:flex flex-col items-center -translate-x-1/2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 whitespace-nowrap">Delivery Complete</span>
              <motion.div 
                animate={{ boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 20px rgba(168,85,247,0.5)', '0 0 0px rgba(168,85,247,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══ WHY THIS APPROACH ═══ */}
      <section className="py-24 bg-slate-50 dark:bg-gray-900/30 border-t border-slate-200/60 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Why This Approach Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              Traditional AI tools process raw files for every query. Zumm reads it once, maps it, and processes each section independently — faster, cheaper, and more accurate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                iconBg: 'bg-indigo-500/10',
                iconColor: 'text-indigo-500',
                title: 'Up to 90% Cost Reduction',
                desc: 'Your record is cached after the first read. Every subsequent step reuses cached tokens instead of reprocessing — saving significant cost.'
              },
              {
                icon: ShieldCheck,
                iconBg: 'bg-emerald-500/10',
                iconColor: 'text-emerald-500',
                title: 'Zero Hallucination Design',
                desc: 'Extraction and formatting are handled in separate steps. This prevents the AI from mixing facts with formatting — a common source of errors.'
              },
              {
                icon: GitMerge,
                iconBg: 'bg-[var(--primary)]/10',
                iconColor: 'text-[var(--primary)]',
                title: 'Dashboard-Ready Output',
                desc: "The final output isn't a wall of text. It's clean, structured data — searchable, filterable, and ready for clinical review or EHR integration."
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-6`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{card.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/5 to-transparent dark:from-[var(--primary)]/10 dark:to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Ready to see it in action?
          </h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
            Upload a record and watch our pipeline extract structured clinical data in minutes — not hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <DemoButton
              label="Schedule a Demo"
              className="px-8 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-lg transition-all shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl hover:shadow-[var(--primary)]/30 hover:-translate-y-0.5 flex items-center gap-2"
            />
            <Link
              to="/pricing"
              className="px-8 py-4 rounded-xl bg-white dark:bg-gray-900 text-slate-900 dark:text-white font-bold text-lg border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              View Pricing
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
