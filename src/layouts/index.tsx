import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { classes as index } from "./index.st.css";
import { Theme as defaultTheme } from "../projects/default";
import { ThemeBar } from "../projects/themeSelector";
// import project from "../projects/default/project.st.css";
// import { classes as basic } from "./themes/basic.st.css";
// import { classes as light } from "../projects/default/light.st.css";
import { classes as dark } from "../projects/default/dark.st.css";
import classnames from "classnames";

const Header = () => (
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
        <ThemeBar />
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

const DefaultLayout = ({ children }: any) => (
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
          lang: "en"
          // @todo fix so no FOUC
          // className: classnames(defaultTheme, dark.root)
        }}
      />
      <Header />
      {children}
      <Footer />
    </>
  </div>
);

export default DefaultLayout;
