import { useState } from "react";
import { DelIcon } from "./DelIcon";

export const ShowCommits = ({ commitResultsData = [], goBack, alertFn }) => {
  const [commitResults, setCommitsResult] = useState(commitResultsData);

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
      <button
        style={{
          marginBottom: "20px",
        }}
        onClick={handleGenCmdFn}
      >
        Get git cherry-pick command from commits
      </button>
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
          {commitResults?.map(({ commit, userName }, index) => (
            <div className="commitResultItem">
              <span className="commitUsername">{userName}</span>
              <span className="commitCommit">{commit}</span>
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
