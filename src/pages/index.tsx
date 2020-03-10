import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
import classnames from "classnames";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../themes/default/css/text.st.css";

// Global styles work with TS like this:
require("./example.css");

import DefaultLayout from "../layouts";
import Text, { H1, H2, H3, P } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import ShelleyBanner from "../components_site/ShelleyBanner/ShelleyBanner";
import Icon from "../components/Icon/Icon";

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
      <ShelleyBanner />

      <Grid variant={1}>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            Synopsis
          </H2>

          <img src="sskhshksk" />
          <img src="sskhshksk" alt="" />
          <h2>h2</h2>
          <h4>h4</h4>
          <label>Hi</label>
          <label htmlFor="hiihs">Hi</label>
          <Icon>
            <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
          </Icon>
          <Icon>
            {/* angle-double-right */}
            <path d="M2 13h2l5-5-5-5h-2l5 5z"></path>
            <path d="M7 13h2l5-5-5-5h-2l5 5z"></path>
          </Icon>

          <Icon>
            {/* info-circle-o */}
            <path d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path>
            <path d="M7 6h2v7h-2v-7z"></path>
            <path d="M7 3h2v2h-2v-2z"></path>
          </Icon>

          <Icon>
            {/* info-circle */}
            <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM9 13h-2v-7h2v7zM9 5h-2v-2h2v2z"></path>
          </Icon>

          <Icon>
            {/* info */}
            <path d="M6 5h4v11h-4v-11z"></path>
            <path d="M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
          </Icon>

          <Icon>
            {/* input */}
            <path d="M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z"></path>
            <path d="M2 6h1v4h-1v-4z"></path>
          </Icon>
          <Icon>
            {/* ellipsis-dots-v */}
            <path d="M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
            <path d="M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
            <path d="M10 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
          </Icon>

          <Icon>
            {/* check.svg */}
            <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
          </Icon>

          <Icon>
            <path d="M965.76 818.56c15.067-11.821 24.657-30.030 24.657-50.479 0-22.916-12.044-43.019-30.147-54.324l-0.27-372.637-64 42.88v329.6c-18.116 11.51-29.963 31.47-29.963 54.198 0 20.246 9.401 38.295 24.075 50.023l-24.192 32.099c-20.65 26.224-33.325 59.576-33.918 95.866l-0.002 78.214h51.84c0.103 0.001 0.225 0.001 0.347 0.001 26.334 0 48.446-18.073 54.61-42.492l21.203-85.509v128h64v-77.44c-0.595-36.424-13.27-69.776-34.18-96.343z"></path>
            <path d="M512 0l-512 256 512 320 512-320-512-256z"></path>
            <path d="M512 640l-320-213.12v109.44c0 58.24 188.16 231.68 320 231.68s320-173.44 320-231.68v-109.44z"></path>
          </Icon>

          <Icon>
            {/* laptop */}
            <path d="M14 11v-9h-12v9h-2v2h16v-2h-2zM10 12h-4v-1h4v1zM13 10h-10v-7h10v7z"></path>
          </Icon>

          <Icon>
            {/* tablet.svg */}
            <path d="M0 2v12h16v-12h-16zM13 13h-11v-10h11v10zM15 9h-1v-2h1v2z"></path>
          </Icon>

          <Icon>
            {/* mobile */}
            <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
          </Icon>

          {/* Try this with new version... */}
          {/* <p className={classnames(text.vol3, text.intro)}>Hello</p> */}
          <P vol={4}>
            Follow the story of a digital nomad and an online entity called
            Shelley as they strive night and day to create something beautiful
            from the carelessly discarded <code>body</code> parts that they have
            found lurking around the internet. Throw the switch!
          </P>

          <H2 uppercase vol={2}>
            Introduction
          </H2>

          <P>
            Shelley would not be possible without Stylable, a style managing
            solution built by a great team over at Wix who describe it as:{" "}
            <q>CSS for components</q>.
          </P>

          <P>
            Stylable reunites us with our inner Zen Garden &apos;skillz&apos;
            with a wonderful feeling of nostalgia with its simple and standards
            aware approach to managing styles.
          </P>
          <P>What is Stylable and why did we choose it?</P>

          <H2 uppercase vol={2}>
            Contents
          </H2>

          <ul className={style.menuList}>
            <Text as="li">
              <Link to="/button/">Button</Link>
            </Text>
            <Text as="li">
              <Link to="/text/">Text</Link>
            </Text>
            <Text as="li">
              <Link to="/blockquote/">Blockquote</Link>
            </Text>
            <Text as="li">
              <Link to="/labels/">Labels</Link>
            </Text>
            <Text as="li">
              <Link to="/inputText/">Input Text</Link>
            </Text>
            <Text as="li">
              <Link to="/inputSelection/">Input Selection</Link>
            </Text>
            <Text as="li">
              <Link to="/visually-hidden/">VisuallyHidden</Link>
            </Text>
          </ul>
        </div>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            About
          </H2>
          <P>
            We found Shelley, a slightly bitter and exacting digital entity,
            moping around the internet looking rather rejected and misunderstood
            but poised with imagination and spirit.
          </P>

          <P>
            Shelley exists for a number of reasons but one of them that has
            &apos;fallen out&apos; is the need to help people with vital
            knowledge communicate it effectively. We wanted to open our work up
            so as to enable others.
          </P>
        </div>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            Treeware 🌲
          </H2>
          <P>
            Planting some trees will solve the ecological disaster that is
            currently unfolding, but it is a conversation starter.
          </P>
          <P>
            What if talking about it everyday is the catalyst required to fix
            it? Have a little think about it; we&apos;ve got time.
          </P>
          <P>
            If you use Shelley then please honour our Treeware license and buy
            some trees. If use this site as a resource or you just like our
            style, perhaps you would consider it too?
          </P>
          <P>
            Have a <em>real</em> conversation about the climate <em>today</em>{" "}
            and <em>everyday</em> until it&apos;s damn well fixed!
          </P>

          <P>
            We have a slightly niche target audiance in that you lot are usually
            fairly science based in you thinking. So you must know deep down in
            your heart of hearts how bad this is but perhaps even unaware that
            you know. Talk about it! It&apos;s not going away, it is sobering;
            but hope lies in action and talking about it is something everyone
            can do. You are not a nut job for
          </P>
        </div>
      </Grid>
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
