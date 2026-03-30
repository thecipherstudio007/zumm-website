import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Workflow, Target } from 'lucide-react';
import { staggerContainer, fadeIn } from '../utils/animations';

export default function OutcomeBar() {
  const stats = [
    { icon: Clock, label: "Save 60–80% time on document review" },
    { icon: Zap, label: "Extract insights in seconds, not hours" },
    { icon: Workflow, label: "Reduce manual administrative workload" },
    { icon: Target, label: "Improve decision speed and accuracy" }
  ];

  return (
    <section className="bg-[#0B1120] border-y border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeIn}
              className="flex items-center gap-4 pt-6 md:pt-0 md:px-6 first:pt-0 first:pl-0 last:pr-0"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <stat.icon className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-white font-semibold text-sm leading-tight max-w-[180px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
