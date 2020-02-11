import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
// Global styles work with TS like this:
require("./example.css");

import Button from "../components/Button/Button";

import DefaultLayout from "../layouts";
import { H1, H2, P, SPAN } from "../components/Text/Text";
import Input from "../components/TextInput/TextInput";
import Logo from "../components_site/Logo/Logo";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema.
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

const IndexPage = ({ data }: IndexPageProps) => {
  return (
    <DefaultLayout>
      <Logo className={style.logo} />
      <div className="bodyCopy">
        {/* <H1 vol={9} uppercase>
          Shelley
        </H1> */}
        {/* How much do you love Shelley? */}
        {/* https://www.businessinsider.com/lego-go-eco-friendly-with-blocks-made-from-sugarcane-2018-8?r=US&IR=T */}
        {/* Shelley, James Camerion was waiting for 3D to get good enough before doing Avatar... This is how we feel about frame work tools, we resisted during the Bootstrap hayday, etc but now with Stylable we feel we can build a UI framework flexible enough that will last us a decent amount of time */}
        <P>Stylable Lego blocks for making websites and tings&hellip;</P>
        <P>
          Earth is at the heart of this library. This is our UI library. We aim
          to be informative yet fun. We aim to build something that allows you
          to implement any design possible.
        </P>
        <P>
          Choosing a UI library to drive the front end is a big deal. You want
          confidence that you can do what you want with it.
        </P>
        <P>
          Build it with us, join our community of fuck all and lets make shit
          happen. Newsletter.
        </P>
        <ul>
          <li>
            <Link to="/button/">Button</Link>
          </li>
          <li>
            <Link to="/text/">Text</Link>
          </li>
          <li>
            <Link to="/input/">Input</Link>
          </li>
          <li>
            <Link to="/visually-hidden/">VisuallyHidden</Link>
          </li>
        </ul>

        <H1 vol={false}>
          <SPAN uppercase>Stylable</SPAN> <br />
          <SPAN vol={6}>React components</SPAN>
        </H1>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
