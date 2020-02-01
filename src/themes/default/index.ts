import { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";

// Bundle Global CSS
import "./global.st.css";
import "../globalHelpers.st.css";

// Foundation Components
import Button from "./css/button.st.css";
import Blockquote from "./css/blockquote.st.css";
import InputRow from "./css/inputRow.st.css";
import Label from "./css/label.st.css";
import RadioCheckInput from "./css/radioCheckInput.st.css";
import Text from "./css/text.st.css";
import TextInput from "./css/textInput.st.css";

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
export const blockquote = (...values: []) =>
  getClassNames(values, Blockquote, "blockquote");
export const inputRow = (...values: []) =>
  getClassNames(values, InputRow, "inputRow");
export const label = (...values: []) => getClassNames(values, Label, "label");
export const radioCheckInput = (...values: []) =>
  getClassNames(values, RadioCheckInput, "radioCheckInput");
export const text = (...values: []) => getClassNames(values, Text, "text");
export const textInput = (...values: []) =>
  getClassNames(values, TextInput, "textInput");

export const Theme = Default.root;
