import React from "react";
import { useSelector } from "react-redux";
function AboutSection({ isHTML, data, lightMode, indexReturn }) {
  return (
    <>
      {data?.map((aboutdata, index) => (
        <div
          key={index}
          className={`mt-20 ${indexReturn ? "mb-20" : "mb-40"} ${
            lightMode ? "text-black" : "text-white"
          }`}
          style={{ opacity: "0.7" }}
        >
          {isHTML ? (
            <div
              dangerouslySetInnerHTML={{
                __html: aboutdata.content,
              }}
            ></div>
          ) : (
            <p>{aboutdata.content} </p>
          )}
        </div>
      ))}
    </>
  );
}

export default AboutSection;
