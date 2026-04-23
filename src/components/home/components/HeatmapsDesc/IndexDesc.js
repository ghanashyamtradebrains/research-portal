import { useSelector } from "react-redux";
import { getThemeMode } from "../../../../redux/reducers/ThemeSlice";
import FAQSection from "../FAQSection";

function IndexDesc({ topStockIndex, topGainers, heatmapData, fullNames }) {
  const { lightMode } = useSelector(getThemeMode);
  const topLosers = heatmapData?.results?.length - topGainers?.length;
  const faqIndex = [
    {
      head: `Which is the best performing stock shown in the ${fullNames} index heatmap?`,
      content: (
        <>
          <p>
            {" "}
            Ans-{" "}
            {heatmapData?.results?.length
              ? topStockIndex.slice(0, 1)
              : "None"}{" "}
            is the best performing stock in the {fullNames} index heatmap.
          </p>
        </>
      ),
    },
    {
      head: `Which is the worst performing stock shown in the ${fullNames} index heatmap?`,
      content: (
        <>
          <p>
            {" "}
            Ans- {topStockIndex && topStockIndex[topStockIndex?.length - 1]} is
            the worst performing stock in the {fullNames} index heatmap.
          </p>
        </>
      ),
    },
    {
      head: `How many stocks are currently available in the ${fullNames} index heatmap?`,
      content: (
        <>
          <p>
            Ans- There are {heatmapData?.results?.length} stocks in the{" "}
            {fullNames} index heatmap.{" "}
          </p>
        </>
      ),
    },
    {
      head: `How many Gainers are there in ${fullNames} index heatmap today?`,
      content: (
        <>
          <p>
            {" "}
            Ans: There are {topGainers?.length} Gainers in the {fullNames} index
            heatmap.
          </p>
        </>
      ),
    },
    {
      head: `How many Losers are there in ${fullNames} index heatmap today?`,
      content: (
        <>
          <p>
            Ans: There are {topLosers} Losers in {fullNames} index heatmap
            today.
          </p>
        </>
      ),
    },
  ];
  return (
    <>
      <section>
        <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity: "0.7" }}>
          FAQs
        </h2>
        <div className="w-100 mb-75">
          <FAQSection data={faqIndex} lightMode={lightMode} />
        </div>
      </section>
    </>
  );
}

export default IndexDesc;
