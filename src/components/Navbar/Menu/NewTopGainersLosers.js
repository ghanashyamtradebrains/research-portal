import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getHighLowData,
} from "../../../pages/api/fetchClient";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";

export const NewTopGainLossMenu = ({
  mobile = false,
}) => {
  const { lightMode } = useSelector(getThemeMode);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(100);
  const [OtherList, setOtherList] = useState([]);
  const [OtherLowList, setOtherLowList] = useState([]);
  const sections = [
    { text: "Top Gainers", link: "/marketstats/gainers/NIFTY" },
    { text: "Top Losers", link: "/marketstats/losers/NIFTY" },
    { text: "52 Week High", link: "/marketstats/52week-high" },
    { text: "52 Week Low", link: "/marketstats/52week-low" },
    { text: "Trending Stocks", link: "/marketstats/trending-stocks" },
    // { text: "Market Prediction", link: "/marketstats/market-prediction" },
  ];
  useEffect(() => {
    const getHighLowDatas = async () => {
      await getHighLowData("high", input, page, perpage).then((res) => {
        setOtherList(res?.data?.count);
      });
      await getHighLowData("low", input, page, perpage)
        .then((res) => {
          setOtherLowList(res?.data?.count);
        })
        .catch((err) => {
          null;
        });
    };
    getHighLowDatas();
  }, []);

  return (
    <div
      className={` ff-poppins bt-navbar mt-4 ${
        mobile ? "" : "p-20 card-shadow-black"
      } br-t-b-l-r d-flex gap-15px ${
        lightMode
          ? "bg-white text-black"
          : `${mobile ? "text-white" : "bg-dark-black text-white"}`
      }`}>
      <div className=" w-100">
        <div className="d-flex-col gap-10px mt-10">
          {sections.map((section, index) => (
            <div key={index}>
              <span>
                <a href={section.link} className="fw-500">
                  {section.text}{" "}
                  <span className="text-btn-dark fw-600">{">"}</span>
                </a>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};