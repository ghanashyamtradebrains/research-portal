import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import {
  getAllStockSectorList,
  getTopInvestors,
} from "../../../pages/api/fetchClient";
import { useRouter } from "next/router";

export const SuperstarMenu = () => {
  const { lightMode } = useSelector(getThemeMode);
  const [investor, setInvestor] = useState([]);
  const router = useRouter();
  // const topInverstors = [
  //   {
  //     name: "Radhakishan Damani",
  //   },
  //   {
  //     name: "Vijay Kedia",
  //   },
  //   {
  //     name: "Dolly Khanna",
  //   },
  //   {
  //     name: "Ashish Kacholia",

  //   },
  // ];

  const getInvestor = async () => {
    await getTopInvestors().then((res) => {
      setInvestor(res?.data);
    });
  };

  useEffect(() => {
    getInvestor();
  }, []);

  return (
    <div
      className={` ff-poppins bt-navbar mt-4 p-20 br-t-b-l-r card-shadow-black ${lightMode ? "bg-white text-black" : (router.pathname.includes("/portal-ai") ?
        "bg-dark-portal-ai text-white" : "bg-dark-black text-white"
      )}`}
    >
      <div className="d-flex align-items-center justify-content-between mb-15">
        <p className="mb-0 fs-s-16 fw-600 text-btn-dark">
          Superstar Portfolio{" "}
        </p>
        <span className="underline fs-s-12">
          <Link href={`/superstars`} className="underline ">
            View all
          </Link>
        </span>
      </div>

      <p className="opacity5 mb-5">TOP Investors </p>

      {investor?.map((each) => {
        return (
          <div className="mb-20">
            <Link
              className="link-hover-underline fs-s-14 "
              href={`/superstars/${each?.slug}`}
            >
              {each?.investor_name}{" "}
              <span className="text-btn-dark fw-600">{">"}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};