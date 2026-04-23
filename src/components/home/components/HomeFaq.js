import React from "react";
import FAQSection from "./FAQSection";

function HomeFaq({ lightMode, stockResearch }) {
  const faqData = [
    {
      head: `What is Tradebrains Portal?`,
      content: (
        <p>
          Ans- Trade Brains Portal is a stock research website offered by Trade
          Brains. This helps the investors to make the best fundamental analysis
          and stock analysis with quality data and tools like Portfolio
          analysis, Stock research report, Screener, Heatmap and many more.
        </p>
      ),
    },
    {
      head: `Which is the best website for fundamental analysis of stock?`,
      content: (
        <>
          <p>
            Ans- Trade Brains Portal is the best website for fundamental
            analysis of stock. You can simply login to the Trade Brains Portal
            website and get all the fundamental informations about the stocks in
            India.
          </p>
        </>
      ),
    },
    {
      head: `How to use Trade Brains Portal?`,
      content: (
        <>
          <p>
          Ans-  Follow the steps below -  <br />
           Step 1: Login to the Trade Brains Portal
            <br />
            Step 2: Select the stock for which you need to do fundamental
            analysis
            <br />
            Step 3: Check out all the details about the stocks and explore
            various tools given by Trade Brains Portal.
            <br />
            Step 4: Conduct a complete fundamental analysis by using various
            tools offered by Trade Brains Portal
          </p>
        </>
      ),
    },
    {
      head: "What are the benefits of subscribing to Trade Brains Portal premium plans?",
      content: (
        <>
          <p>
          Ans- You can get lot of benefits by subscribing to Trade Brains Portal
            premium plans like ads free experience, Stock research report,
            Screener, Watchlist etc,. You can check out all the benefits of
            premium plans on the pricing page
          </p>
        </>
      ),
    },
    {
      head: "What features are accessible for free users?",
      content: (
        <p>
         Ans- Free users can access features like fundamental details of all the
          stocks, Heatmaps, Market news, Top gainers/lossers etc,.
        </p>
      ),
    },
    {
      head: " Is Trade Brains Portal free?",
      content: (
        <p>
          {" "}
          Ans- Trade Brains Portal provides free fundamental analysis of all the
          stocks. However, users can subscribe to the premium plans to unlock
          more features like Stock Research reports, Stock compare, Portfolio
          analysis and many more.
        </p>
      ),
    },
    {
      head: "What are the features available in premium plans?",
      content: (
        <p>
          Ans- There are two subscription plans available: Premium and Premium+. The
          Premium plan includes features such as portfolio analysis, stock
          comparison, and the Portal Smart Score. The Premium+ plan offers
          additional benefits, including stock research reports by
          SEBI-registered financial analysts and vouchers for Joinfingrad
          courses. Each plan has different pricing and duration options. For
          complete details, please visit the Pricing Page.
        </p>
      ),
    },
    {
      head: "Does Trade Brains Portal provides Stock Research Reports?",
      content: (
        <>
          <p>
            Ans- Yes, Trade Brains Portal provides Stock Research Reports by
            SEBI registered financial analyst for the premium+ users. You can
            check out the premium plans which is provided by Trade Brains Portal
            in the pricing page.
          </p>
        </>
      ),
    },
    {
      head: " What are the tools offered by Trade Brains Portal?",
      content: (
        <p>
          Ans- Trade Brains Portal offers various tools like Portfolio analysis,
          Stock Compare, Stock Research Reports, Portal Smart Score for the
          stocks, Watchlist and many more.{" "}
        </p>
      ),
    },
  ];
  const faqDataResearch = [
    {
      head: `What are Stock Research Reports?`,
      content: (
        <p>
          Ans: Stock research reports are the reports prepared by the top Indian brokers, providing recommadations such as Buy, Sell, or Hold into a particular stock.   
        </p>
      ),
    },
    {
      head: `How can stock research reports benefit investors?`,
      content: (
        <p>
         Ans: Investors can use stock research reports to make informed decisions, as these reports offer comprehensive information about a company's financial health, market trends, and potential investment outcomes.  
        </p>
      ),
    },
    {
      head: `What are Equity Research Reports?`,
      content: (
        <p>
        Ans: Equity research reports are comprehensive reports produced by financial analysts or research firms that provide detailed analysis and insights into a particular company or industry. 
        </p>
      ),
    },
    {
      head: `How often should I refer to stock research reports?`,
      content: (
        <p>
        Ans: It depends on your investment strategy. Long-term investors may refer to reports less frequently than short-term traders who seek more current data.
        </p>
      ),
    },
    {
      head: `Where can I get stock recommendation reports?`,
      content: (
        <p>
          {" "}
          Ans: You can access detailed stock recommendation reports from various websites dedicated to stock analysis. One notable platform offering such reports is the Trade Brains Portal.
        </p>
      ),
    },
    {
      head: `Can stock research reports predict market movements accurately?`,
      content: (
        <p>Ans: While they provide valuable insights, stock research reports do not guarantee accurate predictions of market movements, as market conditions can be influenced by various unpredictable factors. </p>
      ),
    },
    {
      head: `Do stock research reports include recommendations to buy or sell?        `,
      content: (
        <p>
          Ans: Yes, many stock research reports conclude with recommendations such as Buy, Sell, or Hold based on the analysts' assessments.
        </p>
      ),
    },
  ];
  return (
    <section
      className={`${
        stockResearch ? "" : "flex flex-col align-items-center"
      } p-50-0 w-100`}>
      <h2
        className="fs-25-20 fw-700 mt-20 text-md-center "
        style={{ opacity: "0.7" }}>
        FAQs
      </h2>
      <div className="w-100- mb-75">
        <FAQSection
          data={stockResearch ? faqDataResearch : faqData}
          lightMode={lightMode}
        />
      </div>
    </section>
  );
}

export default HomeFaq;
