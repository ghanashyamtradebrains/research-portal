import React, { createRef, memo, useEffect } from 'react'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function GaugeChart({type,id,data,options,plugins}) {
    // create gradient fn
    
    const chartRef=createRef()
    useEffect(() => {

        const myChartRef = chartRef.current.getContext("2d");
    const chartConfig=  new Chart(myChartRef,  {
        type: 'doughnut',
        data:data,
        options:options,
        plugins:plugins
      });

    return ()=>{
        chartConfig.destroy()
    }
    }, [data])
    
    return (
              <div  className='d-flex justify-content-center'>
                  <canvas 
                      id={id}
                      ref={chartRef}
                  />
              </div>
    )
}

export default memo(GaugeChart)

// rotation: 235, // start angle in degrees
// circumference: 250, // sweep angle in degrees
// cutout:200,
// spacing:40

