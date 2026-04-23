import { useSelector } from "react-redux";
import FAQSection from "./FAQSection";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";

function IpoFaq() {
    const { lightMode } = useSelector(getThemeMode);
    const faqDataIpo = [
        {
          head: `How does an IPO work?`,
          content: (
            <p>
              Ans: During an IPO, the company hires investment banks to underwrite the offering, sets a price range for the shares, and then sells those shares to institutional and retail investors.
            </p>
          ),
        },
        {
          head: `Why do companies go public through an IPO?`,
          content: (
            <p>
             Ans: Companies go public through an IPO to raise capital for growth, expansion, debt reduction, or other corporate purposes. It also provides liquidity to existing shareholders and enhances the company's visibility and credibility. 
            </p>
          ),
        },
        {
          head: `What is the subscription period for an IPO?`,
          content: (
            <p>
              Ans:The subscription period, also known as the bidding period, is the time frame during which investors can submit their bids for shares in the IPO.
            </p>
          ),
        },
        {
          head: `What is the difference between IPO price and listing price?`,
          content: (
            <p>
              {" "}
              Ans: The IPO price is the price at which shares are offered to investors during the IPO, while the listing price is the price at which the shares start trading on the stock exchange after the IPO.
            </p>
          ),
        },
        {
            head: `What are the advantages of investing in IPOs?`,
            content: (
              <p>
                {" "}
                Ans: Advantages of investing in IPOs include the opportunity to invest in companies early in their growth trajectory, potential for price appreciation, diversification of portfolio, and participation in the stock market.
              </p>
            ),
          },
          {
            head: `What are the disadvantages of investing in IPOs?`,
            content: (
              <p>
                {" "}
                Ans: Disadvantages of investing in IPOs include the risks associated with investing in newly listed companies, lack of historical data, potential for price volatility, and uncertainty about future performance.
              </p>
            ),
          },
          {
            head: `What is an SME IPO ?`,
            content: (
              <p>Ans: An SME IPO is a specialized Initial Public Offering tailored for Small and Medium Enterprises (SMEs). These companies have smaller market capitalizations compared to larger corporations. SME IPOs provide SMEs with a platform to raise capital by offering shares to the public for the first time.
              </p>
            ),
          },
          {
            head: `What is the minimum investment required for SME type of IPO?   `,
            content: (
              <p>Ans: The minimum investment required in a SME type of IPO is around 1,00,000.
              </p>
            ),
          },
          {
            head: `What is an Mainline IPO?`,
            content: (
              <p>Ans: A mainline IPO refers to the initial public offering of a company listed on the primary stock exchange of a country, such as the BSE or NSE in India. This exchange typically has stricter listing requirements and is considered the primary venue for trading stocks. 
              </p>
            ),
          },
          {
            head: `What is the minimum investment required in a Mainline IPO?`,
            content: (
              <p>Ans: The minimum investment required in a normal IPO is around 10,000 to 15,000. </p>
            ),
          },
      ];
  return (
    <>
  <section >
            <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity: "0.7" }}>
              FAQs
            </h2>
            <div className="w-100 mb-75">
              <FAQSection data={faqDataIpo} lightMode={lightMode} />
            </div>
          </section>
    </>
  );
}

export default IpoFaq;
