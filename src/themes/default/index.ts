import { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";

// Bundle Global
import "./global.st.css";
import "../globalHelpers.st.css";

// Foundation Components
import Button from "./css/button.st.css";
import Blockquote from "./css/blockquote.st.css";
import Grid from "./css/grid.st.css";
import InputRow from "./css/inputRow.st.css";
import Label from "./css/label.st.css";
import RadioCheckInput from "./css/radioCheckInput.st.css";
import Text from "./css/text.st.css";
import TextInput from "./css/textInput.st.css";

import InputText from "./css/inputText.st.css";

// Application Components
import PropsDemo from "./css/propsDemo.st.css";
import CodeSample from "./css/codeSample.st.css";
import Logo from "./css/logo.st.css";

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

// Foundation Components
export const button = (...values: []) =>
  getClassNames(values, Button, "button");
export const blockquote = (...values: []) =>
  getClassNames(values, Blockquote, "blockquote");
export const grid = (...values: []) => getClassNames(values, Grid, "grid");
export const inputRow = (...values: []) =>
  getClassNames(values, InputRow, "inputRow");
export const label = (...values: []) => getClassNames(values, Label, "label");
export const radioCheckInput = (...values: []) =>
  getClassNames(values, RadioCheckInput, "radioCheckInput");
export const text = (...values: []) => getClassNames(values, Text, "text");
export const textInput = (...values: []) =>
  getClassNames(values, TextInput, "textInput");

export const inputText = (...values: []) =>
  getClassNames(values, InputText, "inputText");
// Application Components
export const codeSample = (...values: []) =>
  getClassNames(values, CodeSample, "codeSample");
export const propsDemo = (...values: []) =>
  getClassNames(values, PropsDemo, "propsDemo");
export const logo = (...values: []) => getClassNames(values, Logo, "logo");

export const Theme = Default.root;
