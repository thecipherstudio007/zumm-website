import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Activity, Code2, GitMerge } from 'lucide-react';
import { useIndustry } from '../context/IndustryContext';

export default function LiveProductDemo() {
  const { industry } = useIndustry();
  const [activeTab, setActiveTab] = useState('summary');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  useEffect(() => {
    setActiveTab('summary');
    setHasUploaded(false);
  }, [industry]);

  const tabs = [
    { id: 'summary', icon: FileText, label: 'Summary' },
    { id: 'timeline', icon: Activity, label: 'Timeline' },
    { id: 'data', icon: Code2, label: 'JSON Data' },
    { id: 'codes', icon: GitMerge, label: industry === 'healthcare' ? 'ICD-10 Codes' : industry === 'insurance' ? 'Risk Factors' : 'Key Obligations' }
  ];

  const simulateUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasUploaded(true);
    }, 2000);
  };

  return (
    <section id="demo" className="py-24 bg-white dark:bg-gray-950 relative transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-display">
            Experience the Intelligence
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            See exactly how Zumm parses complicated documents into actionable intelligence in real-time.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header row */}
          <div className="bg-slate-100 dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2 p-1 bg-slate-200 dark:bg-gray-800 rounded-xl overflow-x-auto w-full md:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => hasUploaded && setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200'
                  } ${!hasUploaded && 'opacity-50 cursor-not-allowed'}`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>

            {hasUploaded && (
               <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-200/50 dark:border-emerald-800">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 Processing Complete
               </div>
            )}
          </div>

          <div className="p-8 md:p-12 min-h-[400px] flex items-center justify-center relative bg-slate-50 dark:bg-black/50">
            {!hasUploaded ? (
              <motion.div 
                className="text-center cursor-pointer group"
                onClick={!isProcessing ? simulateUpload : undefined}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-28 h-28 mx-auto rounded-3xl border-2 border-dashed flex items-center justify-center bg-white dark:bg-gray-900 transition-all ${isProcessing ? 'border-blue-500 rotate-180 duration-1000' : 'border-slate-300 dark:border-gray-700 group-hover:border-[var(--primary)]'}`}>
                  {isProcessing ? (
                     <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                  ) : (
                     <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-[var(--primary)] transition-colors" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2">
                  {isProcessing ? "Analyzing Document..." : `Upload Sample ${industry === 'healthcare' ? 'Record' : industry === 'insurance' ? 'Claim' : 'Contract'}`}
                </h3>
                <p className="text-sm text-slate-500">
                  {isProcessing ? "Extracting timeline, JSON, and entities using Zumm AI" : `Click to simulate uploading a 50-page ${industry === 'healthcare' ? 'medical chart' : industry === 'insurance' ? 'claim file' : 'legal case'}.`}
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full max-h-[500px] overflow-y-auto"
                >
                  {/* SUMMARY TAB */}
                  {activeTab === 'summary' && (
                    <div className="space-y-6 max-w-3xl mx-auto text-left">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
                          <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">
                            {industry === 'healthcare' ? 'Patient Overview' : industry === 'insurance' ? 'Claim Overview' : 'Case Overview'}
                          </h4>
                          <span className="text-xs text-slate-400 block mb-2">
                            {industry === 'healthcare' ? 'View key patient details instantly:' : industry === 'insurance' ? 'View critical claim information:' : 'Get a structured case overview:'}
                          </span>
                          
                          {industry === 'healthcare' && (
                            <ul className="text-sm text-slate-700 dark:text-gray-300 space-y-2">
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Demographics:</span> <span className="font-bold">54 M</span></li>
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Providers:</span> <span className="font-bold">Dr. Smith</span></li>
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Imaging Results:</span> <span className="font-bold">Pending MRI</span></li>
                              <li className="flex justify-between pb-1"><span>Allergies:</span> <span className="font-bold text-red-500">Penicillin</span></li>
                            </ul>
                          )}
                          
                          {industry === 'insurance' && (
                            <ul className="text-sm text-slate-700 dark:text-gray-300 space-y-2">
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Claim ID:</span> <span className="font-bold font-mono">CLM-45821</span></li>
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Policy Type:</span> <span className="font-bold">Premium Health</span></li>
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Claim Amount:</span> <span className="font-bold">$12,500</span></li>
                              <li className="flex justify-between pb-1"><span>Status:</span> <span className="font-bold text-orange-500">Under Review</span></li>
                            </ul>
                          )}

                          {industry === 'legal' && (
                            <ul className="text-sm text-slate-700 dark:text-gray-300 space-y-2">
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Case:</span> <span className="font-bold">Smith vs ABC Corp</span></li>
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Type:</span> <span className="font-bold">Contract Dispute</span></li>
                              <li className="flex justify-between border-b border-slate-100 dark:border-gray-800 pb-1"><span>Jurisdiction:</span> <span className="font-bold">SDNY</span></li>
                              <li className="flex justify-between pb-1"><span>Status:</span> <span className="font-bold text-blue-500">Ongoing</span></li>
                            </ul>
                          )}
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-[var(--primary)] uppercase mb-2">
                              AI {industry === 'healthcare' ? 'Summary' : industry === 'insurance' ? 'Claim Summary' : 'Case Summary'}
                            </h4>
                            <span className="text-xs text-slate-400 block mb-3">
                              {industry === 'healthcare' ? 'Get instant clinical summaries highlighting:' : industry === 'insurance' ? 'Get a concise summary of the lengthy claim:' : 'Quickly understand complex legal documents:'}
                            </span>
                            
                            {industry === 'healthcare' && (
                              <ul className="text-sm text-slate-700 dark:text-gray-300 space-y-2 list-disc pl-4">
                                <li>Key diagnoses: <span className="font-bold">Acute chest pain</span></li>
                                <li>Important findings: <span className="font-bold">Elevated BP</span></li>
                                <li>Risk indicators: <span className="text-orange-500 font-bold">Moderate CV risk</span></li>
                              </ul>
                            )}

                            {industry === 'insurance' && (
                              <ul className="text-sm text-slate-700 dark:text-gray-300 space-y-2 list-disc pl-4">
                                <li>Incident summary: <span className="font-bold">Slip and fall</span></li>
                                <li>Decision recs: <span className="font-bold text-orange-500">Request missing invoice</span></li>
                                <li>Risk highlights: <span className="text-red-500 font-bold">Prior similar claims</span></li>
                              </ul>
                            )}

                            {industry === 'legal' && (
                              <ul className="text-sm text-slate-700 dark:text-gray-300 space-y-2 list-disc pl-4">
                                <li>Case summary: <span className="font-bold">Breach of deliverables</span></li>
                                <li>Key arguments: <span className="font-bold">Missing milestones</span></li>
                                <li>Possible outcomes: <span className="text-orange-500 font-bold">High risk of penalty</span></li>
                              </ul>
                            )}
                          </div>
                          <div className="mt-4 text-xs font-semibold text-slate-500 italic border-t border-slate-100 dark:border-gray-800 pt-2">
                            * Reduce manual document review and administrative workload significantly.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TIMELINE TAB */}
                  {activeTab === 'timeline' && (
                    <div className="max-w-2xl mx-auto relative">
                      <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-4 shadow-sm text-left mb-8 flex flex-col gap-2 text-sm text-slate-700 dark:text-gray-300">
                        <span className="text-xs font-bold text-slate-500 uppercase">
                          {industry === 'healthcare' ? 'Medical History Context:' : industry === 'insurance' ? 'Claim Tracking Context:' : 'Case Chronology Context:'}
                        </span>
                        <div className="flex gap-2 flex-wrap mt-1">
                          {industry === 'healthcare' ? (
                            <>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Procedures</span>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold text-blue-500">Care plans</span>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold text-orange-500">Risk factors</span>
                            </>
                          ) : industry === 'insurance' ? (
                            <>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Claim submitted</span>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold text-blue-500">Review stages</span>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold text-emerald-500">Approval docs</span>
                            </>
                          ) : (
                            <>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold">Filing date</span>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold text-blue-500">Hearings</span>
                              <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-semibold text-purple-500">Judgments</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
                        {(industry === 'healthcare' ? [ 
                          { date: '10/12/23', desc: 'Initial ER Admission. Encounter documented.' },
                          { date: '10/13/23', desc: 'Diagnoses finalized. Observation phase initiated.' },
                          { date: '10/14/23', desc: 'Medications reconciled. Discharged.' }
                        ] : industry === 'insurance' ? [
                          { date: '11/12/23', desc: 'Claim Submitted via Portal. System extracted metadata.' },
                          { date: '11/14/23', desc: 'Missing supporting documents uploaded by provider.' },
                          { date: '11/15/23', desc: 'Adjuster assigned. Medical necessity review pending.' }
                        ] : [
                          { date: '01/04/24', desc: 'Initial Complaint Filed in SDNY.' },
                          { date: '02/12/24', desc: 'Defendant Answer & Counterclaim submitted.' },
                          { date: '03/01/24', desc: 'Discovery phase opened. Subpoenas issued.' }
                        ]).map((item, i) => (
                          <div key={i} className="relative flex items-center gap-6">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 border-2 border-white dark:border-gray-950 flex items-center justify-center shrink-0 z-10 shadow-sm">
                              <div className="w-3 h-3 bg-blue-500 rounded-full" />
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-slate-200 dark:border-gray-800 shadow-sm w-full text-left">
                              <span className="text-xs font-mono text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded inline-block mb-2">{item.date}</span>
                              <p className="text-sm text-slate-700 dark:text-gray-300">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* JSON DATA TAB */}
                  {activeTab === 'data' && (
                    <div className="max-w-4xl mx-auto space-y-4">
                      
                      <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 shadow-sm text-left">
                        <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">
                          {industry === 'healthcare' ? 'Structured lab data with interpretation' : industry === 'insurance' ? 'Structured policy details & coverage limits' : 'Extracted core obligations and timeline'}
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-sm text-slate-700 dark:text-gray-300 border-b border-slate-100 dark:border-gray-800 pb-2 font-semibold uppercase text-xs tracking-wider">
                          {industry === 'healthcare' ? (
                            <><div>Test</div><div>Result</div><div>Observation</div></>
                          ) : industry === 'insurance' ? (
                            <><div>Coverage Type</div><div>Limit</div><div>Status</div></>
                          ) : (
                            <><div>Obligation</div><div>Deadline</div><div>Risk Level</div></>
                          )}
                        </div>

                        {industry === 'healthcare' && (
                          <>
                            <div className="grid grid-cols-3 gap-2 text-sm text-slate-700 dark:text-gray-300 py-3 border-b border-slate-100 dark:border-gray-800 items-center">
                              <div className="font-medium">Blood Glucose</div><div className="font-mono bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded w-fit">110 mg/dL</div><div className="text-orange-500 font-bold flex items-center gap-1">High</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm text-slate-700 dark:text-gray-300 py-3 items-center">
                              <div className="font-medium">Cholesterol</div><div className="font-mono bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded w-fit">180 mg/dL</div><div className="text-emerald-500 font-bold flex items-center gap-1">Normal</div>
                            </div>
                          </>
                        )}
                        {industry === 'insurance' && (
                          <>
                            <div className="grid grid-cols-3 gap-2 text-sm text-slate-700 dark:text-gray-300 py-3 border-b border-slate-100 dark:border-gray-800 items-center">
                              <div className="font-medium">Inpatient Stay</div><div className="font-mono bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded w-fit">$50,000</div><div className="text-emerald-500 font-bold flex items-center gap-1">Active</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm text-slate-700 dark:text-gray-300 py-3 items-center">
                              <div className="font-medium">Out-of-network</div><div className="font-mono bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded w-fit">$0</div><div className="text-red-500 font-bold flex items-center gap-1">Excluded</div>
                            </div>
                          </>
                        )}
                        {industry === 'legal' && (
                          <>
                            <div className="grid grid-cols-3 gap-2 text-sm text-slate-700 dark:text-gray-300 py-3 border-b border-slate-100 dark:border-gray-800 items-center">
                              <div className="font-medium">Software Delivery</div><div className="font-mono bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded w-fit">Net-30 Days</div><div className="text-red-500 font-bold flex items-center gap-1">Breached</div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-sm text-slate-700 dark:text-gray-300 py-3 items-center">
                              <div className="font-medium">Security Audit</div><div className="font-mono bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded w-fit">Annually</div><div className="text-orange-500 font-bold flex items-center gap-1">Pending</div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700 text-[13px] font-mono text-emerald-400 shadow-inner overflow-x-auto text-left">
{industry === 'healthcare' ? (
<pre>{`{
  "document_id": "78a9-b14x",
  "entities": {
    "patient": {
      "age": 54,
      "gender": "M",
      "vitals": [
        {"timestamp": "2023-10-12T14:32:00Z", "bp": "145/90", "hr": 88}
      ]
    },
    "medications_detected": [
      {"name": "Lisinopril", "dosage": "10mg", "frequency": "daily"}
    ]
  },
  "confidence_score": 0.992
}`}</pre>
) : industry === 'insurance' ? (
<pre>{`{
  "document_id": "clm-45821-doc1",
  "entities": {
    "claim": {
      "billed_amount": 12500.00,
      "date_of_service": "2023-11-10",
      "provider_npi": "1932458210"
    },
    "flags_detected": [
      {"code": "F-042", "reason": "Missing itemized invoice"}
    ]
  },
  "confidence_score": 0.985
}`}</pre>
) : (
<pre>{`{
  "document_id": "case-smith-abc-01",
  "entities": {
    "parties": [
      {"role": "Plaintiff", "name": "Smith LLC"},
      {"role": "Defendant", "name": "ABC Corp"}
    ],
    "clauses_extracted": [
      {"type": "Liability", "limit": "Contract Value"}
    ]
  },
  "confidence_score": 0.995
}`}</pre>
)}
                      </div>
                    </div>
                  )}

                  {/* CODES TAB */}
                  {activeTab === 'codes' && (
                    <div className="max-w-3xl mx-auto space-y-4">
                      {industry === 'healthcare' ? (
                        <>
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 text-left">
                            <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-1">Automatically detected medical codes:</h4>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              Zumm supports <span className="font-bold">ICD-10, SNOMED, RxNorm</span> mapped directly from unstructured text. 
                              Example: Diabetes → <span className="font-mono font-bold px-1 bg-white/50 dark:bg-black/20 rounded">E11</span> | Hypertension → <span className="font-mono font-bold px-1 bg-white/50 dark:bg-black/20 rounded">I10</span>
                            </p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4 text-left">
                             {[
                               { code: 'I10', desc: 'Essential (primary) hypertension', type: 'ICD-10' },
                               { code: 'E11.9', desc: 'Type 2 diabetes mellitus without complications', type: 'ICD-10' },
                               { code: 'R07.9', desc: 'Chest pain, unspecified', type: 'ICD-10' },
                               { code: '38341003', desc: 'Hypertensive disorder', type: 'SNOMED' },
                             ].map((item, i) => (
                               <div key={i} className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex items-start gap-4 shadow-sm hover:border-[var(--primary-light)] transition-colors">
                                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs font-mono shrink-0">{item.type}</span>
                                  <div>
                                     <h5 className="font-bold text-slate-900 dark:text-white mb-1 font-mono">{item.code}</h5>
                                     <p className="text-sm text-slate-500 dark:text-gray-400">{item.desc}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                        </>
                      ) : industry === 'insurance' ? (
                        <>
                          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30 text-left">
                            <h4 className="text-sm font-bold text-red-700 dark:text-red-300 mb-1">Detected Risk & Fraud Factors:</h4>
                            <p className="text-sm text-red-800 dark:text-red-200">
                              Zumm automatically highlights deviations, duplicate submissions, and missing mandatory fields without manual review.
                            </p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4 text-left">
                             {[
                               { code: 'Missing', desc: 'Line item invoice not attached', type: 'Flag' },
                               { code: 'Anomaly', desc: 'Billed amount 30% above average', type: 'Risk' },
                               { code: 'Duplicate', desc: 'Similar claim filed last month', type: 'Fraud' },
                               { code: 'Signature', desc: 'Provider signature absent', type: 'Flag' },
                             ].map((item, i) => (
                               <div key={i} className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex items-start gap-4 shadow-sm hover:border-[var(--primary-light)] transition-colors">
                                  <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded text-xs font-mono shrink-0">{item.type}</span>
                                  <div>
                                     <h5 className="font-bold text-slate-900 dark:text-white mb-1 font-mono">{item.code}</h5>
                                     <p className="text-sm text-slate-500 dark:text-gray-400">{item.desc}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30 text-left">
                            <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-1">Key Contractual Obligations:</h4>
                            <p className="text-sm text-purple-800 dark:text-purple-200">
                              Zumm automatically maps out delivery dates, SLAs, and restrictive clauses buried inside lengthy legal documents.
                            </p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4 text-left">
                             {[
                               { code: 'Milestone 1', desc: 'Initial code delivery net-30', type: 'Schedule' },
                               { code: 'Audit Rights', desc: 'Annual security compliance review', type: 'Security' },
                               { code: 'Liability Cap', desc: 'Capped at total agreement value', type: 'Risk' },
                               { code: 'SLA Uptime', desc: '99.9% uptime required monthly', type: 'Term' },
                             ].map((item, i) => (
                               <div key={i} className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-4 rounded-xl flex items-start gap-4 shadow-sm hover:border-[var(--primary-light)] transition-colors">
                                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded text-xs font-mono shrink-0">{item.type}</span>
                                  <div>
                                     <h5 className="font-bold text-slate-900 dark:text-white mb-1 font-mono">{item.code}</h5>
                                     <p className="text-sm text-slate-500 dark:text-gray-400">{item.desc}</p>
                                  </div>
                               </div>
                             ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
