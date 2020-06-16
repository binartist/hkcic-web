export default class ChartData {
  static fromData({ label, data, aaa }) {
    let datasets = [];

    datasets.push({
      label: label,
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data,
    });

    if (Array.isArray(aaa) && aaa.length >= 1 && aaa[0].length > 0) {

      datasets.push({
        label: 'Alert',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(255,255,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,255,100,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [aaa[0], aaa[0], aaa[0], aaa[0], aaa[0], aaa[0], aaa[0], aaa[0], aaa[0], aaa[0], aaa[0], aaa[0]]
      });
    }

    if (Array.isArray(aaa) && aaa.length >= 2) {
      datasets.push({
        label: 'Alarm',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(255,127,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,255,100,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [aaa[1], aaa[1], aaa[1], aaa[1], aaa[1], aaa[1], aaa[1], aaa[1], aaa[1], aaa[1], aaa[1], aaa[1]]
      });
    }

    if (Array.isArray(aaa) && aaa.length >= 3) {

      datasets.push({
        label: 'Action',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(255,0,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,255,100,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [aaa[2], aaa[2], aaa[2], aaa[2], aaa[2], aaa[2], aaa[2], aaa[2], aaa[2], aaa[2], aaa[2], aaa[2]]
      });
    }


    return {
      labels: ['00', '02', '04', '08', '10', '12', '14', '16', '18', '20', '22', '24'],
      datasets: datasets
    }
  }

}