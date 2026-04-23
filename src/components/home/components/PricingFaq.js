import React from "react";
import FAQSection from "./FAQSection";
function PricingFaq({ lightMode, reportPlan }) {
  const faqData = [
    {
      head: "Is Trade Brains Portal Free?",
      content:
        " Ans- Yes, Trade Brains provides complete fundamental analysis data to its users for free to do complete analysis of the stock market. However, it also provides some exclusive features for its premium users.",
    },
    {
      head: "What are the different portal plans available?",
      content:
        "Ans- Trade Brains Portal offers Bulls, Whales, and Unlimited plans, each with different subscription pricing and durations.",
    },
    {
      head: "What is the difference between Bulls, Whales and Unlimited Plan?",
      content:
        "Ans- The Bulls plan is for 1 month, the Whales Plan is for 12 months and the Unlimited plan is for 36 months. ",
    },
    {
      head: "How can I get Premium Plan?",
      content:
        "Ans- To get the Premium plan, choose one of the options available on our pricing page and complete the payment for that plan. Once your payment is successfully processed, you will gain access to the premium features.",
    },
    {
      head: "How can I make the payment?",
      content:
        "Ans- To make a payment for a Premium plan, you first need to sign up or log in using your email. After that, you can purchase any of the premium plans by completing the payment.",
    },
    {
      head: "Are the premium plans available on the Trade Brains Portal App?",
      content:
        "Ans- Yes, you can get the premium plans on Trade Brains Portal Android and iOS apps.",
    },
    {
      head: "What will I get after getting the Premium Plan?",
      content:
        "Ans- After subscription to any of our premium plans, you will get access to exclusive features offered by our Trade Brains Portal like Buckets, Portfolio Analysis, Advanced Stock Screener, Multiple Stock Comparision and many more.",
    },
    {
      head: "Can I change the plan?",
      content:
        "Ans- Yes, you can upgrade the plan and when you upgrade the plan additional subscription period will be added to your profile with premium features.",
    },
    {
      head: "Can I cancel my subscription?",
      content:
        "Ans- You have the option to cancel your subscription at any time. However, please note that no refunds will be issued for any remaining duration of your subscription after cancellation.",
    },
    {
      head: "What kind of payment methods are available?",
      content:
        " Ans- You can make the payment using credit card, debit card, net banking, upi, Pay Later and even EMIs. All the payments are totally secured and you'll get a payment invoice after completing the payment on your registered email.",
    },
    {
      head: "Can I get a refund?",
      content:
        "Ans- All subscription payments made to Trade Brains Portal are non-refundable. Once a payment is processed, it is considered final, and no refunds will be provided. Check the payment plans carefully before subscribing to any of the premium plans.",
    },
  ];
  const researchFaqData = [
    {
      head: "What are Research Reports available on the Trade Brains Portal? ",
      content:
        "Ans- Stock research reports are detailed documents prepared by analysts that provide insights and evaluations of publicly traded companies. These reports typically include information on a company's financial health, market performance, competitive positioning, and future prospects. They often contain financial statements, earnings projections, risk assessments, and recommendations for investors, such as whether to buy, hold, or sell a particular stock.",
    },
    {
      head: "Are the Research reports on Trade Brains Portal free?",
      content:
        "Ans- The Research Reports on Trade Brains Portal are available with the Eagles+, Whales+, and Sharks+ pricing plans.",
    },
    {
      head: "What are the different portal plans available?",
      content:
        "Ans- Trade Brains Portal offers Eagles+, Whales+, and Unlimited plans+, each with different subscription pricing and durations.",
    },
    {
      head: "What is the difference between Bulls, Whales and Unlimited Plan?",
      content:
        "Ans- The Bulls plan is for 1 month, the Whales Plan is for 12 months and the Unlimited plan is for 36 months. ",
    },
    {
      head: "How can I make the payment?",
      content:
        "Ans- To make a payment for a Premium plan with Research Reports, you first need to sign up or log in using your email. After that, you can purchase any of the premium plans by completing the payment.",
    },
    {
      head: "Are the premium plans with Research Reports available on the Trade Brains Portal App?",
      content:
        "Ans- Yes, you can get the premium plans with Research Reports on Trade Brains Portal Android and iOS apps.",
    },
    {
      head: "What will I get after getting the Premium Plan with Research Reports?",
      content:
        "Ans- After subscription to any of our premium plans with research reports, you will get access to exclusive features offered by our Trade Brains Portal like Buckets, Portfolio Analysis, Advanced Stock Screener, Multiple Stock Comparision and many more wth the research reports by our Financial Analysts. ",
    },
    {
      head: "Can I change the plan?",
      content:
        "Ans- Yes, you can upgrade the plan and when you upgrade the plan additional subscription period will be added to your profile with premium features.",
    },
    {
      head: "Can I cancel my subscription?",
      content:
        "Ans- You have the option to cancel your subscription at any time. However, please note that no refunds will be issued for any remaining duration of your subscription after cancellation.",
    },
    {
      head: "What kind of payment methods are available?",
      content:
        "Ans- You can make the payment using credit card, debit card, net banking, upi, Pay Later and even EMIs. All the payments are totally secured and you'll get a payment invoice after completing the payment on your registered email.",
    },
    {
      head: "Can I get a refund?",
      content:
        "Ans- All subscription payments made to Trade Brains Portal are non-refundable. Once a payment is processed, it is considered final, and no refunds will be provided. Check the payment plans carefully before subscribing to any of the premium plans.",
    },
  ];

  return (
    <section className={`max-w mx-auto px-15 w-100`}>
      <div className="w-100 mb-75">
        <FAQSection data={researchFaqData} lightMode={lightMode} />
      </div>
    </section>
  );
}

export default PricingFaq;
