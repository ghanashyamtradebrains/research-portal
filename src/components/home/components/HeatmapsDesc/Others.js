import { useSelector } from "react-redux";
import { getThemeMode } from "../../../../redux/reducers/ThemeSlice";
import FAQSection from "../FAQSection";

function Others({index_name,topStockCompanies,topGainers,topIpos,totalIpos}) {
    const { lightMode } = useSelector(getThemeMode);
    const topLosers = topStockCompanies?.length - topGainers?.length;
    const faqGlobal = [
        {
          head: `What are the 3 Major Global Stock Market Indices?`,
          content: (
            <>
            <p>Ans: The 3 Major Global Market Indices are Dow Jones Industrial Average (DJIA), S&P 500 Index, and Nasdaq Composite Index. </p>
            </>
          ),
        },
        {
            head: `What is the Full Form of NASDAQ?  `,
            content: (
              <>
              <p>Full Form of NASDAQ is National Association of Securities Dealers Automated Quotations.  </p>
              </>
            ),
          },
          {
            head: `How many Global Stock Market Indices are there in the world?`,
            content: (
              <>
              <p> Ans: There are 26 global stock market indices, with 4 major world indices. </p>
              </>
            ),
          },
          {
              head: `Name the best performing Index among the World Market Indices Heatmap Today?`,
              content: (
                <>
                <p>Ans: The best performing Index in the world market indies heatmap today is {topStockCompanies?.slice(0, 1)}. </p>
                </>
              ),
            },
            {
                head: `Name the Top loser today among the Global Market Indices Heatmap?`,
                content: (
                  <>
                  <p>Ans: The top loser today on the Global Market Indices Heatmap is {topStockCompanies&&topStockCompanies[topStockCompanies?.length - 1]}. </p>
                  </>
                ),
              },
      ];
      const faqForex = [
        {
          head: `How many Forex currencies data are there on Trade Brain Portal?`,
          content: (
            <>
            <p>Ans: There are 25 Forex currencies data available on the Trade Brains Portal.  </p>
            </>
          ),
        },
        {
            head: `Name the best performing currency among Forex currencies Heatmap Today?`,
            content: (
              <>
              <p>Ans: The best performing currency among Forex Curriencies Heatmap Today is  {topStockCompanies?.slice(0, 1)}. </p>
              </>
            ),
          },
          {
            head: `Name the Top loser today among the Forex currencies Heatmap?`,
            content: (
              <>
              <p> Ans: The top loser today on the Forex currencies Heatmap is {topStockCompanies&&topStockCompanies[topStockCompanies?.length - 1]}.</p>
              </>
            ),
          },
          {
              head: `How many top gainers are currently displayed on the Forex Currencies Heatmap today?`,
              content: (
                <>
                <p>Ans: There are {topGainers?.length}  Top gainers today on the Forex Currencies Heatmap . </p>
                </>
              ),
            },
            {
                head: `How many top loserss are currently displayed on the Forex Currencies Heatmap today?`,
                content: (
                  <>
                  <p>Ans: The are {topLosers} Top losers today on the Forex Currencies Heatmap . </p>
                  </>
                ),
              },
              {
                  head: `Where can investors access Forex currencies heatmaps?  `,
                  content: (
                    <>
                    <p> Ans: You can access Forex currencies heatmaps on Trade Brains Portal.</p>
                    </>
                  ),
                },
      ];
      const faqAdr = [
        {
            head: `How many ADR stocks are there on Trade Brain Portal?`,
            content: (
              <>
              <p>Ans: There are 8 ADR stocks available on the Trade Brains Portal. </p>
              </>
            ),
          },
          {
            head: `Name the best performing currency among ADR Stock Heatmap Today?`,
            content: (
              <>
              <p>Ans: The best performing stock in the ADR Stocks Heatmap Today is {topStockCompanies?.slice(0, 1)}.</p>
              </>
            ),
          },
          {
            head: `Name the Top loser today among theADR stocks Heatmap?`,
            content: (
              <>
              <p>Ans: The top loser today on the ADR stocks Heatmap is {topStockCompanies&&topStockCompanies[topStockCompanies?.length - 1]}.</p>
              </>
            ),
          },
          {
            head: `How many top gainers are currently displayed on the ADR Stock Heatmap today?`,
            content: (
              <>
              <p>Ans: There are {topGainers?.length} Top gainers today on the ADR stocks Heatmap .</p>
              </>
            ),
          },
          {
            head: `How many top losers are currently displayed on the ADR stocks Heatmap today?`,
            content: (
              <>
              <p>Ans: There are {topLosers} Top losers today on theADR Stock Heatmap .</p>
              </>
            ),
          },
          {
            head: `Where can investors access ADR heatmap?`,
            content: (
              <>
              <p>Ans: You can access ADR stock heatmaps on Trade Brains Portal.</p>
              </>
            ),
          },
      ]
      const faqIpo =[
        {
          head: `Which is the best performing IPO shown in the IPO heatmap?`,
          content: (
            <p>Ans- {topIpos?.slice(0, 1)} is the best performing IPO in the IPO Heatmap.</p>
          ),
        },
        {
          head: `Which is the worst performing IPO shown in the IPO heatmap?`,
          content: (
            <p>Ans-{topIpos&&topIpos[topIpos?.length - 1]} is the worst performing IPO in the IPO Heatmap.</p>
          ),
        },
        {
          head: `How many IPOs are currently available in the IPO heatmap?`,
          content: (
            <p>Ans- There are {totalIpos?.length} IPOs in the IPO heatmap.</p>
          ),
        },
        {
          head: `What type of IPOs are available in IPO Heatmap?`,
          content: (
            <p>Ans- Both SME and regular IPOs are available in IPO Heatmap.</p>
          ),
        },
      ]
  return (
    <>
    {index_name === "global-stock-market" ? 
    <>
      <h2 className="fw-700 fs-28-18" style={{ opacity: "0.7" }}>
      What is a Global Stock Market Heatmap?
    </h2>
  <div style={{ opacity: "0.7" }}>
    <p>A Global Stock Market Heatmap is a visual representation of performance of major indices across the world on a colour-coded map. The heatmap uses colours to represent changes in stock prices, allowing investors to quickly identify trends, hotspots, and potential opportunities within the global market.</p>
    <p><b>Benefits for  Global Stock Market Heatmap : </b></p>
    <p>• Colors highlight stock price changes for effortless hotspot recognition.</p>
    <p>• Dynamic representation of market trends for staying informed.</p>
    <p>• Analyze global index performance for strategic decisions.</p>
    <p>• Visually assess market conditions for better risk management.</p>
    <p>• Gain a full global market overview, reducing the need for extensive data analysis.</p>
    <p>• Quickly identify market strength or weakness.</p>
    </div>
    </>
    : index_name === "forex" ?
    <>
     <h2 className="fw-700 fs-28-18" style={{opacity: "0.7" }}>
      What is Forex Heatmap?
    </h2>
  <div style={{opacity: "0.7" }}>
    <p>Forex Heatmap is a visual representation tool that provides an overview of the movement of major currencies in the world.   </p>
    <p><b>Benefits of Forex Heatmap: </b></p>
    <p>• Gain immediate insights into currency strength and weakness, aiding swift decision-making in the dynamic forex market.    </p>
    <p>• Easily identify trends through visual representations, enhancing your ability to recognize and capitalize on market trends. </p>
    <p>• Identify optimal entry and exit points swiftly, enhancing your ability to execute trades with precision and timeliness.</p>
    </div>
    </>
    : index_name === "adr-stocks" ?
    <>
    <h2 className="fw-700 fs-28-18" style={{ opacity: "0.7" }}>
    What is ADR Stock Heatmap?
    </h2>
<div style={{ opacity: "0.7" }}>
  <p>ADR Stock Heatmap is a visual tool offering a dynamic representation of American Depositary Receipt (ADR) stock performance, providing investors with valuable insights into global market movements.    </p>
  <p><b>Benefits of ADR Stock Heatmap : </b></p>
  <p>• Gain instant insights into ADR stock performance, staying ahead of market shifts for timely decision-making.</p>
  <p>• Formulate strategic investment plans by leveraging real-time data on ADR stocks, optimizing your portfolio for long-term success.</p>
  <p>• Identify optimal entry and exit points swiftly, enabling precise execution of trades based on real-time ADR stock data.</p>
  <p>• Elevate your trading precision with the clarity provided by the ADR Stock Heatmap, enhancing your ability to make accurate investment decisions.</p>
  </div>
  </>
  : 
  <>
  <h2 className="fw-700 fs-28-18" style={{ opacity: "0.7" }}>
  What is IPO Heatmap?
  </h2>
<div style={{ opacity: "0.7"}}>
  <p>An IPO Heatmap provides visual representation of the listed IPOs with their listing price and listing gain percentage. </p>
  <p><b>Benefits of IPO Heatmaps : </b></p>
  <p>IPO heatmap offers several benefits:</p>
  <p>• Visual Representation:</p>
  <p>IPO Heatmaps provide a visual snapshot of how the various IPOs is performing after getting listed.</p>
  <p>• Potential Investment Opportunities:</p>
  <p>Investors can use IPO Heatmaps to identify potential investment opportunities in the listed IPOs. </p>
  </div>
  </>
    }
  <section >
            <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity: "0.7" }}>
              FAQs
            </h2>
            <div className="w-100 mb-75">
              <FAQSection data={index_name === "global-stock-market" ?  faqGlobal :index_name === "forex" ? faqForex : index_name === "adr-stocks"? faqAdr : faqIpo} lightMode={lightMode} />
            </div>
          </section>
    </>
  );
}

export default Others;
