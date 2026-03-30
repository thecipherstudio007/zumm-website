import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500">
      <SEO title="Terms of Service" description="Legal agreement for using the Zumm AI document intelligence platform." />
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-slate dark:prose-invert max-w-none text-slate-900 dark:text-gray-300"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 font-display">Terms of Service</h1>
          <p className="text-slate-500 dark:text-gray-400 text-lg mb-12">Last Updated: March 30, 2026</p>
          
          <div className="p-6 bg-slate-50 dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-white/10 mb-12">
            <h4 className="text-slate-900 dark:text-white font-bold mb-2">Service Overview</h4>
            <p className="text-sm text-slate-600 dark:text-gray-400 m-0">Zumm provides an AI-driven platform designed to transform unstructured documentation into actionable data. By accessing our platform via web interface or API, you agree to the following terms.</p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. License & Access</h2>
            <p>Zumm grants you a non-exclusive, non-transferable right to access and use the platform for professional and business purposes. Enterprise customers are granted additional rights to integrate Zumm intelligence into internal workflows via our proprietary API.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Document Ownership & Usage</h2>
            <p>You retain full ownership of all documents and data uploaded to the Zumm platform. By using the service, you grant Zumm a limited license to process this data solely for the purpose of providing extracted insights and summaries to you.</p>
            <p className="mt-4 font-bold">We do NOT use Customer Data to train our base AI models unless explicitly opted-in for custom model fine-tuning by Enterprise partners.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Service Levels (SLA)</h2>
            <p>We strive for 99.9% platform availability. For Healthcare and Legal partners requiring higher uptime guarantees, custom Service Level Agreements (SLAs) are available via our sales team.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Compliance Responsibilities</h2>
            <p>While Zumm provides HIPAA-ready and secure infrastructure, customers are responsible for ensuring that their use of the platform complies with their internal privacy policies and industry-specific regulations (e.g., proper redaction before using public-facing endpoints).</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Intellectual Property</h2>
            <p>The Zumm platform, its unique extraction algorithms, UI components, and the "Zumm Intelligence Engine" are the exclusive property of Zumm Inc.</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">6. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the State of California, without regard to its conflict of law provisions.</p>
          </section>

          <section className="pt-8 border-t border-slate-200 dark:border-white/10">
            <p className="text-sm text-slate-500 dark:text-gray-400 italic">For custom Enterprise Master Service Agreements (MSA), please contact legal@zumm.ai.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
