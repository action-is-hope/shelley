/*
  This is the main export point of the component library.
  It's what will get exposed to other packages when added as a dependency.
*/

/** Default components in alphabetical order */
import Button from "./components/Button/Button";
import Text, {
  Code,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  PRE,
  SPAN
} from "./components/Text/Text";

import { Theme as DefaultTheme } from "./themes/default";

export {
  DefaultTheme,
  Button,
  Text,
  Code,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  PRE,
  SPAN
};
