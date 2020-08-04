import { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";

// = Bundle 'ALL' () Global
import "./allGlobal.st.css";

// = Foundation Components
import Button from "./button.st.css";
import Blockquote from "./blockquote.st.css";
import ErrorText from "./errorText.st.css";
import Grid from "./grid.st.css";
import HintText from "./hintText.st.css";
import InputBase from "./inputBase.st.css";
import InputSelect from "./inputSelect.st.css";
import InputSelection from "./inputSelection.st.css";
import InputSelectionControl from "./inputSelectionControl.st.css";
import InputText from "./inputText.st.css";
import Label from "./label.st.css";
import Text from "./text.st.css";

// = Project
import Default from "./project.st.css";

// @todo Ask Wix how they do things.
const getStylableClassNames = (
  values: [],
  stylesheet: RuntimeStylesheet,
  rootcls: string
) => {
  const clsArray = values.map((cls: string) => stylesheet.classes[cls] || null);
  return classnames(stylesheet.classes[rootcls], clsArray);
};

// = Foundation Components
export const button = (...values: []) =>
  getStylableClassNames(values, Button, "button");

export const blockquote = (...values: []) =>
  getStylableClassNames(values, Blockquote, "blockquote");

export const grid = (...values: []) =>
  getStylableClassNames(values, Grid, "grid");

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

export const Project = Default.classes.root;
