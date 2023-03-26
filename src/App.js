import Board from './Components/Board';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import ReactSlider from "react-slider";


function App() {
const [sliderCurrentValue, setSliderCurrentValue] = useState(0);
const [finalScores, setFinalScores] = useState([])
const [getScore, setGetScore] = useState(false);
const [liveScore, setLiveScore] = useState(0)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHkTEybbiP4vS1cGSH2SoMmIEBA1oh42A",
  authDomain: "project-5294026152227656596.firebaseapp.com",
  databaseURL: "https://project-5294026152227656596-default-rtdb.firebaseio.com",
  projectId: "project-5294026152227656596",
  storageBucket: "project-5294026152227656596.appspot.com",
  messagingSenderId: "583324195920",
  appId: "1:583324195920:web:45bbe94e4a64afa10ec555"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

useEffect(() => {
  getScores();
}, [getScore]);

function getScores() {
  const scoresRef = ref(db, 'scores');
    onValue(scoresRef, (snapshot) => {
        const data = snapshot.val();
        setFinalScores(data);
    });
}

function writeUserData() {
  set(ref(db, 'scores'), finalScores);
}

const updateFinalScore = (score) => {
  finalScores.push(score);
  const tempArray = [...finalScores]
  setFinalScores(tempArray);
  writeUserData(score); 
};

const scoreAtEachSwipeHandler = (liveScore) => {
  setLiveScore(liveScore)
  percentile(finalScores);
}

const verticalLabels = ["100", "80", "60", "40", "20", "0"];

const percentile = (finalScores) => {
  var count, percentile;

      count = 0;
      for (var j = 0; j < finalScores.length; j++){
        if (liveScore > finalScores[j]){
          count++;
        }
      }
      percentile = (count * 100) / (finalScores.length);
      setSliderCurrentValue(percentile) 
}




  return (
    <div  id="bootstrap-overrides">
      <h1>2048</h1>
      <hr/>

      <div className = "parent-grid">
          <Board updateFinalScore = {updateFinalScore} scoreAtEachSwipe={scoreAtEachSwipeHandler}/>
            <div className="steps-container">
            {verticalLabels.map((item) => {
                return (
                  <div className="step-items">
                    <p>
                      {item}
                    </p>
                  </div>
                )}
            )}
            </div>
            <ReactSlider   
                className="vertical-slider"
                trackClassName="example-track"
                thumbClassName="example-thumb"
                markClassName="example-mark"
                renderThumb={(props, state) => <div className='slider-text'>
                  <div {...props} > <span>You are at {state.valueNow}{state.valueNow % 10 === 3 ? "rd" 
                  : state.valueNow % 10 === 2  ? "nd" 
                  : state.valueNow % 10 === 1  ? "st" 
                  : "th"} percentile now! </span> </div>
                  </div>
                  }
                marks={20}
                min={0}
                max={100}
                orientation="vertical"
                invert
                defaultValue={0}
                disabled={true}
                value={sliderCurrentValue}
                onChange={(value) => setSliderCurrentValue(value)}
              />
      </div>
    </div>   
  );
}

export default App;
