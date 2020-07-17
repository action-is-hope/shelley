import React from "react";
import { classes as inputSelectionCustom } from "./default/css/inputSelectionCustom.st.css";
import InputSelection from "../components/InputSelection/InputSelection";
import Icon from "../components/Icon/Icon";
import classnames from "classnames";
// import { changeTheme } from "../layouts/index";
type themeOptions = "light" | "dark";

// export function changeTheme(name: keyof typeof themes) {
//   localStorage.currentTheme = name;
//   document.documentElement.className = themes[name].join(" ");
// }

export function ThemeBar({
  currentTheme,
  toggleTheme
}: {
  currentTheme: themeOptions;
  toggleTheme: (theme: themeOptions) => void;
}) {
  const lightOn = currentTheme === "light";

  const submit = (theme: themeOptions) => {
    toggleTheme(theme);
    // changeTheme(theme);
  };
  return (
    <></>
    // <InputSelection
    //   id="themeSelector"
    //   variant={false}
    //   hint="Toggle light mode"
    //   label={
    //     <Icon alt="Toggle light mode">
    //       <path d="M16 8l-2.2-1.6 1.1-2.4-2.7-0.2-0.2-2.7-2.4 1.1-1.6-2.2-1.6 2.2-2.4-1.1-0.2 2.7-2.7 0.2 1.1 2.4-2.2 1.6 2.2 1.6-1.1 2.4 2.7 0.2 0.2 2.7 2.4-1.1 1.6 2.2 1.6-2.2 2.4 1.1 0.2-2.7 2.7-0.2-1.1-2.4 2.2-1.6zM8 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path>
    //     </Icon>
    //   }
    //   defaultChecked={lightOn}
    //   className={classnames(inputSelectionCustom.darkLightToggle, {
    //     [inputSelectionCustom.on]: lightOn
    //   })}
    //   checked={lightOn}
    //   onKeyPress={event =>
    //     event.key === "Enter" && submit(lightOn ? "dark" : "light")
    //   }
    //   onChange={() => submit(lightOn ? "dark" : "light")}
    //   type="checkbox"
    // />
  );
}
