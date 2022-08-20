/** Import Base project */
import { Project as base } from "./default";
/** import Base compatible project variants */
import { Project as shelley } from "./shelley";

const themes = {
  base: base,
  shelley: `${base} ${shelley}`,
};

export default themes;
