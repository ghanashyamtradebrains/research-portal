import { getMonth } from "./getMonth";

const padTo2Digits = (num) => {
  return String(num).padStart(2, "0");
};
// convrt api data to graph input data
export const convertTograph = (data, duration) => {
  if (data?.length === 0)
    return { labelArray: [], graphPointsArray: [], stockTrend: true };
  const stockTrend =
    duration === "days=1"
      ? data?.at(0)?.close >= data?.at(0)?.prev_close
      : data?.at(0)?.close >= data?.at(-1)?.close;
  const labelData = (key) => {
    switch (key) {
      case "days=1":
        return data
          ?.map((item, i) => {
            const timeLabel = new Date(item?.date?.replace(/\s/, "T"));
            const timeString = `${padTo2Digits(
              timeLabel.getHours()
            )}:${padTo2Digits(timeLabel.getMinutes())}`;
            return timeString;
          })
          .reverse();
      // return ['10AM','11AM','12PM','1PM','2PM','3PM']
      case "days=5":
        return data
          ?.map((item, i) => {
            if (typeof item.date === "string") {
              const timeLabel = new Date(item.date.replace(/\s/, "T"));
              const timeString = `${padTo2Digits(timeLabel.getDay())}`;
              return timeString;
            } else {
              console.warn(
                `Item at index ${i} does not have a valid date string:`,
                item.date
              );
              return null;
            }
          })
          .filter((timeString) => timeString !== null)
          .reverse();
      case "months=1":
        return data
          ?.map((item, i) => {
            const timeLabel = new Date(item.date?.replace(/\s/, "T"));
            var dd = String(timeLabel.getDate()).padStart(2, "0");
            var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
            const timeString = `${getMonth(mm)} ${dd}`;
            return timeString;
          })
          .reverse();
      case "months=3":
        return data
          ?.map((item, i) => {
            const timeLabel = new Date(item.date?.replace(/\s/, "T"));
            var dd = String(timeLabel.getDate()).padStart(2, "0");
            var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
            const timeString = `${getMonth(mm)} ${dd}`;
            return timeString;
          })
          .reverse();
      case "months=6":
        return data
          ?.map((item, i) => {
            const timeLabel = new Date(item.date?.replace(/\s/, "T"));
            var dd = String(timeLabel.getDate()).padStart(2, "0");
            var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
            const timeString = `${getMonth(mm)} ${dd}`;
            return timeString;
          })
          .reverse();
      case "years=1":
        return data
          ?.map((item, i) => {
            const timeLabel = new Date(item.date?.replace(/\s/, "T"));
            var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
            const timeString = `${getMonth(mm)}`;
            return timeString;
          })
          .reverse();
      case "years=5":
        return data
          ?.map((item, i) => {
            const timeLabel = new Date(item.date?.replace(/\s/, "T"));
            var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
            const timeString = `${getMonth(mm)}`;
            return timeString;
          })
          .reverse();
      case "years=12":
        return data
          ?.map((item, i) => {
            const timeLabel = new Date(item.date?.replace(/\s/, "T"));
            var yyyy = timeLabel.getFullYear();
            return yyyy;
          })
          .reverse();
      default:
        break;
    }
  };
  const labelArray = labelData(duration);
  const graphPointsArray = data?.map((item, i) => item.close).reverse();
  return { labelArray, graphPointsArray, stockTrend };
};
