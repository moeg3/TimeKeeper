import { useEffect } from "react";
import { initZoom } from "./zoom";
import TimeKeeper from "./components/TimeKeeper";
import "./retro.css"; // 🎨 レトロデザインを適用

function App() {
  useEffect(() => {
    initZoom(); // Zoomアプリとして起動
  }, []);

  return (
    <div className="retro-bg flex flex-col items-center justify-center h-screen text-green-400">
      <h2 className="retro-title">ZOOM TIME KEEPER</h2>
      <TimeKeeper />
    </div>
  );
}

export default App;
