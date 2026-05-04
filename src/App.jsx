import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useParams } from 'react-router-dom'
import { useIndustry } from './context/IndustryContext.jsx'
import { useTheme } from './context/ThemeContext.jsx'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToHash from './components/ScrollToHash.jsx'

import { HelmetProvider } from 'react-helmet-async'

// Pages
import Home from './pages/Home.jsx'
import Security from './pages/Security.jsx'
import Pricing from './pages/Pricing.jsx'
import Enterprise from './pages/Enterprise.jsx'
import About from './pages/About.jsx'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'
import Solution from './pages/Solution.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Architecture from './pages/Architecture.jsx'
import AICostCalculator from './pages/AICostCalculator.jsx'
import NotFound from './pages/NotFound.jsx'

// Layout Component for validating industry route
function IndustryLayout() {
  const { industry } = useParams();
  const validIndustries = ['healthcare', 'insurance', 'legal'];
  
  if (!validIndustries.includes(industry)) {
    return <Navigate to="/healthcare" replace />;
  }
  
  return <Outlet />;
}

function App() {
  const { industry } = useIndustry()
  const { theme } = useTheme()

  // Apply CSS variables to body based on selected industry and theme
  useEffect(() => {
    document.body.className = `bg-white dark:bg-gray-950 text-slate-900 dark:text-white min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-500 industry-${industry}`
  }, [industry, theme])

  return (
    <HelmetProvider>
      <ScrollToHash />
      <div className="w-full relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to={`/${industry || 'healthcare'}`} replace />} />
            
            <Route path="/:industry" element={<IndustryLayout />}>
              <Route index element={<Home />} />
              <Route path="security" element={<Security />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="enterprise" element={<Enterprise />} />
              <Route path="about" element={<About />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<Contact />} />
              <Route path="solutions" element={<Solution />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="architecture" element={<Architecture />} />
              <Route path="ai-cost-calculator" element={<AICostCalculator />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App
