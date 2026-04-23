import { useRouter } from "next/router";
import MonthlyIndexHeatmap from "../../../pages/heatmaps/monthly-index/[index_name]";
import RedirectButton from "../../NewStockDetails/RedirectButton";

function NewIndexHeatmaps({ lightMode, index_name, names }) {
  const router = useRouter();
  return (
    <div className="w-100" id="Heatmaps">
      <div
        className=" d-flex justify-content-between align-items-center"
        style={{ marginBottom: "-50px" }}
      >
        <span
          onClick={() => router.push(`/heatmaps/monthly-index/${index_name}`)}
          className="hover-trasation  flex justify-content-center align-items-center mt-35 pt-5-5 br-5 px-5-0 fs-14-10 mb-20 pointer text-white"
        ></span>
      </div>
      <div
        className="index_key_container"
        style={{
          border: lightMode ? "1px solid #c9d7de" : "1px solid #5b5e6a",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-s-14 fw-600">Monthly Heatmap</div>
          <RedirectButton
            link={`/heatmaps/monthly-index/${index_name}`}
            text={" 10 Year Heatmap"}
          />
        </div>
        <MonthlyIndexHeatmap
          index_name={router?.query?.index_name ? index_name : "NIFTY"}
          stockDeatil={true}
          indexDeatil={true}
        />
      </div>
    </div>
  );
}

export default NewIndexHeatmaps;
