import React, { createContext, useContext, useEffect } from 'react';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  useEffect(() => {
    const handleCalendlyEvent = (e) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        console.log("[DemoSystem] Calendly Event:", e.data.event);
        
        // Track successful booking
        if (e.data.event === 'calendly.event_scheduled' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-18108503622',
            'event_category': 'Engagement',
            'event_label': 'Calendly Booking'
          });
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  const openCalendly = () => {
    console.log("[DemoSystem] Demo Button Clicked");
    
    // Store the current path to revert later
    const originalPath = window.location.pathname + window.location.search + window.location.hash;
    
    // Change URL visually to /book-a-call
    window.history.pushState({ calendly: true }, '', '/book-a-call');
    
    // Track virtual page view for Google Tag
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Book a Call',
        page_location: window.location.origin + '/book-a-call',
        page_path: '/book-a-call'
      });
    }

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
