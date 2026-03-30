import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Layers, Zap, Users } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';
import DemoButton from '../components/DemoButton';
import SEO from '../components/SEO';

export default function Enterprise() {
  const { industry } = useIndustry();

  const features = [
    { icon: Layers, title: "Custom Workflows", desc: "Tailor the AI extraction engine precisely to your organization's unique document types." },
    { icon: Users, title: "Multi-Team Support", desc: "Unified billing and segregated workspaces for massive, multi-national organizations." },
    { icon: Zap, title: "API Integrations", desc: "Inject Zumm intelligence directly into your existing ERP or proprietary software." },
    { icon: Building2, title: "Dedicated Onboarding", desc: "A dedicated solutions architect ensures your deployment is flawless from day one." },
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden relative">
      <SEO 
        title="AI Document Intelligence for Scale" 
        description="Zumm Enterprise offers custom integrations, dedicated support, and scalable AI infrastructure for large organizations."
      />
      <div className="absolute inset-x-0 top-0 h-[500px] mesh-gradient-light dark:hidden opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold text-sm mb-6 border border-[var(--primary)]/20`}>
              <Building2 className="w-4 h-4" /> Enterprise Edition
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
              Built for Large-Scale <br/><span className="text-gray-400 dark:text-gray-500 font-light">Organizations</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
              When standard plans aren't enough, our Enterprise tier brings unlimited scale, deep custom integrations, and dedicated support to your mission-critical operations.
            </p>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl mt-10">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ready to scale?</h4>
              <p className="text-slate-600 dark:text-gray-400 text-sm mb-6">If you need more than standard plans, book a call with our solutions team to discuss a custom deployment.</p>
              <DemoButton className="px-8 py-3 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-slate-900 dark:text-white font-bold transition-all">
                Book Demo
              </DemoButton>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feat, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/10 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-6">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                  {feat.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
