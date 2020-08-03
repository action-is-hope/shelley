import React, { useState, useEffect } from "react";
import { classes as project } from "./project.st.css";
// import { classes as basic } from "./themes/basic.st.css";
import { classes as light } from "./light.st.css";
import { classes as dark } from "./dark.st.css";
// import { classes as inputSelection } from "./inputSelection.st.css";
import { classes as inputSelectionCustom } from "./inputSelectionCustom.st.css";
import InputSelection from "../../components/InputSelection/InputSelection";
import Icon from "../../components/Icon/Icon";
import classnames from "classnames";

const themes = {
  dark: [project.root, dark.root],
  light: [project.root, light.root]
};

// This functions changes the application them by appending the selected
// theme class name to the top of the document. In this application,
// only a single theme is applied at a time.
export function changeTheme(name: keyof typeof themes) {
  localStorage.currentTheme = name;
  document.documentElement.className = themes[name].join(" ");
}

export function ThemeBar({ theme }: { theme?: string }) {
  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {
    const localTheme: any =
      window.localStorage.getItem("currentTheme") || "dark";
    localTheme && setLightTheme(localTheme === "light" ? true : false);
    localTheme && changeTheme(localTheme);
  }, []);

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
      // defaultChecked={lightTheme}
      className={classnames(inputSelectionCustom.darkLightToggle, {
        [inputSelectionCustom.on]: lightTheme
      })}
      // checked={lightTheme}

      onKeyPress={event => {
        if (event.key === "Enter") {
          setLightTheme(!lightTheme);
          changeTheme(lightTheme ? "dark" : "light");
        }
      }}
      onChange={() => {
        setLightTheme(!lightTheme);
        changeTheme(lightTheme ? "dark" : "light");
      }}
      type="checkbox"
    />
  );
}
