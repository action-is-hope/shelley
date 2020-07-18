import { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";

// Bundle 'ALL' () Global
import "./css/allGlobal.st.css";

// Foundation Components
import Button from "./css/button.st.css";
import Blockquote from "./css/blockquote.st.css";
import Grid from "./css/grid.st.css";
import Label from "./css/label.st.css";
// import FormElements from "./css/formElements.st.css";
import InputSelection from "./css/inputSelection.st.css";
import InputSelectionControl from "./css/inputSelectionControl.st.css";
import InputText from "./css/inputText.st.css";
import InputSelect from "./css/inputSelect.st.css";
import InputBase from "./css/inputBase.st.css";
import Text from "./css/text.st.css";
import ErrorText from "./css/errorText.st.css";
import HintText from "./css/hintText.st.css";

// Application Components
import PropsDemo from "./css/propsDemo.st.css";
import CodeSample from "./css/codeSample.st.css";
import Logo from "./css/logo.st.css";

// classes: Record<string, string>
// type test = Record<string, string>
// Theme
import Default from "./project.st.css";

// @todo Ask Wix how they do things.
const getStylableClassNames = (
  values: [],
  // stylesheet: RuntimeStylesheet,
  stylesheet: RuntimeStylesheet,
  rootcls: string
) => {
  const clsArray = values.map((cls: string) => stylesheet.classes[cls] || null);
  return classnames(stylesheet.classes[rootcls], clsArray);
};

// Foundation Components
export const button = (...values: []) =>
  getStylableClassNames(values, Button, "button");

export const blockquote = (...values: []) =>
  getStylableClassNames(values, Blockquote, "blockquote");

export const grid = (...values: []) =>
  getStylableClassNames(values, Grid, "grid");

// export const formElements = (...values: []) =>
//   getStylableClassNames(values, FormElements, "formElements");

export const label = (...values: []) =>
  getStylableClassNames(values, Label, "label");

export const inputBase = (...values: []) =>
  getStylableClassNames(values, InputBase, "inputBase");

export const inputSelection = (...values: []) =>
  getStylableClassNames(values, InputSelection, "inputSelection");

export const inputSelectionControl = (...values: []) =>
  getStylableClassNames(values, InputSelectionControl, "inputSelectionControl");

export const inputSelect = (...values: []) =>
  getStylableClassNames(values, InputSelect, "inputSelect");

export const text = (...values: []) =>
  getStylableClassNames(values, Text, "text");

export const errorText = (...values: []) =>
  getStylableClassNames(values, ErrorText, "errorText");

export const hintText = (...values: []) =>
  getStylableClassNames(values, HintText, "hintText");

export const inputText = (...values: []) =>
  getStylableClassNames(values, InputText, "inputText");

// Application Components
export const codeSample = (...values: []) =>
  getStylableClassNames(values, CodeSample, "codeSample");

export const propsDemo = (...values: []) =>
  getStylableClassNames(values, PropsDemo, "propsDemo");

export const logo = (...values: []) =>
  getStylableClassNames(values, Logo, "logo");

export const Theme = Default.classes.root;
