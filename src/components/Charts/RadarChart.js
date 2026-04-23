import React from 'react'
import { Chart as ChartJS} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
function RadarChart({data,options,plugins=null}) {
  return (
    <PolarArea id='dougnutjs' data={data}  options={options} plugins={plugins}/>
  )
}

export default RadarChart