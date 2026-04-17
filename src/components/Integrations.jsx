import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, CloudCog, FileCode2, BookText, Scale } from 'lucide-react';
import { staggerContainer, fadeIn } from '../utils/animations';
import { useIndustry } from '../context/IndustryContext';

export default function Integrations() {
  const { industry } = useIndustry();

  const getPlatform = () => {
    if (industry === 'insurance') return { name: 'Guidewire', icon: Database, color: "text-blue-500", status: "active" };
    if (industry === 'legal') return { name: 'Clio', icon: Scale, color: "text-amber-600", status: "active" };
    return { name: 'Epic EHR', icon: Database, color: "text-red-500", status: "active" };
  };

  const platforms = [
    getPlatform(),
    { name: 'REST APIs', icon: Network, color: "text-emerald-500", status: "active" },
    { name: 'JSON Export', icon: FileCode2, color: "text-purple-500", status: "active" },
    { name: 'Salesforce', icon: CloudCog, color: "text-slate-400", status: "coming_soon" }
  ];

  const getCurlSnippet = () => {
    if (industry === 'insurance') {
      return `curl -X POST https://api.zumm.ai/v1/extract \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@insurance_claim.pdf" \\
  -F "modules=summary,timeline,risk_factors" \\
  -F "webhook_url=https://your-guidewire-instance.internal/webhook"`;
    } else if (industry === 'legal') {
      return `curl -X POST https://api.zumm.ai/v1/extract \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@legal_contract.pdf" \\
  -F "modules=summary,obligations,entities" \\
  -F "webhook_url=https://your-clio-account.internal/webhook"`;
    }
    return `curl -X POST https://api.zumm.ai/v1/extract \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@patient_record.pdf" \\
  -F "modules=summary,timeline,icd10" \\
  -F "webhook_url=https://your-epic-integration.internal/webhook"`;
  };

  return (
    <section id="integrations" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 mesh-gradient-light opacity-30 dark:hidden pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 border border-indigo-200/50 dark:border-indigo-800/50">
            Headless First
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white font-display">
            Direct Platform Integrations
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Zumm is built to live where your work happens. Connect to existing {industry === 'healthcare' ? 'EHR systems' : industry === 'insurance' ? 'claim management tools' : 'legal practice software'}, internal databases, and document ecosystems via our robust API and native SDKs.
          </p>
          <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 pt-2">
            * More integrations coming soon
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {platforms.map((platform, idx) => (
            <motion.div 
              key={idx + industry}
              variants={fadeIn}
              className={`relative bg-slate-50 dark:bg-gray-950 border rounded-3xl p-8 text-center transition-all group overflow-hidden ${
                platform.status === 'coming_soon' 
                  ? 'border-dashed border-slate-300 dark:border-gray-800 opacity-60 grayscale-[50%]' 
                  : 'border-slate-200 dark:border-white/5 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all'
              }`}
            >
              {platform.status === 'coming_soon' && (
                <div className="absolute top-4 right-4 bg-slate-200 dark:bg-gray-800 text-slate-500 dark:text-gray-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                  Coming Soon
                </div>
              )}
              <div className={`w-16 h-16 mx-auto bg-white dark:bg-gray-950 border rounded-2xl flex items-center justify-center mb-6 ${
                platform.status === 'coming_soon' 
                  ? 'border-dashed border-slate-200 dark:border-gray-800' 
                  : 'border-slate-200 dark:border-white/10 group-hover:scale-110 transition-transform'
              }`}>
                <platform.icon className={`w-8 h-8 ${platform.color}`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{platform.name}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                {platform.status === 'coming_soon' ? 'In development' : 'Seamless integration'}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Console / API snippet visual */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-16 bg-[#0B1120] rounded-3xl p-6 md:p-10 border border-white/10 overflow-hidden max-w-4xl mx-auto relative shadow-2xl shadow-slate-200/40 dark:shadow-none"
        >
           <div className="absolute top-0 right-10 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
           <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
             <div className="w-3 h-3 rounded-full bg-red-500" />
             <div className="w-3 h-3 rounded-full bg-yellow-500" />
             <div className="w-3 h-3 rounded-full bg-green-500" />
             <span className="ml-4 text-xs font-mono text-gray-400">POST /api/v1/extract</span>
           </div>
<pre className="text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto selection:bg-cyan-900 leading-relaxed">
{getCurlSnippet()}
</pre>
        </motion.div>

      </div>
    </section>
  );
}

