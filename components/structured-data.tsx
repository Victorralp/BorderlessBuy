import Script from 'next/script'

interface StructuredDataProps {
  type: 'website' | 'product' | 'organization' | 'breadcrumb'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Heritage of Skegness",
          "url": "https://heritageofskegness.co.uk",
          "description": "Premium African and international foods, spices, and beverages delivered fresh to your door.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://heritageofskegness.co.uk/shop?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Heritage of Skegness",
          "url": "https://heritageofskegness.co.uk",
          "logo": "https://heritageofskegness.co.uk/images/logo/borderlessbuy-logo.png",
          "description": "Premium African and international foods, spices, and beverages delivered fresh to your door.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "GB"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+44-123-456-7890",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://www.facebook.com/heritageofskegness",
            "https://www.instagram.com/heritageofskegness",
            "https://www.twitter.com/heritageofskegness"
          ]
        }
      
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "image": data.images,
          "brand": {
            "@type": "Brand",
            "name": "Heritage of Skegness"
          },
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "GBP",
            "availability": data.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "Heritage of Skegness"
            }
          },
          "aggregateRating": data.rating ? {
            "@type": "AggregateRating",
            "ratingValue": data.rating,
            "reviewCount": data.reviewCount || 1
          } : undefined
        }
      
      default:
        return data
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema())
      }}
    />
  )
}