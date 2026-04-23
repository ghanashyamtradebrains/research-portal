import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import PortSvgLogo from "../../assets/svg/svgSheet2";
import { postEmailActivation } from "../../api/fetchClient";
import DotLoader from "../../components/spinners/DotLoader";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";

function AccountActive({ setisLoginPage }) {
  const { lightMode } = useSelector(getThemeMode);
  const params = useParams();
  const [Loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(true);
    setisLoginPage(true);
    const email = params?.email;
    const id = params?.id;

    //   const email = "sanal.ma#fadasdas"
    // const id = "params?.id"
    postEmailActivation({ email, id }).then((res) => {
      setLoader(false);
    });
  }, []);

  const location = useLocation();

  return (
    <div>
      {Loader ? (
        <DotLoader />
      ) : (
        <div>
          <div className="ff-poppins  h-100vh-max-content relative ">
            {/* <div className="ff-poppins  h-100vh relative "> */}
            <div className="w-100 h-100 d-flex mobile-view-login-page">
              <div
                style={{ width: "60%" }}
                className={`only-PC-view  ${
                  lightMode ? "left-login-section-light" : "left-login-section"
                }`}
              >
                <div style={{ margin: "60px 40px " }} className="p-40">
                  <p
                    className="pointer"
                    onClick={() => {
                      navigate("/");
                      setisLoginPage(false);
                    }}
                  >
                    {PortSvgLogo.PortSvgLogo}
                  </p>
                  <p className="fs-s-16  mt-40">
                    Trade brains portal helps investors make efficient stock
                    research and <br />
                    analysis by providing quality fundamental data <br /> with
                    insightful visuals.
                  </p>
                </div>
              </div>
              <div
                // style={{height:"fit-content" }}
                className={`login-sign-up-div w-40-100 d-flex-col justify-content-center  p-40 ${
                  lightMode ? "bg-gray" : "bg-dark-gray"
                }`}
              >
                <p className="fs-36-20 fw-700">Account Verified</p>
                <div>
                  <p className="fs-18-16 fw-600 mb-0">Welcome to Portal !</p>
                  <p className="fs-s-16">
                    You have successfully completed Email Verifiation
                  </p>
                </div>
                <div>
                  <p className="fs-s-16 fw-500 mb-0">
                    To explore our features ,{" "}
                  </p>
                  <div onClick={() => dispatch(setToggleForm("login"))}>
                    <p className="fs-s-16 fw-600 gradient-text-blue ">
                      Login Again
                    </p>
                  </div>
                  {/* <Link to={"/Login"}><p className='fs-s-16 fw-600 gradient-text-blue '>Login Again</p></Link> */}
                </div>

                <div className="d-flex align-items-center fs-s-12 text-center mt-40 justify-center-between flex-col">
                  <p className="px-60-0">
                    By signing up, you have read and agreed to our Privacy
                    Policy and Terms & Conditions.
                  </p>
                  <p
                    className={`fs-s-20 mb-0 fw-700 ${
                      lightMode ? "clr-light-lightblue" : "text-dark"
                    }`}
                  >
                    By Tradebrains
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountActive;
