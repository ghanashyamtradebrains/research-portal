import React, { createRef } from 'react'
import {Chart as chartjs} from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
function BarChart({data,options,plugins=null}) {
  return (
    <Bar
    options={options}
    data={data}
    redraw={true}
    plugins={plugins}
  />
  )
}

export default BarChart
