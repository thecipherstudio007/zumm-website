import React from 'react';
import { Link } from 'react-router-dom';
import DemoButton from './DemoButton';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-slate-200/60 dark:border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center font-bold text-slate-900 dark:text-white">Z</div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Zumm</span>
            </Link>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed max-w-xs mb-6">
              The AI document intelligence platform for modern enterprises. Process complex information reliably and securely.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-600 dark:text-gray-400 text-sm">
              <li><Link to="/#features" className="hover:text-slate-900 dark:text-white transition-colors">Features</Link></li>
              <li><Link to="/#integrations" className="hover:text-slate-900 dark:text-white transition-colors">Integrations</Link></li>
              <li><Link to="/security" className="hover:text-slate-900 dark:text-white transition-colors">Security</Link></li>
              <li><Link to="/pricing" className="hover:text-slate-900 dark:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-slate-900 dark:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/ai-cost-calculator" className="hover:text-slate-900 dark:text-white transition-colors">AI Cost Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4 text-slate-600 dark:text-gray-400 text-sm">
              <li><Link to="/solutions/healthcare" className="hover:text-slate-900 dark:text-white transition-colors">Healthcare</Link></li>
              <li><Link to="/solutions/insurance" className="hover:text-slate-900 dark:text-white transition-colors">Insurance</Link></li>
              <li><Link to="/solutions/legal" className="hover:text-slate-900 dark:text-white transition-colors">Legal</Link></li>
              <li><Link to="/enterprise" className="hover:text-slate-900 dark:text-white transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-600 dark:text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-slate-900 dark:text-white transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-slate-900 dark:text-white transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-slate-900 dark:text-white transition-colors">Careers</Link></li>
              <li className="flex"><DemoButton label="Book a Call" className="hover:text-slate-900 dark:text-white transition-colors text-left w-full h-auto p-0 m-0 bg-transparent" /></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200/60 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} Zumm Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-slate-900 dark:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-900 dark:text-white transition-colors">Terms of Service</Link>
            <Link to="/security" className="hover:text-slate-900 dark:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
