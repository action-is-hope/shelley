import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import style from "./index.st.css";
import { Theme as defaultTheme } from "../themes/default";

const Header = () => (
  <div className={style.navbar}>
    <div className={style.navbarInner}>
      <div className={style.logo}>
        <span className={style.logoInner}></span>
      </div>
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
    </div>
  </div>
);

const DefaultLayout = ({ children }) => (
  <div className={defaultTheme}>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
    />
    <link rel="stylesheet" href="https://use.typekit.net/bml4mzu.css"></link>
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0
      }}
    >
      {children}
    </div>
  </div>
);

export default DefaultLayout;
