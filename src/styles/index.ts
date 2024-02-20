import { Project as base } from "./default/index";
import {
  Project as shelley,
  Light as light,
  Dark as dark,
} from "./shelley/index";

const themes = {
  base: base,
  shelley: `${base} ${shelley} ${dark}`,
  shelleyLight: `${base} ${shelley} ${light}`,
};

export default themes;
