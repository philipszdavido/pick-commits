import { useState } from "react";

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
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid grey",
            color: "grey",
          }}
        >
          <span
            style={{
              width: "137px",
              textAlign: "left",
            }}
          >
            USERNAME
          </span>
          <span
            style={{
              width: "100px",
              textAlign: "left",
            }}
          >
            COMMIT
          </span>
          <span></span>
        </div>
        <div
          style={{
            height: "336px",
            overflowY: "auto",
          }}
        >
          {(!commitResults || commitResults?.length === 0) && (
            <div
              style={{
                fontFamily: "Euclid Circular B Bold",
                paddingTop: "10px",
                fontSize: "large",
              }}
            >
              No results to display
            </div>
          )}
          {commitResults?.map(({ commit, userName }, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "5px",
                borderBottom: "1px solid",
              }}
            >
              <span
                style={{
                  width: "150px",
                  overflowWrap: "anywhere",
                  padding: "7px 0",
                  textAlign: "left",
                }}
              >
                {userName}
              </span>
              <span
                style={{
                  width: "150px",
                  overflowWrap: "anywhere",
                  padding: "7px",
                  textAlign: "left",
                }}
              >
                {commit}
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

const DelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23px"
    height="23px"
    viewBox="0 0 23 23"
    version="1.1"
  >
    <g id="surface1">
      <path
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "rgb(0%,0%,0%)",
          fillOpacity: "1",
        }}
        d="M 6.253906 20.125 C 5.855469 20.125 5.515625 19.984375 5.234375 19.707031 C 4.957031 19.425781 4.816406 19.085938 4.816406 18.6875 L 4.816406 5.03125 L 3.832031 5.03125 L 3.832031 3.59375 L 8.335938 3.59375 L 8.335938 2.875 L 14.664062 2.875 L 14.664062 3.59375 L 19.167969 3.59375 L 19.167969 5.03125 L 18.183594 5.03125 L 18.183594 18.6875 C 18.183594 19.070312 18.039062 19.40625 17.753906 19.695312 C 17.464844 19.980469 17.128906 20.125 16.746094 20.125 Z M 16.746094 5.03125 L 6.253906 5.03125 L 6.253906 18.6875 L 16.746094 18.6875 Z M 8.792969 16.628906 L 10.230469 16.628906 L 10.230469 7.066406 L 8.792969 7.066406 Z M 12.769531 16.628906 L 14.207031 16.628906 L 14.207031 7.066406 L 12.769531 7.066406 Z M 6.253906 5.03125 L 6.253906 18.6875 Z M 6.253906 5.03125 "
      />
    </g>
  </svg>
);
