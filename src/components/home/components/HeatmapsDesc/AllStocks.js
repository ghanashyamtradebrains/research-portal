import { useSelector } from "react-redux";
import { getThemeMode } from "../../../../redux/reducers/ThemeSlice";
import FAQSection from "../FAQSection";


function AllStocks() {
    const { lightMode } = useSelector(getThemeMode);
    const faqStocks = [
        {
          head: `What information do Stock Heatmaps provide to investors?`,
          content: (
            <>
            <p>Ans- Stock heatmaps offer insights into the historical price movements of specific stocks, allowing investors to analyze trends, identify patterns, and assess relative performance over time. </p>
            </>
          ),
        },
        {
            head: `How frequently are Stock Heatmaps updated?`,
            content: (
              <>
              <p>Generally, individual stock heatmaps are updated regularly to reflect changes in stock prices and market dynamics. </p>
              </>
            ),
          },
          {
            head: `Are there any risks associated with relying on Stock Heatmaps?`,
            content: (
              <>
              <p>While individual stock heatmaps can provide valuable insights, investors should be aware of risks such as market volatility, company-specific factors, and external influences impacting stock prices. </p>
              </>
            ),
          },
          {
              head: `Where can investors access Stock Heatmaps?`,
              content: (
                <>
                <p>Investors can access Stock heatmaps on Trade Brains Portal. </p>
                </>
              ),
            },
      ];
  return (
    <>
     <h2 className="fw-700 fs-28-18 mb-10" style={{ opacity: "0.7" }}>
      What are Stock Heatmaps? 
    </h2>
  <div style={{ opacity: "0.7" }}>
    <p>A stock heatmap is a visual representation of the historical movement of individual stocks over a specified period, typically displaying data for the past 10 years. This graphical tool utilizes color-coding to illustrate the performance of each stock, with warmer colors such as red or orange indicating positive movement (e.g., price increases) and cooler colors such as blue or green representing negative movement (e.g., price decreases).</p>
    <p><b>Benefits of Stock Heatmap : </b></p>
    <p>Stock heatmap page displaying the movement of individual stocks over the last 10 years offers several benefits:</p>
    <p><b>• Long-Term Performance Analysis : </b> Investors can assess the long-term performance of individual stocks, gaining insights into their historical price movements, volatility, and overall trends over a significant timeframe.
</p>
    <p><b>• Identifying Patterns and Trends: </b> The stock heatmap allows investors to easily identify patterns and trends that may have emerged over the past decade. This can help in spotting recurring market cycles, seasonal trends, or other significant price movements.</p>
    <p><b>• Comparative Analysis : </b>The heatmap allows for easy comparison of multiple stocks' performance side by side, enabling investors to evaluate how different stocks have fared relative to each other over the 10-year period.</p>
    <p><b>• Risk Assessment : </b>Analyzing the historical movement of stocks can aid in assessing risk. Investors can identify stocks with relatively stable performance versus those exhibiting greater volatility, helping them make more informed decisions based on their risk tolerance.</p>
    <p><b>• Decision Making : </b>The heatmap page assists investors in making informed investment decisions by providing a comprehensive view of each stock's historical performance. This information can be used to formulate or adjust investment strategies based on past trends and patterns.</p>
    <p><b>• Portfolio Management : </b>Investors can use the heatmap to monitor the performance of stocks held in their portfolios over the long term. This helps in evaluating the effectiveness of their investment choices and making adjustments as necessary to optimize portfolio performance.</p>
    <p><b>• Educational Tool : </b> For novice investors, the stock heatmap page serves as an educational tool, allowing them to learn about the dynamics of individual stocks' movements over an extended period, thus enhancing their understanding of the stock market.</p>
    <p>Overall, the stock heatmap page showcasing the movement of individual stocks over the last 10 years or more to provide valuable insights and analytical capabilities that can benefit investors in various aspects of their investment journey.</p>
    </div>
  <section >
            <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity:"0.7"}}>
              FAQs
            </h2>
            <div className="w-100 mb-75">
              <FAQSection data={faqStocks} lightMode={lightMode} />
            </div>
          </section>
    </>
  );
}

export default AllStocks;
