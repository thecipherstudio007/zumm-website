import React, { createContext, useContext, useEffect } from 'react';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const openCalendly = () => {
    console.log("[DemoSystem] Demo Button Clicked");
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/divesh-cipherstudio/30min"
      });
    } else {
      console.error("[DemoSystem] Calendly not loaded");
      alert("Unable to load booking system. Please contact us.");
    }
  };

  return (
    <DemoContext.Provider value={{ openCalendly }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemoModal = () => useContext(DemoContext);
