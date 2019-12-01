import { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";

// Bundle Global CSS
import "../globalHelpers.st.css";

// Foundation Components
import Button from "./css/button.st.css";

// Application Components

// Theme
import Default from "./theme.st.css";

// @todo Ask Wix how they do things.
const getClassNames = (
  values: [],
  stylesheet: RuntimeStylesheet,
  rootcls: string
) => {
  const clsArray = values.map((cls: string) => stylesheet[cls] || null);
  return classnames(stylesheet[rootcls], clsArray);
};

// Components
export const button = (...values: []) =>
  getClassNames(values, Button, "button");

export const Theme = Default.root;
