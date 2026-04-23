import React from "react";
import { useSelector } from "react-redux";
import { authStore } from "../redux/reducers/authSlice";

const checkTrialStatus = () => {
  const UserAuth = useSelector(authStore);

  // After trial ends
  if (
    UserAuth?.userData?.user?.has_tried_trial &&
    UserAuth?.userData?.user?.plan?.planId != "trial_plus"
  ) {
    return true;
  }

  // Before trial
  if (!UserAuth?.userData?.user?.has_tried_trial) {
    return false;
  }

  // Trial Ongoing
  return false;
};

export default checkTrialStatus;
