// import { Collapse } from "antd";
// import React from "react";

// function FAQSection({ data, lightMode, isHTML }) {
//   const { Panel } = Collapse;

//   return (
//     <Collapse
//       accordion
//       style={{ background: lightMode ? "#fff" : "#292E3F" }}
//       bordered={false}
//       expandIconPosition="end"
//     >
//       {data?.map((faq, i) => (
//         <Panel
//           key={`${i}`}
//           className={`fs-16-14 mt-20 collapse-borderless ${
//             lightMode ? "card-drop-light-shadow" : "card-drop-dark-shadow"
//           }`}
//           style={{
//             color: lightMode ? "black" : "white",
//             // background: lightMode ? "#F2F6F8" : "#3B3F4F",
//             borderRadius: "5px",
//           }}
//           header={
//             <p
//               className={`fw-500 fs-18-16 mb-0 ${
//                 lightMode ? "text-black " : "text-white"
//               }`}
//             >
//               {faq.head}
//             </p>
//           }
//         >
//           {isHTML ? (
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: faq.content,
//               }}
//             ></div>
//           ) : (
//             faq.content
//           )}
//         </Panel>
//       ))}
//     </Collapse>
//   );
// }

// export default FAQSection;
import React from "react";

function FAQSection({ data, lightMode, isHTML }) {
  return (
    <>
      {data?.map((faq, i) => (
        <div
          key={`${i}`}
          className={`mt-20 ${lightMode ? "text-black" : "text-white"}`}
        >
          <h3 className=" mb-5 fw-500" style={{  opacity: "0.5"}}>{faq.head}</h3>

          {isHTML ? (
            <div
              dangerouslySetInnerHTML={{
                __html: faq.content,
              }}
              style={{  opacity: "0.5"}}
            ></div>
          ) : (
            <p style={{  opacity: "0.5"}}>{faq.content}</p>
          )}
        </div>
      ))}
    </>
  );
}

export default FAQSection;
