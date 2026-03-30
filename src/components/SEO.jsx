import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogType = 'website', 
  ogImage = 'https://zumm.ai/og-image.jpg' 
}) {
  const siteTitle = 'Zumm - Document Intelligence';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'Zumm is the AI document intelligence platform for modern enterprises. Process complex information reliably and securely.';
  const footerDescription = 'Extract insights from Healthcare, Insurance, and Legal documents with Zumm AI.';

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
