import React from "react";
import { Line } from 'react-chartjs-2';

export default function (props) {
  return (<div>
    <Line data={props.data} options={{
      responsive: true,
      layout: {
        padding: {
          left: 20,
          right: 100,
          top: 0,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time (Hour)',
            fontSize: 15
          },
          gridLines: {
            display:false
          },
          ticks: {
            //max: 120,
            //min: 0,
            //stepSize: 6,
            //unitStepSize: 5,
            minRotation: 360
          },  
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: props.yUnit,
            fontSize: 15
          }
        }]
      }
    }} />
  </div>)
}
