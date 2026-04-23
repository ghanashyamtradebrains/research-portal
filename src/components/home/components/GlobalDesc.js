import FAQSection from "./FAQSection";

const GlobalDesc = ({lightMode}) => {
    const GlobalFaq = [
        {
          head: <p>What are Global Market Indices?</p>,
          content: (
            <p> Ans- Global market indices are the key stock exchanges worldwide, monitoring the performance of major stock markets globally. They provide investors with a snapshot of overall market performance and are used as benchmarks for evaluating market trends. By tracking trends across various regions, global market indices provide valuable insights for informed investment decisions.</p> 
          ),
        },
        {
            head: <p>How do Global Stock Market Indices affect the Indian Stock Market?</p>,
            content: (
              <p>Ans-Global stock market indices can impact the Indian stock market through changes in investor sentiment influenced by global economic events, geopolitical factors, and overall market trends. </p> 
            ),
          },
          {
            head: <p>What are the pros of investing in Global Stock Market Indices?</p>,
            content: (
              <p> Ans-The pros of investing in Global Stock Market Indices include diversification, access to international companies, and high liquidity, providing investors with a well-rounded portfolio.
              </p> 
            ),
          },
          {
            head: <p>What are the Cons of Investing in Global Stock Market Indices?</p>,
            content: (
              <p> Ans-Cons include currency risks, geopolitical uncertainties, and challenges in market timing due to different time zones.</p> 
            ),
          },
          {
            head: <p>What are the 3 Major Global Stock Market Indices?</p>,
            content: (
              <p> Ans-The 3 Major Global Market Indices are Dow Jones Industrial Average (DJIA), S&P 500 Index, and Nasdaq Composite Index.</p> 
            ),
          },
          {
            head: <p>What is the Full Form of NASDAQ?</p>,
            content: (
              <p> Ans-Full Form of NASDAQ is National Association of Securities Dealers Automated Quotations.</p> 
            ),
          },
          {
            head: <p>How many Global Stock Market Indices are there in the world?</p>,
            content: (
              <p> Ans- There are 26 global stock market indices, with 4 major world indices.</p> 
            ),
          },
          
      ];
    return (
 <div>
    <p className="fw-700 fs-28-18" style={{ opacity: "0.5" }}>
   
    </p>
  <div style={{ opacity: "0.7" }} className="mt-40">
    <p className="fw-600 fs-24-16"><b>What are Global Market Indices?</b></p>
    <p>Global market indices are the key stock exchanges worldwide, monitoring the performance of major stock markets globally. They provide investors with a snapshot of overall market performance and are used as benchmarks for evaluating market trends. By tracking trends across various regions, global market indices provide valuable insights for informed investment decisions.</p>
    <p>Global Market Indices also know as World Market Indices  </p>
    <p className="fw-600 fs-16-14"><b>Types of Stock Market Indices:</b></p>
    <p><b>• Broad Market Indices : </b>These encompass a wide range of stocks, offering a snapshot of the overall market. Examples include the Dow Jones Industrial Average, NASDAQ Composite, and S&P 500.</p>
    <p><b>• Sectoral Indices : </b>Focused on specific industries or sectors, these indices help investors gauge the performance of particular segments of the market. Explore indices like the Nifty Bank for banking stocks or the NASDAQ Biotechnology Index for biotech companies.</p>
    <p><b>• Global Market Indices : </b>Gain a global perspective by examining indices that track the performance of stocks across international markets. </p>
    <p><b>Top Global Market Indices:</b>These are few of the Global Market Indices such as Nasdaq, Nasdaq 100, S&P 100, KOSPI, Hang Seng, All Share, BEL-20, Madrid General, Taiwan Weighted, NZX 50 Index, MerVal, SET, BSE Sensex , IPC, FTSE 100</p>
     </div>
      {/* FAQs */}
      <section >
      <h2 className="fs-25-20 fw-700 mb-20 mt-40  " style={{opacity:"0.7"}}>
      FAQs
      </h2>
      <div className="w-100">
        <FAQSection data={GlobalFaq} lightMode={lightMode} />
      </div>
    </section>
     </div>
)
};
export default GlobalDesc;