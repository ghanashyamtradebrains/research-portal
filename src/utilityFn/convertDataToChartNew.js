import { getMonth } from "./getMonth";

// convrt api data to graph input data
export const convertTographNew = (data, duration, graphDataColor) => {
  if (data?.length === 0)
    return { labelArray: [], graphPointsArray: [], stockTrend: true };
  const stockTrend = graphDataColor >= 0 ? true : false;
  const labelData = (key) => {
    switch (key) {
      case "1D":
        return data?.map((item, i) => {
          const date = new Date(item?.date);
          const hours = String(date.getUTCHours()).padStart(2, "0");
          const minutes = String(date.getUTCMinutes()).padStart(2, "0");

          const time = `${hours}:${minutes}`;
          return time;
        });
      case "1W":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var dd = String(timeLabel.getDate()).padStart(2, "0");
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${dd}`;
          return timeString;
        });
      case "1M":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var dd = String(timeLabel.getDate()).padStart(2, "0");
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${dd}`;
          return timeString;
        });
      case "3M":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var dd = String(timeLabel.getDate()).padStart(2, "0");
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${dd}`;
          return timeString;
        });
      case "6M":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var dd = String(timeLabel.getDate()).padStart(2, "0");
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${dd}`;
          return timeString;
        });
      case "1Y":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0");
          const yyyy = timeLabel.getFullYear(); //January is 0!
          const timeString = `${getMonth(mm)} ${yyyy}`;
          return timeString;
        });
      case "5Y":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          const yyyy = timeLabel.getFullYear();
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${yyyy}`;
          return timeString;
        });
      case "MAX":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var yyyy = timeLabel.getFullYear();
          return yyyy;
        });
      default:
        break;
    }
  };
  const labelArray = labelData(duration);
  const graphPointsArray = data?.map((item, i) => item.price);
  return { labelArray, graphPointsArray, stockTrend };
};

export const convertTographClose = (data, duration, graphDataColor) => {
  if (data?.length === 0)
    return { labelArray: [], graphPointsArray: [], stockTrend: true };
  const stockTrend = graphDataColor >= 0 ? true : false;
  const labelData = (key) => {
    switch (key) {
      case "1D":
        return data?.map((item, i) => {
          const date = new Date(item?.date);
          const hours = String(date.getUTCHours()).padStart(2, "0");
          const minutes = String(date.getUTCMinutes()).padStart(2, "0");

          const time = `${hours}:${minutes}`;
          return time;
        });
      case "1W":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var dd = String(timeLabel.getDate()).padStart(2, "0");
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${dd}`;
          return timeString;
        });
      case "1M":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var dd = String(timeLabel.getDate()).padStart(2, "0");
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${dd}`;
          return timeString;
        });
      case "3M":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var dd = String(timeLabel.getDate()).padStart(2, "0");
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${dd}`;
          return timeString;
        });
      case "6M":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var dd = String(timeLabel.getDate()).padStart(2, "0");
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${dd}`;
          return timeString;
        });
      case "1Y":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0");
          const yyyy = timeLabel.getFullYear(); //January is 0!
          const timeString = `${getMonth(mm)} ${yyyy}`;
          return timeString;
        });
      case "5Y":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          const yyyy = timeLabel.getFullYear();
          var mm = String(timeLabel.getMonth() + 1).padStart(2, "0"); //January is 0!
          const timeString = `${getMonth(mm)} ${yyyy}`;
          return timeString;
        });
      case "MAX":
        return data?.map((item, i) => {
          const timeLabel = new Date(item.date?.replace(/\s/, "T"));
          var yyyy = timeLabel.getFullYear();
          return yyyy;
        });
      default:
        break;
    }
  };
  const labelArray = labelData(duration);
  const graphPointsArray = data?.map((item, i) => item.close);
  return { labelArray, graphPointsArray, stockTrend };
};
