import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Webhook, Puzzle, ArrowRight, CheckCircle2, Copy, Check } from 'lucide-react';

const SNIPPETS = {
  rest: {
    label: 'REST API',
    lang: 'bash',
    code: `curl -X POST https://api.zumm.ai/v1/extract \\
  -H "Authorization: Bearer $ZUMM_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@patient-record.pdf" \\
  -F "schema=healthcare_v2"

# Response in < 2 seconds
{
  "status": "success",
  "confidence": 0.991,
  "patient_id": "PT-40912",
  "diagnosis": "Type 2 Diabetes",
  "icd_code": "E11.9"
}`,
    highlights: ['POST', 'Bearer', 'success', '0.991']
  },
  python: {
    label: 'Python SDK',
    lang: 'python',
    code: `from zumm import ZummClient

client = ZummClient(api_key="$ZUMM_API_KEY")

result = client.extract(
    file="patient-record.pdf",
    schema="healthcare_v2"
)

print(result.patient_id)    # "PT-40912"
print(result.confidence)    # 0.991
print(result.icd_code)      # "E11.9"`,
    highlights: ['ZummClient', 'extract', '0.991']
  },
  webhook: {
    label: 'Webhooks',
    lang: 'json',
    code: `// POST https://your-app.com/zumm-webhook
{
  "event": "extraction.completed",
  "document_id": "doc_abc123",
  "status": "success",
  "payload": {
    "patient_id": "PT-40912",
    "confidence": 0.991,
    "structured_fields": 42,
    "icd_codes": ["E11.9", "I10"],
    "processing_ms": 1840
  }
}`,
    highlights: ['extraction.completed', 'success', '0.991']
  }
};

const STACK_INTEGRATIONS = [
  { name: 'Epic EHR', category: 'Healthcare' },
  { name: 'Salesforce', category: 'CRM' },
  { name: 'Snowflake', category: 'Data Warehouse' },
  { name: 'Zapier', category: 'Automation' },
  { name: 'AWS S3', category: 'Storage' },
  { name: 'PostgreSQL', category: 'Database' },
];

function CodeHighlight({ code, highlights }) {
  const parts = code.split(new RegExp(`(${highlights.join('|')})`, 'g'));
  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part)
          ? <span key={i} className="text-amber-300 font-bold">{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

export default function IntegrationSection() {
  const [activeTab, setActiveTab] = useState('rest');
  const [copied, setCopied] = useState(false);
  const snippet = SNIPPETS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1120] relative overflow-hidden transition-colors duration-500 border-t border-slate-200 dark:border-white/5">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute right-0 top-0 w-[40rem] h-[40rem] bg-[var(--primary)]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border border-[var(--primary)]/20"
            >
              <Terminal className="w-3.5 h-3.5" /> Developer First
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight font-display"
            >
              Plug in once.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-indigo-500">Works everywhere.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-10"
            >
              Zumm is built API-first. A single POST request returns structured, validated data in under 2 seconds. Integrate with your EHR, CRM, data warehouse, or workflow automation in minutes — not months.
            </motion.p>

            {/* Benefit list */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="space-y-4 mb-10"
            >
              {[
                { icon: Terminal, text: 'REST API, Python SDK, Node SDK — all fully documented.' },
                { icon: Webhook, text: 'Real-time webhooks push results to your system instantly.' },
                { icon: Puzzle, text: 'Native connectors for Epic, Salesforce, Snowflake, and more.' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-slate-700 dark:text-gray-300 text-sm font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>

            {/* Stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.28 }}
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Works with your stack</p>
              <div className="flex flex-wrap gap-2">
                {STACK_INTEGRATIONS.map(({ name, category }) => (
                  <span key={name} className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Code Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="bg-slate-900 dark:bg-black rounded-3xl border border-slate-700 dark:border-white/10 shadow-2xl overflow-hidden">
              
              {/* Window chrome */}
              <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                {/* Tabs */}
                <div className="flex gap-1 ml-3">
                  {Object.entries(SNIPPETS).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                        activeTab === key
                          ? 'bg-[var(--primary)]/20 text-[var(--primary)] dark:text-blue-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
                <button onClick={handleCopy} className="ml-auto text-slate-500 hover:text-slate-300 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Code body */}
              <div className="p-6 overflow-x-auto">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-[13px] font-mono text-slate-300 leading-7 whitespace-pre-wrap"
                  >
                    <CodeHighlight code={snippet.code} highlights={snippet.highlights} />
                  </motion.pre>
                </AnimatePresence>
              </div>

              {/* Footer bar */}
              <div className="px-6 py-3 border-t border-slate-800 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-slate-500 font-mono">Ready · avg response 1.84s · 99.9% uptime SLA</span>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">HIPAA Compliant API</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
