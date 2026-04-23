import { useSelector } from "react-redux";
import useWindowWidth from "../../../utilityFn/getWindowWidth";
import { authStore } from "../../../redux/reducers/authSlice";
import CustomTable from "../../CustomTable";
import Link from "next/link";

function IndexGainLoss({
  lightMode,
  columns,
  adjustedGainers,
  adjustedLosers,
  isLoading,
  index_name,
}) {
  const windowWidth = useWindowWidth();
  const UserAuth = useSelector(authStore);

  return (
    <>
      <div className={`w-49-100 `}>
        <div className="d-flex justify-content-between align-items-center">
          <h2
            className={`fs-s-14 fw-600 mb-10 ${
              windowWidth < 500 ? "mt-20" : ""
            }`}
          >
            Top Gainers
          </h2>

          <Link
            href={`/marketstats/gainers/${index_name}`}
            className="underline mb-10"
            target="_blank"
          >
            View All
          </Link>
        </div>

        <div
          style={{
            borderTop: lightMode ? "1px solid #c9d7de" : "1px solid #545E78",
            borderLeft: lightMode ? "1px solid #c9d7de" : "1px solid #545E78",
            borderRight: lightMode ? "1px solid #c9d7de" : "1px solid #545E78",
            borderRadius: "8px",
          }}
          className={`performance-table w-100  ${
            lightMode
              ? "custom-antd-head-light indexTableLight"
              : "custom-antd-head-dark indexTable"
          }`}
        >
          <CustomTable
            columns={columns}
            data={adjustedGainers}
            scrollable={true}
            scrollLimit={100}
            loading={isLoading}
          />
        </div>
      </div>
      <div className={`w-49-100`}>
        <div className="d-flex justify-content-between align-items-center">
          <h2
            className={`fs-s-14 fw-600 mb-10 ${
              windowWidth < 500 ? "mt-20" : ""
            }`}
          >
            Top Losers
          </h2>
          <Link
            href={`/marketstats/losers/${index_name}`}
            className="underline mb-10"
            target="_blank"
          >
            View All
          </Link>
        </div>
        <div
          style={{
            borderTop: lightMode ? "1px solid #c9d7de" : "1px solid #545E78",
            borderLeft: lightMode ? "1px solid #c9d7de" : "1px solid #545E78",
            borderRight: lightMode ? "1px solid #c9d7de" : "1px solid #545E78",
            borderRadius: "8px",
          }}
          className={`performance-table w-100  ${
            lightMode
              ? "custom-antd-head-light indexTableLight"
              : "custom-antd-head-dark indexTable"
          }`}
        >
          <CustomTable
            columns={columns}
            data={adjustedLosers}
            scrollable={true}
            scrollLimit={100}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default IndexGainLoss;
