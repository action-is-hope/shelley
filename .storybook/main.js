const path = require("path");

module.exports = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "storybook-addon-rtl",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
  ],
  core: {
    builder: "webpack5",
  },
  // https://github.com/storybookjs/storybook/issues/18094#issuecomment-1134326831
  // Issues updating to 6.5.x of storybook, reverting for now.
  // features: {
  //   previewMdx2: true,
  // },
  presets: [path.resolve(__dirname, "./storybook.config.js")],
  stories: [
    "../src/stories/Introduction.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
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
};
