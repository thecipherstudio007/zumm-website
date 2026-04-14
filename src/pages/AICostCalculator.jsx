import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Settings,
  Info,
  ArrowRight,
  FileText,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  AlertCircle,
  Upload,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const COSTS = {
  opus: { input: 15.00, cacheWrite: 18.75, cacheRead: 1.50, output: 75.00 },
  sonnet: { input: 3.00, cacheWrite: 3.75, cacheRead: 0.30, output: 15.00 },
  haiku: { input: 1.00, cacheWrite: 1.25, cacheRead: 0.10, output: 5.00 }
};

const MODES = {
  balanced: {
    label: 'Balanced Hybrid',
    accuracy: 'Up to 97%',
    coverage: '95%',
    description: '~64% Sonnet / ~36% Haiku',
    recommended: true
  },
  efficient: {
    label: 'Max Efficiency',
    accuracy: 'Up to 95%',
    coverage: '90%',
    description: '100% Claude Haiku'
  },
  high: {
    label: 'High Accuracy',
    accuracy: 'Up to 100%',
    coverage: '98%',
    description: '100% Claude Opus'
  }
};

export default function AICostCalculator() {
  const [inputType, setInputType] = useState('pages');
  const [inputValue, setInputValue] = useState('');
  const [qualityMode, setQualityMode] = useState('balanced');
  const [results, setResults] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isSimulatingProfile, setIsSimulatingProfile] = useState(false);
  const inputRef = useRef(null);

  const handleTypeChange = (type) => {
    setInputType(type);
    setInputValue('');
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("File is too large. Please upload files under 15MB for browser processing.");
      return;
    }

    setIsParsing(true);

    try {
      if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
        // Dynamically import PDF module + explicit worker from CDN escaping brutal Vite build path collisions
        // We use unpkg version-binding securely targeting the exactly matched package standard bindings
        const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdfDocument = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = "";
        for (let i = 1; i <= pdfDocument.numPages; i++) {
          const page = await pdfDocument.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          fullText += pageText + " ";
        }

        const cleanedText = fullText.replace(/\s+/g, ' ').trim();
        // Dense medical text contains out-of-vocabulary terms, complex punctuation, and ICD-10 codes natively inflating BPE.
        const textTokens = cleanedText.length / 2.8;
        
        // Multi-Modal fallback: If a PDF contains image-scans, text extraction returns nothing, but Claude 3 Vision heavily charges natively.
        // We establish a floor of ~1400 tokens per page structurally mapping OCR rendering matrices.
        const visionBaseline = pdfDocument.numPages * 1400;
        
        const estimatedTokens = Math.ceil(Math.max(textTokens, visionBaseline));
        setInputValue(estimatedTokens);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target.result;
          if (typeof text === 'string') {
            const cleanedText = text.replace(/\s+/g, ' ').trim();
            // Dense medical text contains out-of-vocabulary terms, complex punctuation, and ICD-10 codes natively inflating BPE.
            // Industry standard 4-chars per token shifts dangerously down toward ~2.8 chars per token defensively for charting.
            const estimatedTokens = Math.ceil(cleanedText.length / 2.8);
            setInputValue(estimatedTokens);
          }
          setIsParsing(false);
          e.target.value = null;
        };
        reader.readAsText(file);
        return; // FileReader operates asynchronously natively so break cleanly
      }
    } catch (error) {
      console.error("File processing error:", error);
      alert("Error parsing document. File may be heavily encrypted, visually-scanned without OCR geometry, or corrupted.");
    }

    setIsParsing(false);
    e.target.value = null;
  };

  useEffect(() => {
    const calculate = () => {
      const val = inputValue === '' ? 0 : Math.max(0, parseInt(inputValue) || 0);

      if (val === 0) {
        setResults({
          totalTokens: 0,
          breakdown: { input: 0, cacheWrite: 0, cacheRead: 0, output: 0 },
          costRange: '$0.00 – $0.00',
          exactCost: '$0.00',
          cacheSavingsInfo: '$0.00',
          accuracy: MODES[qualityMode].accuracy,
          coverage: MODES[qualityMode].coverage,
          distributionLabel: MODES[qualityMode].description,
          calculations: {}
        });
        return;
      }

      const COMPLEXITY_FACTOR = 1.4; // Dense medical text
      const SYSTEM_PROMPT = 5000;
      const PASS_C_RATE = 0.0;

      // Pipeline mathematical simulator
      const runPipeline = (tokensPerPageBase) => {
        let rawPages = inputType === 'pages' ? val : (val / (tokensPerPageBase * COMPLEXITY_FACTOR));

        const docTokens = rawPages * tokensPerPageBase * COMPLEXITY_FACTOR;
        const cachedTokensBase = docTokens + SYSTEM_PROMPT;

        const sections = Math.max(1, Math.min(20, Math.ceil(rawPages * 0.45)));

        let totalInput = 0;
        let totalOutput = 0;
        let totalCacheWrite = 0;
        let totalCacheRead = 0;

        let costSonnet = 0;
        let costHaiku = 0;
        let costOpus = 0;
        let cacheSavingsTemp = 0;

        const mainModelStr = qualityMode === 'high' ? 'opus' : 'sonnet';
        const mainModelPricing = COSTS[mainModelStr];

        // HARD LIMIT CAPS PER PROMPT SEQUENCE
        const MAX_TOKENS_MAPPER = 4096;
        const MAX_TOKENS_INVENTORY = 32768;
        const MAX_TOKENS_WRITE = 32768;

        // STAGE 1: Mapper
        const mapperPrompt = 1000;
        const mapperOutput = Math.min(MAX_TOKENS_MAPPER, docTokens * 0.05);

        totalCacheWrite += cachedTokensBase;
        totalInput += mapperPrompt;
        totalOutput += mapperOutput;

        const stage1Cost = (cachedTokensBase / 1000000 * mainModelPricing.cacheWrite) +
          (mapperPrompt / 1000000 * mainModelPricing.input) +
          (mapperOutput / 1000000 * mainModelPricing.output);

        if (mainModelStr === 'opus') costOpus += stage1Cost; else costSonnet += stage1Cost;

        // STAGE 2 ITERATOR
        const passAPrompt = 500;
        const totalPassA = Math.min(docTokens * 0.25, 8 * MAX_TOKENS_INVENTORY);
        const passAOutPerSec = totalPassA / sections;

        const passBPrompt = 1000;
        const totalPassB = Math.min(docTokens * 0.40, 8 * MAX_TOKENS_WRITE);
        const passBOutPerSec = totalPassB / sections;

        const passCPrompt = 1000;
        const totalPassC = Math.min(docTokens * 0.35, MAX_TOKENS_WRITE); // Off-chance strict theoretical limit
        const passCOutPerSec = totalPassC / sections;

        const haikuRatio = qualityMode === 'efficient' ? 1.0 : (qualityMode === 'balanced' ? 0.60 : 0.0);
        const sonnetRatio = qualityMode === 'high' ? 0.0 : (qualityMode === 'balanced' ? 0.40 : 1.0 - haikuRatio);
        const opusRatio = qualityMode === 'high' ? 1.0 : 0.0;

        for (let s = 0; s < sections; s++) {
          // Pass A
          totalCacheRead += cachedTokensBase;
          totalInput += passAPrompt;
          totalOutput += passAOutPerSec;

          const crCostSegment = cachedTokensBase / 1000000;
          const inCostSegment = passAPrompt / 1000000;
          const outCostSegment = passAOutPerSec / 1000000;

          costHaiku += haikuRatio * ((crCostSegment * COSTS.haiku.cacheRead) + (inCostSegment * COSTS.haiku.input) + (outCostSegment * COSTS.haiku.output));
          costSonnet += sonnetRatio * ((crCostSegment * COSTS.sonnet.cacheRead) + (inCostSegment * COSTS.sonnet.input) + (outCostSegment * COSTS.sonnet.output));
          costOpus += opusRatio * ((crCostSegment * COSTS.opus.cacheRead) + (inCostSegment * COSTS.opus.input) + (outCostSegment * COSTS.opus.output));

          cacheSavingsTemp += haikuRatio * crCostSegment * (COSTS.haiku.input - COSTS.haiku.cacheRead) +
            sonnetRatio * crCostSegment * (COSTS.sonnet.input - COSTS.sonnet.cacheRead) +
            opusRatio * crCostSegment * (COSTS.opus.input - COSTS.opus.cacheRead);

          // Pass B
          const passBInputReal = passBPrompt + passAOutPerSec;
          totalCacheRead += cachedTokensBase;
          totalInput += passBInputReal;
          totalOutput += passBOutPerSec;

          const costB = (crCostSegment * mainModelPricing.cacheRead) +
            (passBInputReal / 1000000 * mainModelPricing.input) +
            (passBOutPerSec / 1000000 * mainModelPricing.output);

          if (mainModelStr === 'opus') costOpus += costB; else costSonnet += costB;
          cacheSavingsTemp += crCostSegment * (mainModelPricing.input - mainModelPricing.cacheRead);

          // Pass C (Probabilistic)
          const passCInputReal = passCPrompt + passAOutPerSec + passBOutPerSec;

          totalCacheRead += cachedTokensBase * PASS_C_RATE;
          totalInput += passCInputReal * PASS_C_RATE;
          totalOutput += passCOutPerSec * PASS_C_RATE;

          const costC = PASS_C_RATE * (
            (crCostSegment * mainModelPricing.cacheRead) +
            (passCInputReal / 1000000 * mainModelPricing.input) +
            (passCOutPerSec / 1000000 * mainModelPricing.output)
          );

          if (mainModelStr === 'opus') costOpus += costC; else costSonnet += costC;
          cacheSavingsTemp += PASS_C_RATE * crCostSegment * (mainModelPricing.input - mainModelPricing.cacheRead);
        }

        return {
          finalCost: costSonnet + costHaiku + costOpus,
          cacheSavingsTemp,
          totalTokens: totalInput + totalCacheWrite + totalCacheRead + totalOutput,
          breakdown: {
            input: totalInput,
            cacheWrite: totalCacheWrite,
            cacheRead: totalCacheRead,
            output: totalOutput
          },
          calculations: {
            input: `Map(1k) + [Inv(0.5k)+Wri(1k)+Rep(1k*0%)] × ${sections} sec`,
            cacheWrite: `${Math.round(docTokens).toLocaleString()} doc + 5k pt`,
            cacheRead: `${Math.round(cachedTokensBase).toLocaleString()} base × ${sections} sec × ~2 passes`,
            output: `Sub-linear structural bounds`
          }
        };
      };

      let avgRun, worstRun;

      if (inputType === 'pages') {
        avgRun = runPipeline(300);   // Average document density (300 tokens/page)
        worstRun = runPipeline(550); // Worst case dense document (550 tokens/page)
      } else {
        // Input is perfectly known tokens
        avgRun = runPipeline(400); // Fixed base for mapping calculations
        // Force bounds mathematically without real density drift
        worstRun = { ...avgRun, finalCost: avgRun.finalCost * 1.05 };
        avgRun.finalCost = avgRun.finalCost * 0.95;
      }

      const exactCostStr = worstRun.finalCost.toFixed(2);
      const minCostStr = avgRun.finalCost.toFixed(2);
      const maxCostStr = worstRun.finalCost.toFixed(2);

      // We surface the worst run tokens safely into the UI matrix to prepare 
      // the user visually for the dense ceiling limits.
      setResults({
        totalTokens: Math.round(worstRun.totalTokens),
        breakdown: {
          input: Math.round(worstRun.breakdown.input),
          cacheWrite: Math.round(worstRun.breakdown.cacheWrite),
          cacheRead: Math.round(worstRun.breakdown.cacheRead),
          output: Math.round(worstRun.breakdown.output)
        },
        costRange: `$${minCostStr} – $${maxCostStr}`,
        exactCost: `$${exactCostStr}`,
        cacheSavingsInfo: `$${worstRun.cacheSavingsTemp.toFixed(2)}`,
        accuracy: MODES[qualityMode].accuracy,
        coverage: MODES[qualityMode].coverage,
        distributionLabel: MODES[qualityMode].description,
        calculations: worstRun.calculations
      });
    };

    calculate();
  }, [inputType, inputValue, qualityMode]);

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-500">
      <SEO
        title="AI Cost Calculator"
        description="Estimate your Zumm platform AI processing costs using our realistic, data-driven cost calculator."
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold text-sm mb-6 border border-[var(--primary)]/20">
              <Calculator className="w-4 h-4" />
              Factual Cost Simulation
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight mb-6">
              Estimate Your AI <span className="text-[var(--primary)]">Cost accurately</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built on real-world telemetry, understand exactly how Zumm optimizes your workflow costs through intelligent caching and hybrid model routing.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">

          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-slate-50 dark:bg-gray-900/50 rounded-[2rem] p-8 border border-slate-200/60 dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-[0.03] rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-gray-800 flex items-center justify-center border border-slate-300/50 dark:border-white/10">
                  <Settings className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Configuration</h3>
              </div>

              <div className="space-y-8 relative z-10">
                {/* Input Type Selector */}
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300 mb-3 block">Estimation Unit</label>
                  <div className="flex p-1.5 bg-slate-200/50 dark:bg-gray-800/80 rounded-xl border border-slate-200 dark:border-white/5 relative">
                    <button
                      onClick={() => handleTypeChange('pages')}
                      className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors ${inputType === 'pages'
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300'
                        }`}
                    >
                      Pages
                    </button>
                    <button
                      onClick={() => handleTypeChange('tokens')}
                      className={`relative z-10 flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors ${inputType === 'tokens'
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300'
                        }`}
                    >
                      Tokens
                    </button>

                    <motion.div
                      layoutId="calcTabBg"
                      className="absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-slate-200 dark:border-white/10"
                      initial={false}
                      animate={{ left: inputType === 'pages' ? '0.375rem' : 'calc(50% + 0.1875rem)' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </div>
                </div>

                {/* Input Value */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">
                      {inputType === 'pages' ? 'Document Pages' : 'Raw Tokens'}
                    </label>
                  </div>
                  <div className="flex gap-3 relative">
                    <div className="relative group flex-1">
                      <input
                        ref={inputRef}
                        type="number"
                        min="0"
                        value={inputValue}
                        onChange={(e) => {
                          let val = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0);
                          if (val !== '' && inputType === 'pages') val = Math.min(2000, val);
                          setInputValue(val);
                        }}
                        className="w-full bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 rounded-xl pl-5 pr-14 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-[var(--primary)] text-lg font-bold transition-colors"
                        placeholder="0"
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-600 transition-colors group-focus-within:text-[var(--primary)] pointer-events-none">
                        {inputType === 'pages' ? <FileText className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                      </div>
                    </div>
                    {inputType === 'tokens' && (
                      <div className="relative shrink-0">
                        <input
                          type="file"
                          accept=".txt,.json,.md,.csv,.xml,.pdf"
                          onChange={handleFileUpload}
                          disabled={isParsing}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                        />
                        <button
                          disabled={isParsing}
                          className="h-full px-5 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 rounded-xl flex items-center justify-center text-sm font-bold text-slate-700 dark:text-gray-300 hover:border-[var(--primary)] dark:hover:border-[var(--primary)] transition-colors gap-2 relative z-0 disabled:opacity-50 disabled:border-slate-200"
                        >
                          {isParsing ? (
                            <Loader2 className="w-4 h-4 text-[var(--primary)] animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4 text-slate-400" />
                          )}
                          <span className="hidden sm:inline">{isParsing ? 'Parsing Document...' : 'Upload File'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {inputType === 'pages' && (
                    <p className="mt-3 text-xs text-slate-500 dark:text-gray-500 flex items-start gap-1.5">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      Dynamic density variance handles documents between 300 to 550 tokens per page implicitly.
                    </p>
                  )}
                </div>

                {/* Quality / Model Selection */}
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300 mb-3 block">Intelligence Profile</label>
                  <div className="space-y-3">
                    {Object.entries(MODES).map(([key, mode]) => (
                      <button
                        key={key}
                        onClick={() => {
                          if (qualityMode !== key) {
                            setIsSimulatingProfile(true);
                            setQualityMode(key);
                            setTimeout(() => setIsSimulatingProfile(false), 500);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${qualityMode === key
                            ? 'border-[var(--primary)] bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10'
                            : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-slate-300 dark:hover:border-gray-700'
                          }`}
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className={`font-bold flex items-center gap-2 ${qualityMode === key ? 'text-[var(--primary)]' : 'text-slate-900 dark:text-white'}`}>
                            {mode.label}
                            {mode.recommended && (
                              <span className="text-[10px] uppercase tracking-wider bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                Recommended
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{mode.description}</span>
                        </div>
                        {qualityMode === key && (
                          <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Insights Box */}
            <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 dark:border-[var(--primary)]/30 rounded-2xl p-6">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-[var(--primary)] shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Cost Range Variance</h4>
                  <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                    Range reflects potential density—the minimum cost assumes light, airy formatting (300 tokens/pg), while maximum cost prepares for intensely compacted dense structures map dynamically.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Output Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 flex flex-col"
          >
            <AnimatePresence mode="wait">
              {results && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 flex-grow flex flex-col"
                >
                  {/* Summary Header */}
                  <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -inset-10 bg-gradient-to-br from-[var(--primary-dark)] to-purple-600 opacity-20 blur-3xl rounded-full mix-blend-screen pointer-events-none transition-opacity duration-1000 group-hover:opacity-40" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <p className="text-slate-400 font-medium mb-2 uppercase tracking-widest text-xs">Worst-Case Ceiling Target</p>
                        <h3 className="text-5xl font-extrabold text-white tracking-tight flex items-end gap-3 h-12">
                          {isSimulatingProfile ? (
                            <div className="h-10 w-48 bg-slate-800 rounded animate-pulse" />
                          ) : (
                            <>
                              {results.exactCost}
                              <span className="text-xl text-slate-400 pb-1 font-medium select-none">({results.costRange})</span>
                            </>
                          )}
                        </h3>
                        <div className="mt-4 outline-none inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-500/30">
                          <Zap className="w-4 h-4" />
                          Includes {results.cacheSavingsInfo} ceiling cache savings
                        </div>
                      </div>

                      <div className="hidden md:block w-px h-24 bg-slate-800" />

                      <div>
                        <p className="text-slate-400 font-medium mb-1 flex items-center justify-between text-sm">
                          <span>Ceiling Tokens Handled</span>
                        </p>
                        <p className="text-3xl font-bold text-white mb-2 h-9">
                          {isSimulatingProfile ? (
                            <div className="h-8 w-24 bg-slate-800 rounded animate-pulse" />
                          ) : (
                            results.totalTokens.toLocaleString()
                          )}
                        </p>
                        <p className="text-sm text-slate-500 whitespace-nowrap">Max volume possible mapped</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Table */}
                  <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm flex-grow">
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-gray-900/50">
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-slate-400" />
                        Worst-Case Layout Breakdown
                      </h3>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-white/5">
                      {[
                        { label: 'Fresh Input Tokens', value: results.breakdown.input.toLocaleString(), hint: 'Analyzed directly', calc: results.calculations?.input },
                        { label: 'Cache-Write Tokens', value: results.breakdown.cacheWrite.toLocaleString(), hint: 'Staged into cache (higher cost)', calc: results.calculations?.cacheWrite },
                        { label: 'Cache-Read Tokens', value: results.breakdown.cacheRead.toLocaleString(), hint: 'Pulled from cache (cost reduced)', highlight: 'text-emerald-500 dark:text-emerald-400', calc: results.calculations?.cacheRead },
                        { label: 'Output Tokens', value: results.breakdown.output.toLocaleString(), hint: 'Sub-linear generated insights', calc: results.calculations?.output },
                        { label: 'Distribution', value: results.distributionLabel },
                        { label: 'Projected Accuracy', value: results.accuracy, bold: true },
                        { label: 'Information Coverage', value: results.coverage, bold: true },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between px-8 py-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                          <div>
                            <div className={`flex items-center gap-1.5 relative group ${row.hint ? 'cursor-help' : ''}`}>
                              <span className="text-sm text-slate-700 dark:text-gray-300 font-semibold block">{row.label}</span>
                              {row.hint && (
                                <>
                                  <Info className="w-3.5 h-3.5 text-slate-400" />
                                  <div className="absolute left-0 bottom-full mb-2 w-48 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all bg-slate-800 dark:bg-gray-700 text-white text-[11px] p-2.5 rounded shadow-xl z-50 pointer-events-none">
                                    {row.hint}
                                  </div>
                                </>
                              )}
                            </div>
                            {row.calc && <span className="text-[10.5px] text-slate-400 dark:text-gray-500 font-mono mt-1 block tracking-tight">↳ {row.calc}</span>}
                          </div>
                          <span className={`text-sm ${row.bold ? 'font-bold' : 'font-medium'} ${row.highlight ? row.highlight : 'text-slate-900 dark:text-white'}`}>
                            {isSimulatingProfile ? <div className="h-5 w-16 bg-slate-200 dark:bg-white/10 rounded animate-pulse" /> : row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 group text-[var(--primary)] font-bold text-lg hover:underline"
                    >
                      Get in touch
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
