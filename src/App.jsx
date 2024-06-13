// src/App.js
import React, { useState } from 'react';
import Timer from './components/Timer';
import Settings from './components/Settings';
import './App.css';

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [repetitions, setRepetitions] = useState(4);
  const [restMinutes, setRestMinutes] = useState(5);
  const [restSeconds, setRestSeconds] = useState(0);
  const [warmupMinutes, setWarmupMinutes] = useState(5);
  const [warmupSeconds, setWarmupSeconds] = useState(0);
  const [showSettings, setShowSettings] = useState(true);

  const handleSaveSettings = (newMinutes, newSeconds, newRepetitions, newRestMinutes, newRestSeconds, newWarmupMinutes, newWarmupSeconds) => {
    setMinutes(newMinutes);
    setSeconds(newSeconds);
    setRepetitions(newRepetitions);
    setRestMinutes(newRestMinutes);
    setRestSeconds(newRestSeconds);
    setWarmupMinutes(newWarmupMinutes);
    setWarmupSeconds(newWarmupSeconds);
    setShowSettings(false);
  };

  const handleCycleComplete = () => {
    // Aquí puedes manejar lo que sucede al completar un ciclo
  };

  return (
    <div className="app">
      <h1>Irmaos Club</h1>
      {showSettings ? (
        <Settings onSave={handleSaveSettings} />
      ) : (
        <Timer
          initialMinutes={minutes}
          initialSeconds={seconds}
          repetitions={repetitions}
          restMinutes={restMinutes}
          restSeconds={restSeconds}
          warmupMinutes={warmupMinutes}
          warmupSeconds={warmupSeconds}
          onCycleComplete={handleCycleComplete}
        />
      )}
      <button className="btn-settings" onClick={() => setShowSettings(true)}>Settings</button>
    </div>
  );
};

export default App;
