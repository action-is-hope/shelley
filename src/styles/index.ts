import { Project as base } from "./default";
import { Project as shelley, Light as light, Dark as dark } from "./shelley";

const themes = {
  base: base,
  shelley: `${base} ${shelley} ${dark}`,
  shelleyLight: `${base} ${shelley} ${light}`,
};

export default themes;
