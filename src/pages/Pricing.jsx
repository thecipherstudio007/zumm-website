import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Minus,
  Shield,
  Zap,
  Users,
  Rocket,
  Star,
  Building2,
  ArrowRight,
  ChevronDown,
  CreditCard,
  Lock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import DemoButton from '../components/DemoButton';

/* ── DATA ─────────────────────────────────────────── */

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$499',
    originalPrice: '$750',
    period: '/mo',
    seats: '1 seat',
    credits: 'First 1,000 pages free',
    description: 'For individual practitioners getting started.',
    popular: false,
    cta: 'Book a Call',
    ctaLink: '',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$999',
    originalPrice: '$1,250',
    period: '/mo',
    seats: '3 seats',
    credits: 'First 4,000 pages free',
    description: 'For growing teams needing full clinical AI.',
    popular: true,
    cta: 'Book a Call',
    ctaLink: '',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    originalPrice: null,
    period: '',
    seats: 'Unlimited seats',
    credits: 'Unlimited pages',
    description: 'For large health systems with custom needs.',
    popular: false,
    cta: 'Book a Call',
    ctaLink: '',
  },
];

const comparisonData = [
  {
    title: 'Core AI Processing',
    icon: Sparkles,
    features: [
      { name: 'Intelligent Synthesis', basic: true, professional: true, enterprise: true },
      { name: 'Section-level extraction', basic: true, professional: true, enterprise: true },
      { name: 'Multi-pass AI pipeline', basic: false, professional: true, enterprise: true },
      { name: 'Auto-validation & correction', basic: true, professional: true, enterprise: true },
      { name: 'Custom AI instructions', basic: false, professional: true, enterprise: true },
      { name: 'Human-in-the-loop audit', basic: false, professional: 'Add-on', enterprise: true },
    ]
  },
  {
    title: 'Clinical Intelligence',
    icon: Shield,
    features: [
      { name: 'Demographics & Vitals', basic: true, professional: true, enterprise: true },
      { name: 'Medications & ICD-10 Coding', basic: true, professional: true, enterprise: true },
      { name: 'Provider Visit Notes', basic: false, professional: true, enterprise: true },
      { name: 'Lab Result Tracking', basic: false, professional: true, enterprise: true },
      { name: 'Risk Factors & Social Determinants', basic: false, professional: true, enterprise: true },
      { name: 'Cross-Record Timeline Search', basic: true, professional: true, enterprise: true },
      { name: 'AI Operations Assistant', basic: false, professional: true, enterprise: true },
    ]
  },
  {
    title: 'Reports & Workflows',
    icon: Zap,
    features: [
      { name: 'Standard Clinical Intelligence Report', basic: true, professional: true, enterprise: true },
      { name: 'Specialty-specific Formats', basic: false, professional: true, enterprise: true },
      { name: 'Custom Branding on Reports', basic: false, professional: true, enterprise: true },
      { name: 'Intelligent Patient Workflows', basic: true, professional: true, enterprise: true },
      { name: 'Bulk Export (JSON/Excel)', basic: false, professional: true, enterprise: true },
    ]
  },
  {
    title: 'Support & Security',
    icon: Lock,
    features: [
      { name: 'HIPAA Compliance (BAA included)', basic: true, professional: true, enterprise: true },
      { name: 'SOC 2 Type II Security', basic: true, professional: true, enterprise: true },
      { name: 'Priority Support', basic: false, professional: true, enterprise: true },
      { name: 'Dedicated Account Manager', basic: false, professional: false, enterprise: true },
      { name: 'SSO & Audit Logs', basic: false, professional: false, enterprise: true },
      { name: 'Onboarding & Training', basic: 'Self-serve', professional: 'Live session', enterprise: 'White-glove' },
    ]
  }
];

/* ── FEATURE ROW ──────────────────────────────────── */

function FeatureValue({ val }) {
  if (val === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" strokeWidth={2.5} />;
  if (val === false) return <Minus className="w-4 h-4 text-slate-300 dark:text-slate-700 mx-auto" />;
  return (
    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 text-center leading-tight">
      {val}
    </span>
  );
}

/* ── COMPARISON CATEGORY ──────────────────────────── */

function ComparisonCategory({ category, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = category.icon;

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 md:px-8 py-4 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border-b border-slate-200 dark:border-slate-700/60"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300">
            {category.title}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {category.features.map((feat, idx) => (
              <div
                key={idx}
                className={`grid ${idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/60 dark:bg-slate-900/40'} border-b border-slate-100 dark:border-slate-800`}
                style={{ gridTemplateColumns: '40% 20% 20% 20%' }}
              >
                <div className="px-6 md:px-8 py-4 flex items-center">
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feat.name}</span>
                </div>
                {[feat.basic, feat.professional, feat.enterprise].map((val, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center py-4 border-l border-slate-100 dark:border-slate-800 ${i === 1 ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
                      }`}
                  >
                    <FeatureValue val={val} />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── FAQ ITEM ─────────────────────────────────────── */

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 transition-colors hover:border-slate-300 dark:hover:border-slate-600">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
      >
        <span className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── MAIN PAGE ────────────────────────────────────── */

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <SEO
        title="Pricing — Plans & Features | Zumm"
        description="Simple, transparent pricing for Zumm's AI-powered clinical cognitive intelligence."
      />

      {/* ── HERO ───────────────────────────────────── */}
      <section className="pt-36 md:pt-40 pb-10 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[var(--primary)]/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto relative flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] border border-[var(--primary)]/25 bg-[var(--primary)]/5 rounded-full px-3.5 py-1.5 mb-4">
              <CreditCard className="w-3 h-3" />
              Value-First Pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">
              Simple,{' '}
              <span className="text-[var(--primary)]">transparent</span>{' '}pricing.
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
              No hidden fees. Start free and scale as your volume grows.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 pb-1">
            <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-emerald-500" /> HIPAA</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-[var(--primary)]" /> SOC 2</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-500" /> No setup fees</span>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING TABLE ──────────────────────────── */}
      <section className="px-4 md:px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-xl shadow-slate-200/60 dark:shadow-none bg-white dark:bg-slate-900 w-full relative"
          >
            {/* ── TABLE HEADER (Plan Summaries) ─────── */}
            <div
              className="grid border-b border-slate-200 dark:border-slate-700/60"
              style={{ gridTemplateColumns: '38% 1fr 1fr 1fr' }}
            >
              {/* Left label cell */}
              <div className="p-6 flex flex-col justify-center border-r border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Plans & Pricing</p>
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                  Choose your tier
                </h2>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-500">
                    <Shield className="w-3 h-3 text-emerald-500 shrink-0" />
                    HIPAA compliant on all plans
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-500">
                    <Lock className="w-3 h-3 text-[var(--primary)] shrink-0" />
                    SOC 2 Type II certified
                  </div>
                </div>
              </div>

              {/* Plan columns */}
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`flex flex-col p-6 md:p-7 border-r last:border-r-0 border-slate-100 dark:border-slate-800 relative ${plan.popular
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'bg-white dark:bg-slate-900'
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-px left-0 right-0 h-0.5 bg-[var(--primary)]" />
                  )}
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white bg-[var(--primary)] rounded-full px-3 py-1 shadow-lg shadow-[var(--primary)]/10 z-10 whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  {/* Plan name */}
                  <p className={`text-[11px] font-black uppercase tracking-widest mb-3 ${plan.popular ? 'text-[var(--primary)]' : 'text-slate-400 dark:text-slate-500'
                    }`}>
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="mb-5 min-h-[60px] flex flex-col justify-end">
                    {plan.originalPrice ? (
                      <p className="text-xs font-bold line-through mb-1 text-red-400 dark:text-red-500 decoration-red-400">{plan.originalPrice}</p>
                    ) : (
                      <div className="h-5" />
                    )}
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{plan.price}</span>
                      {plan.period && (
                        <span className="text-xs text-slate-400 font-bold ml-0.5">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* Capabilities - hide for enterprise */}
                  <div className="flex-1">
                    {plan.id !== 'enterprise' ? (
                      <div className="space-y-2 text-[11px] mb-5">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-400">
                          <Users className="w-3 h-3 text-[var(--primary)] shrink-0" />
                          {plan.seats}
                        </div>
                        <div className="flex items-start gap-1.5 font-semibold text-emerald-600 dark:text-emerald-500">
                          <Zap className="w-3 h-3 shrink-0 mt-0.5" />
                          <span className="leading-tight">{plan.credits}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-5 leading-relaxed">
                        Custom volume, integrations, and white-glove onboarding tailored to your health system.
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <DemoButton
                    label={plan.cta}
                    className={`block w-full text-center py-2.5 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all font-bold ${plan.popular
                        ? 'bg-[var(--primary)] text-white hover:opacity-90 shadow-lg shadow-[var(--primary)]/25'
                        : 'border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-900 dark:hover:border-slate-300 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  />
                </div>
              ))}
            </div>


            {/* ── FEATURE ROWS ──────────────────────── */}
            <div>
              {comparisonData.map((cat, idx) => (
                <ComparisonCategory key={cat.title} category={cat} defaultOpen={idx === 0} />
              ))}
            </div>

            {/* ── TABLE FOOTER ──────────────────────── */}
            <div className="p-8 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Need a custom deployment?</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">White-glove onboarding, custom integrations, and volume pricing for large health systems.</p>
              </div>
              <DemoButton
                label="Talk to Enterprise"
                className="shrink-0 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────── */}
      <section className="pb-28 px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto pt-16">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">Frequently asked</h2>
            <p className="text-slate-500 text-sm font-medium">Common questions about billing, pages, and features.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What counts as a "page"?',
                a: 'A page is one standard record page run through our AI pipeline. We process every element — text, tables, codes, and signatures. Once your free pages are consumed, you will be charged per record processing. Multi-page records are billed per page.'
              },
              {
                q: 'How do seat counts work?',
                a: 'A seat is one simultaneous user login. Basic supports 1 practitioner, Professional gives 3 seats for team collaboration, and Enterprise allows unlimited staff access.'
              },
              {
                q: 'Can I upgrade from Basic to Professional?',
                a: 'Yes — instantly from your dashboard. We prorate your billing so you only pay the difference for the remaining days of your current billing cycle.'
              },
              {
                q: 'Is my clinical data secure?',
                a: 'All plans include full HIPAA compliance with end-to-end encryption. We sign BAAs for all paid plans. Enterprise customers also get audit logs, SSO, and data retention controls.'
              },
              {
                q: 'What happens after my free pages are used?',
                a: 'You can purchase additional page packs from your dashboard, or upgrade to a higher tier. All processed records and extracted data remain accessible at all times.'
              },
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 dark:bg-white px-10 py-16 md:px-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/30 via-transparent to-purple-600/20 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-black text-white dark:text-slate-900 mb-4 relative">
              Ready to get started?
            </h2>
            <p className="text-slate-400 dark:text-slate-600 text-base mb-8 max-w-md mx-auto relative">
              See Zumm process your own information live — before you commit to a plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <DemoButton
                label="Book a Demo"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--primary)] text-white font-black text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-xl shadow-[var(--primary)]/30"
              />
              <Link
                to="/how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 dark:bg-slate-200 text-white dark:text-slate-900 font-black text-sm uppercase tracking-wider border border-white/20 dark:border-slate-300 hover:bg-white/20 dark:hover:bg-slate-300 transition-all flex items-center justify-center gap-2"
              >
                See How It Works <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
