import FAQSection from "./FAQSection";

const OpenIpoDesc = ({lightMode}) => {
    const OpenIpofaq = [
        {
          head: `What is the difference between the open date and close date of an IPO?`,
          content: (
            <p>Ans: The open date is when investors can start placing orders for shares of the IPO, while the close date is when the subscription period ends, and the final allocation of shares is determined. </p> 
          ),
        },
        {
            head: `What is the minimum investment required for an IPO?`,
            content: (
              <p>Ans: The minimum investment varies depending on the company and the regulations of the market where the IPO is being offered. </p> 
            ),
          },
          {
            head:` What are the risks associated with investing in IPOs?`,
            content: (
              <p>Ans: Risks associated with investing in IPOs include market volatility, uncertainty about the company's future performance, lack of historical financial data, and potential for over valuation.</p> 
            ),
          },
          {
            head: `When do the current IPOs close for subscription?`,
            content: (
              <p>Ans: The subscription period for the current IPOs also varies. It's important for investors to note the closing date specified by each company.</p> 
            ),
          },{
            head: `Can I track the performance of the current IPO stocks after they go public?` ,
            content: (
              <p>Ans: Yes, you can track the performance of the current IPO stocks by monitoring their trading activity on stock exchanges and accessing financial news and analysis on Trade Brains Portal. </p> 
            ),
          },
          {
          head:` What are the steps involved in participating in the current IPOs?` ,
          content: (
            <p>Ans: The steps involved in participating in the current IPOs include opening a brokerage account, placing orders for shares during the subscription period, and completing any necessary documentation.</p> 
          ),
        },
        {
            head: `How can I assess the potential of the companies behind the current IPOs?` ,
            content: (
              <p>Ans: You can assess the potential of the companies behind the current IPOs by conducting research on their business models, financial performance, management team, and industry outlook. You can also go through thier IPO DRHP.</p> 
            ),
          },
          {
            head:` Where can I find detailed information about the current IPOs?`,
            content: (
              <p>Ans: Detailed information about the current IPOs, can be found on thr Trade Brains Portal.</p> 
            ),
          },

      ];
    return (
 <div>
    {/* Description */}
    <h2 className="fw-700 fs-28-18 mb-10" style={{ opacity: "0.7" }}>
    What is a Current IPO: 
    </h2>
  <div style={{ opacity: "0.7" }}>
    <p>A Current IPO, or Initial Public Offering, refers to the process through which a company offers its shares to the public for the first time, allowing individuals to become shareholders by purchasing these shares. It's a significant event in a company's lifecycle, marking its transition from a private to a public entity.</p>
    <p ><b>Benefits of Current IPO:</b>
    <p className="mt-10"><b>• Investment Opportunity: </b>Participating in a current IPO offers investors and traders the chance to invest in a company at its early stage, potentially gaining from its growth trajectory over time.</p>
    <p><b>• Potential for High Returns: </b>Investing in an IPO can provide the opportunity for substantial returns if the company performs well in the stock market post-listing.</p>
    <p><b>• Portfolio Diversification: </b>Including IPO investments in one's portfolio can diversify risk and potentially enhance overall portfolio performance.</p>
    <p><b>• Access to New Markets: </b>IPOs often represent companies in emerging sectors or industries, giving investors exposure to new and innovative opportunities.</p>
    <p><b>• Liquidity: </b> IPO shares become tradable on public stock exchanges after listing, providing liquidity and the ability to buy or sell shares easily.</p>
    <p><b> How Long Does a Current IPO Last:</b></p>
    <p>The duration of a current IPO can vary depending on factors such as market conditions and regulatory requirements. Typically, the IPO process includes a period of several weeks during which investors can subscribe to the offering. This period is known as the IPO subscription period. Once the subscription period ends, shares are allocated, and the company lists its shares on the stock exchange for public trading. Overall, from the initial announcement to the listing date, the entire IPO process may take several months.</p>
    </p>
     </div>

     {/* FAQs */}
     <section >
      <h2 className="fs-25-20 fw-700 mb-20 " style={{opacity:"0.7"}}>
      FAQs
      </h2>
      <div className="w-100 mb-75">
        <FAQSection data={OpenIpofaq} lightMode={lightMode} />
      </div>
    </section>
     </div>
)
};
export default OpenIpoDesc;