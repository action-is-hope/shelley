/**
 *
 * @param {*} comments
 * @returns comment string as markdown
 */
function convertCommentsToMarkdown(comments) {
  let result = "";

  if (Array.isArray(comments)) {
    result = comments
      .map((comment) => {
        switch (comment.kind) {
          case "text":
            return comment.text;
          case "code":
            return `${comment.text}`; // Wrap code in backticks
          case "inline-tag":
            if (comment.tag === "@link") {
              // Assuming the target is in the format "URL|Link Text"
              const [url, text] = comment.target.split("|");
              return `[${text}](${url})`; // Convert to markdown link
            }
            return comment.text; // Default text for other inline tags
          case "list":
            // Assuming 'list' items are in a sub-array; adjust as needed
            return comment.items.map((item) => `- ${item}`).join("\n");
          // Add more cases as necessary for other 'kind's
          default:
            return comment.text; // Fallback for unspecified kinds
        }
      })
      .join("");
  } else {
    result = comments;
  }

  return result;
}

module.exports = convertCommentsToMarkdown;
