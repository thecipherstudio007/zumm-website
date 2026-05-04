import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogType = 'website', 
  ogImage = 'https://zumm.ai/og-image.jpg' 
}) {
  const siteTitle = 'Zumm - AI Operational Intelligence';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'The AI operational layer that converts messy records into structured workflows, codes, and timelines.';
  const footerDescription = 'Extract actionable operational insights from Healthcare, Insurance, and Legal records with Zumm AI.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={ogImage} />

      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Search Engine Directives */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
