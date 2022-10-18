import type { RuntimeStylesheet } from "@stylable/runtime";
import classnames from "classnames";

// = Bundle 'ALL' () Global
import "./allGlobal.st.css";

// = Foundation Components
import { classes as Button } from "./button.st.css";
import { classes as Blockquote } from "./blockquote.st.css";
import { classes as HelpText } from "./helpText.st.css";
import { classes as Grid } from "./grid.st.css";
import { classes as HintText } from "./hintText.st.css";
import { classes as InputBase } from "./inputBase.st.css";
import { classes as InputSelect } from "./inputSelect.st.css";
import { classes as InputSelection } from "./inputSelection.st.css";
import { classes as InputSelectionControl } from "./inputSelectionControl.st.css";
import { classes as InputText } from "./inputText.st.css";
import { classes as Label } from "./label.st.css";
import { classes as Text } from "./text.st.css";
import { classes as Menu } from "./menu.st.css";
import { classes as MenuItem } from "./menuItem.st.css";

// = Project
import { classes as ShelleyDefaultProject } from "./project.st.css";

// @todo Ask Wix how they do things.
const getStylableClassNames = (
  values: [],
  classes: RuntimeStylesheet["classes"],
  rootcls: string
) => {
  const clsArray = values.map((cls: string) => classes[cls] || null);

  return classnames(classes[rootcls], clsArray);
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

export const helpText = (...values: []) =>
  getStylableClassNames(values, HelpText, "helpText");

export const hintText = (...values: []) =>
  getStylableClassNames(values, HintText, "hintText");

export const inputText = (...values: []) =>
  getStylableClassNames(values, InputText, "inputText");

export const menu = (...values: []) =>
  getStylableClassNames(values, Menu, "menu");

export const menuItem = (...values: []) =>
  getStylableClassNames(values, MenuItem, "menuItem");

export const Project = ShelleyDefaultProject.root;
