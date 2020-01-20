import { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";

// Bundle Global CSS
import "./global.st.css";
import "../globalHelpers.st.css";

// Foundation Components
import Button from "./css/button.st.css";
import TextInput from "./css/textInput.st.css";
import Text from "./css/text.st.css";
import InputRow from "./css/inputRow.st.css";
import Label from "./css/label.st.css";

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
export const text = (...values: []) => getClassNames(values, Text, "text");
export const textInput = (...values: []) =>
  getClassNames(values, TextInput, "textInput");
export const inputRow = (...values: []) =>
  getClassNames(values, InputRow, "inputRow");
export const label = (...values: []) => getClassNames(values, Label, "label");

export const Theme = Default.root;
