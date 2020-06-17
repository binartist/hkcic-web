import React from "react";
import { Line } from 'react-chartjs-2';

export default function (props) {
    return (<div>
        <Line data={props.data} options={{
            responsive: true,
            layout: {
                padding: {
                    left: 0,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            }
        }} />
    </div>)
}
