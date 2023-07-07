const fs = require("fs");
const reactDocgenTypescript = require("react-docgen-typescript");

const parser = reactDocgenTypescript.withDefaultConfig();
const tsConfigParser = reactDocgenTypescript.withCustomConfig(
  "./tsconfig.json",
  {
    savePropValueAsString: true,
  }
);

const componentInfo = tsConfigParser.parse("./src/Menu/Menu.tsx");

console.log(componentInfo);

fs.writeFileSync(
  "./componentInfo.json",
  JSON.stringify(componentInfo, null, 2)
);

// const docgen = require("react-docgen-typescript");

// Create a parser with the default typescript config and custom docgen options
// const customParser = docgen.withDefaultConfig(options);

// const docs = customParser.parse("./path/to/component");

// // Create a parser with the custom typescript and custom docgen options
// const customCompilerOptionsParser = docgen.withCompilerOptions(
//   { esModuleInterop: true },
//   options
// );

// // Create a parser with using your typescript config
// const tsConfigParser = docgen.withCustomConfig("../tsconfig.json", {
//   savePropValueAsString: true,
// });
