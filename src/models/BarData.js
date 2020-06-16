export default class BarData {
    static fromData(devices) {
        const datasets = [];

        let [alertData, alarmData, actionData] = [[], [], []];
        let deviceNames = [];


        devices.forEach(dev => {
            alertData.push(dev.AlertCount)
            alarmData.push(dev.AlarmCount)
            actionData.push(dev.ActionCount)
            deviceNames.push(formatLabel(dev.DeviceName, 12))
        });
        // for (let i = 0; i < 24; i++) {
        //     if (hourlyAlert[`${i}`] != null) {
        //         alertData.push(hourlyAlert[`${i}`])
        //     } else {
        //         alertData.push(null);
        //     }

        //     if (hourlyAlarm[`${i}`] != null) {
        //         alarmData.push(hourlyAlarm[`${i}`])
        //     } else {
        //         alarmData.push(null);
        //     }

        //     if (hourlyAction[`${i}`] != null) {
        //         actionData.push(hourlyAction[`${i}`])
        //     } else {
        //         actionData.push(null);
        //     }
        // }

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
            labels: deviceNames,
            datasets: datasets
        }
    }
}

/* takes a string phrase and breaks it into separate phrases 
   no bigger than 'maxwidth', breaks are made at complete words.*/

   function formatLabel(str, maxwidth){
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function(item, index){
        if(temp.length > 0)
        {
            var concat = temp + ' ' + item;

            if(concat.length > maxwidth){
                sections.push(temp);
                temp = "";
            }
            else{
                if(index == (words.length-1))
                {
                    sections.push(concat);
                    return;
                }
                else{
                    temp = concat;
                    return;
                }
            }
        }

        if(index == (words.length-1))
        {
            sections.push(item);
            return;
        }

        if(item.length < maxwidth) {
            temp = item;
        }
        else {
            sections.push(item);
        }

    });

    return sections;
}