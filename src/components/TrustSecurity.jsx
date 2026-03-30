import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, Server, FileCheck } from 'lucide-react';

export default function TrustSecurity() {
  const points = [
    { icon: Lock, title: "AES-256 Encryption", desc: "Data rests in highly secure, AES-256 encrypted vaults." },
    { icon: FileCheck, title: "HIPAA-Ready Architecture", desc: "Built adhering to strict PHI compliance standards from day one." },
    { icon: Users, title: "Role-Based Access Control", desc: "Granular permissions ensure users only see documents they are authorized for." },
    { icon: Server, title: "Comprehensive Audit Logs", desc: "Immutable tracking of who viewed or processed what, and when." },
  ];

  return (
    <section className="py-24 bg-slate-900 border-y border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-900/10 mix-blend-color-burn pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-sm mb-6 border border-blue-500/20">
            <Shield className="w-4 h-4" /> Enterprise-Grade Trust
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-display">
            Built for Highly Sensitive Data Environments
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
            We understand that deploying AI in healthcare, legal, and insurance means adhering to zero-compromise security protocols. Zumm is engineered for absolute compliance.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8">
            {points.map((pt, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
               >
                 <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                   <pt.icon className="w-5 h-5" />
                 </div>
                 <h4 className="text-white font-bold mb-2">{pt.title}</h4>
                 <p className="text-gray-400 text-sm leading-relaxed">{pt.desc}</p>
               </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-[#050B14] border border-blue-500/20 rounded-3xl p-8 relative shadow-2xl overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-64 h-64 border border-blue-500/10 rounded-full opacity-50" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 border border-blue-500/10 rounded-full opacity-50" />
          
          <div className="space-y-6 relative z-10">
            {/* Mocked Security Audit Log */}
            {[
              { time: "09:41:22", action: "User session authenticated via SAML SSO", badge: "SUCCESS" },
              { time: "09:41:25", action: "Access granted to Patient Record #4021", badge: "PHI READ" },
              { time: "09:42:10", action: "PHI Document #4021 submitted to Ephemeral AI Extraction", badge: "PROCESSING" },
              { time: "09:42:14", action: "Ephemeral buffer wiped (Zero Retention Policy)", badge: "PURGED" }
            ].map((log, i) => (
               <div key={i} className="flex gap-4">
                 <div className="text-blue-500/50 font-mono text-xs pt-1 shrink-0">{log.time}</div>
                 <div>
                   <span className="text-white text-sm font-medium">{log.action}</span>
                   <div className="mt-1"><span className="text-[10px] font-mono tracking-wider text-blue-400 bg-blue-900/40 px-2 py-0.5 rounded border border-blue-500/20">{log.badge}</span></div>
                 </div>
               </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
