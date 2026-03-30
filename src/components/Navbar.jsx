import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIndustry } from '../context/IndustryContext';
import { useTheme } from '../context/ThemeContext';
import DemoButton from './DemoButton';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Scale, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { industry, setIndustry } = useIndustry();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const industries = [
    { id: 'healthcare', label: 'Healthcare', icon: Activity },
    { id: 'insurance', label: 'Insurance', icon: ShieldCheck },
    { id: 'legal', label: 'Legal', icon: Scale },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-white/10 py-3 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-dark)] flex items-center justify-center font-bold text-slate-900 dark:text-white transition-colors duration-300">
            Z
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">Zumm</span>
        </Link>

        {/* Desktop Industry Switcher */}
        <div className="hidden md:flex bg-gray-50/50 dark:bg-gray-900/50 p-1 rounded-full border border-slate-200/60 dark:border-white/5 backdrop-blur-sm">
          {industries.map((ind) => {
            const Icon = ind.icon;
            const isActive = industry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setIndustry(ind.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  isActive 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-[var(--primary)] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-slate-900 dark:text-white' : ''}`} />
                <span className="relative z-10">{ind.label}</span>
              </button>
            )
          })}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <DemoButton 
            className="hidden md:block px-6 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          />
          <button 
            className="md:hidden text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-gray-50 dark:bg-gray-900 border-b border-slate-200/60 dark:border-white/10 p-4 flex flex-col gap-2 shadow-sm"
        >
          <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase tracking-wider mb-2 px-2">Select Industry</p>
          {industries.map((ind) => {
            const Icon = ind.icon;
            const isActive = industry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  setIndustry(ind.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-[var(--primary)]/20 text-[var(--primary-light)] border border-[var(--primary)]/30' : 'text-slate-600 dark:text-gray-400 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{ind.label}</span>
              </button>
            )
          })}
          <DemoButton 
            onClick={() => { setMobileMenuOpen(false); }}
            className="mt-4 w-full py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-950 dark:text-white font-semibold text-sm border border-slate-200 dark:border-white/10"
          />
        </motion.div>
      )}
    </nav>
  );
}
