import React, { useEffect, useState } from "react";
import { getFormatDate } from "../../../../utilityFn/getFormatdate";
import { getNewsData } from "../../../../pages/api/fetchClient";

function GetNewscardIndex({ secondNews, lightMode, index, data }) {
  const [newsdata, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(33);
  const defaultImg =
    "https://tradebrains.in/features/wp-content/uploads/2022/07/Portal-Logo-Cover-Image.jpg";

  let category = "session";
  useEffect(() => {
    getNewsData(category, perPage, page).then((res) => {
      setNewsData(res?.data);
    });
  }, [category]);
  const convertTitleUnicode = newsdata?.title?.rendered
    ?.replaceAll("&#8217;", "‘")
    .replaceAll("#038;", "&")
    .replaceAll("&#8216;", "")
    .replaceAll(";", ",");
  return (
    <div className={` w-100 p-10`}>
      <a href={`/news/all-news/${data?.slug}`} target="_blank">
        <div className="new data d-flex ">
          {index && (
            <div className="image-div-stock-news">
              <img
                className="h-100 w-100"
                src={data?.image || defaultImg}
                alt="thumbnail"
              />
            </div>
          )}
          <div className="d-flex flex-col  ml-10 justify-content-between w-100">
            <div className="px-10px">
              <p className="fs-s-14">{data?.heading}</p>
            </div>
            <div className="d-flex mb-3">
              <p className="fs-s-12 m-0 brb-1 mr-2 px-10px ">{getFormatDate(data?.date)}</p>
              <p className="fs-s-12 m-0 px-10px">
                {data?.time}
              </p>
            </div>
          </div>
        </div>
      </a>
      {/* <hr className='mt-15 mb-15'/> */}
    </div>
  );
}

export default GetNewscardIndex;
