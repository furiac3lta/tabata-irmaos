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

  const handleInputChange = (setter) => (e) => {
    const value = Math.max(0, Number(e.target.value));
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
          onChange={handleInputChange(setMinutes)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Work Seconds:</label>
        <input
          type="number"
          value={seconds}
          onChange={handleInputChange(setSeconds)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Repetitions:</label>
        <input
          type="number"
          value={repetitions}
          onChange={handleInputChange(setRepetitions)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Rest Minutes:</label>
        <input
          type="number"
          value={restMinutes}
          onChange={handleInputChange(setRestMinutes)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Rest Seconds:</label>
        <input
          type="number"
          value={restSeconds}
          onChange={handleInputChange(setRestSeconds)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Warmup Minutes:</label>
        <input
          type="number"
          value={warmupMinutes}
          onChange={handleInputChange(setWarmupMinutes)}
          min="0"
        />
      </div>
      <div className="settings-group">
        <label>Warmup Seconds:</label>
        <input
          type="number"
          value={warmupSeconds}
          onChange={handleInputChange(setWarmupSeconds)}
          min="0"
        />
      </div>
      <button className="btn-save" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Settings;
