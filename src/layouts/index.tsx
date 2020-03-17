import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import style from "./index.st.css";
import { Theme as defaultTheme } from "../themes/default";

const Header = () => (
  <div className={style.navbar}>
    <div className={style.navbarInner}>
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

const Footer = () => (
  <div className={style.footer}>
    <div className={style.footerContent}>
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
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: "description", content: "Sample" },
        { name: "keywords", content: "sample, something" }
      ]}
    />
    <Header />
    {children}
    <Footer />
  </div>
);

export default DefaultLayout;
