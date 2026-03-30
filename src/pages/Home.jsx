import React from 'react';
import HeroSection from '../components/HeroSection.jsx'
import OutcomeBar from '../components/OutcomeBar.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import LiveProductDemo from '../components/LiveProductDemo.jsx'
import FeaturesGrid from '../components/FeaturesGrid.jsx'
import MultiIndustryStory from '../components/MultiIndustryStory.jsx'
import TrustSecurity from '../components/TrustSecurity.jsx'
import Integrations from '../components/Integrations.jsx'
import UseCaseStories from '../components/UseCaseStories.jsx'
import Differentiation from '../components/Differentiation.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'
import DocumentChatSection from '../components/DocumentChatSection.jsx'
import PdfNavigationSection from '../components/PdfNavigationSection.jsx'
import WorkflowVisualSection from '../components/WorkflowVisualSection.jsx'
import HealthCodesSection from '../components/HealthCodesSection.jsx'
import SEO from '../components/SEO.jsx'

export default function Home() {
  return (
    <>
      <SEO 
        title="AI Document Intelligence for Enterprise" 
        description="The ultimate AI platform for extracting structured data from Healthcare, Insurance, and Legal documents. Transform unstructured PDFs into actionable insights."
      />
      <HeroSection />
      <OutcomeBar />
      <BeforeAfter />
      <WorkflowVisualSection />
      <div id="features">
        <FeaturesGrid />
      </div>
      <DocumentChatSection />
      <LiveProductDemo />
      <HealthCodesSection />
      <PdfNavigationSection />
      <MultiIndustryStory />
      <TrustSecurity />
      <Integrations />
      <UseCaseStories />
      <Differentiation />
      <Testimonials />
      <CTA />
    </>
  );
}
