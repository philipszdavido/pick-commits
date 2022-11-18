import { useEffect, useState } from "react";
import { getSettings } from "../utils";
import { DelIcon } from "./DelIcon";
import Switch from "./Switch";

export const ShowCommits = ({ commitResultsData = [], goBack, alertFn }) => {
  const settings = getSettings();
  const [commitResults, setCommitsResult] = useState([]);
  const [showMergeCommit, setShowMergeCommit] = useState(
    settings.mergeCommit || false
  );

  const handleCopyFn = () => {
    navigator.clipboard
      .writeText(
        commitResults
          .map((commit) => commit.commit)
          .reverse()
          .join("\n")
      )
      .then(() => {
        alertFn("Successfully copied commits 💯🎉", "success");
      })
      .catch(() => {
        alertFn("Error occured😢", "danger");
      });
  };

  const handleRemoveFn = (index) => {
    setCommitsResult(commitResults.filter((_, i) => i !== index));
  };

  const handleGenCmdFn = () => {
    navigator.clipboard
      .writeText(
        commitResults
          .map((commit) => "git cherry-pick " + commit.commit)
          .reverse()
          .join("\n")
      )
      .then(() => {
        alertFn(
          "Successfully copied generated git-cherry pick command 💯🎉",
          "success"
        );
      })
      .catch(() => {
        alertFn("Error occured😢", "danger");
      });
  };

  const handleMergeCommitFn = () => {
    setShowMergeCommit(!showMergeCommit);
  };

  useEffect(() => {
    if (showMergeCommit) {
      setCommitsResult([...commitResultsData]);
    } else if (showMergeCommit === false) {
      setCommitsResult(
        commitResultsData.filter(
          (commitResult) => commitResult.mergeCommit !== true
        )
      );
    }
  }, [showMergeCommit, commitResultsData]);

  return (
    <>
      <div className="buttonsContainer">
        <button onClick={goBack}>Back</button>
        <button
          disabled={commitResults?.length === 0 || !commitResults}
          onClick={handleCopyFn}
        >
          Copy
        </button>
      </div>
      <div
        style={{
          paddingBottom: "25px",
        }}
      >
        <button
          style={{
            marginBottom: "20px",
          }}
          onClick={handleGenCmdFn}
          disabled={commitResults?.length === 0 || !commitResults}
        >
          Get git cherry-pick command from commits
        </button>

        <a
          style={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
          }}
          onClick={handleMergeCommitFn}
        >
          <Switch onChange={setShowMergeCommit} checked={showMergeCommit} />
          <span
            style={{
              paddingLeft: "3px",
            }}
          >
            Include Merge Commits
          </span>
        </a>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <div className="resultHead">
          <span className="username">USERNAME</span>
          <span className="commit">COMMIT</span>
          <span></span>
        </div>
        <div className="resultContainer">
          {(!commitResults || commitResults?.length === 0) && (
            <div className="noResult">No results to display</div>
          )}
          {commitResults?.map(({ commit, userName, mergeCommit }, index) => (
            <div className="commitResultItem">
              <span className="commitUsername">{userName}</span>
              <span className="commitCommit">
                <span>{commit}</span>

                {mergeCommit === true && (
                  <span
                    class="aui-lozenge merge-lozenge abbreviated"
                    title="This commit is a merge."
                  >
                    M
                  </span>
                )}
              </span>
              <a className="remove" onClick={() => handleRemoveFn(index)}>
                <DelIcon />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
