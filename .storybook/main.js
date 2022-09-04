const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",

    "@storybook/addon-a11y",
    "storybook-addon-rtl",
    "@storybook/addon-docs",
    // {
    //   name: "@storybook/addon-docs",
    //   options: {
    //     configureJSX: true,
    //   },
    // },
    "@storybook/addon-essentials",
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  // typescript: {
  //   reactDocgen: "react-docgen-typescript",
  //   reactDocgenTypescriptOptions: {
  //     propFilter: (prop) => {
  //       console.log("Hi", prop);
  //       return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
  //     },
  //     compilerOptions: {
  //       allowSyntheticDefaultImports: false,
  //       esModuleInterop: false,
  //     },
  //   },
  // },
  core: {
    builder: "webpack5",
  },
  presets: [path.resolve(__dirname, "./storybook.config.js")],
};
