import React from "react";
import project from "./default/project.st.css";
import light from "./default/light.st.css";
import dark from "./default/dark.st.css";
import { classes as inputSelectionCustom } from "./default/css/inputSelectionCustom.st.css";
import InputSelection from "../components/InputSelection/InputSelection";
import Icon from "../components/Icon/Icon";
import classnames from "classnames";

const themes = {
  dark: [project.classes.root, dark.classes.root],
  light: [project.classes.root, light.classes.root]
};

// This functions changes the application them by appending the selected
// theme class name to the top of the document. In this application,
// only a single theme is applied at a time.
// @remove and dumify this so we can reuse it.
export function changeTheme(name: keyof typeof themes) {
  localStorage.currentTheme = name;
  document.documentElement.className = themes[name].join(" ");
}

export function ThemeBar({
  currentTheme,
  setCurrentTheme
}: {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}) {
  const lightOn = currentTheme === "light";

  return (
    <InputSelection
      id="themeSelector"
      variant={false}
      hint="Toggle light mode"
      label={
        <Icon alt="Toggle light mode">
          <path d="M16 8l-2.2-1.6 1.1-2.4-2.7-0.2-0.2-2.7-2.4 1.1-1.6-2.2-1.6 2.2-2.4-1.1-0.2 2.7-2.7 0.2 1.1 2.4-2.2 1.6 2.2 1.6-1.1 2.4 2.7 0.2 0.2 2.7 2.4-1.1 1.6 2.2 1.6-2.2 2.4 1.1 0.2-2.7 2.7-0.2-1.1-2.4 2.2-1.6zM8 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path>
        </Icon>
      }
      defaultChecked={lightOn}
      className={classnames(inputSelectionCustom.darkLightToggle, {
        [inputSelectionCustom.on]: lightOn
      })}
      checked={lightOn}
      onKeyPress={event => {
        if (event.key === "Enter") {
          changeTheme(lightOn ? "dark" : "light");
          setCurrentTheme(lightOn ? "dark" : "light");
        }
      }}
      onChange={() => {
        changeTheme(lightOn ? "dark" : "light");
        setCurrentTheme(lightOn ? "dark" : "light");
      }}
      type="checkbox"
    />
  );
}
