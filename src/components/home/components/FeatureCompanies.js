import { Carousel } from "antd";
import Image from "next/image";
import React from "react";
import { lightModeImgs, darkModeImgs,redirectURLs } from "./featureList";

function FeatureCompanies({ lightMode }) {
  const cardProps = {
    dots: false,
    infinite: true,
    autoplaySpeed: 200,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400, // laptop breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 768, // tablet breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 450, // mobile breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  };
  
  return (
    <section className="my-100">
      <div className="max-w mx-auto px-15  d-flex flex-col align-items-center">
        <h1 className="fs-40-32 fw-700 lh-40">Featured in</h1>
        <div style={{ width: "90%", margin: "auto" }} className="my-30">
          <div className={`slider`}>
            <div className="slide-track">
              {lightMode
                ? lightModeImgs?.map((item, i) => (
                    <a key={i} href={redirectURLs[i]} target="_blank" className="slide">
                      <Image
                        src={item}
                        alt="logo"
                      />
                    </a>
                  ))
                : darkModeImgs?.map((item, i) => (
                  <a key={i} href={redirectURLs[i]} target="_blank" className="slide">
                      <Image
                        src={item}
                        alt="logo"
                      />
                    </a>
                  ))}
            </div>
          </div>
          {/* <Carousel  autoplay effect="scrollx" {...cardProps}>
            {
              featuredLsit?.map((item,i)=>(
                <div>
                <img
                style={{filter:lightMode?'none':'invert(1)'}}
                src={item.image}
                alt="logo"
              />
              </div>
              ))
            }
          </Carousel> */}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default FeatureCompanies;
