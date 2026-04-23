import FAQSection from "./FAQSection";

const BestPerfIpo = ({lightMode} ) => {

    const BestPerfoIpofaq = [
        { 
            head: `What defines a "Best Performing" IPO?`,
            content: (
              <p> Ans: A Best Performing IPO demonstrates exceptional post-listing market performance, surpassing expectations.      </p> 
            ),
          },
          {
            head: `What factors contribute to the success of a best performing IPO?`,
            content: (
              <p>Ans: Factors contributing to the success of a best performing IPO include strong market demand for the company's products or services, effective marketing and investor relations strategies, and positive industry trends. </p> 
            ),
          },
    ]
    return (
 <div>
    <h2 className="fw-700 fs-28-18 mb-10" style={{ opacity: "0.7" }}>
    What is a Best Performing IPO?
    </h2>
  <div style={{ opacity: "0.7" }}>
    <p>A Best Performing IPO refers to an initial public offering that demonstrates exceptional post-listing market performance, often outpacing expectations and delivering substantial returns to investors.    </p>
  <p><b>Benefits of Investing in Best Performing IPOs  </b></p>
     <p>• Best Performing IPOs offer the potential for significant profit due to robust post-listing price appreciation. </p>
    <p>• Successful IPOs reflect market confidence, attracting positive sentiment from investors.  </p>
    <p>• Investing in top-performing IPOs can diversify and enhance investment portfolios.   </p>
    <p>• Successful IPOs often result in increased liquidity, making it easier for investors to buy and sell shares.                                                                                                           
</p>
    <p>• Strong post-listing performance attracts institutional investors, further boosting market credibility.     </p>
     <p>What Happens When Best Performing IPOs are Listed?<b></b></p>
     <p>Upon listing, Best Performing IPOs experience a surge in demand, leading to an initial price increase. Positive market sentiment and investor confidence contribute to a successful debut, often setting the tone for sustained growth.</p>
     </div>
     {/* FAQs */}
     <section className="mt-30">
      <h2 className="fs-25-20 fw-700 mb-0 " style={{opacity:"0.7"}}>
      FAQs
      </h2>
      <div className="w-100 mb-40">
        <FAQSection data={BestPerfoIpofaq} lightMode={lightMode} />
      </div>
    </section>
     </div>
)
};
export default BestPerfIpo;