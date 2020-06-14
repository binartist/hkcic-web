import React from "react";
import { Bar } from 'react-chartjs-2';

export default function (props) {
    return (<div>
        <Bar data={props.data} options={{
            responsive: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0, // it is for ignoring negative step.
                            beginAtZero: true,
                            stepSize: 1  // if i use this it always set it '1', which look very awkward if it have high value  e.g. '100'.
                        },
                    }
                ],
                scaleLabel: {
                    labelString: 'fsfsfs'
                }
            }
        }} />
    </div>)
}
