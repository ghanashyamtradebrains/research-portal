import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import svgSheet from "../assets/svg/svgSheet";
import stockIcon from "../assets/images/portalFavICon.png";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import numberWithCommas from "../utilityFn/numberWithCommas";
import Unknown from "../assets/images/socialmedia/Unkown.png";

function BucketCard({
  bucketname,
  stockNum,
  cardImg,
  description,
  clickFn,
  netWorth,
}) {
  const { lightMode } = useSelector(getThemeMode);
  const [srcImage, setsrcImage] = useState(cardImg);

  const investorName = bucketname === "Rakesh Jhunjhunwala And Associates"
  ? "Rakesh Jhunjhunwala Portfolio" : bucketname === "Vijay Kishanlal Kedia"
  ? "Vijay Kedia Portfolio"
  : bucketname + " " + "Portfolio" ;

  return (
    <div onClick={clickFn} className="w-100 pointer ">
      <div
        className={`table-shadow  px-25-10  d-flex-col mb-10 br-5 only-PC-view ${
          lightMode ? "bg-gray" : "bg-dark-gray"
        }`}
        style={{ paddingTop: "5px" }}
      >
        <div className="d-flex gap-15px">
          <div className="w-15p">
            <Image
              src={srcImage}
              // loader={(src) => srcImage}
              onError={(error) => {
                setsrcImage(Unknown);
              }}
              alt="thumbnail"
              className=" br-50 mr-20 bg-white mt-10"
              width={60}
              height={55}
              // style={{width:"60px" ,height:"55px"}}
            />
          </div>
          <div className="w-85">
            <p className="fs-24-16 fw-500 overFlow-text-one link-hover-underline my-5px">
              {investorName}
            </p>
            {/* <p className="fs-14-12  my-5px overFlow-text" style={{color: lightMode ? "black" : "#E6E6E6" , opacity:"0.7"}}>{description}</p> */}
            <div className="d-flex justify-content-between w-100-60 mt-20">
              <div className="flex-col justify-content-between">
                <p
                  style={{
                    color: lightMode ? "black" : "#E6E6E6",
                    opacity: "0.7",
                  }}
                  className="fs-14-12"
                >
                  Net Worth
                </p>
                <p className="fs-16-12 ff-lato fw-600">
                  ₹ {numberWithCommas(netWorth)} Cr
                </p>
              </div>
              <hr
                style={{
                  borderColor: "#E6E6E6",
                  opacity: "0.2",
                  height: "60px",
                }}
              />
              <div className="flex-col justify-content-start">
                <p
                  style={{
                    color: lightMode ? "black" : "#E6E6E6",
                    opacity: "0.7",
                  }}
                  className="fs-14-12"
                >
                  No. of Stocks
                </p>
                <p className="fs-16-12 ff-lato fw-600">{stockNum}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`table-shadow px-25-10  d-flex-col mb-10 br-5 only-mobile-view ${
          lightMode ? "bg-gray" : "bg-dark-gray"
        }`}
        style={{ paddingTop: "5px" }}
      >
        <div className="d-flex gap-15px">
          <div className="w-15p">
            <Image
              src={srcImage}
              onError={(error) => {
                setsrcImage(Unknown);
              }}
              alt="thumbnail"
              className="h-50px-25px w-50px-25px br-50 mr-20 bg-white mt-10"
              width={50}
              height={50}
              // style={{ opacity: isPremium ? 0.6 : 1 }}
            />
          </div>
          <div className="w-85">
            <p className="fs-24-16 fw-500 overFlow-text-one link-hover-underline my-5px">
            {investorName}
            </p>
            {/* <p className="fs-14-12  my-5px overFlow-text" style={{color: lightMode ? "black" : "#E6E6E6" , opacity:"0.7"}}>{description}</p> */}
            <div className="d-flex justify-content-between w-100-50 mt-20">
              <div className="flex-col justify-content-between">
                <p
                  style={{
                    color: lightMode ? "black" : "#E6E6E6",
                    opacity: "0.7",
                  }}
                  className="fs-14-12"
                >
                  Net Worth
                </p>
                <p className="fs-16-12 ff-lato">₹ {netWorth.toFixed(2)} Cr</p>
              </div>
              <hr
                style={{
                  borderColor: "#E6E6E6",
                  opacity: "0.2",
                  height: "60px",
                }}
              />
              <div
                className="flex-col justify-content-start"
                style={{ marginRight: "50px" }}
              >
                <p
                  style={{
                    color: lightMode ? "black" : "#E6E6E6",
                    opacity: "0.7",
                  }}
                  className="fs-14-12"
                >
                  No. of Stocks
                </p>
                <p className="fs-16-12 ff-lato">{stockNum}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BucketCard;
