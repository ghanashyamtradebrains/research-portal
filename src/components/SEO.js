
import React from 'react';
import { NextSeo } from 'next-seo';

const SEO = ({ title, description, keywords,canonical,noindex,nofollow  }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
    //   openGraph={{
    //     title,
    //     description,
    //   }}
    //   twitter={{
    //     cardType: 'summary_large_image',
    //   }}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: keywords,
        },
      ]}
    />
  );
};

export default SEO;
