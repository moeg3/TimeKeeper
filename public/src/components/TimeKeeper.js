import { useState, useEffect } from "react";

export default function TimeKeeper() {
  const [totalSeconds, setTotalSeconds] = useState(300); // default 5 min
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  const [halfAlertSent, setHalfAlertSent] = useState(false);
  const [oneMinAlertSent, setOneMinAlertSent] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }

    // 半分になったら通知
    if (!halfAlertSent && secondsLeft === Math.floor(totalSeconds / 2)) {
      alert("⏰ Half time reached!");
      console.log("Half time reached");
      setHalfAlertSent(true);
    }

    // 残り1分で通知
    if (!oneMinAlertSent && secondsLeft === 60) {
      alert("⚠️ 1 minute left!");
      console.log("1 minute left");
      setOneMinAlertSent(true);
    }

    // 時間終了
    if (secondsLeft === 0 && isRunning) {
      alert("🎉 Time's up!");
      console.log("Time's up");
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, halfAlertSent, oneMinAlertSent, totalSeconds]);

  // UI helper
  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  };

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
    setHalfAlertSent(false);
    setOneMinAlertSent(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Time Keeper</h2>

      <div>
        <label> Set minutes: </label>
        <input
          type="number"
          min="1"
          max="60"
          onChange={(e) => {
            const sec = e.target.value * 60;
            setTotalSeconds(sec);
            setSecondsLeft(sec);
            reset();
          }}
        />
      </div>

      <h1>{formatTime()}</h1>

      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
