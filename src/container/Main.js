import { useEffect, useRef, useState } from "react";
import { ShowCommits } from "../components/ShowCommits";
import { PickCommit } from "../components/PickCommit";

export const Main = () => {
  const [loading, setLoading] = useState(false);
  const [commitResults, setCommitsResult] = useState(null);
  const [author, setAuthor] = useState();
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    show: false,
  });

  const interval = useRef();

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
  };

  const handleOnChangeFn = (evt) => {
    setAuthor(evt.target.value);
  };

  const handleKeyUpFn = (evt) => {
    const { key, keyCode } = evt;
    if (key === "Enter" && keyCode === 13) {
      handleSearchFn();
    }
  };

  const goBack = () => {
    setCommitsResult(null);
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

  useEffect(() => {
    if (alert.show === false) {
      clearTimeout(interval.current);
    }
  }, [alert]);

  return (
    <main>
      <div className="container">
        {alert.show && (
          <span className={`alert alert-${alert.type}`}>{alert.message}</span>
        )}
        <PickCommit
          commitResults={commitResults}
          handleOnChangeFn={handleOnChangeFn}
          handleKeyUpFn={handleKeyUpFn}
          handleSearchFn={handleSearchFn}
          loading={loading}
        />
        {commitResults !== null && (
          <ShowCommits
            alertFn={alertFn}
            goBack={goBack}
            commitResultsData={commitResults}
          />
        )}
      </div>
    </main>
  );
};
