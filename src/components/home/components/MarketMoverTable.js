import React, { useEffect, useState } from "react";
import { redGreenColorPicker } from "../../../utilityFn/redGreenColor";
import { CaretUpOutlined } from "@ant-design/icons";
import Image from "next/image";
import numberWithCommas from "../../../utilityFn/numberWithCommas";
import stockIcon from "../../../assets/images/portalFavICon.png";
import { useRouter } from "next/router";
function MarketMoverTable({
  lightMode,
  tableData,
  tableHead,
  link,
  isLoading,
}) {
  const router = useRouter();
  const [srcImage, setsrcImage] = useState();
  return (
    <div style={{ minWidth: "300px", width: "100%" }}>
      {tableData?.map((item) => {
        return (
          <div
            className={`d-flex justify-content-between pointer w-100 p-10 br-10 mb-10 ${
              lightMode
                ? "bg-light-mode-grey"
                : "card-drop-dark-shadow-home-page"
            }`}
            onClick={() => router.push(`/stocks/${item?.symbol}`)}
          >
            <div className="d-flex  align-items-center w-60">
              <Image
                src={`https://tradebrains-portal-s3.s3.ap-south-1.amazonaws.com/NIFTY50/${item?.symbol}.png`}
                onError={(error) => {
                  setsrcImage(stockIcon);
                }}
                width={35}
                height={35}
                className=" br-50 mr-10 bg-white"
                alt="logo"
              />
              <span className="overFlow-text-one" title={item?.comp_name}>
                {item?.comp_name}
              </span>
              <span className="ml-5">
                {" "}
                <CaretUpOutlined
                  style={{
                    color: redGreenColorPicker(item?.change, lightMode),
                    // marginLeft: "5px",
                  }}
                  rotate={item?.change < 0 ? 180 : 0}
                />
              </span>
            </div>
            <div className="w-40">
              <p
                className={`mb-0 d-flex justify-content-end fs-16-12 fw-500 fw-600 ff-lato`}
              >
                ₹ {numberWithCommas(item?.close)}
              </p>
              <span
                className={` fw-500 fs-12 d-flex justify-content-end`}
                style={{
                  color: redGreenColorPicker(item?.change, lightMode),
                }}
              >
                {item?.change?.toFixed(2)} (
                {Math.abs(item?.percent?.toFixed(2))}
                %)
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MarketMoverTable;
