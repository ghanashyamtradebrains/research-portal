export const createRadialGradient3= (context, c1, c2, c3)=>{
    const chartArea = context.chart.chartArea;
    if (!chartArea) {
      // This case happens on initial chart load
      return;
    }  let width, height;
  
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    // if (width !== chartWidth || height !== chartHeight) {
    //   cache.clear();
    // }
    let gradient = context.get(c1 + c2 + c3);
    if (!gradient) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const r = Math.min(
        (chartArea.right - chartArea.left) / 2,
        (chartArea.bottom - chartArea.top) / 2
      );
      const ctx = context.chart.ctx;
      gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
      gradient.addColorStop(0, c1);
      gradient.addColorStop(0.5, c2);
      gradient.addColorStop(1, c3);
      ctx.set(c1 + c2 + c3, gradient);
    }
  
    return gradient;
  }