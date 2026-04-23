import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as chartjs} from 'chart.js/auto'

function MultiLineChart({dividentYield,YearHeaders,dividentYield1,dprData,graph}) {
    const data = {}
    const dataset = []

    const pushobj = () =>{
      const graphs =graph && graph.map((items)=>{
        data["data"] = items
        data['type'] = 'line'
        data['label'] = 'RELIANCE'
        data['borderColor'] = 'red'
        data['fill'] = false
        dataset.push(data)
       
      })
     return {...graphs,graphs}
      
    }
    
  return (
    <div style={{height:"500px"}}>
          <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            tension: 0.3,
            scales: {
              y: {
                grid: {
                    display: false,
                  },
                  labels:dividentYield
              },
              x: {  
                grid: {
                    display: false,
                  }
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => 
                 `${context.dataset.label}:${context.formattedValue}`
                },
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
          }}
          data={{
            labels:YearHeaders,
            datasets: [
               data
                //   {
                //     type: 'line',
                //     label: 'DPR',
                //     borderColor: 'rgb(0, 113, 125)',
                //     borderWidth: 2,
                //     fill: false,
                //     data: dividentYield1,
                //   },
               ]
          }}
        
          
        />
    </div>
  )
}

export default MultiLineChart