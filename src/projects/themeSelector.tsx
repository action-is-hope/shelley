import React, { useState, useEffect } from "react";
import project from "./default/project.st.css";
// import { classes as basic } from "./themes/basic.st.css";
import light from "./default/light.st.css";
import dark from "./default/dark.st.css";
import inputSelection from "./default/css/inputSelection.st.css";
import InputSelection from "../components/InputSelection/InputSelection";
import Icon from "../components/Icon/Icon";
import classnames from "classnames";
// import { classes as gentle } from "./themes/gentle.st.css";

const themes = {
  dark: [project.root, dark.root],
  light: [project.root, light.root]
  // dark: [project.root, basic.root, dark.root],
  // gentle: [project.root, basic.root, gentle.root]
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
    const localTheme: any = window.localStorage.getItem("currentTheme");
    localTheme && setLightTheme(localTheme === "light" ? true : false);
    localTheme && changeTheme(localTheme);
  }, []);

  const iconSelect = 3;

  return (
    <InputSelection
      id="themeSelector"
      variant={3}
      hint="Toggle light mode"
      label={
        <Icon alt="Toggle light mode">
          {/* id="adjust" */}
          {/* <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM2 8c0-3.3 2.7-6 6-6v12c-3.3 0-6-2.7-6-6z"></path> */}
          {/* <g id="sun-o"> */}
          <path d="M16 8l-2.2-1.6 1.1-2.4-2.7-0.2-0.2-2.7-2.4 1.1-1.6-2.2-1.6 2.2-2.4-1.1-0.2 2.7-2.7 0.2 1.1 2.4-2.2 1.6 2.2 1.6-1.1 2.4 2.7 0.2 0.2 2.7 2.4-1.1 1.6 2.2 1.6-2.2 2.4 1.1 0.2-2.7 2.7-0.2-1.1-2.4 2.2-1.6zM8 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path>
        </Icon>
      }
      // labelVisuallyHidden
      defaultChecked={lightTheme}
      className={classnames({ [inputSelection.on]: lightTheme })}
      checked={lightTheme}
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
