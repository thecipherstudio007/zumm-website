import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';
import DemoButton from '../components/DemoButton';
import HealthcareSolution from '../components/HealthcareSolution';
import SEO from '../components/SEO';

const solutionData = {
  healthcare: {
    // Left empty here because HealthcareSolution takes over entirely
  },
  insurance: {
    title: "Smarter Claims Intelligence with AI",
    icon: ShieldCheck,
    color: "emerald",
    content: [
      { title: "Claims Extraction", desc: "Parse complex policy documents and claim forms with 99.9% accuracy." },
      { title: "Fraud Detection Signals", desc: "Identify inconsistencies across multiple documents to flag potential fraud." },
      { title: "Risk Scoring", desc: "Automatically calculate preliminary risk profiles based on historical intake data." },
      { title: "Faster Approvals", desc: "Reduce claim processing lifecycles from weeks down to minutes." }
    ]
  },
  legal: {
    title: "Instant Case Intelligence",
    icon: Scale,
    color: "violet",
    content: [
      { title: "Strategic Intelligence Synthesis", desc: "Synthesize massive discovery dumps into actionable strategic intelligence." },
      { title: "Evidence Extraction", desc: "Pinpoint specific clauses, entities, and obligations buried in contracts." },
      { title: "Timeline Reconstruction", desc: "Map chronologies of events and communications automatically." },
      { title: "Contract Analysis", desc: "Compare vendor agreements against standard templates for deviations." }
    ]
  }
};

export default function Solution() {
  const { industry } = useParams();
  const { setIndustry } = useIndustry();
  
  // Update global industry state to match route
  useEffect(() => {
    if (solutionData[industry]) {
      setIndustry(industry);
    }
  }, [industry, setIndustry]);

  const data = solutionData[industry];

  // If invalid industry param, redirect to its home
  if (!data) return <Navigate to={`/${industry}`} replace />;

  const Icon = data.icon;

  return (
    <div className="pt-32 pb-20 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-x-hidden relative">
      <SEO 
        title={`${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry Solutions`} 
        description={`Scale your ${industry} workflows with Zumm AI specialized cognitive intelligence.`}
      />
      <div className="absolute inset-x-0 top-0 h-[500px] mesh-gradient-light dark:hidden opacity-30"></div>
      
      {industry === 'healthcare' ? (
        <div className="relative z-10">
          <HealthcareSolution />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={industry} // Force re-animation on route change
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold text-sm mb-6 border border-[var(--primary)]/20`}>
                <Icon className="w-4 h-4" /> {industry.charAt(0).toUpperCase() + industry.slice(1)} Solutions
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-[1.15] mb-6">
                {data?.title}
              </h1>
              <p className="text-xl text-slate-600 dark:text-gray-400 mb-10 leading-relaxed max-w-lg">
                Empower your professionals with domain-specific AI designed to resolve the nuances of your industry's complex operational bottlenecks.
              </p>
              
              <DemoButton className="px-8 py-4 rounded-xl font-bold bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white transition-all text-lg flex items-center gap-2">
                Book Demo
              </DemoButton>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={`cards-${industry}`}
            className="grid sm:grid-cols-2 gap-6"
          >
            {data?.content?.map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/5 p-8 rounded-3xl relative shadow-xl shadow-slate-200/40 dark:shadow-none hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
