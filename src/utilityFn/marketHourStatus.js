export const marketHourStatus = () => {
  let WeekDays =
    new Date().getDay() === 6 || new Date().getDay() === 7 ? true : false;
  let currentTime = new Date().getTime();
  let startTime = new Date().setHours(9, 15);
  let endTime = new Date().setHours(15, 30);

  if (currentTime > startTime && currentTime < endTime && WeekDays === false) {
    return true;
  } else {
    return false;
  }
};
