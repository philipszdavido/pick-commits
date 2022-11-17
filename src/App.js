import "./css/App.css";
import "./css/Switch.css";
import { Main } from "./container/Main";
import SettingsIcon from "./components/SettingsIcon";
import { useState } from "react";

function App() {
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const handleSettingsPageFn = () => {
    setShowSettingsPage(!showSettingsPage);
  };

  return (
    <div className="App">
      <header className="App-header">
        <span>Pick Commits</span>
        <span onClick={handleSettingsPageFn} className="header-settings">
          {/* <SettingsIcon /> */}
        </span>
      </header>
      <Main showSettingsPage={showSettingsPage} />
    </div>
  );
}

export default App;
