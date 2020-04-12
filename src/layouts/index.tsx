import React, { useEffect } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import style from "./index.st.css";
import { Theme as defaultTheme } from "../projects/default";
import { ThemeBar, changeTheme } from "../projects/themeSelector";

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
      <Link
        to="/"
        style={{
          textDecoration: "none"
        }}
      >
        Home
      </Link>
    </div>
  </div>
);

const DefaultLayout = ({ children }) => (
  <div className={defaultTheme}>
    <>
      <Helmet
        title="Gatsby Default Starter"
        meta={[
          { name: "description", content: "Sample" },
          { name: "keywords", content: "sample, something" }
        ]}
        htmlAttributes={{
          lang: "en"
        }}
      />
      <Header />
      {children}
      <Footer />
    </>
  </div>
);

export default DefaultLayout;
