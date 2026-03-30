import React from 'react';
import { useDemoModal } from '../context/DemoContext';

export default function DemoButton({ 
  label = "Get Demo", 
  className = "", 
  children,
  ...props 
}) {
  const { openCalendly } = useDemoModal();

  const handleClick = (e) => {
    // If a custom onClick was passed, fire it too
    if (props.onClick) {
      props.onClick(e);
    }
    openCalendly();
  };

  return (
    <button 
      {...props}
      onClick={handleClick} 
      className={className}
    >
      {children || label}
    </button>
  );
}
