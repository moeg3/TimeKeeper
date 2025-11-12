import React, { useState, useEffect, useRef } from "react";

function TimeKeeper() {
  const [duration, setDuration] = useState(10 * 60); // 秒（デフォルト10分）
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([5 * 60, 2 * 60]); // カスタムラップ
  const [showSettings, setShowSettings] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // タイマー制御
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - (duration - remaining) * 1000;
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newRemaining = duration - elapsed;
        setRemaining(newRemaining > 0 ? newRemaining : 0);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, duration]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  const nextLap = laps.find((lap) => remaining === lap);

  // 次のラップに来たら色変化
  const displayColor = nextLap ? "text-red-400" : "text-green-400";

  return (
    <div className="text-center">
      <div className={`text-5xl mb-4 ${displayColor}`}>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>

      <div>
        <button onClick={() => setIsRunning(true)}>▶ START</button>
        <button onClick={() => setIsRunning(false)}>⏸ STOP</button>
        <button
          onClick={() => {
            setIsRunning(false);
            setRemaining(duration);
          }}
        >
          🔁 RESET
        </button>
        <button onClick={() => setShowSettings(true)}>⚙ SETTINGS</button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-black border-2 border-green-400 p-5 w-80">
            <h3 className="text-green-400 mb-4 text-sm">
              TIMER SETTINGS
            </h3>
            <label className="block text-xs mb-3">
              TIME (min):
              <input
                type="number"
                className="retro-input mt-1"
                value={duration / 60}
                onChange={(e) => setDuration(Number(e.target.value) * 60)}
              />
            </label>
            <label className="block text-xs mb-3">
              LAPS (comma separated, min):
              <input
                type="text"
                className="retro-input mt-1"
                value={laps.map((x) => x / 60).join(",")}
                onChange={(e) =>
                  setLaps(
                    e.target.value
                      .split(",")
                      .map((v) => Number(v.trim()) * 60)
                      .filter((v) => !isNaN(v))
                  )
                }
              />
            </label>
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowSettings(false)}>CLOSE</button>
              <button
                onClick={() => {
                  setRemaining(duration);
                  setShowSettings(false);
                }}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeKeeper;
