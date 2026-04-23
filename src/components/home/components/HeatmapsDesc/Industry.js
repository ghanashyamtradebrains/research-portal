import { useSelector } from "react-redux";
import { getThemeMode } from "../../../../redux/reducers/ThemeSlice";
import FAQSection from "../FAQSection";

function Industry({indexnameNew ,topStockCompanies, topGainers, sectorStocks }) {
    const topLosers = sectorStocks?.results?.length - topGainers?.length;
    const { lightMode } = useSelector(getThemeMode);
    const faqIndustry = [
        {
          head: `Which is the top performing stock in ${indexnameNew} industry?`,
          content: (
            <>
            <p>Ans: The top performing stock in {indexnameNew}industry is  {sectorStocks?.results?.length
              ? topStockCompanies.slice(0, 1)
              : "None"}. </p>
            </>
          ),
        },
        {
            head: `How many stocks are there in ${indexnameNew} industry?`,
            content: (
              <>
              <p>Ans: There are {sectorStocks?.results?.length} in {indexnameNew} industry. </p>
              </>
            ),
          },
          {
            head: `How many Gainers are there in ${indexnameNew} industry today?`,
            content: (
              <>
              <p> Ans: There are {topGainers?.length} Gainers in {indexnameNew} industry today.</p>
              </>
            ),
          },
          {
              head: `How many Losers are there in ${indexnameNew} industry today?`,
              content: (
                <>
                <p> Ans: There are {topLosers} Losers in {indexnameNew} industry today.</p>
                </>
              ),
            },
            {
                head: `Who is the top gainer in the ${indexnameNew} industry today?`,
                content: (
                  <>
                  <p>Ans: {topStockCompanies?.slice(0, 1)} is the top gainer in the {indexnameNew} industry today. </p>
                  </>
                ),
              },
              {
                  head: `Who is the top loser in the ${indexnameNew} industry today?`,
                  content: (
                    <>
                    <p> Ans: {topStockCompanies&&topStockCompanies[topStockCompanies?.length - 1]} is the top loser in the {indexnameNew} industry today.</p>
                    </>
                  ),
                },
      ];
  return (
    <>
      <h2 className="fw-700 fs-28-18 mb-10" style={{ opacity: "0.7" }}>
      What are Industry Heatmaps? 
    </h2>
  <div style={{ opacity: "0.7" }}>
    <p>Industry heatmaps are visual representations of market data that use color-coded grids to display the performance of various stocks in a particular industry. Each square in the grid represents a stock, and the color of the square indicates how well that stock is performing relative to others.</p>
    <p>Typically, heatmaps use shades of green to indicate positive performance (e.g., price increases) and shades of red to indicate negative performance (e.g., price decreases). The intensity of the color reflects the degree of change in price with darker shades representing larger changes.</p>
    <p>Investors and traders use industry heatmaps to quickly identify trends, patterns, and correlations across a wide range of stocks in a particular industry. They can help visualize market movements, spot potential opportunities or risks, and make informed decisions based on the displayed information.</p>
    <p><b>Benefits of using Industry Heatmaps:</b></p>
    <p><b>• Industry Analysis : </b></p>
    <p>Industry Heatmaps offer a comprehensive view of the performance of stocks within the industry. By visualizing data such as stock prices, market capitalization, or other relevant metrics, investors can quickly assess the overall health of the industry.</p>
    <p><b>• Identifying Strong Performers: </b></p>
    <p>Industry Heatmaps help investors identify strong performers within the industry. Stocks exhibiting consistent growth or showing signs of undervaluation can stand out on the heatmap, guiding investors toward potential opportunities for investment.</p>
    <p><b>• Spotting Trends : </b></p>
    <p>Industry Heatmaps enable investors to spot trends within the industry. By observing patterns of color intensity over time, investors can identify emerging trends, such as shifts in consumer demand, technological advancements, or regulatory changes, that may impact stock performance.</p>
    <p><b>• Risk Assessment : </b></p>
    <p>Industry Heatmaps aid in risk assessment by highlighting stocks or subsectors within the industry that are experiencing significant volatility or price fluctuations. This information allows investors to assess and manage risk within their portfolios more effectively.</p>
    <p><b>• Portfolio Diversification: </b></p>
    <p>Industry Heatmaps assist investors in portfolio diversification by providing insights into the performance of different stocks within the industry. By diversifying across various stocks or subsectors, investors can mitigate risk and improve the overall resilience of their portfolios.</p>
    </div>
  <section >
            <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity: "0.7" }}>
              FAQs
            </h2>
            <div className="w-100 mb-75">
              <FAQSection data={faqIndustry} lightMode={lightMode} />
            </div>
          </section>
    </>
  );
}

export default Industry;
