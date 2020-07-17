import React, { useState, useEffect, ReactNode } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { classes as index } from "./index.st.css";
import { ThemeBar } from "../projects/themeSelector";
import { classes as project } from "../projects/default/project.st.css";

import { classes as light } from "../projects/default/light.st.css";
import { classes as dark } from "../projects/default/dark.st.css";
import classnames from "classnames";

type themeOptions = "light" | "dark";

const Header = ({
  currentTheme,
  toggleTheme
}: {
  currentTheme: themeOptions;
  toggleTheme: (theme: themeOptions) => void;
}) => (
  <div className={index.navbar}>
    <div className={index.inner}>
      <h1 className={index.title}>
        <Link
          to="/"
          style={{
            textDecoration: "none"
          }}
        >
          Shelley
        </Link>
      </h1>
      <div className={index.controls}>
        <ThemeBar {...{ currentTheme, toggleTheme }} />
      </div>
    </div>
  </div>
);

const Footer = () => (
  <div className={index.footer}>
    <div className={index.inner}>
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

const themes = {
  dark: [project.root, dark.root],
  light: [project.root, light.root]
};

// This functions changes the application them by appending the selected
// theme class name to the top of the document. In this application,
// only a single theme is applied at a time.
// @remove and dumify this so we can reuse it.
export function changeTheme(name: keyof typeof themes) {
  localStorage.currentTheme = name;
  document.documentElement.className = themes[name].join(" ");
}

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  // Theme state.
  const [currentTheme, setCurrentTheme] = useState<themeOptions>("dark");
  useEffect(() => {
    const theme: themeOptions =
      window.localStorage.getItem("currentTheme") === "light"
        ? "light"
        : "dark";
    // Set the theme to stored value else dark as default.
    setCurrentTheme(theme);
  }, []);

  const toggleTheme = (name: themeOptions) => {
    changeTheme(name);
    setCurrentTheme(name);
  };

  return (
    <div>
      <>
        <Helmet
          title="Shelley - A Stylable User Interface"
          meta={[
            {
              name: "description",
              content:
                "React UI lib: Create something beautiful from recycled body parts."
            },
            { name: "keywords", content: "sample, something" }
          ]}
          htmlAttributes={{
            lang: "en",
            class: classnames(themes[currentTheme])
          }}
        />
        <Header {...{ currentTheme, toggleTheme }} />
        {children}
        <Footer />
      </>
    </div>
  );
};

export default DefaultLayout;
