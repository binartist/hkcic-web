export default class BarData {
    static fromData({ hourlyAlert, hourlyAlarm, hourlyAction }) {
        const datasets = [];

        let [alertData, alarmData, actionData] = [[], [], []];

        for (let i = 0; i < 24; i++) {
            if (hourlyAlert[`${i}`] != null) {
                alertData.push(hourlyAlert[`${i}`])
            } else {
                alertData.push(0);
            }

            if (hourlyAlarm[`${i}`] != null) {
                alarmData.push(hourlyAlarm[`${i}`])
            } else {
                alarmData.push(0);
            }

            if (hourlyAction[`${i}`] != null) {
                actionData.push(hourlyAction[`${i}`])
            } else {
                actionData.push(0);
            }
        }

        // console.log(alertData, alarmData, actionData)

        datasets.push({
            label: 'Alert',
            backgroundColor: 'rgba(255,255,0,1)',
            borderColor: 'rgba(255,255,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: alertData
        })

        datasets.push({
            label: 'Alarm',
            backgroundColor: 'rgba(255,127,0,1)',
            borderColor: 'rgba(255,127,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: alarmData
        })

        datasets.push({
            label: 'Action',
            backgroundColor: 'rgba(255,0,0,1)',
            borderColor: 'rgba(255,0,0,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: actionData
        })

        return {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            datasets: datasets
        }
    }
}