import "./commands";

import { Project as Default } from "../../src/styles/default";
import { Project as Shelley } from "../../src/styles/shelley";

const ShelleyDark = `${Default} ${Shelley}`;
document.body.className = ShelleyDark;
