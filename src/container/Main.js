import { useEffect, useRef, useState } from "react";
import { ShowCommits } from "../components/ShowCommits";
import { PickCommit } from "../components/PickCommit";
import Settings from "../components/Settings";
import SettingsIcon from "../components/SettingsIcon";
import { getSettings, setThemeMode } from "../utils";

export const Main = () => {
  const [loading, setLoading] = useState(false);
  const [commitResults, setCommitsResult] = useState(null);
  const [author, setAuthor] = useState();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    show: false,
  });
  const [pageIndex, setPageIndex] = useState(["pickcommits"]);
  const currentPage = pageIndex[pageIndex.length - 1];
  const interval = useRef();
  const settings = getSettings();
  // set theme mode
  setThemeMode(settings?.mode);

  const handleSearchFn = () => {
    setLoading(true);

    const message = {
      from: "PickCommits",
      search: author,
    };

    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          getResponse(response);
        });
      });
  };

  const getResponse = (results) => {
    setLoading(false);
    setCommitsResult(results);
    moveForward("showcommits");
  };

  const handleOnChangeFn = (evt) => setAuthor(evt.target.value);

  const handleKeyUpFn = ({ key, keyCode }) =>
    key === "Enter" && keyCode === 13 && handleSearchFn();

  const goBack = () => {
    setCommitsResult(null);
    moveBack();
  };

  const alertFn = (msg, type) => {
    setAlert({
      message: msg,
      type,
      show: true,
    });
    interval.current = setTimeout(() => {
      setAlert({
        message: msg,
        type,
        show: false,
      });
      clearInterval(interval.current);
    }, 2000);
  };

  const goBackSettingsFn = () => moveBack();

  useEffect(() => {
    if (alert.show === false) {
      clearTimeout(interval.current);
    }
  }, [alert]);

  const handleSettingsPageFn = () => {
    moveForward("settings");
  };

  const moveForward = (page) => {
    setPageIndex((prevPageIndexes) => [...prevPageIndexes, page]);
  };

  const moveBack = () => {
    // pop out the last in pageIndex
    const currentPageIndex = [...pageIndex];
    currentPageIndex.pop();
    setPageIndex(currentPageIndex);
  };

  return (
    <>
      <header className="App-header">
        <span>Pick Commits</span>
        <span onClick={handleSettingsPageFn} className="header-settings">
          <SettingsIcon />
        </span>
      </header>
      <main>
        <div className="container">
          {alert.show && (
            <span className={`alert alert-${alert.type}`}>{alert.message}</span>
          )}
          {currentPage === "pickcommits" && (
            <PickCommit
              handleOnChangeFn={handleOnChangeFn}
              handleKeyUpFn={handleKeyUpFn}
              handleSearchFn={handleSearchFn}
              loading={loading}
            />
          )}
          {currentPage === "showcommits" /*&& commitResults !== null*/ && (
            <ShowCommits
              alertFn={alertFn}
              goBack={goBack}
              commitResultsData={commitResults}
            />
          )}
          {currentPage === "settings" && <Settings goBack={goBackSettingsFn} />}
        </div>
      </main>
    </>
  );
};
