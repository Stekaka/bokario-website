"use client";

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
}

interface SEOOptimizerProps {
  data: SEOData;
  children?: React.ReactNode;
}

export function SEOOptimizer({ data, children }: SEOOptimizerProps) {
  const pathname = usePathname();
  const canonical = data.canonical || `https://bokario.se${pathname}`;
  
  // Default values
  const defaultData = {
    title: 'Bokario - Automatisera din verksamhet med smarta lösningar',
    description: 'Vi hjälper företag att automatisera bokningar, optimera Maps-synlighet och bygga förtroende med recensioner. Boka gratis demo idag!',
    keywords: ['bokningssystem', 'maps optimering', 'recensioner', 'automatisering', 'företag'],
    ogImage: '/brand/og/home.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    ...data
  };

  // Structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bokario",
    "url": "https://bokario.se",
    "logo": "https://bokario.se/brand/bokario-icon/bokario-icon.svg",
    "description": defaultData.description,
    "sameAs": [
      "https://linkedin.com/company/bokario",
      "https://twitter.com/bokario"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+46-70-123-45-67",
      "contactType": "customer service",
      "areaServed": "SE",
      "availableLanguage": ["Swedish", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SE",
      "addressLocality": "Stockholm"
    }
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{defaultData.title}</title>
        <meta name="description" content={defaultData.description} />
        <meta name="keywords" content={defaultData.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Bokario" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonical} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={defaultData.ogType} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={defaultData.title} />
        <meta property="og:description" content={defaultData.description} />
        <meta property="og:image" content={defaultData.ogImage} />
        <meta property="og:site_name" content="Bokario" />
        <meta property="og:locale" content="sv_SE" />
        
        {/* Twitter */}
        <meta property="twitter:card" content={defaultData.twitterCard} />
        <meta property="twitter:url" content={canonical} />
        <meta property="twitter:title" content={defaultData.title} />
        <meta property="twitter:description" content={defaultData.description} />
        <meta property="twitter:image" content={defaultData.ogImage} />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bokario" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      {children}
    </>
  );
}

// Page-specific SEO component
interface PageSEOProps {
  pageTitle: string;
  pageDescription: string;
  pageKeywords?: string[];
  pageImage?: string;
  children?: React.ReactNode;
}

export function PageSEO({ 
  pageTitle, 
  pageDescription, 
  pageKeywords = [], 
  pageImage,
  children 
}: PageSEOProps) {
  const defaultKeywords = [
    'bokningssystem', 'maps optimering', 'recensioner', 'automatisering', 'företag'
  ];
  
  const seoData: SEOData = {
    title: `${pageTitle} - Bokario`,
    description: pageDescription,
    keywords: [...defaultKeywords, ...pageKeywords],
    ogImage: pageImage || '/brand/og/home.png',
    ogType: 'article'
  };

  return (
    <SEOOptimizer data={seoData}>
      {children}
    </SEOOptimizer>
  );
}

// Breadcrumb structured data
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSEOProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSEO({ items }: BreadcrumbSEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// FAQ structured data
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSEOProps {
  items: FAQItem[];
}

export function FAQSEO({ items }: FAQSEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
