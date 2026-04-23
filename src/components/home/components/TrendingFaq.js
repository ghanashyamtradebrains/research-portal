import { useSelector } from "react-redux";
import FAQSection from "./FAQSection";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";

function TrendingFaq() {
  const { lightMode } = useSelector(getThemeMode);
  const faqDataTrending = [
    {
      head: `What are trending stocks?
      `,
      content: <p>Ans- Trending stocks refer to stocks that are currently experiencing significant interest and activity in the market.  These stocks are "trending" because they are attracting a lot of attention from investors and traders.
      </p>,
    },
    {
      head: `How are trending stocks identified?
      `,
      content: <p>Ans- Trending stocks are typically identified by their increased trading volume, significant price movements, or frequent mentions in financial news and social media.
      </p>,
    },
    {
      head: `Should I invest in trending stocks?
      `,
      content: <p>Ans- Investing in trending stocks can be profitable, but it also comes with higher risk due to market volatility. It’s important to conduct thorough research, understand the reasons behind the trend, and consider your own risk tolerance before investing.
      </p>,
    },
    {
      head: `How can I find out which stocks are trending?
      `,
      content: <p>Ans- You can discover trending stocks on stock analysis platforms like Trade Brains Portal.
      </p>,
    },
    {
      head: `Do trending stocks always perform well?
      `,
      content: <p>Ans- No, trending stocks do not always guarantee good performance. A stock may trend due to speculative trading, temporary news, or market rumors. It’s essential to analyze the underlying fundamentals and market conditions before making any investment decisions.
      </p>,
    },
    {
      head: `Can I lose money on trending stocks?
      `,
      content: <p>Ans- Yes, investing in trending stocks can result in losses, especially if the stock price is driven by speculation rather than solid fundamentals. Prices can fluctuate rapidly, and without proper risk management, you could incur significant losses.
      </p>,
    },
    {
      head: `What is the best time to buy or sell a trending stock?
      `,
      content: <p>Ans-The best time to buy or sell a trending stock depends on your investment strategy and market conditions.
      </p>,
    },
    {
      head: `Are trending stocks suitable for long-term investment?
      `,
      content: <p>Ans- Trending stocks are often more volatile and might not be suitable for long-term investment unless they are supported by strong fundamentals. Long-term investors should focus on stocks with consistent growth, stable earnings, and solid company financials.
      </p>,
    },
   
  ];
  return (
    <>
      <section>
        <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity: "0.7" }}>
          FAQs
        </h2>
        <div className="w-100 mb-75">
          <FAQSection data={faqDataTrending} lightMode={lightMode} />
        </div>
      </section>
    </>
  );
}

export default TrendingFaq;
