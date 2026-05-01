import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

export default function About() {
  const team = [
    { name: "Sarah Jenkins", role: "CEO & Co-Founder", img: "https://i.pravatar.cc/150?img=47" },
    { name: "David Chen", role: "CTO & AI Lead", img: "https://i.pravatar.cc/150?img=11" },
    { name: "Elena Rodriguez", role: "Head of Product", img: "https://i.pravatar.cc/150?img=5" },
    { name: "Marcus Johnson", role: "VP of Engineering", img: "https://i.pravatar.cc/150?img=60" },
  ];

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 relative overflow-hidden">
      <SEO 
        title="About Zumm - The Future of Cognitive Intelligence" 
        description="Learn about the team and technology behind Zumm. We are building the world's most reliable AI for complex information synthesis."
      />
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6"
        >
          Building the Future of <br/><span className="text-[var(--primary)]">Cognitive Intelligence</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed"
        >
          Zumm is designed to synthesize complex intelligence and empower professionals across healthcare, insurance, and legal industries to make faster, more accurate decisions without being bogged down by paperwork.
        </motion.p>
      </div>

      <div className="bg-slate-50 glow-top-primary py-24 border-t border-slate-200/60 dark:border-white/10">
      {/* Safe Background Tint Layer */}
      <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.03] dark:hidden pointer-events-none"></div>
      <div className="absolute inset-0 hidden dark:block bg-gray-900/30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display mb-6">Our Mission</h2>
              <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                To eliminate the friction between raw information and actionable intelligence. We believe that human experts should spend their time analyzing and strategizing, not reading through hundreds of pages of technical boilerplate.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-display mb-6">Our Vision</h2>
              <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                A world where intelligence synthesis is instantaneous and flawless. By bridging the gap between LLM reasoning and real-world enterprise constraints, we are building the definitive operating system for professional knowledge workers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white font-display">Meet the Team</h2>
          <p className="text-slate-600 dark:text-gray-400 mt-4">The minds behind the Zumm intelligence engine.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-white dark:border-gray-800 group-hover:scale-105 transition-transform duration-300 shadow-xl">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
              <p className="text-sm text-[var(--primary)] font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
