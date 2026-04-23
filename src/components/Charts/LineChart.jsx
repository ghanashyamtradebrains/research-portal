import React from 'react'
import { Line } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto'
function LineChart({data,height,width,options,labelArr,dataPoints,stockTrend}) {
   
  return (
        <Line 
        data={{
            labels:labelArr,
            datasets: [{
                fill: 'origin',      // 0: fill to 'origin'
                fill: '+2',    
                label:{
                        display:false
                },
                data:dataPoints,
              
                borderColor: stockTrend? [  
                    '#0AB644'
                ]:['#E0586A'],
                borderWidth: 3
            }]
        }}
        width={width}
        height={height}
       options={options}
        
        />
  )
}

export default LineChart