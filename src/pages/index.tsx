import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
// Global styles work with TS like this:
require("./example.css");

import Button from "../components/Button/Button";

import DefaultLayout from "../layouts";
import { H1, H2, P, SPAN } from "../components/Text/Text";

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
      <div className="bodyCopy">
        <H1 vol={4}>
          <SPAN uppercase>Stylable</SPAN> <br />
          <SPAN vol={8}>React components</SPAN>
        </H1>
        <ul>
          <li>
            <Link to="/button/">Button</Link>
          </li>
          <li>
            <Link to="/text/">Text</Link>
          </li>
        </ul>
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
