import React from "react";
import { NextSeo } from "next-seo";

const SEO = ({ title, description, keywords, canonical }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      additionalMetaTags={[
        {
          name: "keywords",
          content: keywords,
        },
      ]}
    />
  );
};

export default SEO;
