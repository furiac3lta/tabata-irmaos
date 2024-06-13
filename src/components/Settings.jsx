// src/components/Settings.js
import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ onSave }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [repetitions, setRepetitions] = useState(4);
  const [restMinutes, setRestMinutes] = useState(5);
  const [restSeconds, setRestSeconds] = useState(0);
  const [warmupMinutes, setWarmupMinutes] = useState(5);
  const [warmupSeconds, setWarmupSeconds] = useState(0);

  const handleSave = () => {
    onSave(minutes, seconds, repetitions, restMinutes, restSeconds, warmupMinutes, warmupSeconds);
  };

  const handleInputChange = (setter, maxValue) => (e) => {
    const value = Math.min(Math.max(0, Number(e.target.value)), maxValue);
    setter(value);
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="settings-group">
        <label>Work Minutes:</label>
        <input
          type="number"
          value={minutes}
          onChange={handleInputChange(setMinutes, Infinity)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Work Seconds:</label>
        <input
          type="number"
          value={seconds}
          onChange={handleInputChange(setSeconds, 59)}
          min="0"
          max="59"
        />
      </div>
      <div className="settings-group">
        <label>Repetitions:</label>
        <input
          type="number"
          value={repetitions}
          onChange={handleInputChange(setRepetitions, Infinity)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Rest Minutes:</label>
        <input
          type="number"
          value={restMinutes}
          onChange={handleInputChange(setRestMinutes, Infinity)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Rest Seconds:</label>
        <input
          type="number"
          value={restSeconds}
          onChange={handleInputChange(setRestSeconds, 59)}
          min="0"
          max="59"
        />
      </div>
      <div className="settings-group">
        <label>Warmup Minutes:</label>
        <input
          type="number"
          value={warmupMinutes}
          onChange={handleInputChange(setWarmupMinutes, Infinity)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Warmup Seconds:</label>
        <input
          type="number"
          value={warmupSeconds}
          onChange={handleInputChange(setWarmupSeconds, 59)}
          min="0"
          max="59"
        />
      </div>
      <button className="btn-save" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;
