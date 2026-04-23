import React from "react";
import FAQSection from "./FAQSection";

function PortfolioFaq({ lightMode }) {
  const faqDataPortfolio = [
    {
      head: (
        <h3 className="fw-600 fs-16-14">How to Evaluate Your Portfolio?</h3>
      ),
      content: (
        <>
          <p>
            Ans- Analyzing your portfolio entails several steps aimed at gauging
            its performance in accordance with your investment objectives.
            Utilizing the Portfolio Analysis tool provided by Trade Brains
            Portal can streamline this process.
            <p className="mt-20">Steps: </p>
            <p> • Portfolio Creation: Begin by setting up your portfolio. </p>
            <p> • Stock Addition: Add stocks to your portfolio. </p>
            <p>
              {" "}
              • Diversification: Ensure diversification by including stocks from
              various sectors.{" "}
            </p>
            <p>• Holdings Analysis: Assess the performance of your holdings.</p>
            <p>
              • Rebalancing: Adjust your portfolio as needed to maintain desired
              allocations.
            </p>
          </p>{" "}
        </>
      ),
    },
    {
      head: (
        <h3 className="fw-600 fs-16-14">
          {" "}
          How do I know if my portfolio is good or bad?
        </h3>
      ),
      content: (
        <p>
          Ans- Determining whether your portfolio is good or bad depends whether
          it aligns with your financial goals. Your portfolio should be
          well-diversified across various sectors and industry. Diversification
          helps spread risk and can indicate a well-constructed portfolio.
          Continuously monitor and review your portfolio's performance and make
          adjustments as necessary.
        </p>
      ),
    },
    {
      head: (
        <h3 className="fw-600 fs-16-14">
          How many stocks should be in portfolio?
        </h3>
      ),
      content: (
        <p>
          Ans- The number of stocks in a portfolio can vary based on individual
          preferences, investment goals, risk tolerance, and portfolio
          diversification strategies.
        </p>
      ),
    },
    {
      head: (
        <h3 className="fw-600 fs-16-14">
          {" "}
          Is portfolio analysis only for professional investors?
        </h3>
      ),
      content: (
        <p>
          Ans- No, portfolio analysis is for everyone in the market. It helps
          you analyse the state of your portfolio as per the current market
          situation.
        </p>
      ),
    },
    {
      head: (
        <h3 className="fw-600 fs-16-14">
          {" "}
          Can portfolio analysis help in managing risks?
        </h3>
      ),
      content: (
        <p>
          Ans- Yes, portfolio analysis can indicate the risk of your portfolio.
          It gives an overview of how the stocks in your portfolio are
          performing.
        </p>
      ),
    },
  ];
  return (
    <section className={``}>
      <h2 className="fs-16-14 fw-700" style={{ opacity: "0.7" }}>
        FAQs
      </h2>
      <div>
        <FAQSection data={faqDataPortfolio} lightMode={lightMode} />
      </div>
    </section>
  );
}

export default PortfolioFaq;
