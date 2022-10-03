import type { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";

// = Foundation Components
import { classes as Button } from "./button.st.css";
import { classes as Blockquote } from "./blockquote.st.css";
import { classes as ErrorText } from "./errorText.st.css";
import { classes as Grid } from "./grid.st.css";
import { classes as HintText } from "./hintText.st.css";
import { classes as InputBase } from "./inputBase.st.css";
import { classes as InputSelect } from "./inputSelect.st.css";
import { classes as InputSelection } from "./inputSelection.st.css";
import { classes as InputSelectionControl } from "./inputSelectionControl.st.css";
import { classes as InputText } from "./inputText.st.css";
import { classes as Label } from "./label.st.css";
import { classes as Menu } from "./menu.st.css";
import { classes as MenuItem } from "./menuItem.st.css";
import { classes as Text } from "./text.st.css";

// = Application Components
import { classes as CodeSample } from "./codeSample.st.css";
import { classes as Logo } from "./logo.st.css";
import { classes as PageTitle } from "./pageTitle.st.css";
import { classes as PropsDemo } from "./propsDemo.st.css";
import { classes as ShelleyBanner } from "./shelleyBanner.st.css";
import { classes as StyleInfo } from "./styleInfo.st.css";

// = Project
import { classes as shelleyProject } from "./project.st.css";

// = Themes
import { classes as light } from "./themes/light.st.css";
import { classes as dark } from "./themes/dark.st.css";

// = Helper to extract the class names.
const getStylableClassNames = (
  values: [],
  classes: RuntimeStylesheet["classes"],
  rootcls: string
) => {
  const clsArray = values.map((cls: string) => classes[cls] || null);
  return classnames(classes[rootcls], clsArray);
};

// = Foundation component exports
export const button = (...values: []) =>
  getStylableClassNames(values, Button, "button");

export const blockquote = (...values: []) =>
  getStylableClassNames(values, Blockquote, "blockquote");

export const errorText = (...values: []) =>
  getStylableClassNames(values, ErrorText, "errorText");

export const grid = (...values: []) =>
  getStylableClassNames(values, Grid, "grid");

export const hintText = (...values: []) =>
  getStylableClassNames(values, HintText, "hintText");

export const inputBase = (...values: []) =>
  getStylableClassNames(values, InputBase, "inputBase");

export const inputSelect = (...values: []) =>
  getStylableClassNames(values, InputSelect, "inputSelect");

export const inputSelection = (...values: []) =>
  getStylableClassNames(values, InputSelection, "inputSelection");

export const inputSelectionControl = (...values: []) =>
  getStylableClassNames(values, InputSelectionControl, "inputSelectionControl");

export const inputText = (...values: []) =>
  getStylableClassNames(values, InputText, "inputText");

export const label = (...values: []) =>
  getStylableClassNames(values, Label, "label");

export const menu = (...values: []) =>
  getStylableClassNames(values, Menu, "menu");

export const menuItem = (...values: []) =>
  getStylableClassNames(values, MenuItem, "menuItem");

export const text = (...values: []) =>
  getStylableClassNames(values, Text, "text");

// Application component exports
export const codeSample = (...values: []) =>
  getStylableClassNames(values, CodeSample, "codeSample");

export const logo = (...values: []) =>
  getStylableClassNames(values, Logo, "logo");

export const pageTitle = (...values: []) =>
  getStylableClassNames(values, PageTitle, "pageTitle");

export const propsDemo = (...values: []) =>
  getStylableClassNames(values, PropsDemo, "propsDemo");

export const shelleyBanner = (...values: []) =>
  getStylableClassNames(values, ShelleyBanner, "shelleyBanner");

export const styleInfo = (...values: []) =>
  getStylableClassNames(values, StyleInfo, "styleInfo");

// = Main classname export
export const Project = shelleyProject.root;

// = Theme exports
export const Light = light.root;
export const Dark = dark.root;
