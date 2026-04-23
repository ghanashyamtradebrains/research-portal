import FAQSection from "./FAQSection";

const PortfolioBacktestingDesc = ({lightMode}) => {
    const Portfaq = [
        {
          head: `What should I look for when portfolio backtesting?`,
          content: (
            <p>Ans: When testing the portfolio, make sure the data is accurate, have clear investment plans, compare your results to benchmarks, check for risks, consider costs, see how changes affect performance, confirm results, ensure consistency.</p> 
          ),
        },
        {
            head: `What are the important metrices in portfolio backtesting?`,
            content: (
              <p>Ans: The important metrices in portfolio backtesting are CACR, annual returns, monthly returns and portfolio growth.</p> 
            ),
          },
          {
            head: `Can I backtest multiple portfolios at once?`,
            content: (
              <p>Ans: Yes, you can backtest multiple portfolios at once on Trade Brains Portal. </p> 
            ),
          },
          {
            head: `Can backtesting be used for different types of investment strategies (e.g., long-term, short-term)?`,
            content: (
              <p>Ans: Yes, backtesting can be applied to a wide range of investment strategies, including both long-term and short-term approaches, depending on the investor's goals and preferences.</p> 
            ),
          },
          { 
            head: `What historical data is typically used for portfolio backtesting?`,
            content: (
              <p>Ans: Historical market data, including price, volume, and other relevant metrics, is used for portfolio backtesting. This data can span years or decades, depending on the desired analysis period.</p> 
            ),
          },
      ];
    return (
 <div>
    <p className="fw-700 fs-24-16" style={{ opacity: "0.7" }}>
    What is Portfolio Backtesting?
    </p>
  <div style={{ opacity: "0.7" }} className="mt-0">
    <p>Portfolio backtesting is the process of evaluating the performance of an investment strategy or portfolio using historical data. It involves applying predefined rules and parameters to past market data to simulate how the portfolio would have performed in the past.</p>
  <p className="fw-600 fs-16-14"><b>Benefits of Portfolio Backtesting</b></p>
    
    <p>Portfolio backtesting offers several benefits to investors:</p>
    <p><b>• Historical Performance Evaluation : </b> Backtesting allows investors to assess how a particular investment strategy or portfolio would have performed in the past using historical market data. This evaluation provides insights into the potential effectiveness of the strategy in different market conditions.</p>
    <p><b>• Risk Assessment : </b>By simulating portfolio performance over historical periods, investors can analyze the risk-return profile of their investment strategies. Backtesting helps identify potential risks and allows investors to adjust their portfolios accordingly to manage risk exposure.</p>
    <p><b>• Strategy Optimization : </b>Backtesting provides a platform for refining and optimizing investment strategies. Investors can test various combinations of assets, allocation weights, and rebalancing strategies to identify the most effective approach for achieving their investment goals.</p>
    <p><b>• Behavioral Insights : </b>Backtesting can reveal how different investment strategies would have performed during periods of market volatility or economic downturns. This insight helps investors better understand their own risk tolerance and behavior during turbulent market conditions.</p>
    <p><b>• Decision Making Support : </b>Backtesting results serve as valuable inputs for decision-making processes. Investors can use the insights gained from backtesting to make informed decisions about asset allocation, portfolio construction, and investment strategy adjustments.</p>
    <p><b>• Confidence Building : </b>Successful backtesting results can boost investor confidence in their chosen investment strategy. Seeing positive historical performance reinforces belief in the strategy's potential to deliver favorable results in the future.</p>
     </div>
      {/* FAQs */}
      <section >
      <h2 className="fs-25-20 fw-700 mb-20 mt-40 " style={{opacity:"0.7"}}>
      FAQs
      </h2>
      <div className="w-100 mb-75">
        <FAQSection data={Portfaq} lightMode={lightMode} />
      </div>
    </section>
     </div>
)
};
export default PortfolioBacktestingDesc;