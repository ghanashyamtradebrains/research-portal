import FAQSection from "./FAQSection";

const NewlyIpoDesc = ({lightMode}) => {
    const NewlyIpofaq = [
        { 
            head: `How does the listing process affect the price of Newly Listed IPOs?`,
            content: (
              <p>Ans: The listing process can influence price dynamics, with market demand and investor sentiment playing significant roles. </p> 
            ),
          },
          {
            head: `Can individual investors participate in Newly Listed IPOs?`,
            content: (
              <p>Ans: Yes, individual investors can participate through brokerage platforms offering IPO subscriptions. </p> 
            ),
          },
          {
            head: `Are there risks associated with investing in Newly Listed IPOs?`,
            content: (
              <p>Ans: Risks include market volatility, initial price fluctuations, and the uncertainty of a company's. </p> 
            ),
          },
          {
            head: `What is the lock-up period for shares in newly listed IPOs?`,
            content: (
              <p> Ans: The lock-up period for shares in newly listed IPOs generally ranges from 90 to 180 days. This period restricts insiders and specific institutional investors from selling their shares immediately after the IPO, aiming to stabilize the stock price during its initial trading phase.</p> 
            ),
          },
          {
            head: `How does a company benefit from a newly listed IPO?`,
            content: (
              <p>Ans: A newly listed IPO provides a company with access to capital, increased visibility, liquidity for existing shareholders, and opportunities for growth and expansion. </p> 
            ),
          },
    ]
    return (
 <div>
    <p className="fw-700 fs-28-18" style={{ opacity: "0.7" }}>
    Newly Listed IPOs:
    </p>
  <div style={{ opacity: "0.7" }}>
    <p>Newly Listed IPOs represent companies making their debut on the stock exchange. The significance lies in the opportunity for investors to participate in the early stages of promising ventures, contributing to market dynamism.  </p>
  <p><b>Benefits of Newly Listed IPOs    </b></p>
     <p>• The listing of an IPO enhances liquidity, providing investors with the ability to buy and sell shares more readily on the open market, contributing to a more dynamic trading environment.   </p>
     <p>• Newly Listed IPOs present opportunities for portfolio diversification, allowing investors to spread risk across different asset classes and industries.   </p>
     <p>• The first day of trading for a Newly Listed IPO is marked by market dynamics, with prices often experiencing fluctuations as supply and demand  find equilibrium.     </p>
     <p><b>Newly listed IPOs play a significant role in the stock market ecosystem:</b></p>
     <p><b>• Market Sentiment: </b></p>
     <p>The performance of newly listed IPOs can influence overall market sentiment and investor confidence. Successful IPOs with strong debuts may signal optimism in the market, while poor-performing IPOs could raise concerns about market conditions.</p>
     <p><b>• Investor Participation:</b></p>
     <p>Newly listed IPOs attract investor interest and participation, as investors seek opportunities to invest in promising companies early in their growth trajectory. The IPO market provides avenues for both retail and institutional investors to participate in the capital markets.</p>
     <p><b>• Secondary Market Trading:</b></p>
     <p>Once listed on a stock exchange, shares from newly listed IPOs become available for trading on the secondary market. This trading activity contributes to market liquidity and price discovery, as investors buy and sell shares based on market demand and supply.    </p>
     </div>
     {/* FAQs */}
     <section className="mt-30">
      <h2 className="fs-25-20 fw-700 mb-20 " style={{opacity:"0.7"}}>
      FAQs
      </h2>
      <div className="w-100 mb-40">
        <FAQSection data={NewlyIpofaq} lightMode={lightMode} />
      </div>
    </section>
     </div>
)
};
export default NewlyIpoDesc;