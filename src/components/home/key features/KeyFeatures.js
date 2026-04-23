import React from "react";
import Featurecard from "./Featurecard";
import globetheme from "../../../assets/images/home/globe-theme.png";
import keyFeatBg from "../../../assets/images/bg/keyFeatBg.png";
import Image from "next/image";
import svgSheet from "../../../assets/svg/svgSheet";
import svgSheet5 from "../../../assets/svg/svgSheet5";

function KeyFeatures({ lightMode }) {
  const cardContent = {
    starPortfolio: {
      title: "Superstar Portfolios",
      desc: "Track the actions of all your favourite ace investors in one place.",
      redirectState: "/superstars",
    },
    portAnalysis: {
      title: "Portfolio Analysis",
      desc: `Build a dream portfolio using world - class analytics.`,
      redirectState: "/",
    },
    StockCompare: {
      title: "Stock Compare",
      desc: "Compare investment-worthy companies using 50+ parameters.",
      redirectState: "/stockCompare",
    },
    StockBuckets: {
      title: "Stock Buckets",
      desc: "Assorted baskets of stocks to make your sectoral and thematic purchases easier.",
      redirectState: "/Buckets",
    },
    Screener: {
      title: "Screener",
      desc: "Find winning stocks by creating personalised filters.",
      redirectState: "/screener",
    },
    Backtesting: {
      title: "Portfolio Backtesting",
      desc: "Evaluate your portfolio in different scenarios and manage your risks",
      redirectState: "/upcoming",
    },
  };

  const featureCards = [
    {
      content: cardContent.starPortfolio,
      svg: svgSheet5?.homeSuperstar,
      link: `/superstars`,
    },
    {
      content: cardContent.portAnalysis,
      svg: svgSheet5?.homePortfolioAnalysis,
      link: `/portfolio`,
    },
    {
      content: cardContent.Screener,
      svg: svgSheet5?.homeScreener,
      link: `/screener`,
    },
    {
      content: cardContent.StockCompare,
      svg: svgSheet5?.homeStockCompare,
      link: `/stockCompare`,
    },
    {
      content: cardContent.StockBuckets,
      svg: svgSheet5?.homeBuckets,
      link: `/buckets`,
    },
    {
      content: cardContent.Backtesting,
      svg: svgSheet5?.homeBackTesting,
      link: `/portfolio-backtesting`,
    },
  ];

  const renderFeatureCards = (cards) => {
    return cards.map((card, index) => (
      <div className="w-33" key={index}>
        <Featurecard
          lightMode={lightMode}
          cardContent={card.content}
          svgSheet={card.svg}
          web={true}
          link={card.link}
        />
      </div>
    ));
  };

  const renderFeatureCardsMobile = (cards) => {
    return cards.map((card, index) => (
      <div className="w-50" key={index}>
        <Featurecard
          lightMode={lightMode}
          cardContent={card.content}
          svgSheet={card.svg}
          mobile={true}
          link={card.link}
        />
      </div>
    ));
  };

  const renderFeatureCardsMobileTwo = (cards) => {
    return cards.map((card, index) => (
      <div className="w-100" key={index}>
        <Featurecard
          lightMode={lightMode}
          cardContent={card.content}
          svgSheet={card.svg}
          link={card.link}
        />
      </div>
    ));
  };
  return (
    <section className="home-ring-bg mt-30">
      <div className="p-50-0 px-15 only-PC-view w-100">
        <div className="">
          <h3 className="fs-40-32 fw-700 mb-20">
            Key <span className="text-blue-grad">Features</span>
          </h3>
          <p className="fs-16-14">
            Trade Brains Portal is designed with powerful features that help you
            to stand out from an average investor.
          </p>
        </div>
        <div className="d-flex justify-content-between mt-20 w-100 gap-15px">
          {renderFeatureCards(featureCards.slice(0, 3))}
        </div>
        <div className="d-flex justify-content-between mt-20 w-100 gap-15px">
          {renderFeatureCards(featureCards.slice(3, 6))}
        </div>
      </div>
      <div className="p-50-0 px-15 only-mobile-view w-100">
        <div className="text-align-center">
          <h3 className="fs-40-32 fw-700 mb-20">
            Key <span className="text-blue-grad">Features</span>
          </h3>
          <p className="fs-16-14">
            All new Trade Brains Portal with powerful features to help you stand
            out from the average investors.
          </p>
        </div>
        <div className="d-flex mt-20 w-100 gap-15px">
          {renderFeatureCardsMobile(featureCards.slice(0, 2))}
        </div>
        <div className=" mt-10 w-100">
          {renderFeatureCardsMobileTwo(featureCards.slice(2, 3))}
        </div>
        <div className="d-flex mt-10 justify-content-between w-100 gap-15px">
          {renderFeatureCardsMobile(featureCards.slice(3, 5))}
        </div>
        <div className="mt-10 w-100">
          {renderFeatureCardsMobileTwo(featureCards.slice(5, 6))}
        </div>
      </div>
    </section>
  );
}

export default KeyFeatures;
