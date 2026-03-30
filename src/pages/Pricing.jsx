import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIndustry } from '../context/IndustryContext';
import SEO from '../components/SEO';

export default function Pricing() {
  const { industry } = useIndustry();

  const getTierFeatures = (tierName) => {
    if (industry === 'healthcare') {
      if (tierName === "Starter") return ["Basic EHR summarization", "HIPAA-ready storage", "Email support", "Standard security"];
      if (tierName === "Pro") return ["Medical NLP insights", "Automated lab-trend timelines", "Clinical API access", "Priority clinical support"];
      return ["Unlimited patient records", "Direct EHR/FHIR integrations", "Dedicated medical compliance manager", "24/7 Phone & Slack support"];
    }
    if (industry === 'insurance') {
      if (tierName === "Starter") return ["Single-claim summarization", "Limited monthly uploads", "Email support", "Fraud detection basic"];
      if (tierName === "Pro") return ["Bulk claims intelligence", "Automated policy-drift timelines", "Claims API access", "Priority adjuster support"];
      return ["Unlimited claims processing", "Custom carrier integrations", "Dedicated risk analysis manager", "24/7 Phone & Slack support"];
    }
    if (industry === 'legal') {
      if (tierName === "Starter") return ["Basic contract summarization", "Limited case file uploads", "Email support", "Standard encryption"];
      if (tierName === "Pro") return ["Advanced case-law insights", "Automated litigation timelines", "Legal API access", "Priority paralegal support"];
      return ["Unlimited case management", "Custom firm integrations", "Dedicated legal ops manager", "24/7 Phone & Slack support"];
    }
    // Default
    if (tierName === "Starter") return ["Basic document summarization", "Limited monthly uploads", "Email support", "Standard security"];
    if (tierName === "Pro") return ["Advanced AI insights & extraction", "Automated timeline generation", "API access (limited)", "Priority email support"];
    return ["Unlimited usage & storage", "Custom software integrations", "Dedicated onboarding manager", "24/7 Phone & Slack support"];
  };

  const tiers = [
    {
      name: "Starter",
      desc: industry === 'healthcare' ? "Ideal for private practices." : industry === 'legal' ? "Perfect for solo practitioners." : "Perfect for small teams.",
      features: getTierFeatures("Starter"),
      popular: false,
    },
    {
      name: "Pro",
      desc: "For growing organizations needing deep intelligence.",
      features: getTierFeatures("Pro"),
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "Large-scale deployment and custom workflows.",
      features: getTierFeatures("Enterprise"),
      popular: false,
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500 relative">
      <SEO 
        title="Pricing & Plans" 
        description="Choose the right Zumm plan for your organization. From flexible self-service to full-scale Enterprise solutions."
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Scale your {industry} document intelligence capabilities seamlessly alongside your organizational growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`relative bg-slate-50 dark:bg-gray-900 rounded-[2rem] p-10 border ${
                tier.popular ? 'border-[var(--primary)] shadow-2xl shadow-[var(--primary)]/10 dark:shadow-[var(--primary-dark)]/20 shadow-xl' : 'border-slate-200/60 dark:border-white/10'
              } flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm mb-8 min-h-[40px]">{tier.desc}</p>
              
              <div className="space-y-4 mb-10 flex-grow">
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-gray-300 font-medium text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/contact"
                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                  tier.popular 
                    ? 'bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white' 
                    : 'bg-white dark:bg-gray-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                Contact Sales
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
