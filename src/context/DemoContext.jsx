import React, { createContext, useContext, useEffect } from 'react';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const openCalendly = () => {
    console.log("[DemoSystem] Demo Button Clicked");
    
    // Store the current path to revert later
    const originalPath = window.location.pathname + window.location.search + window.location.hash;
    
    // Change URL visually to /book-a-call
    window.history.pushState({ calendly: true }, '', '/book-a-call');

    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/divesh-cipherstudio/30min"
      });

      // Observe the DOM to detect when the Calendly overlay is removed
      const observer = new MutationObserver(() => {
        if (!document.querySelector('.calendly-overlay')) {
          // Overlay is gone, revert the URL
          if (window.location.pathname === '/book-a-call') {
            window.history.replaceState({}, '', originalPath);
          }
          observer.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      console.error("[DemoSystem] Calendly not loaded");
      alert("Unable to load booking system. Please contact us.");
      // Revert URL if initialization fails
      window.history.replaceState({}, '', originalPath);
    }
  };

  return (
    <DemoContext.Provider value={{ openCalendly }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemoModal = () => useContext(DemoContext);
