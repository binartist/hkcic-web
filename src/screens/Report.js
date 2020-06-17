import React, { Component } from 'react';
import axios from 'axios';
import ChartData from '../models/ChartData';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import BarData from '../models/BarData';
import _ from 'lodash';
import './Report.css';

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.date = this.props.date;
    this.state = { chartDataDict: [], barData: {}, devices: [], projectConfig: {}, aaa: null, warningCollection: {}, reportDevices: null };
  }

  async componentDidMount() {
    this.updateRulesConfiguration();
    this.updateWaringSummary();
    this.updateChartDataCollection();

    setTimeout(() => {
      const event = new Event('status');
      window.dispatchEvent(event);
    }, 1000 * 30)
  }

  render() {
    return (<div>
      <div style={{ 'page-break-before': 'always' }}></div>
      <h2><span class="heading_2">Warning Summary</span></h2>
      <br />
      <BarChart data={this.state.barData} />
      <span className='section-padding' />


      <h2><span class="heading_2">Device Warning Record</span></h2>
      <br />
      {this.generateDeviceTable()}
      <p id="para_remark">Remarks:</p>
      <p id="para_remark">Device A monitoring: CO2, PM2.5, TVOC, temperature and relative humidity</p>
      <p id="para_remark">Device B monitoring: C2H2, CO, CO2, PM2.5, TVOC, temperature and relative humidity</p>
      <span className='section-padding' />
      <div style={{ 'page-break-before': 'always' }}></div>
      <h2><span class="heading_2">Rules Configuration</span></h2>
      <br />
      {this.generateRuleConfiguration()}
      <span className='section-padding' />


      {this.state.reportDevices ? this.state.reportDevices.map((device) => {
        return <div style={{'page-break-before': 'always'}}>
          {this.generateDataAnalysis(device)}
          <span className='section-padding' />
          {this.generateWarings(device)}
          <span className='section-padding' />
          <div style={{ 'page-break-before': 'always' }}></div>
          <h3><strong>Charts</strong></h3>
          {this.state.chartDataDict[device.DeviceID] ? this.state.chartDataDict[device.DeviceID].map((item, index) => {
            return <div style={{'page-break-inside': 'avoid'}}>
              <p>{item.label}</p>
              <LineChart key={index} data={item.data} />
              <p style={{ textAlign: "center" }}>Time (Hour)</p>
              <br/><br/><br/>
            </div>
          }) : null}
        </div>
      }) : null}
      <h4 style={{'text-align': 'center'}}>- End of Report -</h4>
    </div>)

  }

  generateDeviceTable() {
    return <table>
      <thead>
        <tr>
          <th className='device_name'>Device Name</th>
          <th className='alert_cell'>Alert</th>
          <th className='alarm_cell'>Alarm</th>
          <th className='action_cell'>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.devices.map(device => <tr>
          <td className='device_name'>{device.DeviceName}</td>
          <td className='alert_cell'>
            {device.AlertCount}
          </td>
          <td className='alarm_cell'>
            {device.AlarmCount}
          </td>
          <td className='action_cell'>
            {device.ActionCount}
          </td>

        </tr>)}
      </tbody>
    </table>
  }

  generateRuleConfiguration() {
    const aaa = this.state.aaa;

    let pm2p5Aaa, coAaa, co2Aaa, c2h2Aaa, pm10Aaa, pm100Aaa, tvocAaa, humAaa, tempAaa;
    if (aaa) {
      pm2p5Aaa = this.safeConvert(aaa['pm2p5_aaa']);
      coAaa = this.safeConvert(aaa['co_aaa']);
      co2Aaa = this.safeConvert(aaa['co2_aaa']);
      c2h2Aaa = this.safeConvert(aaa['c2h2_aaa']);
      pm10Aaa = this.safeConvert(aaa['pm10_aaa']);
      pm100Aaa = this.safeConvert(aaa['pm100_aaa']);
      tvocAaa = this.safeConvert(aaa['tvoc_aaa']);
      humAaa = this.safeConvert(aaa['hum_aaa']);
      tempAaa = this.safeConvert(aaa['temp_aaa']);
    }


    return <div>
      {aaa ? <table>
        <thead>
          <tr>
            <th>Pre-set level</th>
            <th>PM2.5<br /><span className='time-label'>(μg/m³)</span></th>
            <th>CO<br /><span className='time-label'>(ppm)</span></th>
            <th>CO<sub>2</sub><br /><span className='time-label'>(ppm)</span></th>
            <th>C<sub>2</sub>H<sub>2</sub><br /><span className='time-label'>(ppm)</span></th>
            <th>TVOC<br /><span className='time-label'>(mg/m³)</span></th>
            <th>Humidity<br /><span className='time-label'>(%)</span></th>
            <th>Temperature<br /><span className='time-label'>(°C)</span></th>
            <th>PM10<br /><span className='time-label'>(μg/m³)</span></th>
            <th>PM100<br /><span className='time-label'>(μg/m³)</span></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='alert_cell'><span>Alert</span></td>
            <td><span>{pm2p5Aaa[0]}</span></td>
            <td><span>{coAaa[0]}</span></td>
            <td><span>{co2Aaa[0]}</span></td>
            <td><span>{c2h2Aaa[0]}</span></td>
            <td><span>{tvocAaa[0]}</span></td>
            <td><span>{humAaa[0]}</span></td>
            <td><span>{tempAaa[0]}</span></td>
            <td><span>{pm10Aaa[0]}</span></td>
            <td><span>{pm100Aaa[0]}</span></td>
            <td><span>8-hour average</span></td>
          </tr>
          <tr>
            <td className='alarm_cell'><span>Alarm</span></td>
            <td><span>{pm2p5Aaa[1]}</span></td>
            <td><span>{coAaa[1]}</span></td>
            <td><span>{co2Aaa[1]}</span></td>
            <td><span>{c2h2Aaa[1]}</span></td>
            <td><span>{tvocAaa[1]}</span></td>
            <td><span>{humAaa[1]}</span></td>
            <td><span>{tempAaa[1]}</span></td>
            <td><span>{pm10Aaa[1]}</span></td>
            <td><span>{pm100Aaa[1]}</span></td>
            <td><span>1-hour average</span></td>
          </tr>
          <tr>
            <td className='action_cell'><span>Action</span></td>
            <td><span>{pm2p5Aaa[2]}</span></td>
            <td><span>{coAaa[2]}</span></td>
            <td><span>{co2Aaa[2]}</span></td>
            <td><span>{c2h2Aaa[2]}</span></td>
            <td><span>{tvocAaa[2]}</span></td>
            <td><span>{humAaa[2]}</span></td>
            <td><span>{tempAaa[2]}</span></td>
            <td><span>{pm10Aaa[2]}</span></td>
            <td><span>{pm100Aaa[2]}</span></td>
            <td><span>1-hour average</span></td>
          </tr>
        </tbody>
      </table> : ''}
    </div>
  }

  generateDataAnalysis(device) {
    const showPm2p5 = device['Pm2p5Min']['Value'] || device['Pm2p5Max']['Value'] || device['Pm2p5Mean'] || device['Pm2p5STD'];
    const showCo = device['CoMin']['Value'] || device['CoMax']['Value'] || device['CoMean'] || device['CoSTD'];
    const showCo2 = device['Co2Min']['Value'] || device['Co2Max']['Value'] || device['Co2Mean'] || device['Co2STD'];
    const showC2h2 = device['C2h2Min']['Value'] || device['C2h2Max']['Value'] || device['C2h2Mean'] || device['C2h2STD'];
    const showTvoc = device['TvocMin']['Value'] || device['TvocMax']['Value'] || device['TvocMean'] || device['TvocSTD'];
    const showHum = device['HumidityMin']['Value'] || device['HumidityMax']['Value'] || device['HumidityMean'] || device['HumiditySTD'];
    const showTemp = device['TemperatureMin']['Value'] || device['TemperatureMax']['Value'] || device['TemperatureMean'] || device['TemperatureSTD'];
    const showPm10 = device['Pm10Min']['Value'] || device['Pm10Max']['Value'] || device['Pm10Mean'] || device['Pm10STD'];
    const showPm100 = device['Pm100Min']['Value'] || device['Pm100Max']['Value'] || device['Pm100Mean'] || device['Pm100STD'];


    return <div>
      <h2><span className='heading_2'>{device['DeviceName']}</span></h2>
      <br />
      <h3><strong>Data Analysis</strong></h3>
      <table>
        <thead>
          <tr>
            <th>Data Type (Unit)</th>
            <th>Minimum</th>
            <th>Maximum</th>
            <th>Mean</th>
            <th>Std. Dev.</th>
          </tr>
        </thead>
        <tbody>
          {showPm2p5 ? <tr>
            <td><span>PM2.5 (μg/m³)</span></td>
            <td><span>{device['Pm2p5Min']['Value']}</span><br /><span className='time-label'>{device['Pm2p5Min']['Datetime']}</span></td>
            <td><span>{device['Pm2p5Max']['Value']}</span><br /><span className='time-label'>{device['Pm2p5Max']['Datetime']}</span></td>
            <td><span>{device['Pm2p5Mean']}</span></td>
            <td><span>{device['Pm2p5STD']}</span></td>
          </tr> : null}
          {showCo ?
            <tr>
              <td><span>CO (ppm)</span></td>
              <td><span>{device['CoMin']['Value']}</span><br /><span className='time-label'>{device['CoMin']['Datetime']}</span></td>
              <td><span>{device['CoMax']['Value']}</span><br /><span className='time-label'>{device['CoMax']['Datetime']}</span></td>
              <td><span>{device['CoMean']}</span></td>
              <td><span>{device['CoTD']}</span></td>
            </tr> : null
          }
          {showCo2 ?
            <tr>
              <td><span>CO<sub>2</sub> (ppm)</span></td>
              <td><span>{device['Co2Min']['Value']}</span><br /><span className='time-label'>{device['Co2Min']['Datetime']}</span></td>
              <td><span>{device['Co2Max']['Value']}</span><br /><span className='time-label'>{device['Co2Max']['Datetime']}</span></td>
              <td><span>{device['Co2Mean']}</span></td>
              <td><span>{device['Co2STD']}</span></td>
            </tr> : null}
          {showC2h2 ?
            <tr>
              <td><span>C<sub>2</sub>H<sub>2</sub> (ppm)</span></td>
              <td><span>{device['C2h2Min']['Value']}</span><br /><span className='time-label'>{device['C2h2Min']['Datetime']}</span></td>
              <td><span>{device['C2h2Max']['Value']}</span><br /><span className='time-label'>{device['C2h2Max']['Datetime']}</span></td>
              <td><span>{device['C2h2Mean']}</span></td>
              <td><span>{device['C2h2STD']}</span></td>
            </tr> : null}
          {showTvoc ?
            <tr>
              <td><span>TVOC</span> (mg/m³)</td>
              <td><span>{device['TvocMin']['Value']}</span><br /><span className='time-label'>{device['TvocMin']['Datetime']}</span></td>
              <td><span>{device['TvocMax']['Value']}</span><br /><span className='time-label'>{device['TvocMax']['Datetime']}</span></td>
              <td><span>{device['TvocMean']}</span></td>
              <td><span>{device['TvocSTD']}</span></td>
            </tr> : null}
          {showHum ?
            <tr>
              <td><span>Humidity</span> (%)</td>
              <td><span>{device['HumidityMin']['Value']}</span><br /><span className='time-label'>{device['HumidityMin']['Datetime']}</span></td>
              <td><span>{device['HumidityMax']['Value']}</span><br /><span className='time-label'>{device['HumidityMax']['Datetime']}</span></td>
              <td><span>{device['HumidityMean']}</span></td>
              <td><span>{device['HumiditySTD']}</span></td>
            </tr> : null}
          {showTemp ?
            <tr>
              <td><span>Temperature</span> (°C)</td>
              <td><span>{device['TemperatureMin']['Value']}</span><br /><span className='time-label'>{device['TemperatureMin']['Datetime']}</span></td>
              <td><span>{device['TemperatureMax']['Value']}</span><br /><span className='time-label'>{device['TemperatureMax']['Datetime']}</span></td>
              <td><span>{device['TemperatureMean']}</span></td>
              <td><span>{device['TemperatureSTD']}</span></td>
            </tr> : null}
          {showPm10 ?
            <tr>
              <td><span>PM10</span> (μg/m³)</td>
              <td><span>{device['Pm10Min']['Value']}</span><br /><span className='time-label'>{device['Pm10Min']['Datetime']}</span></td>
              <td><span>{device['Pm10Max']['Value']}</span><br /><span className='time-label'>{device['Pm10Max']['Datetime']}</span></td>
              <td><span>{device['Pm10Mean']}</span></td>
              <td><span>{device['Pm10STD']}</span></td>
            </tr> : null}
          {showPm100 ?
            <tr>
              <td><span>PM100</span> (μg/m³)</td>
              <td><span>{device['Pm100Min']['Value']}</span><br /><span className='time-label'>{device['Pm100Min']['Datetime']}</span></td>
              <td><span>{device['Pm100Max']['Value']}</span><br /><span className='time-label'>{device['Pm100Max']['Datetime']}</span></td>
              <td><span>{device['Pm100Mean']}</span></td>
              <td><span>{device['Pm100STD']}</span></td>
            </tr> : null}
        </tbody>
      </table></div>
  }

  generateWarings(device) {
    let warnings = this.state.warningCollection[device.DeviceID];

    return (
      <div>
        <h3><strong>Warnings</strong></h3>
        {warnings ? warnings.map(w => {
          let warningTitle;
          let className = '';

          if (w['Type'] === 1) {
            warningTitle = 'Alert';
            className += ' alert_cell';
          } else if (w['Type'] === 2) {
            warningTitle = 'Alarm';
            className += ' alarm_cell';
          } else {
            warningTitle = 'Action';
            className += ' action_cell';
          }

          return <div><p>{w.Topic}</p>
            <table>
              <thead>
                <tr>
                  <th>Warning level</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Duration<br /><span className='time-label'>(min)</span></th>
                  <th>Range</th>
                </tr>
              </thead>
              <tbody>
                {
                  <tr>
                    <td className={className}><span>{warningTitle}</span></td>
                    <td><span>{w['RecordCreated']}</span></td>
                    <td><span>{w['RecordUpdated']}</span></td>
                    <td><span>{Math.round(w['Duration'])}</span></td>
                    <td><span>{w['Low']} to {w['High']}</span></td>
                  </tr>

                }
              </tbody>
            </table></div>
        }) : <p>All readings were normal in the selected period.</p>
        }
      </div>
    )
  }

  async updateWaringSummary() {
    const res = await axios.post(`warningreport/${this.date}`);

    try {
      const project = res.data['projects']['1'];

      // const hourlyAlert = project['HourlyAlert'];
      // const hourlyAlarm = project['HourlyAlarm'];
      // const hourlyAction = project['HourlyAction'];

      // this.setState({ barData: BarData.fromData({ hourlyAlert, hourlyAlarm, hourlyAction }) });
      this.setState({ barData: BarData.fromData(project.Devices) });
      this.setState({ devices: project.Devices });

      const warnings = _.groupBy(project['Warnings'], 'DeviceID');
      this.setState({ warningCollection: warnings });
    } catch (e) {
      console.log(e)
    }
  }

  async updateRulesConfiguration() {
    const res = await axios.post(`projectconfig/1`);

    this.setState({ projectConfig: res.data });
    this.setState({ aaa: res.data['setting'] });

  }

  async updateChartDataCollection() {
    const res = await axios.post(`dailyreport/${this.date}`);


    const project = res.data['projects']['1'];
    const aaa = project['AlertAlarmAction'];
    const pm2p5Aaa = aaa['pm2p5_aaa'].split(',');
    const coAaa = aaa['co_aaa'].split(',');
    const co2Aaa = aaa['co2_aaa'].split(',');
    const c2h2Aaa = aaa['c2h2_aaa'].split(',');
    const pm10Aaa = aaa['pm10_aaa'].split(',');
    const pm100Aaa = aaa['pm100_aaa'].split(',');
    const tvocAaa = aaa['tvoc_aaa'].split(',');
    const humAaa = aaa['hum_aaa'].split(',');
    const tempAaa = aaa['temp_aaa'].split(',');

    this.setState({ reportDevices: project['Devices'] });

    let chartDataDict = {};
    for (let device of project['Devices']) {
      axios.post(`chartreport/${device['DeviceID']}/${this.date}`).then(res => {
        let chartDataCollection = [];

        let result = res.data['result'];
        if (Array.isArray(result)) {
          let pm2p5Data = result.map(item => item['pm2p5']);
          let coData = result.map(item => item['co']);
          let co2Data = result.map(item => item['co2']);
          let c2h2Data = result.map(item => item['c2h2']);
          let pm10Data = result.map(item => item['pm10']);
          let pm100Data = result.map(item => item['pm100']);
          let tvocData = result.map(item => item['tvoc']);
          let humData = result.map(item => item['humidity']);
          let tempData = result.map(item => item['temperature']);


          chartDataCollection.push({ data: ChartData.fromData({ label: 'PM2.5', data: pm2p5Data, aaa: pm2p5Aaa }), label: device['DeviceName'] + ' (PM2.5)', device });

          if (device.CoMax.Value > 0) {
            chartDataCollection.push({ data: ChartData.fromData({ label: 'CO', data: coData, aaa: coAaa }), label: device['DeviceName'] + ' (CO)', device });
          }

          chartDataCollection.push({ data: ChartData.fromData({ label: 'CO2', data: co2Data, aaa: co2Aaa }), label: device['DeviceName'] + ' (CO2)', device });

          if (device.C2h2Max.Value > 0) {
            chartDataCollection.push({ data: ChartData.fromData({ label: 'C2H2', data: c2h2Data, aaa: c2h2Aaa }), label: device['DeviceName'] + ' (C2H2)', device });
          }

          chartDataCollection.push({ data: ChartData.fromData({ label: 'TVOC', data: tvocData, aaa: tvocAaa }), label: device['DeviceName'] + ' (TVOC)', device });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'Humidity', data: humData, aaa: humAaa }), label: device['DeviceName'] + ' (Humidity)', device });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'Temperature', data: tempData, aaa: tempAaa }), label: device['DeviceName'] + ' (Temperature)', device });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'PM10', data: pm10Data, aaa: pm10Aaa }), label: device['DeviceName'] + ' (PM10)', device });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'PM100', data: pm100Data, aaa: pm100Aaa }), label: device['DeviceName'] + ' (PM100)', device });

          chartDataDict[device.DeviceID] = chartDataCollection;
          this.setState({ chartDataDict });
        }
      });
    }
  }

  safeConvert(aaa) {
    const res = aaa.split(',') || [null, null, null];

    if (res.length === 2) {
      res.push(null);
    } else if (res.length === 1) {
      res.push(null);
      res.push(null);
    }

    return res;
  }
}

