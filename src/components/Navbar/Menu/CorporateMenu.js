import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export const CorporateMenu = ({ mobile, setMobileToggle }) => {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();
  const corporateCatList = [
    "Dividends",
    "Board Meetings",
    "Bonus",
    "Splits",
    "Book Closure",
    "Offer For Sale",
    "Rights Issue",
    "AGM/EGM",
    "Delisted",
    "BSE Announcements",
    "NSE Announcements",
    "Merger/Demerger",
    "Forthcoming",
  ];
  return (
    <div
      className={` ff-poppins bt-navbar mt-4 ${mobile ? "" : "p-20 card-shadow-black"
        } br-t-b-l-r d-flex gap-15px ${lightMode
          ? "bg-white text-black" : (router.pathname.includes("/portal-ai")?
            "bg-dark-portal-ai text-white"
            : `${mobile ? "text-white" : "bg-dark-black text-white"}`
          )}`}
    >
      <div className=" w-100">
        {!mobile && (
          <div className="d-flex align-items-center justify-content-between mb-15">
            <p className="mb-0 fs-s-16 fw-600 text-btn-dark">
              Corporate Actions
            </p>
            <span className="underline fs-s-12">
              <Link
                onClick={() => setMobileToggle("NONE")}
                href={`/corporateactions/Dividends`}
                className="underline "
              >
                View all
              </Link>
            </span>
          </div>
        )}

        <div className={`${mobile ? "d-flex-col" : "d-flex"} gap-10px`}>
          <div className="w-100">
            <p className="opacity5 mb-5 d-flex justify-content-between">
              <span></span>
              {mobile && (
                <span className="underline fs-s-12">
                  <Link
                    onClick={() => setMobileToggle("NONE")}
                    href={`/corporateactions/Dividends`}
                    className={`${lightMode ? "text-black" : "text-white"
                      } underline`}
                  >
                    View all
                  </Link>
                </span>
              )}{" "}
            </p>
            {mobile && <p className="opacity5 mb-10 bb-2-gray p-20"></p>}
            {corporateCatList?.slice(0, 7)?.map((each) => {
              return (
                <div className="mb-20">
                  <Link
                    onClick={() => setMobileToggle("NONE")}
                    className="link-hover-underline fs-s-14 "
                    href={`/corporateactions/${each
                      ?.replace(" ", "-")
                      ?.replace(" ", "-")
                      ?.replace("/", "-")}`}
                  >
                    {each === "Forthcoming" ? "Upcoming Results" : each} <span className="text-btn-dark fw-600">{">"}</span>
                  </Link>
                </div>
              );
            })}
          </div>
          {!mobile && (
            <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>
          )}

          <div className="w-100">
            {corporateCatList?.slice(7, 13)?.map((each) => {
              return (
                <div className="mb-20">
                  <Link
                    onClick={() => setMobileToggle("NONE")}
                    className="link-hover-underline fs-s-14 "
                    href={`/corporateactions/${each
                      ?.replace(" ", "-")
                      ?.replace(" ", "-")
                      ?.replace("/", "-")}`}
                  >
                    {each === "Forthcoming" ? "Upcoming Results" : each} <span className="text-btn-dark fw-600">{">"}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};