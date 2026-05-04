import { Link, useNavigate } from 'react-router-dom';
import DemoButton from './DemoButton';
import { useIndustry } from '../context/IndustryContext';

export default function Footer() {
  const { industry, setIndustry } = useIndustry();
  const navigate = useNavigate();

  const handleIndustrySelect = (ind) => {
    setIndustry(ind);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-slate-200/60 dark:border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="col-span-2 lg:col-span-2">
            <Link to={`/${industry}`} className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center font-bold text-slate-900 dark:text-white">Z</div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Zumm</span>
            </Link>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed max-w-xs mb-6">
              The cognitive intelligence platform for modern enterprises. Process complex information reliably and securely.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-slate-600 dark:text-gray-400 text-sm">
              <li><Link to={`/${industry}/#features`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Features</Link></li>
              <li><Link to={`/${industry}/#integrations`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Integrations</Link></li>
              <li><Link to={`/${industry}/security`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Security</Link></li>
              <li><Link to={`/${industry}/pricing`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Pricing</Link></li>
              <li><Link to={`/${industry}/how-it-works`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">How It Works</Link></li>
              <li><Link to={`/${industry}/ai-cost-calculator`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">AI Cost Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4 text-slate-600 dark:text-gray-400 text-sm">
              <li><button onClick={() => handleIndustrySelect('healthcare')} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer text-left">Healthcare</button></li>
              <li><button onClick={() => handleIndustrySelect('insurance')} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer text-left">Insurance</button></li>
              <li><button onClick={() => handleIndustrySelect('legal')} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer text-left">Legal</button></li>
              <li><Link to={`/${industry}/enterprise`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Enterprise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-600 dark:text-gray-400 text-sm">
              <li><Link to={`/${industry}/about`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">About</Link></li>
              <li><Link to={`/${industry}/blog`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Blog</Link></li>
              <li><Link to={`/${industry}/careers`} className="hover:text-slate-900 dark:text-white transition-colors cursor-pointer">Careers</Link></li>
              <li className="flex"><DemoButton label="Book a Call" className="hover:text-slate-900 dark:text-white transition-colors text-left w-full h-auto p-0 m-0 bg-transparent cursor-pointer" /></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200/60 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} Zumm Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to={`/${industry}/privacy`} className="hover:text-slate-900 dark:text-white transition-colors">Privacy Policy</Link>
            <Link to={`/${industry}/terms`} className="hover:text-slate-900 dark:text-white transition-colors">Terms of Service</Link>
            <Link to={`/${industry}/security`} className="hover:text-slate-900 dark:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
