import FAQSection from "./FAQSection";

const ClosedIpoDesc = ({lightMode}) => {
    const ClosedIpofaq = [
        { 
          head: `How does a Closed IPO differ from an Open IPO?`,
          content: (
            <p> Ans: A Closed IPO restricts subscriptions after a predetermined period, while an Open IPO allows ongoing subscriptions until a specified date. </p> 
          ),
        },
        {
            head: `Can investors still benefit from Closed IPOs?`,
            content: (
              <p> Ans: Once an IPO closes, investors can still benefit from price movements once the stock starts trading on the exchange. However, the market price post-IPO may differ from the IPO price.</p> 
            ),
          }, 
          {
            head: `What factors can impact the performance of closed IPOs?`,
            content: (
              <p>Ans: Factors that can impact the performance of stocks in closed IPOs include market conditions, investor sentiment, company fundamentals, industry trends, and overall economic outlook. </p> 
            ),
          },
      ];
    return (
 <div>
    <h2 className="fw-700 fs-28-18 mb-10" style={{ opacity: "0.7"}}>
    Closed IPO
    </h2>
  <div style={{ opacity: "0.7"}}>
    <p>A closed IPO refers to an initial public offering (IPO) where the subscription period has ended, and the allocation of shares has been finalized. Once the subscription period closes, investors can no longer subscribe to the IPO, and the shares are allotted to those who successfully applied for them. 
    </p>
     </div>
      {/* FAQs */}
      <section >
      <h2 className="fs-25-20 fw-700 mb-20 " style={{opacity:"0.7"}}>
      FAQs
      </h2>
      <div className="w-100 mb-75">
        <FAQSection data={ClosedIpofaq} lightMode={lightMode} />
      </div>
    </section>
     </div>
)
};
export default ClosedIpoDesc;