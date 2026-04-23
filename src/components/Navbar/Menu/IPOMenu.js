import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export const IPOMenu = ({ mobile, setMobileToggle }) => {
  const { lightMode } = useSelector(getThemeMode);
  const router = useRouter();
  const IpoList = [
    { name: "Open IPOs", slug: "open_data" },
    { name: "Upcoming IPOs", slug: "upcoming_data" },
    { name: "Closed IPOs", slug: "closed_data" },
    { name: "Newly Listed IPOs", slug: "newly_listed_data" },
    { name: "Best Performing IPOs", slug: "best_performance_data" },
  ];
  return (
    <div
      className={` ff-poppins bt-navbar mt-4 p-20 br-t-b-l-r card-shadow-black ${lightMode ? "bg-white text-black" : (router.pathname.includes("/portal-ai") ?
        "bg-dark-portal-ai text-white" : "bg-dark-black text-white"
      )}`}
    >
      <div className="d-flex align-items-center justify-content-between mb-15">
        <p className="mb-0 fs-s-16 fw-600 text-btn-dark">IPOs</p>
        <span className="underline fs-s-12">
          <Link href={`/ipo`} className="underline ">
            View all
          </Link>
        </span>
      </div>

      {IpoList?.map((each) => {
        return (
          <div className="mb-20">
            <Link
              className="link-hover-underline fs-s-14 "
              href={`/ipo/${each?.slug}`}
            >
              {each?.name} <span className="text-btn-dark fw-600">{">"}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};