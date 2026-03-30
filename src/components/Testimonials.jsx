import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIndustry } from '../context/IndustryContext';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const { industry } = useIndustry();

  const testimonials = {
    healthcare: [
      { quote: "Zumm reduced our document review time by 70%. We used to spend hours cross-referencing patient histories. Now we find contradictions instantly.", author: "Dr. Sarah Jenkins", role: "Chief Medical Officer, Regional Health" },
      { quote: "It catches nuanced clinical patterns and generates structured timelines flawlessly. We've reclaimed hours of administrative work.", author: "Marcus Thompson", role: "Director of Health Informatics" },
      { quote: "Focus on care, not paperwork. Zumm has allowed our nursing staff to do exactly that.", author: "Elaine Foster", role: "Head of Nursing" }
    ],
    insurance: [
      { quote: "Zumm reduced our claims processing time by 70%. We can auto-adjudicate low variance claims safely now using the extracted JSON.", author: "David Wallace", role: "VP of Claims, SecureLife" },
      { quote: "The fraud detection timeline view highlights discrepancies instantly. The ROI was clear in week one.", author: "Angela Martin", role: "Senior Risk Analyst" },
      { quote: "Extremely easy to deploy. Our adjusters rely on the AI summaries on a daily basis to make faster, better decisions.", author: "Tom Halpert", role: "Director of Operations" }
    ],
    legal: [
      { quote: "Zumm reduced our contract review time by 70%. The auto-timeline generation from depositions is genuinely magical.", author: "Harvey Specter", role: "Managing Partner" },
      { quote: "Extracting specific definitions and clauses across a 400-doc data room used to take weeks. Now it takes hours.", author: "Rachel Zane", role: "Senior Paralegal" },
      { quote: "The entity extraction is flawless. Spend less time on admin work and more time building your case.", author: "Louis Litt", role: "Litigation Chair" }
    ]
  };

  const current = testimonials[industry];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">Trusted by Industry Leaders</h2>
          <p className="text-slate-600 dark:text-gray-400">See what professionals are saying about Zumm.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {current.map((t, i) => (
              <motion.div
                key={t.author + industry}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 border border-slate-200/60 dark:border-white/5 p-8 rounded-3xl relative shadow-xl"
              >
                <Quote className="w-10 h-10 text-[var(--primary)] opacity-20 absolute top-6 right-6" />
                <p className="text-lg text-slate-700 dark:text-gray-300 font-medium leading-relaxed mb-8 relative z-10">"{t.quote}"</p>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{t.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
