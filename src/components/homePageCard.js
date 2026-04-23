import StockEndpoints from "../pages/api/endPoints";
import { CaretUpOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useGetFetch from "../hooks/useGetFetch";
import numberWithCommas from "../utilityFn/numberWithCommas";
import { redGreenColorPicker } from "../utilityFn/redGreenColor";
import PerformanceBarLine from "./PerformanceBarLine";
import { getGiftStockChange, getStockChange } from "../pages/api/fetchClient";
import useWindowWidth from "../utilityFn/getWindowWidth";
import Image from "next/image";
import neclogo from "../assets/images/IndexDetails/nselogo.png";
import bse from "../assets/images/IndexDetails/bse.png";
import styles from "./dashboard.module.css";

function HomePageIndexCard({ lightMode, index }) {
  // get losersgainers count in index list
  const windowWidth = useWindowWidth();
  const [erroredImages, setErroredImages] = useState({});

  const { isLoading, serverError, apiData } = useGetFetch(
    StockEndpoints.marketMovers(index === "GIFT-NIFTY" ? "NIFTY" : index)
  );
  const [stockChangeData, setstockChangeData] = useState({});
  const stockChange = async () => {
    await getStockChange(index).then((resp) => {
      setstockChangeData(resp?.data[0]);
    });
    index === "GIFT-NIFTY" &&
      (await getGiftStockChange("1D")
        .then(async (res) => {
          setstockChangeData(res?.data[0]);
        })
        .catch((err) => null));
  };
  useEffect(() => {
    stockChange();
  }, []);

//   if (isLoading) {
//   return (
//     <div className={styles.home_index_card_loading}>
//       <div className={styles.flex_container}>
//         <div className={styles.flex_item}>
//           <div className={styles.skeleton_circle}></div>
//           <div className={styles.skeleton_text}></div>
//         </div>

//         <div>
//           <div className={styles.skeleton_line}></div>
//           <div className={styles.skeleton_line_small}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

  return (
    <Link
      href="/index/[index_name]"
      as={`/index/${encodeURIComponent(index)}`}
      className={`${styles.home_index_card} ${styles.overflow_md_scroll_dash} ${
        lightMode
          ? styles.bg_light_mode_grey
          : styles.card_drop_dark_shadow_home_page
      }`}
    >
      <div className={styles.flex_container}>
        <div className={styles.flex_item}>
          <div>
            {" "}
            <Image
              src={index === "SENSEX" ? bse : neclogo}
              width={25}
              height={25}
              className={styles.image}
              alt="logo"
              priority
            />
          </div>
          <div >
            <span className={styles?.title}>{index}</span>
            <span>
              {" "}
              <CaretUpOutlined
                style={{
                  color: redGreenColorPicker(
                    stockChangeData?.change,
                    lightMode
                  ),
                }}
                rotate={stockChangeData?.change < 0 ? 180 : 0}
              />
            </span>
          </div>
        </div>

        <div>
          <p className={styles.description}>
            {numberWithCommas(stockChangeData?.close)}
          </p>
          <span
            className={`${styles.text}`}
            style={{
              color: redGreenColorPicker(stockChangeData?.change, lightMode),
            }}
          >
            {stockChangeData?.change?.toFixed(2)} (
            {Math.abs(stockChangeData?.percent?.toFixed(2))}%)
          </span>
        </div>
      </div>

      <div className="">
        <PerformanceBarLine
          lineHeight={"4px"}
          LoserCount={apiData?.losers_count}
          gainerCount={apiData?.gainers_count}
          totalCount={apiData?.total_count}
          homePage={true}
        />
      </div>
      {/* </div> */}
    </Link>
  );
}

export default HomePageIndexCard;
