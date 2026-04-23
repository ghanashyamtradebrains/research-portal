import { useSelector } from "react-redux";
import { getThemeMode } from "../../../../redux/reducers/ThemeSlice";
import FAQSection from "../FAQSection";

function Sector({ topStockCompanies, titleSector, topGainers, sectorStocks }) {
  const topLosers = sectorStocks?.results?.length - topGainers?.length;
  const { lightMode } = useSelector(getThemeMode);
  const faqSector = [
    {
      head: `Which is the highest performing stocks in ${titleSector} ?`,
      content: (
        <>
          <p>
            Ans: The highest performing stock in {titleSector} is{" "}
            {sectorStocks?.results?.length
              ? topStockCompanies.slice(0, 1)
              : "None"}
            .{" "}
          </p>
        </>
      ),
    },
    {
      head: `How many stocks are there in ${titleSector} sector?`,
      content: (
        <>
          <p>
            {" "}
            Ans: There are {sectorStocks?.results?.length} stocks in{" "}
            {titleSector} sector.
          </p>
        </>
      ),
    },
    {
      head: `How many Gainers are there in ${titleSector} sector today?`,
      content: (
        <>
          <p>
            {" "}
            Ans: There are {topGainers?.length} Gainers in {titleSector} sector
            today.
          </p>
        </>
      ),
    },
    {
      head: `How many Losers are there in ${titleSector} sector today?`,
      content: (
        <>
          <p>
            {" "}
            Ans: There are {topLosers} Losers in {titleSector} sector today.
          </p>
        </>
      ),
    },
    {
      head: `Who is the top gainer in the ${titleSector} sector today?`,
      content: (
        <>
          <p>
            Ans: {topStockCompanies?.slice(0, 1)} is the top gainer in the{" "}
            {titleSector} sector today.{" "}
          </p>
        </>
      ),
    },
    {
      head: `Who is the top loser in the ${titleSector} sector today?`,
      content: (
        <>
          <p>
            Ans: {topStockCompanies&&topStockCompanies[topStockCompanies?.length - 1]} is the top
            loser in the {titleSector} sector today.{" "}
          </p>
        </>
      ),
    },
  ];
  return (
    <>
      <h2 className="fw-700 fs-28-18" style={{ opacity: "0.7" }}>
        What are Sector Heatmaps?
      </h2>
      <div style={{ opacity: "0.7" }}>
        <p>
          Sector heatmaps are visual representations of market data that use
          color-coded grids to display the performance of various stocks in a
          particular sector. Each square in the grid represents a stock, and the
          color of the square indicates how well that stock is performing
          relative to others.
        </p>
        <p>
          Typically, heatmaps use shades of green to indicate positive
          performance (e.g., price increases) and shades of red to indicate
          negative performance (e.g., price decreases). The intensity of the
          color reflects the degree of change in price with darker shades
          representing larger changes.
        </p>
        <p>
          Investors and traders use sector heatmaps to quickly identify trends,
          patterns, and correlations across a wide range of stocks in a
          particular sector. They can help visualize market movements, spot
          potential opportunities or risks, and make informed decisions based on
          the displayed information.
        </p>
        <p>
          <b>Benefits of using Sector Heatmaps : </b>
        </p>
        <p>
          <b>• Visual Representation : </b>Sector Heatmaps provide a visually
          intuitive way to represent data. In the context of stocks, they can
          quickly convey information about the performance of various stocks
          within the sector.
        </p>
        <p>
          <b>• Identifying Trends : </b>Sector Heatmaps can help investors
          identify trends in a particular sector. By observing patterns of color
          intensity (which represent changes in stock prices), investors can
          spot upward or downward trends in specific stocks or the sector as a
          whole.
        </p>
        <p>
          <b>• Sector Comparison : </b>Sector Heatmaps allow for easy comparison
          between different sectors. Investors can compare the performance of
          various sectors, such as technology or healthcare, at a glance. This
          can inform investment decisions and portfolio diversification
          strategies.
        </p>
        <p>
          <b>• Risk Assessment : </b>Sector Heatmaps can aid in risk assessment
          by highlighting stocks or sectors that are experiencing significant
          volatility or price fluctuations. This information can be valuable for
          investors looking to manage risk within their portfolios.
        </p>
        <p>
          <b>• Portfolio Management : </b>
        </p>
        <p>
          For investors with diversified portfolios, sector heatmaps can assist
          in portfolio management. By visualizing the performance of individual
          stocks within a sector, investors can make informed decisions about
          rebalancing their portfolios or reallocating assets.
        </p>
      </div>
      <section>
        <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity: "0.7" }}>
          FAQs
        </h2>
        <div className="w-100 mb-75">
          <FAQSection data={faqSector} lightMode={lightMode} />
        </div>
      </section>
    </>
  );
}

export default Sector;
