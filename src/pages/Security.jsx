import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Activity, Cloud, Fingerprint, FileCheck } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';
import SEO from '../components/SEO';

export default function Security() {
  const { industry } = useIndustry();

  const features = [
    { icon: Lock, title: "End-to-End Encryption", desc: "Data is encrypted at rest and in transit using military-grade AES-256." },
    { icon: Activity, title: "HIPAA-Ready Architecture", desc: "Designed to meet the stringent compliance needs of healthcare organizations." },
    { icon: Fingerprint, title: "Role-Based Access Control", desc: "Granular permissions ensure users only see documents they are authorized to access." },
    { icon: Cloud, title: "Secure Cloud Infrastructure", desc: "Hosted on certified SOC2 Type II compliant enterprise servers." },
    { icon: FileCheck, title: "Audit Logs & Compliance", desc: "Comprehensive, immutable audit trails for every document interaction." },
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden relative">
      <div className="absolute inset-0 mesh-gradient-light dark:hidden opacity-30"></div>
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold text-sm mb-6 border border-[var(--primary)]/20`}>
            <ShieldCheck className="w-4 h-4" /> Security First
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
            Enterprise-Grade Security <br/><span className="text-gray-400 dark:text-gray-500 font-light">Built for Sensitive Data</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your documents are your most valuable asset. The Zumm intelligence engine operates within a fortified perimeter designed to protect your data at all times.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 border border-slate-200/60 dark:border-white/10 p-8 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-6">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feat.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
