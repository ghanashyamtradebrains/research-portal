import Link from "next/link";
import React from "react";

function Featurecard({ lightMode, cardContent, svgSheet, mobile, web, link }) {
  return (
    <Link href={link} state={cardContent.redirectState}>
      <div
        className={`p-10 d-flex flex-col br-10 ${
          lightMode ? "bg-light-mode-grey" : "card-drop-dark-shadow-home-page"
        } ${mobile && `h-190px`} ${web && `h-150px`}`}
      >
        <span>{svgSheet}</span>
        <h3 className="fw-600 mb-10">{cardContent?.title}</h3>
        <p className="mb-0 fs-14-12 ">{cardContent?.desc}</p>
      </div>
    </Link>
  );
}

export default Featurecard;
