import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-950 min-h-screen flex items-center justify-center transition-colors duration-500">
      <div className="max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-9xl font-extrabold text-[var(--primary)] mb-4">404</h1>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Page Not Found</h2>
          <p className="text-xl text-slate-600 dark:text-gray-400 mb-10">
            It looks like the document you're looking for was either moved or never existed. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--primary)]/20"
            >
              <Home className="w-5 h-5" /> Back to Home
            </Link>
            <Link 
              to="/blog" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 transition-all hover:bg-slate-200 dark:hover:bg-white/10"
            >
              Visit our Blog <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
