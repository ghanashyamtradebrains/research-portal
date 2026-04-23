import Link from "next/link";
import React from "react";
import svgSheet from "../../../assets/svg/svgSheet";

function ToolCard({ lightMode,data }) {
  if(data.redirectState){
    return (
      <Link href={data.redirectLink} target={data.redirectState?"_self":'_blank'} state={data.redirectState}
      style={{ width: "47.5%" }}
      className={`p-10 w-50 ${
        lightMode ? "card-drop-light-shadow" : "card-drop-dark-shadow"
      }`}
    >
      <div>{data.icon}</div>
      <h5 className="fs-18-16 fw-500 mb-10">{data.head}</h5>
      <p  className="fs-14-12">
       {data.content}
      </p>
    </Link>
    )
  }
  return (
    <a href={data.redirectLink} target='_blank'
      style={{ width: "47.5%" }}
      className={`p-10 w-50 ${
        lightMode ? "card-drop-light-shadow" : "card-drop-dark-shadow"
      }`}
    >
      <div>{data.icon}</div>
      <h5 className="fs-18-16 fw-500 mb-10">{data.head}</h5>
      <p  className="fs-14-12">
       {data.content}
      </p>
      </a>
  );
}

export default ToolCard;
