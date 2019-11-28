import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
// Global styles seem to work with TS like this.
require("./example.css");

import Button from "../components/Button/Button";

import DefaultLayout from "../layouts";

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
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
      <div className="example">
        <h1>Hello Gatsby</h1>
        <p>
          Welcome to your new <strong>{data.site.siteMetadata.title}</strong>{" "}
          website with Typescript and Stylable support.
        </p>
        <p>Now go build something awesome... Like a button perhaps?</p>
        <div>
          <Button
            className={style.override}
            onClick={() => alert("I like big buttons and I cannot lie!")}
          >
            Boom
          </Button>
        </div>
        <Link to="/page-2/">Go to page 2</Link>
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
