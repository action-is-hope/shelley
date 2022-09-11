// .storybook/ShelleyTheme.js
import { create } from "@storybook/theming";

export default create({
  base: "light",
  brandTitle: "Shelley's Storybook",
  brandUrl: "https://shelley.earth",
  // brandImage: "",

  // colorPrimary: brand.blue,
  // colorSecondary: brand.blueDark,

  // appBg: "#171a23",
  // appContentBg: brand.white,

  // barTextColor: brand.blueDark,
  // barSelectedColor: brand.blueDark,

  // UI
  // appBg: "white",
  appContentBg: "#f1f1f1",
  // appBorderColor: "grey",
  // appBorderRadius: 4,

  // Typography
  // fontBase: "Helvetica Neue, Helvetica, Arial, sans-serif",
  fontCode: "monospace",

  // Text colors
  textColor: "#cdcfd9",
  textInverseColor: "#333",

  // Toolbar default and active colors
  // barTextColor: "silver",
  // barSelectedColor: "#32baba",
  // barBg: "hotpink",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 4,
});
