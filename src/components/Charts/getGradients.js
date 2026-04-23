export const getGradient = (ctx, chartArea, colorArr) => {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    for (let index = 0; index < colorArr?.length; index++) {
      gradient.addColorStop(colorArr[index].xValue, colorArr[index].color);
    }
    ctx.strokeStyle = gradient;
    ctx.stroke();
  }

  return gradient;
};
