// src/components/Timer.js
import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Timer.css';

const Timer = ({ minutes, seconds, repetitions, restMinutes, restSeconds, warmupMinutes, warmupSeconds }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isWarmingUp, setIsWarmingUp] = useState(true);

  const goSound = useRef(null);
  const restSound = useRef(null);
  const alarmSound = useRef(null);
  const warmupSound = useRef(null);

  useEffect(() => {
    if (isWarmingUp) {
      setTimeLeft(warmupMinutes * 60 + warmupSeconds);
      warmupSound.current.play();
    } else if (isResting) {
      setTimeLeft(restMinutes * 60 + restSeconds);
      restSound.current.play();
    } else {
      setTimeLeft(minutes * 60 + seconds);
      goSound.current.play();
    }
  }, [isWarmingUp, isResting, minutes, seconds, restMinutes, restSeconds, warmupMinutes, warmupSeconds]);

  useEffect(() => {
    if (timeLeft === 0 && !isWarmingUp) {
      alarmSound.current.play();
      if (isResting) {
        setCurrentCycle(currentCycle + 1);
        setIsResting(false);
      } else if (currentCycle < repetitions - 1) {
        setIsResting(true);
      } else {
        setIsRunning(false);
      }
    } else if (timeLeft === 0 && isWarmingUp) {
      setIsWarmingUp(false);
      setIsRunning(true);
    }
  }, [timeLeft, isResting, currentCycle, repetitions, isWarmingUp]);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setIsWarmingUp(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsWarmingUp(false);
    setIsResting(false);
    setTimeLeft(minutes * 60 + seconds);
    setCurrentCycle(0);
  };

  const getPercentage = () => {
    if (isWarmingUp) {
      return (timeLeft / (warmupMinutes * 60 + warmupSeconds)) * 100;
    } else if (isResting) {
      return (timeLeft / (restMinutes * 60 + restSeconds)) * 100;
    } else {
      return (timeLeft / (minutes * 60 + seconds)) * 100;
    }
  };

  const getColor = () => {
    if (isWarmingUp) {
      return "orange";
    } else if (isResting) {
      return "red";
    } else {
      return "yellow";
    }
  };

  return (
    <div className="timer">
      <CircularProgressbar
        value={getPercentage()}
        text={`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}
        styles={buildStyles({
          textColor: getColor(),
          pathColor: getColor(),
          trailColor: '#555',
          pathTransition: 'stroke-dashoffset 0.5s ease 0s',
        })}
      />
      <div className="timer-buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <audio ref={goSound} src="/sounds/go.mp3" />
      <audio ref={restSound} src="/sounds/rest.mp3" />
      <audio ref={alarmSound} src="/sounds/alarm.mp3" />
      <audio ref={warmupSound} src="/sounds/warmup.mp3" />
    </div>
  );
};

export default Timer;
