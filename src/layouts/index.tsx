import React, { useEffect } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import style from "./index.st.css";
import { Theme as defaultTheme } from "../projects/default";
import { ThemeBar, changeTheme } from "../projects/themeSelector";
import project from "../projects/default/project.st.css";
// import { classes as basic } from "./themes/basic.st.css";
import light from "../projects/default/light.st.css";
import dark from "../projects/default/dark.st.css";
import classnames from "classnames";

import PageTitle from "../components_site/PageTitle/PageTitle";

const theme = "light";
// changeTheme(theme);

const Header = () => (
  <div className={style.navbar}>
    <div className={style.inner}>
      <h1 className={style.title}>
        <Link
          to="/"
          style={{
            textDecoration: "none"
          }}
        >
          Shelley
        </Link>
      </h1>
      <div className={style.controls}>
        <ThemeBar />
      </div>
    </div>
  </div>
);

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

const DefaultLayout = ({ children }) => (
  <div className={defaultTheme}>
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
          className: classnames(defaultTheme, dark.root)
        }}
      />
      <Header />
      {children}
      <Footer />
    </>
  </div>
);

export default DefaultLayout;
