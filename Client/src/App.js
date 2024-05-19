import React,{useState} from 'react';
import Prediction from './components/Prediction';
import Generate from './components/Generate';
import Navbar from './components/Navbar';
// import { Route , Routes } from 'react-router-dom';
import Home from './components/Home';
// import MainHeader from './components/MainHeader';


function App() {
  const [prediction, setPrediction] = useState(null);
  const predict = function (value) {
    setPrediction(value);
  }
  return (
    <div>
      <Navbar></Navbar>
      <Home></Home>
      <div className='w-screen h-screen bg-orange-300'>
        <Prediction predict={predict} />
        <Generate prediction={prediction} />
      </div>
    </div>
  );
}

export default App;
