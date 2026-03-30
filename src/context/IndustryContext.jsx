import React, { createContext, useContext, useState, useEffect } from 'react';

const IndustryContext = createContext();

export function IndustryProvider({ children }) {
  const [industry, setIndustry] = useState('healthcare');

  useEffect(() => {
    // Apply the active industry class to trigger css variable overrides
    document.body.className = `bg-gray-950 text-white min-h-screen font-sans antialiased overflow-x-hidden industry-${industry}`;
  }, [industry]);

  return (
    <IndustryContext.Provider value={{ industry, setIndustry }}>
      {children}
    </IndustryContext.Provider>
  );
}

export function useIndustry() {
  return useContext(IndustryContext);
}
