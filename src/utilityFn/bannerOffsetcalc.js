export const bannerOffsetCalc = (userAuth = {}) => {
  if (userAuth?.userData?.user?.is_premium) {
    return 1;
  } else {
    //if notification is off then change to 1
    return 0;
  }
};
