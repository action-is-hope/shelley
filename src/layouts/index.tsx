import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { classes as style } from "./layout.st.css";

import { Project as Default } from "../styles/default";

// import {classes as ShelleyDefault} from "../styles/default/project.st.css"
import { Project as Shelley, Light, Dark } from "../styles/shelley";

import { classes as inputSelection } from "../styles/shelley/inputSelection.st.css";
import InputSelection from "../components/InputSelection/InputSelection";
import Icon from "../components/Icon/Icon";

import { Link, useHistory } from "react-router-dom";

import ComboboxSingle from "../components/ComboboxSingle/ComboBoxSingle";

import { componentNav } from "../Routes";

export interface HeaderProps {
  altTheme: boolean;
  changeTheme: () => void;
}

const Header: React.VFC<HeaderProps> = ({ altTheme, changeTheme }) => {
  const items = componentNav.map((item) => {
    return { id: item.path, value: item.linkText };
  });

  const history = useHistory();

  return (
    <div className={style.navbar}>
      <div className={style.inner}>
        <h1 className={style.title}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            Shelley
          </Link>
        </h1>
        <div className={style.controls}>
          <ComboboxSingle
            items={items}
            onChange={(result) => history.push(`${result.id}`)}
          />
          <InputSelection
            id="themeSelector"
            variant={undefined}
            hint="Toggle light mode"
            label={
              <Icon alt="Toggle light mode">
                <path d="M16 8l-2.2-1.6 1.1-2.4-2.7-0.2-0.2-2.7-2.4 1.1-1.6-2.2-1.6 2.2-2.4-1.1-0.2 2.7-2.7 0.2 1.1 2.4-2.2 1.6 2.2 1.6-1.1 2.4 2.7 0.2 0.2 2.7 2.4-1.1 1.6 2.2 1.6-2.2 2.4 1.1 0.2-2.7 2.7-0.2-1.1-2.4 2.2-1.6zM8 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"></path>
              </Icon>
            }
            className={inputSelection.darkLightToggle}
            checked={altTheme}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                changeTheme();
              }
            }}
            onChange={() => {
              changeTheme();
            }}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <div className={style.footer}>
    <div className={style.inner}>
      {/* <Link
        to="/"
        style={{
          textDecoration: "none"
        }}
      >
        Home
      </Link> */}
    </div>
  </div>
);

const DefaultLayout = ({ children }: any) => {
  // Define the class names for out theme.
  const ShelleyDark = `${Default} ${Shelley} ${Dark}`;
  const ShelleyLight = `${Default} ${Shelley} ${Light}`;
  // Toggle 'alternative' theme state.
  const [altTheme, setAltTheme] = useState<boolean>(false);
  // The alternative here is the light theme.
  const currentTheme = altTheme ? ShelleyLight : ShelleyDark;

  const changeTheme = () => {
    // Set local storage named key: value.
    localStorage.currentTheme = !altTheme ? "light" : "dark";
    // Toggle between alt theme on and off.
    setAltTheme(!altTheme);
  };

  useEffect(
    // Set the theme based on what is in local storage.
    () => setAltTheme(window.localStorage.getItem("currentTheme") === "light"),
    [altTheme]
  );
  return (
    <div>
      <Helmet
        title="Shelley - A Stylable User Interface"
        meta={[
          {
            name: "description",
            content:
              "React UI lib: Create something beautiful from recycled body parts.",
          },
          { name: "keywords", content: "sample, something" },
        ]}
        htmlAttributes={{
          lang: "en",
          class: currentTheme,
        }}
      />

      <Header {...{ altTheme, changeTheme }} />

      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
