export const generateMetaData = (
  title,
  description,
  keywords,
  canonical,
  images,
  ratingValue,
  ratingCount
) => {
  const defaultImage = "/favicon.ico";
  const metadataConfig = {
    title: title,
    description: description,
    keywords: keywords,
    canonical: canonical,
    image: images || defaultImage,
    ratingValue: ratingValue,
    url: "https://portal.tradebrains.in/",
    robots:
      "INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1",
  };

  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: metadataConfig.title,
    description: metadataConfig.description,
    url: metadataConfig.url,
    applicationCategory: "SaaS",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      availability: "http://schema.org/InStock",
      price: "0",
      priceCurrency: "INR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      ratingCount: ratingCount,
    },
    author: {
      "@type": "Organization",
      name: "Trade Brains Portal",
    },
    publisher: {
      "@type": "Organization",
      name: "Trade Brains Portal",
    },
    robots: metadataConfig.robots,
    image: metadataConfig.image,
  };

  return {
    metadataBase: new URL(metadataConfig?.url),
    robots: metadataConfig.robots,
    author: "Trade Brains Portal",
    publisher: "Trade Brains Portal",
    title: metadataConfig?.title,
    description: metadataConfig?.description,
    keywords: metadataConfig?.keywords,
    openGraph: {
      title: metadataConfig?.title,
      description: metadataConfig?.description,
      url: metadataConfig?.url,
      canonical: metadataConfig?.canonical,
      siteName: "Trade Brains Portal",
      images: [
        {
          url: metadataConfig.image,
          width: 800,
          height: 600,
          alt: metadataConfig.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataConfig?.title,
      description: metadataConfig?.description,
      images: [metadataConfig.image],
    },
    schemaOrg: schemaOrgData,
  };
};
