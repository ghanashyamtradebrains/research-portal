import React from 'react'
import { Chart as ChartJS} from 'chart.js';
import {Doughnut } from 'react-chartjs-2';
function DoughnutChart({data,options,plugins=null}) {
  return (
    <Doughnut id='dougnutjs' data={data}  options={options} plugins={plugins}/>
  )
}

export default DoughnutChart