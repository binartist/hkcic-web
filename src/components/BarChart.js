import React from "react";
import { Bar } from 'react-chartjs-2';

export default function (props) {
    return (<div>
        <Bar data={props.data} />
    </div>)
}
