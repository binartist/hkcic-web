import React, { Component } from 'react';
import axios from 'axios';
import ChartData from '../models/ChartData';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import BarData from '../models/BarData';
import _ from 'lodash';


export default class Report extends Component {
  constructor(props) {
    super(props);

    this.date = this.props.date;
    this.state = { chartDataCollection: [], barData: {}, devices: [], projectConfig: {}, aaa: null, warningCollection: {}, reportDevices: null };
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
    return (<div style={{ padding: '2rem' }}>
      <h2>Project</h2>
      <h3>Warning summary</h3>
      <BarChart data={this.state.barData} />
      <h3>Devices</h3>
      {this.generateDeviceTable()}
      <h2>Device readings</h2>
      <h3>Rules configuration</h3>
      {this.generateRuleConfiguration()}
      <span className='section-padding'/>
      <h3>Data analysis</h3>
      {this.state.reportDevices ? this.generateDataAnalysis() : null}
      <span className='section-padding'/>
      <h3>Warnings</h3>
      {this.generateWarings()}
      <span className='section-padding'/>
      <h3>Charts</h3>
      {this.state.chartDataCollection.map((item, index) => <div><p>{item.device}</p><LineChart key={index} data={item.data} /></div>)}
    </div>)
  }

  generateDeviceTable() {
    return <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Serial No.</th>
          <th>Type</th>
          <th>Warnings</th>
        </tr>
      </thead>
      <tbody>
        {this.state.devices.map(device => <tr>
          <td>{device.DeviceName}</td>
          <td>{device.Serial}</td>
          <td>All-in-one air Quality Sensor</td>
          <td className='warning_group'>
            <span>{device.AlertCount}</span>
            <span>{device.AlarmCount}</span>
            <span>{device.ActionCount}</span>
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
      <p><span>Initialized time:</span><span>{this.state.projectConfig['thresholds_updated']}</span></p>
      <p><span>Report sending rate:</span><span>{this.state.projectConfig['report_rate']}</span></p>
      {aaa ? <table>
        <thead>
          <tr>
            <th>Pre-set level</th>
            <th>pm2.5</th>
            <th>co</th>
            <th>co2</th>
            <th>c2h2</th>
            <th>pm10</th>
            <th>pm100</th>
            <th>tvoc</th>
            <th>humidity</th>
            <th>temperature</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className='preset_level alert_level'>Alert</span></td>
            <td><span>{pm2p5Aaa[0]}</span></td>
            <td><span>{coAaa[0]}</span></td>
            <td><span>{co2Aaa[0]}</span></td>
            <td><span>{c2h2Aaa[0]}</span></td>
            <td><span>{pm10Aaa[0]}</span></td>
            <td><span>{pm100Aaa[0]}</span></td>
            <td><span>{tvocAaa[0]}</span></td>
            <td><span>{humAaa[0]}</span></td>
            <td><span>{tempAaa[0]}</span></td>
            <td><span>8-hour average</span></td>
          </tr>
          <tr>
            <td><span className='preset_level alarm_level'>Alarm</span></td>
            <td><span>{pm2p5Aaa[1]}</span></td>
            <td><span>{coAaa[1]}</span></td>
            <td><span>{co2Aaa[1]}</span></td>
            <td><span>{c2h2Aaa[1]}</span></td>
            <td><span>{pm10Aaa[1]}</span></td>
            <td><span>{pm100Aaa[1]}</span></td>
            <td><span>{tvocAaa[1]}</span></td>
            <td><span>{humAaa[1]}</span></td>
            <td><span>{tempAaa[1]}</span></td>
            <td><span>1-hour average</span></td>
          </tr>
          <tr>
            <td><span className='preset_level action_level'>Action</span></td>
            <td><span>{pm2p5Aaa[2]}</span></td>
            <td><span>{coAaa[2]}</span></td>
            <td><span>{co2Aaa[2]}</span></td>
            <td><span>{c2h2Aaa[2]}</span></td>
            <td><span>{pm10Aaa[2]}</span></td>
            <td><span>{pm100Aaa[2]}</span></td>
            <td><span>{tvocAaa[2]}</span></td>
            <td><span>{humAaa[2]}</span></td>
            <td><span>{tempAaa[2]}</span></td>
            <td><span>1-hour average</span></td>
          </tr>
        </tbody>
      </table> : ''}
    </div>
  }

  generateDataAnalysis() {
    return this.state.reportDevices.map(device => <div><p>{device['DeviceName']}</p><table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Minimum</th>
          <th>Maximum</th>
          <th>Mean</th>
          <th>Std</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span>pm2.5</span></td>
          <td><span>{device['Pm2p5Min']['Value']}</span><span className='time-label'>{device['Pm2p5Min']['Datetime']}</span></td>
          <td><span>{device['Pm2p5Max']['Value']}</span><span className='time-label'>{device['Pm2p5Max']['Datetime']}</span></td>
          <td><span>{device['Pm2p5Mean']}</span></td>
          <td><span>{device['Pm2p5STD']}</span></td>
        </tr>
        <tr>
          <td><span>co</span></td>
          <td><span>{device['CoMin']['Value']}</span><span className='time-label'>{device['CoMin']['Datetime']}</span></td>
          <td><span>{device['CoMax']['Value']}</span><span className='time-label'>{device['CoMax']['Datetime']}</span></td>
          <td><span>{device['CoMean']}</span></td>
          <td><span>{device['CoTD']}</span></td>
        </tr>
        <tr>
          <td><span>co2</span></td>
          <td><span>{device['Co2Min']['Value']}</span><span className='time-label'>{device['Co2Min']['Datetime']}</span></td>
          <td><span>{device['Co2Max']['Value']}</span><span className='time-label'>{device['Co2Max']['Datetime']}</span></td>
          <td><span>{device['Co2Mean']}</span></td>
          <td><span>{device['Co2STD']}</span></td>
        </tr>
        <tr>
          <td><span>c2h2</span></td>
          <td><span>{device['C2h2Min']['Value']}</span><span className='time-label'>{device['C2h2Min']['Datetime']}</span></td>
          <td><span>{device['C2h2Max']['Value']}</span><span className='time-label'>{device['C2h2Max']['Datetime']}</span></td>
          <td><span>{device['C2h2Mean']}</span></td>
          <td><span>{device['C2h2STD']}</span></td>
        </tr>
        <tr>
          <td><span>pm10</span></td>
          <td><span>{device['Pm10Min']['Value']}</span><span className='time-label'>{device['Pm10Min']['Datetime']}</span></td>
          <td><span>{device['Pm10Max']['Value']}</span><span className='time-label'>{device['Pm10Max']['Datetime']}</span></td>
          <td><span>{device['Pm10Mean']}</span></td>
          <td><span>{device['Pm10STD']}</span></td>
        </tr>
        <tr>
          <td><span>pm100</span></td>
          <td><span>{device['Pm100Min']['Value']}</span><span className='time-label'>{device['Pm100Min']['Datetime']}</span></td>
          <td><span>{device['Pm100Max']['Value']}</span><span className='time-label'>{device['Pm100Max']['Datetime']}</span></td>
          <td><span>{device['Pm100Mean']}</span></td>
          <td><span>{device['Pm100STD']}</span></td>
        </tr>
        <tr>
          <td><span>tvoc</span></td>
          <td><span>{device['TvocMin']['Value']}</span><span className='time-label'>{device['TvocMin']['Datetime']}</span></td>
          <td><span>{device['TvocMax']['Value']}</span><span className='time-label'>{device['TvocMax']['Datetime']}</span></td>
          <td><span>{device['TvocMean']}</span></td>
          <td><span>{device['TvocSTD']}</span></td>
        </tr>
        <tr>
          <td><span>humidity</span></td>
          <td><span>{device['HumidityMin']['Value']}</span><span className='time-label'>{device['HumidityMin']['Datetime']}</span></td>
          <td><span>{device['HumidityMax']['Value']}</span><span className='time-label'>{device['HumidityMax']['Datetime']}</span></td>
          <td><span>{device['HumidityMean']}</span></td>
          <td><span>{device['HumiditySTD']}</span></td>
        </tr>
        <tr>
          <td><span>temperature</span></td>
          <td><span>{device['TemperatureMin']['Value']}</span><span className='time-label'>{device['TemperatureMin']['Datetime']}</span></td>
          <td><span>{device['TemperatureMax']['Value']}</span><span className='time-label'>{device['TemperatureMax']['Datetime']}</span></td>
          <td><span>{device['TemperatureMean']}</span></td>
          <td><span>{device['TemperatureSTD']}</span></td>
        </tr>
      </tbody>
    </table></div>
    );
  }

  generateWarings() {
    const tables = [];
    let warnings;
    for (let topic in this.state.warningCollection) {
      warnings = this.state.warningCollection[topic];
      tables.push(
        <div>
          <p><strong>{topic}</strong></p>
          <table>
            <thead>
              <tr>
                <th>Warning level</th>
                <th>From</th>
                <th>to</th>
                <th>Duration</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {warnings.map(w => {
                let warningTitle;
                let className = 'preset_level';

                if (w['Type'] === 1) {
                  warningTitle = 'Alert';
                  className += ' alert_level';
                } else if (w['Type'] === 2) {
                  warningTitle = 'Alarm';
                  className += ' alarm_level';
                } else {
                  warningTitle = 'Action';
                  className += ' action_level';
                }

                return <tr>
                  <td><span className={className}>{warningTitle}</span></td>
                  <td><span>{w['RecordCreated']}</span></td>
                  <td><span>{w['RecordUpdated']}</span></td>
                  <td><span>{w['Duration']}</span></td>
                  <td><span>{w['Low']} to {w['High']}</span></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      )
    }

    return tables;
  }

  async updateWaringSummary() {
    const res = await axios.post(`warningreport/${this.date}`);

    try {
      const project = res.data['projects']['1'];

      const hourlyAlert = project['HourlyAlert'];
      const hourlyAlarm = project['HourlyAlarm'];
      const hourlyAction = project['HourlyAction'];

      this.setState({ barData: BarData.fromData({ hourlyAlert, hourlyAlarm, hourlyAction }) });
      this.setState({ devices: project.Devices });

      const warnings = _.groupBy(project['Warnings'], 'Topic');
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

    let chartDataCollection = [];

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

    for (let device of project['Devices']) {
      axios.post(`chartreport/${device['DeviceID']}/${this.date}`).then(res => {

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


          chartDataCollection.push({ data: ChartData.fromData({ label: 'pm2p5', data: pm2p5Data, aaa: pm2p5Aaa }), device: device['DeviceName'] });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'co', data: coData, aaa: coAaa }), device: device['DeviceName'] });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'co2', data: co2Data, aaa: co2Aaa }), device: device['DeviceName'] });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'c2h2', data: c2h2Data, aaa: c2h2Aaa }), device: device['DeviceName'] });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'pm10', data: pm10Data, aaa: pm10Aaa }), device: device['DeviceName'] });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'pm100', data: pm100Data, aaa: pm100Aaa }), device: device['DeviceName'] });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'tvoc', data: tvocData, aaa: tvocAaa }), device: device['DeviceName'] });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'humidity', data: humData, aaa: humAaa }), device: device['DeviceName'] });
          chartDataCollection.push({ data: ChartData.fromData({ label: 'temperature', data: tempData, aaa: tempAaa }), device: device['DeviceName'] });
        }

        this.setState({ chartDataCollection: chartDataCollection });
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

