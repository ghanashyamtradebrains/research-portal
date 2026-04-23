import { useSelector } from "react-redux";
import { getThemeMode } from "../../../../redux/reducers/ThemeSlice";
import FAQSection from "../FAQSection";


function Superstar({topStockCompanies,fullName,heatmapData}) {
    const { lightMode } = useSelector(getThemeMode);
    const faqSuperstar = [
        {
          head: `How are the stocks chosen for inclusion in the superstar heatmaps?`,
          content: (
            <p>Ans- The stocks included in the heatmaps are those held in the portfolios of renowned investors often referred to as "ace investors". These investors are typically well-known for their successful track records and investment strategies. </p>
          ),
        },
        {
            head: `What information do the superstar heatmaps provide to investors?`,
            content: (
              <>
              <p>Ans- The superstar heatmaps offer insights into the investment preferences, strategies, and sentiment of ace investors. Investors can analyze which stocks these successful individuals are holding, their relative weights in the portfolio, and potential trends or patterns across different sectors. </p>
              </>
            ),
          },
          {
            head: `Which is the top performing stock of ${fullName} heatmap?`,
            content: (
              <>
              <p>Ans- The top performing stock of {fullName} heatmap is {topStockCompanies ? topStockCompanies.slice(0,1) :  "None"}.  </p>
              </>
            ),
          },
          {
              head: `How many stocks are there in ${fullName} heatmap?  `,
              content: (
                <>
                <p> Ans- Number of stocks in {fullName} heatmap are {heatmapData?.length ? heatmapData?.length : "None"}.  </p>
                </>
              ),
            },
      ];
  return (
    <>
      <h2 className="fw-700 fs-28-18 mb-10" style={{ opacity: "0.7" }}>
      What are Superstar Heatmaps?
    </h2>
  <div style={{ opacity: "0.7" }}>
    <p>Superstar heatmaps are visual representations of market data that use color-coded grids to display the performance of various stocks hold by a individual superstar over a specific period. Each square in the grid represents a stock, and the color of the square indicates how well that stock is performing relative to others.</p>
    <p>Typically, heatmaps use shades of green to indicate positive performance (e.g., price increases) and shades of red to indicate negative performance (e.g., price decreases). The intensity of the color reflects the degree of change in price with darker shades representing larger changes.</p>
    <p>Investors and traders use superstar heatmaps to quickly identify trends, patterns, and correlations across a wide range of stocks. They can help visualize market movements, spot potential opportunities or risks, and make informed decisions based on the displayed information.</p>
    <p className="fs-16-14"><b>Benefits of using Superstar Heatmaps</b></p>
    <p>Superstar Heatmaps offer several benefits:</p>
    <p><b>• Visual Representation : </b>Superstar Heatmaps provide a visual snapshot of market performance, making it easier for investors to quickly grasp trends and patterns across stocks.</p>
    <p><b>• Efficiency : </b>Superstar Heatmaps condense large amounts of data into a single, easily digestible format, saving investors time and effort in analyzing market movements.</p>
    <p><b>• Potential Investment Opportunities : </b>Investors can use heatmaps of superstar holdings to identify potential investment opportunities. If multiple successful investors hold the same stock, it may indicate a strong bullish sentiment and prompt further research into that particular company.</p>
    <p><b>• Portfolio Management : </b>Investors can use superstar heatmaps to monitor the performance of their portfolios comparing the holdings of the superstars and quickly identify areas that may require rebalancing or adjustments.</p>
    <p><b>• Decision Making : </b>Superstar Heatmaps assist investors in making more informed decisions by providing a clear visualization of market dynamics and helping them stay updated on the latest market trends.</p>
    <p>Overall, superstar heatmaps representing the stocks held by individual ace investors offer individual investors a valuable tool for gaining insights, identifying opportunities, managing risk, and learning from the expertise of successful market participants.</p>
    </div>
  <section >
            <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity: "0.7" }}>
              FAQs
            </h2>
            <div className="w-100 mb-75">
              <FAQSection data={faqSuperstar} lightMode={lightMode} />
            </div>
          </section>
    </>
  );
}

export default Superstar;
