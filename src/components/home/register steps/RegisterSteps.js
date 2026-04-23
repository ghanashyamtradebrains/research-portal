import React from "react";
import svgSheet from "../../../assets/svg/svgSheet";
import svgSheet5 from "../../../assets/svg/svgSheet5";
import svgSheet6 from "../../../assets/svg/svgSheet6";

const steps = [
  {
    title: "Register Yourself",
    description:
      "To register, navigate to the login page, then click “Sign Up” or “Register.” After submitting your information, verify your email by clicking the link sent to you. Once verified, log in to the Portal.",
    icon: svgSheet5?.registerIcon,
    iconLight: svgSheet5?.registerIconLight,
  },
  {
    title: "Search for your favorite listed stock",
    description:
      "Use the search bar to search your favorite stocks according to Indices, Superstars, Buckets and many more features. ",
    icon: svgSheet5?.searchIconHome,
    iconLight: svgSheet5?.searchIconHomeLight,
  },
  {
    title: "Browse through data",
    description:
      "Browse through the easy-to-understand and visually appealing features to perform fundamental analysis of the stocks.",
    icon: svgSheet5?.browserIconHome,
    iconLight: svgSheet5?.browserIconHomeLight,
  },
];

function RegisterSteps({ lightMode }) {
  return (
    <div className={`p-50-0 mt-40 `}>
      <div
        className={`${
          lightMode
            ? "bg-light-mode-grey br-10"
            : "card-drop-dark-shadow-home-page"
        }`}
      >
        <div className="d-flex flex-col align-items-center">
          <h2 className="text-align-center fs-40-28 fw-700 mt-10">
            <span className="text-blue-grad">New to investing?</span> Kickstart
            your Fundamental analysis Journey Now!
          </h2>
          <p className="fs-20-16 fw-400 text-align-center mt-30">
            Don't know where to begin? Browse through Portal's
            easy-to-understand and illustrative interface to get a headstart on
            your investing journey.
          </p>
        </div>
        <div className="only-PC-view">
          <div className="d-flex justify-content-center align-items-center mt-20">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <p>{lightMode ? step?.iconLight : step.icon}</p>
                {index < steps.length - 1 && (
                  <p
                    style={{ marginBottom: index % 2 === 0 ? "90px" : "-50px" }}
                  >
                    {index % 2 === 0
                      ? svgSheet6?.curvedDottedTop
                      : svgSheet6?.curvedDottedBottom}
                  </p>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center text-align-center gap-30px"
              style={{ width: "1400px" }}
            >
              {steps.map((step, index) => (
                <div className="w-30" key={index}>
                  <p className="text-blue-grad fs-20-16 fw-600">{step.title}</p>
                  <p className="fs-16-12 fw-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="only-mobile-view">
          {steps.map((step, index) => (
            <div key={index} className="p-50-0">
              <p className="fs-25-20 text-blue-grad">Step {index + 1} :</p>
              <div className="d-flex justify-content-center align-items-center flex-col">
                <p>{lightMode ? step?.iconLight : step.icon}</p>
                <p className="fs-25-20 fw-600 text-blue-grad text-align-center">
                  {step.title}
                </p>
                <p className="fs-20-16 text-align-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RegisterSteps;
