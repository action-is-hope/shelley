// .storybook/ShelleyTheme.js
import { create } from "@storybook/theming";
import shelleyLogo from "./shelley.png";

export default create({
  base: "light",
  brandTitle: "Shelley's Storybook",
  brandUrl: "https://shelley.earth",
  brandImage: shelleyLogo,

  // UI
  appContentBg: "#f1f1f1",

  // Text colors
  textColor: "#cdcfd9",
  textInverseColor: "#333",
});
