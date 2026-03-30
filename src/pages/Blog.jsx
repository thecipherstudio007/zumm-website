import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

import { blogPosts } from '../data/blogData';
import SEO from '../components/SEO';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Healthcare", "Insurance", "Legal"];
  
  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  return (
    <div className="pt-32 pb-24 bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-500 overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-[400px] mesh-gradient-light dark:hidden opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
            Zumm <span className="text-[var(--primary)] text-gradient">Insights</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            The latest research, product updates, and industry insights on the future of document intelligence.
          </p>
        </div>

        <div className="flex justify-center mb-12 relative z-20">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 p-1.5 rounded-[2rem] shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white' 
                  : "text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <motion.div 
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 border border-slate-200/60 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/30 dark:shadow-none hover:-translate-y-2 transition-transform duration-300 flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--primary)] border border-white/20">
                      {post.category}
                    </div>
                    {post.isNew && (
                      <div className="bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white animate-pulse">
                        New
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm mb-4">
                    <Calendar className="w-4 h-4" /> {post.date}
                    <span className="mx-1 text-slate-300 dark:text-gray-700">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                    {post.desc}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 font-bold text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors mt-auto"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

