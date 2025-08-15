export interface SchemaOrg {
  '@context': string
  '@type': string
  [key: string]: any
}

export interface OrganizationSchema extends SchemaOrg {
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    contactType: 'customer service'
    availableLanguage: string
  }
}

export interface ProductSchema extends SchemaOrg {
  '@type': 'Product'
  name: string
  description: string
  brand: {
    '@type': 'Brand'
    name: string
  }
  offers: {
    '@type': 'Offer'
    price: string
    priceCurrency: 'SEK'
    availability: 'https://schema.org/InStock'
  }
}

export interface ServiceSchema extends SchemaOrg {
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
  }
  areaServed: {
    '@type': 'Country'
    name: 'Sweden'
  }
  hasOfferCatalog: {
    '@type': 'OfferCatalog'
    name: string
    itemListElement: Array<{
      '@type': 'Offer'
      itemOffered: {
        '@type': 'Service'
        name: string
        description: string
      }
      price: string
      priceCurrency: 'SEK'
    }>
  }
}

export interface FAQPageSchema extends SchemaOrg {
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

export function createOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bokario',
    url: 'https://bokario.se',
    logo: 'https://bokario.se/brand/bokario-icon.svg',
    description: 'Vi sköter kartan, omdömena och bokningarna åt dig – mätbara resultat utan krångel.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Storgatan 1',
      addressLocality: 'Stockholm',
      postalCode: '111 22',
      addressCountry: 'SE'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+46-8-123-45-67',
      contactType: 'customer service',
      availableLanguage: 'Swedish'
    }
  }
}

export function createServiceSchema(
  serviceName: string,
  description: string,
  pricing: Array<{ name: string; description: string; price: string }>
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Bokario'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Sweden'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceName} - Priser`,
      itemListElement: pricing.map(item => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.name,
          description: item.description
        },
        price: item.price,
        priceCurrency: 'SEK'
      }))
    }
  }
}

export function createFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}
