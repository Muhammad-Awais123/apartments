import React from "react";
import { Helmet } from "react-helmet-async";
import { siteConfig } from "../../config/site";

export function SEOHelmet({
  title,
  description,
  keywords,
  image,
  url = "https://zakresidence.com",
  type = "website",
  schemaData
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.name} Lahore`
    : `${siteConfig.name} | Luxury Serviced Apartments Bahria Town & Johar Town Lahore`;
  const metaDescription = description || siteConfig.description;

  // Default LodgingBusiness Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": siteConfig.name,
    "description": siteConfig.description,
    "url": url,
    "telephone": siteConfig.phone,
    "priceRange": "PKR 9500 - PKR 420000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.3688",
      "longitude": "74.1802"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.94",
      "reviewCount": "120"
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
    </Helmet>
  );
}
