import React from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import { corporateActionFaqData } from "../../CorporateActions/CorporateActionsData";
import { useRouter } from "next/router";
function Faq({ isHTML }) {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();
  let keyword =
    router.query.corp_cat === "AGM-EGM"
      ? router.query.corp_cat?.replace("-", "/")
      : router.query.corp_cat?.replace("-", " ");
  return (
    <>
      <h2 className="main-header" style={{ opacity: "0.7" }} >FAQs</h2>
      {corporateActionFaqData[keyword]?.map((faq, index) => (
        <div
          key={index}
          className={`mt-10 ${lightMode ? "text-black" : "text-white"}`}
        >
        <p className="mb-10 fs-16-14 fw-600"  style={{ opacity: "0.7" }}>{faq.question}</p>
          {isHTML ? (
            <div
              dangerouslySetInnerHTML={{
                __html: faq.answer,
              }}
              style={{ opacity: "0.7" }}
            ></div>
          ) : (
            <p style={{ opacity: "0.7" }}>{faq.answer} </p>
          )}
        </div>
      ))}
    </>
  );
}

export default Faq;
