import { useSelector } from "react-redux";
import FAQSection from "./FAQSection";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";

function SuperstarFaq({
  investorName,
  superstarName,
  worth,
  holding,
  topStocks,
}) {
  const { lightMode } = useSelector(getThemeMode);
  const faqSuperstarName = [
    {
      head: `What is the current net worth of ${investorName}?`,
      content: ` Ans- The current net worth of ${investorName} is over Rs ${worth}.`,
    },
    {
      head: ` How many stocks are there in ${investorName}?`,
      content: `
           Ans- The number of stocks present in ${investorName} portfolio are ${holding}.
          `,
    },
    {
      head: `What are the top holdings in the ${investorName} portfolio?`,
      content: `Ans- The top holdings in the ${investorName} portfolio are ${topStocks}`,
    },
    // {
    //   head: `In which sector does ${investorName} have a significant investment?  `,
    //   content: (
    //     ` Ans-${investorName} has significant investment in [sector_name]`
    //   ),
    // },
  ];
  const faqDataSuperstar = [
    {
      head: `What is a Superstar Portfolio?`,
      content: (
        <p>
          Superstar Portfolio provides collection of investments of large and
          well-known investors.
        </p>
      ),
    },
    {
      head: `How can a Superstar Portfolio benefit investors?`,
      content: (
        <p>
          Superstar Portfolio can provide valuable insights into successful
          investment strategies of top investors and offer potential
          opportunities for investors to replicate or learn from.{" "}
        </p>
      ),
    },
    {
      head: `How often are Superstar Portfolios updated?`,
      content: (
        <p>
          Superstar Portfolios undergo quarterly updates, showcasing the
          adjustments made by investors to their stock holdings, whether they
          have increased or decreased their stakes.
        </p>
      ),
    },
    {
      head: `What types of investors might find Superstar Portfolio most suitable?`,
      content: (
        <p>
          {" "}
          Investors looking to learn from successful investment strategies of
          top investors may find Superstar Portfolio most suitable.
        </p>
      ),
    },
  ];
  return (
    <>
      <section>
        <h2
          className="fs-16-14 fw-700 mb-20 text-md-center "
          style={{ opacity: "0.7" }}
        >
          FAQs
        </h2>
        <div className="w-100 mb-20">
          <FAQSection
            data={superstarName ? faqSuperstarName : faqDataSuperstar}
            lightMode={lightMode}
          />
        </div>
      </section>
    </>
  );
}

export default SuperstarFaq;
