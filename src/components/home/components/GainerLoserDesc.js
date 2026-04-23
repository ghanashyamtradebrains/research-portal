import React from "react";
import FAQSection from "./FAQSection";

function GainerLoserDesc({ lightMode,gainersData ,activeIndex ,indexData}) {
         const sortedGainers = indexData?.results?.sort((a, b) => b.change - a.change);
   const topStockCompanies = sortedGainers
     ?.map((stock) => stock.comp_name)
     .sort((a, b) => b.change - a.change);
   const topCmpCompanies = sortedGainers
     ?.map((stock) => stock.comp_name)
     .sort((a, b) => b.close - a.close);
  const faqGainerData = [
    {
      head:`Who is the top gainer today in ${activeIndex.label} index?`,
      content: (
        <p>
        Ans: The top gainer today in {activeIndex.label} is{" "}
        {topStockCompanies?.slice(0,1)}
      </p>
      ),
    },
    {
      head: `How many top gainers are there in ${activeIndex.label} index?`,
      content: (
        <p>
          Ans: There are {sortedGainers?.length} top gainers in{" "}
          {activeIndex.label}
        </p>
      ),
    },
    {
      head: `Who are the top 3 gainers today in ${activeIndex.label} index, and what is their percentage change?`,
      content: (
        <p>{`Ans: The top 3 gainers today in ${activeIndex.label} index are ${topStockCompanies?.slice(0,3)?.join(', ')} respectively.`}</p>
      ),
    },
    {
      head: `What are the top 3 stocks according to the CMP (Current Market Price) in ${activeIndex.label} index?`,
      content: (
        <p>Ans: The current top 3 stocks in {activeIndex.label} index based on CMP are {topCmpCompanies?.slice(0,3)?.join(', ')}. </p> 
      ),
    },
  ];
  const faqLoserData =[
    {
      head: `Who is the top loser today in  ${activeIndex.label} index?`,
      content: (
        <p>
        Ans: The top loser today in {activeIndex.label} is{" "}
        {topStockCompanies?.slice(0,1)}
      </p>
      ),
    },
    {
      head: `How many top losers are there in ${activeIndex.label} index?`,
      content: (
        <p>
        Ans: There are {sortedGainers?.length} top gainers in{" "}
        {activeIndex.label}
      </p>
      ),
    },
    {
      head: `Who are the top 3 losers today in  ${activeIndex.label} index, and what is their percentage change?`,
      content: (
        <p>{`Ans:The top 3 losers today in ${activeIndex.label} index are ${topStockCompanies?.slice(0,3)?.join(', ')} respectively.`}</p>
      ),
    },
    {
      head: `What are the top 3 losers today according to the CMP (Current Market Price) in ${activeIndex.label} index?`,
      content: (
        <p>Ans: The current top 3 stocks in {activeIndex.label} index based on CMP are {topCmpCompanies?.slice(0,3)?.join(', ')}. </p> 
      ),
    },
  ]
  return (
      <section className={`max-w mt-20`}>
      <h2 className="fs-25-20 fw-700 mb-10 text-md-center " style={{opacity:"0.7"}}>
      FAQs
      </h2>
      <div className="w-100 mb-75">
        <FAQSection data={gainersData ?faqGainerData:faqLoserData} lightMode={lightMode} />
      </div>
    </section>
  );
}

export default GainerLoserDesc;
