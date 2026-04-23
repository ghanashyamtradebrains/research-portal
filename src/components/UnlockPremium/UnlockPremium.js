import Link from "next/link";
import svgSheet from "../../assets/svg/svgSheet";
import { authStore } from "../../redux/reducers/authSlice";
import { useSelector } from "react-redux";

function UnlockPremium({ children }) {
  const auth = useSelector(authStore);
  return (
    <div className={auth?.userData?.user?.is_premium ? "" : "relative"}>
      {auth?.userData?.user?.is_premium ? (
        ""
      ) : (
        <div className="unlock-section">
          <div style={{ width: "70px", height: "70px" }}>
            {svgSheet.premiumIcon}
          </div>
          <p className="fs-25-20 fw-700 mb-10 text-align-center">
            Unlock All features
          </p>

          <Link href={`/getpremium`}>
            <button
              style={{ width: "200px", height: "50px" }}
              className="btn-bg-primary  fw-600 text-white fs-16-14 br-5">
              View Pricing
            </button>
          </Link>
        </div>
      )}

      <div
        className={auth?.userData?.user?.is_premium ? `` : "premium-blur-wrap"}>
        {children}
      </div>
    </div>
  );
}
export default UnlockPremium;
