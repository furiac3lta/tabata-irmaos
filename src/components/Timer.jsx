// src/components/Timer.js
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Timer.css';

const Timer = ({ initialMinutes, initialSeconds, repetitions, restMinutes, restSeconds, warmupMinutes, warmupSeconds, onCycleComplete }) => {
  const [minutes, setMinutes] = useState(warmupMinutes);
  const [seconds, setSeconds] = useState(warmupSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isWarmup, setIsWarmup] = useState(true);
  const [cycle, setCycle] = useState(1);
  const [percentage, setPercentage] = useState(0);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (isWarmup) {
            setIsWarmup(false);
            setMinutes(initialMinutes);
            setSeconds(initialSeconds);
            playSound('/sounds/warmup.mp3');
          } else if (isResting) {
            setIsResting(false);
            setMinutes(initialMinutes);
            setSeconds(initialSeconds);
            playSound('/sounds/go.mp3');
            if (cycle < repetitions) {
              setCycle(cycle + 1);
              onCycleComplete();
            } else {
              setIsRunning(false);
            }
          } else {
            setIsResting(true);
            setMinutes(restMinutes);
            setSeconds(restSeconds);
            playSound('/sounds/rest.mp3');
          }
        }
        const totalTime = isWarmup ? warmupMinutes * 60 + warmupSeconds : isResting ? restMinutes * 60 + restSeconds : initialMinutes * 60 + initialSeconds;
        const currentTime = minutes * 60 + seconds;
        setPercentage((1 - currentTime / totalTime) * 100);

        if (minutes === 0 && seconds === 0) {
          setTimeout(() => playSound('/sounds/alarm.mp3'), 3000);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds, minutes, isWarmup, isResting, cycle, repetitions, initialMinutes, initialSeconds, restMinutes, restSeconds, warmupMinutes, warmupSeconds, onCycleComplete]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWarmup(true);
    setIsResting(false);
    setMinutes(warmupMinutes);
    setSeconds(warmupSeconds);
    setCycle(1);
    setPercentage(0);
  };

  const getPathColor = () => {
    if (isWarmup) return 'orange';
    if (isResting) return 'red';
    return 'yellow';
  };

  const getTextColor = () => {
    if (isWarmup) return 'orange';
    if (isResting) return 'red';
    return 'yellow';
  };

  return (
    <div className="timer">
      <div className="timer-display">
        <CircularProgressbar
          value={percentage}
          text={`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
          styles={buildStyles({
            textColor: getTextColor(),
            pathColor: getPathColor(),
            trailColor: "black",
            pathTransitionDuration: 0.5,
          })}
        />
      </div>
      <div className="timer-buttons">
        <button className="btn" onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
        <button className="btn" onClick={handleReset}>Reset</button>
      </div>
      <div className="timer-cycle">
        <span>{isWarmup ? `Warmup...` : isResting ? `Resting...` : `Cycle: ${cycle}/${repetitions}`}</span>
      </div>
    </div>
  );
};

export default Timer;
