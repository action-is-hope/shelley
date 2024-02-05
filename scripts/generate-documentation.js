/**
 * WIP: Investigate reactDocgenTypescript for docs support.
 * Outputs a json object containing type information so we can use it outside of storybook.
 * const obj = (arr as any[]).find((o) => o.displayName === "_ActionButton");
 */

const fs = require("fs");
const reactDocgenTypescript = require("react-docgen-typescript");

const tsConfigParser = reactDocgenTypescript.withCustomConfig(
  "./tsconfig.json",
  {
    savePropValueAsString: true,
  }
);

// const componentInfo = tsConfigParser.parse("./src/Blockquote/Blockquote.tsx");
const componentInfo = tsConfigParser.parse("./src/indexLib.ts");

fs.writeFileSync(
  "./componentInfo.json",
  JSON.stringify(componentInfo, null, 2)
);
