import React, { createRef, memo, useEffect } from 'react'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function CustomChart({type,id,data,options,plugins=null}) {
    const chartRef=createRef()
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        let grad1,grad2,grad3
        if(id==="quarterChart"||id=="paandlChart"){
            grad1=myChartRef.createLinearGradient(0, 100, 0, 300);
            grad1.addColorStop(0, '#00B4DB');
            grad1.addColorStop(1, '#0083B0');
            grad2=myChartRef.createLinearGradient(0, 100, 0, 300);
            grad2.addColorStop(0, '#38EF7D');
            grad2.addColorStop(1, '#11998E');
            grad3=myChartRef.createLinearGradient(0, 100, 0, 300);
            grad3.addColorStop(0, '#ED213A');
            grad3.addColorStop(1, '#93291E');
        }
        else if(id==="balanceSheetGraph"){
            grad1=myChartRef.createLinearGradient(0, 100, 0, 300);
            grad1.addColorStop(0, '#FDC830');
            grad1.addColorStop(.47, '#F37335');
        }
        else if(id==="ratoGraphs"){
            grad1=myChartRef.createLinearGradient(0, 100, 0, 400);
            grad1.addColorStop(0, '#E0C0FF');
            grad1.addColorStop(.47, '#A986FF');
            grad2=myChartRef.createLinearGradient(0, 100, 0, 400);
            grad2.addColorStop(0, '#FFACB0');
            grad2.addColorStop(.47, '#FF3F7A');
        }
        else if(id==="divientGauge"){
            grad1=myChartRef.createLinearGradient(0, 100, 0, 400);
            grad1.addColorStop(0, '#E0C0FF');
            grad1.addColorStop(.47, '#A986FF');
            grad2=myChartRef.createLinearGradient(0, 100, 0, 400);
            grad2.addColorStop(0, '#FFACB0');
            grad2.addColorStop(.47, '#FF3F7A');
        }
    
    const chartConfig=  new Chart(myChartRef, {
        // type:type,
        data: data([grad1,grad2,grad3]),
        options:options,plugins:plugins
    });
    return ()=>{
        chartConfig.destroy()
    }
    }, [data])
    
    return (
              <div className='h-100 w-100'>
                  <canvas
                  amp-script={""}
                      id={id}
                      ref={chartRef}
                  />
              </div>
    )
}

export default memo(CustomChart)