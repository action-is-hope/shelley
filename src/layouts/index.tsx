import React, { useState, useEffect, ReactNode } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { classes as index } from "./index.st.css";
import { Theme as defaultTheme } from "../projects/default";
import { ThemeBar } from "../projects/themeSelector";
import { classes as light } from "../projects/default/light.st.css";
import { classes as dark } from "../projects/default/dark.st.css";
import classnames from "classnames";

const Header = ({
  currentTheme,
  setCurrentTheme
}: {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
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
        <ThemeBar {...{ currentTheme, setCurrentTheme }} />
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

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  // Theme state.
  const [currentTheme, setCurrentTheme] = useState(dark.root);
  useEffect(() => {
    // Set the theme to stored value else dark as default.
    setCurrentTheme(window.localStorage.getItem("currentTheme") || "dark");
  }, []);

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
            class: classnames(
              defaultTheme,
              currentTheme === "light" ? light.root : dark.root
            )
          }}
        />
        <Header {...{ currentTheme, setCurrentTheme }} />
        {children}
        <Footer />
      </>
    </div>
  );
};

export default DefaultLayout;
