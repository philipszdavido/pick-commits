import { useState } from "react";
import { getSettings } from "../utils";
import Switch from "./Switch";

const Settings = ({ goBack }) => {
  const [localStorageSettings, setLocalStorageSettings] = useState(
    getLocalStorageSettings()
  );
  const [settingKeys, setSettingKeys] = useState(
    Object.keys(localStorageSettings)
  );

  const toggleMergeCommitFn = () => {
    localStorageSettings["mergeCommit"] = !localStorageSettings?.mergeCommit;
    localStorage.setItem("settings", JSON.stringify(localStorageSettings));

    setLocalStorageSettings(localStorageSettings);
    setSettingKeys(Object.keys(localStorageSettings));
  };

  const toggleDarkModeFn = () => {
    localStorageSettings["mode"] =
      localStorageSettings?.mode === "dark" ? "white" : "dark";
    localStorage.setItem("settings", JSON.stringify(localStorageSettings));

    setLocalStorageSettings(localStorageSettings);
    setSettingKeys(Object.keys(localStorageSettings));

    document.documentElement.setAttribute(
      "data-theme",
      localStorageSettings["mode"]
    );
  };

  return (
    <>
      <div className="buttonsContainer">
        <button style={{ width: "39%" }} onClick={goBack}>
          Back
        </button>
      </div>
      <ul>
        <li onClick={toggleMergeCommitFn}>
          <a>
            <span className="mergeCommitText">Include Merge Commits</span>
            <Switch
              onChange={toggleMergeCommitFn}
              checked={localStorageSettings?.[settingKeys?.[0]]}
            />
          </a>
        </li>
        <li onClick={toggleDarkModeFn}>
          <a>
            <span className="mergeCommitText">Dark Theme</span>
            <Switch
              onChange={toggleDarkModeFn}
              checked={localStorageSettings?.[settingKeys?.[1]] === "dark"}
            />
          </a>
        </li>
      </ul>
    </>
  );
};

const getLocalStorageSettings = () => {
  let local = getSettings();

  if (local === null) {
    // init localstorage settings.
    const settings = { mergeCommit: false, mode: "white" };
    localStorage.setItem("settings", JSON.stringify(settings));
    local = settings;
  }

  return local;
};

export default Settings;
