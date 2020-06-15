import React from 'react';
import './App.css';
import Report from './screens/Report';
import axios from 'axios';


// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const params = new URLSearchParams(window.location.search);
const date = params.get('date');
const open_in = params.get('open_in');

if (open_in === 'headless-browser') {
  axios.defaults.baseURL = 'http://web-server/api/user';
} else if (open_in === 'dev-host') {
  axios.defaults.baseURL = 'http://localhost:8080/api/user';
} else {
  axios.defaults.baseURL = 'https://hkcic.creaxtive.com/api/user';
}

// console.log(date);
document.title = `Report ${date}`;

function App() {
  return (
    <div className="App" style={{ padding: '2rem' }}>
      <br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/>
      <h1>CIC Air Monitoring Report</h1>
      <p id="para_cover"> Issue date: <span className="time-label">{date}</span></p>
      <br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/>
      <Report date={date}/>
    </div>
  );
}

export default App;
