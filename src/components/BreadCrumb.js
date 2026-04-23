import React from "react";
import Link from "next/link";
function BreadCrumb({ linkData, current }) {
  return (
    <div className=" fs-s-12 d-flex light-grey-text">
      {linkData?.map((item, i) => (
        <div key={i}>
          <Link
            className="link-hover-underline"
            replace={true}
            href={item.link}
          >
            {item.label}
          </Link>
          &nbsp;<span>{">"}</span>&nbsp;
        </div>
      ))}
      <span>
        {"  "}
        {current}
      </span>
    </div>
  );
}

export default BreadCrumb;
