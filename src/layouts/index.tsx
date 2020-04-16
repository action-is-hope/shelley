import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import style from "./index.st.css";
import { ThemeBar, changeTheme } from "../projects/themeSelector";
import project from "../projects/default/project.st.css";
import dark from "../projects/default/dark.st.css";
import classnames from "classnames";

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
        class: classnames(project.root, dark.root)
      }}
    />
    <Header />
    {children}
    <Footer />
  </>
);

export default DefaultLayout;
