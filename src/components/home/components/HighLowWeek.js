import React from "react";
import FAQSection from "./FAQSection";

function HighLowWeek({
  lightMode,
  highLowData,
  topMarketCap,
  lowMarketCap
}) {
  const faqHighWeekData = [
    {
      head: `What is 52 week high in stocks? `,
      content: (
        <p>
          Ans: When the price of the stock reaches the highest in the past 52
          weeks, which is one year, it is called as 52 week high.
        </p>
      ),
    },
    {
      head: `Is it good to buy 52 week high stocks?`,
      content: (
        <p>
          Ans: Buying stocks on the basis of 52 week high is not a good
          invesmtnet decision and the investors should not relay only on 52 week
          high. They must make a thorough research before investing in any
          stocks and also make sure if the company they are investing in has
          growth potential in the future
        </p>
      ),
    },
    {
      head: `Which stocks hit 52 high today according to market Cap?`,
      content: (
        <p>{`Ans: The stocks that hit 52 high today according to market cap are ${topMarketCap} .`}</p>
      ),
    },
    {
      head: `What is 52 week high momentum?`,
      content: (
        <p>
          Ans: A stock whose price is at or near its 52 week high is a stock
          with high momentum ussaly such stocks have have volume and have
          recently breched thier resistance.{" "}
        </p>
      ),
    },
    {
      head: `What are the benefits of tracking 52-week high stocks?`,
      content: (
        <p>
          Ans: Tracking stocks that reach their 52-week highs benefits investors
          by keeping them informed about price fluctuations in the stock market.{" "}
        </p>
      ),
    },
  ];
  const faqLowWeekData = [
    {
      head: `How to find 52 week low stocks?`,
      content: (
        <p>
          Ans: When the price of the stocks reaches the lowest in the past 52
          weeks, it is known as 52 week low stocks. you can find the 52 week low
          stocks on trade brains portal and check all the 52 week low stocks in
          a glance
        </p>
      ),
    },
    {
      head: `Which stocks hit 52 low today according to market cap?  `,
      content: <p>{`Ans: The stocks at 52 weeks low are ${lowMarketCap}`} .</p>,
    },
    {
      head: `Is it safe to buy 52 week low stocks?`,
      content: (
        <p>{`Ans: Buying stocks on the basis of 52 week low is not a good invesmtnet decision and  the investors should not relay only on 52 week low. They must make a thorough research before investing in any stocks and also make sure if the company they are investing in has growth potential in the future.`}</p>
      ),
    },
    {
      head: `What is 52 week low stock?`,
      content: (
        <p>
          Ans: If the price of the stock reaches the lowest in the past 52 weeks
          which is one year, it is known as 52 week low stock.
        </p>
      ),
    },
  ];
  return (
    <section className={`max-w mt-20`}>
      {highLowData ? <div>
        <p className="fw-700 fs-28-18" style={{ opacity: "0.7" }}>
          About 52 Week High:
        </p>
        <div style={{ opacity: "0.7" }}>
          <p>
            52 week high is basically the highest price of the shares that are
            traded during the time period of 52 weeks which is one year. The 52
            week high serves as a clear measure of how a stock has performed
            relative to its recent history. Stocks reaching their 52 week highs
            are often seen as strong performers and might boost investors
            confidence. However, the company's growth depends on various other
            factors and key metrics.{" "}
          </p>
          <p>
            Investors, analysts and traders regularly monitor the stocks to
            check if the stocks are reaching the 52 week high. This might
            influence the trading decisions, such as buying or selling the
            stocks. When a stock reaches its 52 week high, it may show the
            strength of the company which encourages the investors to buy in
            anticipation of continued growth. Also, some investors might view a
            52 week high as an opportunity to sell the stock to enjoy the
            profit.
          </p>
        </div>
      </div>
      :
      <div>
        <p className="fw-700 fs-28-18" style={{ opacity: "0.7" }}>
        About 52 Week Low:
        </p>
        <div style={{ opacity: "0.7" }}>
          <p>
          52 week low refers to the lowest price of the shares that have traded during the period of 52 weeks which is one year. 52 week low helps the investors in comparing the price of the stocks and show how the price of the stocks have been fluctuating for the past 52 weeks.
          </p>
          <p>
          A stock reaches its 52 week low due to several reasons like market flucuations, management issues, economic conditions and so on. Some investors may choose to sell their holdings to minimise losses or reallocate funds to more promising investments, some sees it as a buying opportunity at a discounted price. While a stock trading at its 52 week low might present a buying opportunity, it also carries risks. It could indicate fundamental issues with the company, industry challenges, or broader economic concerns affecting the stock. One should consider several factors and involve in a proper research before investing in any stocks.
          </p>
          <p>Investors and analysts regularly monitor stocks to see if they are reaching their 52-week lows. Consistent monitoring of stock prices is important for investors and analysts to stay informed about price movements of the stock. By keeping track of stocks that are approaching or reaches their 52-week low might help in identifying potential opportunities or risks early. "</p>
        </div>
      </div>}
      <h2
        className="fs-25-20 fw-700 mb-20 text-md-center "
        style={{ opacity: "0.7" }}>
        FAQs
      </h2>
      <div className="w-100 mb-75">
        <FAQSection
          data={highLowData ? faqHighWeekData : faqLowWeekData}
          lightMode={lightMode}
        />
      </div>
    </section>
  );
}

export default HighLowWeek;
