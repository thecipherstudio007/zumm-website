import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, UserCircle } from 'lucide-react';
import { blogPosts } from '../data/blogData';

import SEO from '../components/SEO';

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  // Scroll to top on load since this is a long text page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="pt-24 pb-24 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 relative">
      <SEO 
        title={post.title}
        description={post.desc}
        ogType="article"
        ogImage={post.image}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10 pt-10">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-10 font-medium text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-semibold text-xs mb-6 border border-[var(--primary)]/20`}>
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-slate-500 dark:text-gray-400 text-sm mb-12 py-4 border-y border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {post.date}
              {post.readTime && (
                <>
                  <span className="mx-1 text-slate-300 dark:text-gray-700">•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <UserCircle className="w-4 h-4" /> Zumm Editorial
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.1 }}
          className="w-full h-[400px] rounded-3xl overflow-hidden mb-12 shadow-2xl"
        >
          <img src={post.image} alt="Hero" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-gray-300 leading-relaxed"
        >
          <p className="lead text-xl text-slate-800 dark:text-gray-200 font-medium mb-12">
            {post.desc}
          </p>
          
          <div className="space-y-4 blog-content">
            {post.content.split('\n').map((line, idx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={idx} className="h-4" />;

              // Headers
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-3xl font-bold text-slate-900 dark:text-white font-display mt-16 mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
                    {trimmed.replace('## ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-slate-900 dark:text-white font-display mt-10 mb-4">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }

              // Lists - ensure there's a space after the bullet to avoid catching bold text
              if (/^[\*\-]\s+/.test(trimmed)) {
                const cleanLine = trimmed.replace(/^[\*\-]\s+/, '');
                return (
                  <li key={idx} className="flex gap-4 text-lg text-slate-700 dark:text-gray-300 ml-4 mb-2">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                    <span>{renderTextWithBold(cleanLine)}</span>
                  </li>
                );
              }

              // Normal Paragraph
              return (
                <p key={idx} className="text-lg leading-relaxed text-slate-700 dark:text-gray-300">
                  {renderTextWithBold(trimmed)}
                </p>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Helper for bold text parsing
function renderTextWithBold(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => (
    part.startsWith('**') && part.endsWith('**') 
      ? <strong key={i} className="text-slate-900 dark:text-white font-bold">{part.slice(2, -2)}</strong>
      : part
  ));
}

