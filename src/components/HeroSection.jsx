import React from 'react';
import { motion } from 'framer-motion';
import { useIndustry } from '../context/IndustryContext';
import DemoButton from './DemoButton';
import { fadeIn, staggerContainer } from '../utils/animations';
import { FileText, ArrowRight, Database, LayoutTemplate, BrainCircuit, ShieldCheck, Activity } from 'lucide-react';

export default function HeroSection() {
  const { industry } = useIndustry();

  // Dynamic global enterprise messaging per user requirement
  const getSubheadline = () => {
    if (industry === 'insurance') {
      return "Zumm automates claim reviews, extracts policy details, traces lifecycles, and flags risk factors — helping carriers save hours of manual processing.";
    } else if (industry === 'legal') {
      return "Zumm extracts key obligations, traces case timelines, maps liabilities, and creates AI-powered case summaries — helping legal teams save hours of manual review.";
    }
    return "Zumm extracts structured patient data, generates timelines, maps medical codes, and creates AI-powered summaries — helping healthcare teams save hours of manual work.";
  };

  const getHeadline = () => {
    if (industry === 'insurance') {
      return (
        <motion.h1 
          variants={fadeIn}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white font-display"
        >
          Transform Complex Claims into <br/>
          <span className="text-gradient from-[var(--primary-light)] to-[var(--primary-dark)]">
            Clear Decisions
          </span>
        </motion.h1>
      );
    } else if (industry === 'legal') {
      return (
        <motion.h1 
          variants={fadeIn}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white font-display"
        >
          Understand Legal Cases with <br/>
          <span className="text-gradient from-[var(--primary-light)] to-[var(--primary-dark)]">
            Complete Clarity
          </span>
        </motion.h1>
      );
    }
    return (
      <motion.h1 
        variants={fadeIn}
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white font-display"
      >
        Turn Complex Medical Records into <br/>
        <span className="text-gradient from-[var(--primary-light)] to-[var(--primary-dark)]">
          Clear, Actionable Insights
        </span>
      </motion.h1>
    );
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-white dark:bg-gray-950 transition-colors duration-500">
      
      {/* Mesh Gradient for Light Mode */}
      <div className="absolute inset-0 mesh-gradient-light dark:hidden opacity-60" />
      <div className="absolute inset-0 hidden dark:block mesh-gradient-dark opacity-40" />

      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-30 blur-[150px] pointer-events-none transition-colors duration-1000 bg-[var(--primary)]/40" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-20 blur-[120px] pointer-events-none transition-colors duration-1000 bg-purple-500/30" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-left space-y-8"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-slate-200/60 dark:border-white/10 text-[var(--primary-light)] text-sm font-medium">
            <BrainCircuit className="w-4 h-4" />
            <span>
              {industry === 'healthcare' ? 'Medical Intelligence Platform' : industry === 'insurance' ? 'Claims Intelligence Platform' : 'Case Intelligence Platform'}
            </span>
          </motion.div>

          {getHeadline()}

          <motion.p variants={fadeIn} className="text-xl text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed">
            {getSubheadline()}
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col items-start gap-4 pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <DemoButton className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 transition-all">
                Book Demo <ArrowRight className="w-5 h-5" />
              </DemoButton>
              <a href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
                Try Sample
              </a>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-gray-400 pl-4 sm:pl-0">
              Schedule a 30-minute demo at your convenience
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} className="flex items-center gap-6 pt-8 text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-emerald-500"/> Enterprise Security</span>
            <span className="flex items-center gap-1.5"><Activity className="w-5 h-5 text-[var(--primary-light)]"/> 99.9% Uptime</span>
          </motion.div>
        </motion.div>

        {/* Visual Component */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] w-full hidden lg:block perspective-1000"
        >
          {/* Abstract 3D-like Document Processing Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* Source Document */}
            <motion.div 
              animate={{ y: [0, -10, 0], rotateX: [10, 15, 10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-0 w-40 h-56 bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/10 rounded-xl p-4 shadow-2xl origin-bottom-left -skew-y-6 transform"
            >
              <FileText className="w-6 h-6 text-gray-500 dark:text-gray-500 mb-4" />
              <div className="space-y-2">
                <div className="h-1.5 bg-gray-700/50 rounded w-full"></div>
                <div className="h-1.5 bg-gray-700/50 rounded w-5/6"></div>
                <div className="h-1.5 bg-gray-700/50 rounded w-4/6"></div>
              </div>
            </motion.div>

            {/* AI Processing Node */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute z-20 left-[41%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-950 border border-[var(--primary)]/50 shadow-[0_0_30px_var(--primary-light)]"
            >
              <BrainCircuit className="w-8 h-8 text-[var(--primary-light)]" />
            </motion.div>

            {/* Data Flow Lines */}
            <svg className="absolute w-full h-full inset-0 z-10 pointer-events-none" viewBox="0 0 400 300">
              <motion.path 
                d="M 110 150 Q 164 150 164 150 T 265 150" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </svg>

            {/* Structured Output */}
            <motion.div 
              animate={{ y: [0, 10, 0], rotateX: [-10, -5, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute right-0 w-56 h-80 bg-gray-50/90 dark:bg-[#0B1120]/90 backdrop-blur-xl border border-[var(--primary)]/30 rounded-2xl p-4 shadow-[0_0_40px_var(--primary-dark)] origin-bottom-right skew-y-6 transform overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <LayoutTemplate className="w-5 h-5 text-[var(--primary-light)]" />
                <span className="text-xs font-mono font-bold text-[var(--primary-light)] uppercase tracking-widest">JSON Extracted</span>
              </div>
              
              {industry === 'healthcare' ? (
                <div className="space-y-3 font-mono text-[9px] text-slate-600 dark:text-gray-300 break-words whitespace-normal">
                  <div><span className="text-pink-500 font-semibold">"patient_data"</span>: {"{"}</div>
                  <div className="pl-4"><span className="text-pink-400 font-semibold">"name"</span>: <span className="text-emerald-400">"John D."</span>,</div>
                  <div className="pl-4"><span className="text-pink-400 font-semibold">"vitals_alert"</span>: <span className="text-orange-400">"High BP"</span></div>
                  <div>{"}"},</div>
                  <div><span className="text-pink-500 font-semibold">"timeline"</span>: [</div>
                  <div className="pl-4 flex items-center gap-2 text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <span className="text-blue-400">"09/12: Cardiology Consult"</span>,</div>
                  <div className="pl-4 flex items-center gap-2 text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <span className="text-blue-400">"11/04: Lab Results"</span></div>
                  <div>],</div>
                  <div><span className="text-pink-500 font-semibold">"data_codes"</span>: [</div>
                  <div className="pl-4"><span className="text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded">"ICD-10: I10"</span>, <span className="text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded">"SNOMED: 38341003"</span></div>
                  <div>],</div>
                  <div><span className="text-pink-500 font-semibold">"ai_summary"</span>: <span className="text-emerald-400 italic">"Patient exhibits escalating..."</span></div>
                </div>
              ) : industry === 'insurance' ? (
                <div className="space-y-3 font-mono text-[9px] text-slate-600 dark:text-gray-300 break-words whitespace-normal">
                  <div><span className="text-pink-500 font-semibold">"claim_data"</span>: {"{"}</div>
                  <div className="pl-4"><span className="text-pink-400 font-semibold">"id"</span>: <span className="text-emerald-400">"CLM-45821"</span>,</div>
                  <div className="pl-4"><span className="text-pink-400 font-semibold">"risk_score"</span>: <span className="text-orange-400">"Medium"</span></div>
                  <div>{"}"},</div>
                  <div><span className="text-pink-500 font-semibold">"timeline"</span>: [</div>
                  <div className="pl-4 flex items-center gap-2 text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <span className="text-blue-400">"11/12: Claim Submitted"</span>,</div>
                  <div className="pl-4 flex items-center gap-2 text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <span className="text-blue-400">"11/15: Adjuster Assigned"</span></div>
                  <div>],</div>
                  <div><span className="text-pink-500 font-semibold">"flags"</span>: [</div>
                  <div className="pl-4"><span className="text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded">"Risk: High Claim Value"</span>, <span className="text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded">"Missing Invoice"</span></div>
                  <div>],</div>
                  <div><span className="text-pink-500 font-semibold">"ai_summary"</span>: <span className="text-emerald-400 italic">"Claim displays risk markers..."</span></div>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-[9px] text-slate-600 dark:text-gray-300 break-words whitespace-normal">
                  <div><span className="text-pink-500 font-semibold">"case_data"</span>: {"{"}</div>
                  <div className="pl-4"><span className="text-pink-400 font-semibold">"title"</span>: <span className="text-emerald-400">"Smith vs ABC"</span>,</div>
                  <div className="pl-4"><span className="text-pink-400 font-semibold">"jurisdiction"</span>: <span className="text-orange-400">"SDNY"</span></div>
                  <div>{"}"},</div>
                  <div><span className="text-pink-500 font-semibold">"timeline"</span>: [</div>
                  <div className="pl-4 flex items-center gap-2 text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <span className="text-blue-400">"01/04: Complaint Filed"</span>,</div>
                  <div className="pl-4 flex items-center gap-2 text-slate-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <span className="text-blue-400">"03/01: Discovery Opened"</span></div>
                  <div>],</div>
                  <div><span className="text-pink-500 font-semibold">"clauses"</span>: [</div>
                  <div className="pl-4"><span className="text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded">"Milestone Breach"</span>, <span className="text-purple-400 bg-purple-500/10 px-1 py-0.5 rounded">"Liability Cap"</span></div>
                  <div>],</div>
                  <div><span className="text-pink-500 font-semibold">"ai_summary"</span>: <span className="text-emerald-400 italic">"Defendant failing to meet..."</span></div>
                </div>
              )}
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
