const messagesFromReactAppListener = (message, sender, response) => {
  const searchBody = (body, searchToken = "") => {
    // break the token
    const searchTokens = searchToken
      .split(",")
      .map((token) => token.trim().toLowerCase());
    try {
      const results = [];
      const table = body.getElementsByClassName("commits-table")?.[0];
      const tableBody = table.getElementsByTagName("tbody")?.[0];
      const tableRows = tableBody.getElementsByTagName("tr");

      // iterate through table rows.
      for (const row of tableRows) {
        // Check row that has class 'merge'
        const isNotMergeCommit =
          row.getAttribute("class") !== "merge" &&
          row.getAttribute("class").split(" ").includes("merge") === false;

        const tdAuthor = row.getElementsByClassName("author")[0];
        const userName = tdAuthor.innerText;

        // check if the author is the commit author
        const match = patternMatch(searchTokens, userName.trim().toLowerCase());
        if (match) {
          const tdCommit = row.getElementsByClassName("commit")[0];
          const href = tdCommit
            .getElementsByTagName("a")[0]
            .getAttribute("href");
          const hrefParts = href.split("/");
          const commit = hrefParts[hrefParts.length - 1];
          results.push({
            userName,
            commit,
            mergeCommit: !isNotMergeCommit,
          });
        }
      }
      return results;
    } catch (error) {
      return [];
    }
  };

  const patternMatch = (tokens, username) => {
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      const regex = new RegExp(token, "g");
      const match = regex.exec(username.toLowerCase());
      if (match?.length > 0) {
        return true;
      }
    }
    return false;
  };

  if (sender.id === chrome.runtime.id && message.from === "PickCommits") {
    response(searchBody(document.body, message.search));
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
