import React from 'react';
import HeroSection from '../components/HeroSection.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import PipelineArchitecture from '../components/PipelineArchitecture.jsx'
import LiveProductDemo from '../components/LiveProductDemo.jsx'
import FeaturesGrid from '../components/FeaturesGrid.jsx'
import IntegrationSection from '../components/IntegrationSection.jsx'
import TrustSecurity from '../components/TrustSecurity.jsx'
import Integrations from '../components/Integrations.jsx'
import Differentiation from '../components/Differentiation.jsx'
import CTA from '../components/CTA.jsx'
import DocumentChatSection from '../components/DocumentChatSection.jsx'
import PdfNavigationSection from '../components/PdfNavigationSection.jsx'
import WorkflowVisualSection from '../components/WorkflowVisualSection.jsx'
import HealthCodesSection from '../components/HealthCodesSection.jsx'
import SEO from '../components/SEO.jsx'
import { useIndustry } from '../context/IndustryContext';

export default function Home() {
  const { industry } = useIndustry();

  return (
    <>
      <SEO 
        title="AI Operational Intelligence for Enterprise" 
        description="The ultimate AI platform for solving operational bottlenecks in Healthcare, Insurance, and Legal. Transform unstructured records into actionable workflows."
      />
      <HeroSection />
      
      {industry === 'healthcare' && (
        <>
          <BeforeAfter />
          <WorkflowVisualSection />
          <HealthCodesSection />
          <PipelineArchitecture />
          <div id="features">
            <FeaturesGrid />
          </div>
          <DocumentChatSection />
        </>
      )}

      {industry === 'insurance' && (
        <>
          <HealthCodesSection />
          <BeforeAfter />
          <div id="features">
            <FeaturesGrid />
          </div>
          <WorkflowVisualSection />
          <DocumentChatSection />
          <IntegrationSection />
        </>
      )}

      {industry === 'legal' && (
        <>
          <PdfNavigationSection />
          <WorkflowVisualSection />
          <BeforeAfter />
          <PipelineArchitecture />
          <div id="features">
            <FeaturesGrid />
          </div>
          <DocumentChatSection />
        </>
      )}

      {/* Global components for all industries */}
      <LiveProductDemo />
      <TrustSecurity />
      <Integrations />
      <Differentiation />
      <CTA />
    </>
  );
}
