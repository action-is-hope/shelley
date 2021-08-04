import type { ReactNode } from "react";
import type React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import BlockquoteDocs from "./components/Blockquote/__blockquoteDocs";
import ButtonDocs from "./components/Button/__buttonDocs";
import ButtonGroupDocs from "./components/ButtonGroup/__buttonGroupDocs";
import GridDocs from "./components/Grid/__gridDocs";
import IconDocs from "./components/Icon/__iconDocs";
import InputSelectionDocs from "./components/InputSelection/__inputSelectionDocs";
import InputTextDocs from "./components/InputText/__inputTextDocs";
import LabelsDocs from "./components/Label/__labelsDocs";
import MenuDocs from "./components/Menu/__menuDocs";
import TextDocs from "./components/Text/__textDocs";
import VisuallyHiddenDocs from "./components/VisuallyHidden/__visuallyHiddenDocs";

import IndexPage from "./pages/index";

interface NavigationItem {
  path: string;
  docs: ReactNode;
  linkText: string;
}

type Navigation = NavigationItem[];

// const data = require("../docs/docs-data.json");
// console.log("hi", data);
export const componentNav: Navigation = [
  {
    path: "/button",
    docs: <ButtonDocs />,
    linkText: "Button",
  },
  {
    path: "/button-group",
    docs: <ButtonGroupDocs />,
    linkText: "Button Group",
  },
  {
    path: "/blockquote",
    docs: <BlockquoteDocs />,
    linkText: "Blockquote",
  },

  {
    path: "/input-text",
    docs: <InputTextDocs />,
    linkText: "Input Text",
  },

  {
    path: "/input-selection",
    docs: <InputSelectionDocs />,
    linkText: "Input Selection",
  },

  {
    path: "/grid",
    docs: <GridDocs />,
    linkText: "Grid",
  },

  {
    path: "/icon",
    docs: <IconDocs />,
    linkText: "Icon",
  },

  {
    path: "/label",
    docs: <LabelsDocs />,
    linkText: "Label",
  },

  {
    path: "/menu",
    docs: <MenuDocs />,
    linkText: "Menu",
  },

  {
    path: "/text",
    docs: <TextDocs />,
    linkText: "Text",
  },

  {
    path: "/visually-hidden",
    docs: <VisuallyHiddenDocs />,
    linkText: "Visually Hidden",
  },
];

const Routes: React.VFC = () => (
  <Switch>
    {componentNav.map((item) => (
      <Route path={item.path} key={item.path}>
        {item.docs}
      </Route>
    ))}
    <Route path="/">
      <IndexPage />
    </Route>
  </Switch>
);

export default Routes;
