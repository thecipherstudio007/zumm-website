import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IndustryContext = createContext();

export function IndustryProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const validIndustries = ['healthcare', 'insurance', 'legal'];
  const pathSegments = location.pathname.split('/');
  const pathIndustry = pathSegments[1];
  
  const industry = validIndustries.includes(pathIndustry) ? pathIndustry : 'healthcare';

  useEffect(() => {
    // Apply the active industry class to trigger css variable overrides
    document.body.className = `bg-gray-950 text-white min-h-screen font-sans antialiased overflow-x-hidden industry-${industry}`;
  }, [industry]);

  const setIndustry = (newIndustry) => {
    if (validIndustries.includes(newIndustry)) {
      const segments = location.pathname.split('/');
      if (validIndustries.includes(segments[1])) {
        segments[1] = newIndustry;
        navigate(segments.join('/') || '/');
      } else {
        navigate(`/${newIndustry}`);
      }
    }
  };

  return (
    <IndustryContext.Provider value={{ industry, setIndustry }}>
      {children}
    </IndustryContext.Provider>
  );
}

export function useIndustry() {
  return useContext(IndustryContext);
}
