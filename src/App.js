import React from 'react';
import './App.css';
import Report from './screens/Report';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/user';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const params = new URLSearchParams(window.location.search);
const date = params.get('date');
// console.log(date);

function App() {
  return (
    <div className="App">
      <h1>CIC Air Mornitoring Report</h1>
      <Report date={date}/>
    </div>
  );
}

export default App;
