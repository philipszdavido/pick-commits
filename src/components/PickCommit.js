import icon from "./../icon.png";

export const PickCommit = ({
  commitResults,
  handleOnChangeFn,
  handleKeyUpFn,
  handleSearchFn,
  loading,
}) => {
  return (
    <>
      {" "}
      {commitResults === null && (
        <div className="authorInput">
          <img alt="Git Logo" width={90} height={90} src={icon} />
          <input
            autoFocus={true}
            onChange={handleOnChangeFn}
            onKeyUp={handleKeyUpFn}
            placeholder="Type Commit Author here..."
          />

          <button disabled={loading} onClick={handleSearchFn}>
            {loading
              ? "Getting commits from author..."
              : "Get Commits from Author"}
          </button>
        </div>
      )}
    </>
  );
};
