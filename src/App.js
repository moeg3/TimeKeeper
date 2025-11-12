import { useEffect } from "react";
import { initZoom } from "./zoom";
import TimeKeeper from "./components/TimeKeeper";

function App() {
  useEffect(() => {
    initZoom(); // Zoomアプリとして起動
  }, []);

  return (
    <div className="App">
      <h2>Zoom Time Keeper</h2>
      <TimeKeeper />
    </div>
  );
}

export default App;
