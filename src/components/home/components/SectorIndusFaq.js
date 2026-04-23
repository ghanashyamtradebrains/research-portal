import React from "react";
import FAQSection from "./FAQSection";
function SectorIndusFaq({ lightMode,industry,sector,titleSector,topCompanies,topRoeCompanies,topPeCompanies,sectorStocks }) {

    const faqDataSector = [
    {
      head: `Which are the Top 3 stocks in ${titleSector} sector according to the market cap?`,
      content: (
        <p>
          The current top 3 stocks in {titleSector} sector based on market capitalization are{" "}
          {topCompanies?.length > 0
            ? topCompanies?.slice(0, 3)?.join(", ")
            : "none"}
          .
        </p>
      ),
    },
    {
      head: ` How many stocks are in ${titleSector} sector?`,
      content: (
        <p>
          There are{" "}
          {sectorStocks?.results?.length > 0
            ? sectorStocks?.results?.length
            : 0}{" "}
          stocks in {titleSector} sector.
        </p>
      ),
    },
    {
      head: `Which are the top 3 stocks in  ${titleSector} sector having ROE above 20%?`,
      content: (
        <p>
           The top 3 stocks in {titleSector} sector based on ROE above 20% are{" "}
          {topRoeCompanies?.length > 0
            ? topRoeCompanies?.slice(0, 3)?.join(", ")
            : "none"}
          .
        </p>
      ),
    },
    {
      head: `Which are the top 3 stocks according to the CMP (Current Market Price) in  ${titleSector} Sector?`,
      content: (
        <p>
           The top 3 stocks in  {titleSector}sector based on CMP are {" "}
          {topCompanies?.length > 0
            ? topCompanies?.slice(0, 3)?.join(", ")
            : "none"}
          .
        </p>
      ),
    },
  ];
  const faqDataIndustry = [
    {
      head: `Which are the 3 Top stocks in ${sector} industry according to the market cap?      `,
      content: (
        <p>
          The current top 3 stocks in {sector} industry based on market capitalization are {" "}
          {topCompanies?.length > 0
            ? topCompanies?.slice(0, 3)?.join(", ")
            : "none"}
          .
        </p>
      ),
    },
    {
      head: ` How many stocks are in ${sector} industry ?`,
      content: (
        <p>
          There are  {sectorStocks?.results?.length > 0
            ? sectorStocks?.results?.length
            : 0} stocks in the {" "}{sector} industry.
         {" "}
        </p>
      ),
    },
    {
      head: `Which are the top 3 stocks in ${sector} industry having ROE more than 20%`,
      content: (
        <p>
          The current top 3 stocks in {sector} industry based on ROE more than 20% are{" "}
          {topRoeCompanies?.length > 0
            ? topRoeCompanies?.slice(0, 3)?.join(", ")
            : "none"}
          .
        </p>
      ),
    },
    {
      head: `Which are the top 3 stocks according to the Current Market Price (CMP) in ${sector} industry ?`,
      content: (
        <p>
          The current top 3 stocks in {sector} industry based on CMP are {" "}
          {topCompanies?.length > 0
            ? topCompanies?.slice(0, 3)?.join(", ")
            : "none"}
          .
        </p>
      ),
    },
  ];
  return (
      <section>
          <h2 className="fs-25-20 fw-700 mb-20 text-md-center " style={{opacity:"0.7"}}>
            FAQs
          </h2>
      <div className="w-100">
        <FAQSection data={industry ? faqDataIndustry: faqDataSector} lightMode={lightMode} />
      </div>
    </section>
  );
}
export default SectorIndusFaq;
