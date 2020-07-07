import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
import classnames from "classnames";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../projects/default/css/text.st.css";
import grid from "../projects/default/css/grid.st.css";
import utils from "../projects/default/css/utils.st.css";

// Global styles work with TS like this:
require("./example.css");

import DefaultLayout from "../layouts";
import Text, { H2, H3, P } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import ShelleyBanner from "../components_site/ShelleyBanner/ShelleyBanner";

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

      <Grid tag="main">
        <Grid variant={3}>
          <div className={style.card}>
            <H2 uppercase vol={4}>
              Synopsis
            </H2>

            <P vol={4}>
              Follow the story of a digital nomad and a digital entity called
              Shelley as they strive night and day to create something beautiful
              from the carelessly discarded <code>body</code> parts that they
              have found lurking around the internet. Throw the switch!
            </P>

            <H2 uppercase vol={3}>
              Introduction
            </H2>

            <P>
              Shelley is a fully stylable &apos;foundation level&apos; user
              interface library build in TypeScript with{" "}
              <a href="https://reactjs.org/">React</a> and{" "}
              <a href="https://stylable.io/">Stylable</a> in which you{" "}
              <em>own</em> the styles, 100%. You can use our styles as a base
              and evolve it or make your own from scratch.
            </P>

            <P>
              We strive to excite and enable the passionate, experienced or
              otherwise. We&apos;ve positioned this site to serve as a general
              resource for those that seek knowledge in terms of practical HTML,
              CSS and accessibility. JavaScript or any other language churning
              out HTML is simply a facilitator.
            </P>

            <P>
              This site (link code on Github) is also a living example of
              Shelley in use with the wonderful Gatsby which is a great
              companion when starting out with React.
            </P>

            <H2 uppercase vol={2}>
              Contents @TODO
            </H2>

            <P>
              Each component page first describes the React side of things; then
              we talk about the actual HTML churned out by the component and the
              selectors you have to style it.
            </P>

            <P>
              We are also quite prone to comments so do look through our code
              base, especially our theme when we &apos;finish&apos; it.
            </P>

            <ul className={style.menuList}>
              <Text tag="li">
                <Link to="/button/">Button</Link>
              </Text>
              <Text tag="li">
                <Link to="/text/">Text</Link>
              </Text>
              <Text tag="li">
                <Link to="/grid/">Grid</Link>
              </Text>
              <Text tag="li">
                <Link to="/blockquote/">Blockquote</Link>
              </Text>

              <Text tag="li">
                <Link to="/icon/">Icons</Link>
              </Text>

              <Text tag="li">
                <Link to="/labels/">Labels</Link>
              </Text>
              <Text tag="li">
                <Link to="/inputText/">Input Text</Link>
              </Text>
              <Text tag="li">
                <Link to="/inputSelection/">Input Selection</Link>
              </Text>
              <Text tag="li">
                <Link to="/visually-hidden/">VisuallyHidden</Link>
              </Text>
            </ul>

            <H2 uppercase vol={3}>
              Vision
            </H2>

            <P>
              We need to properly put down what we would like this to serve as
              over and above the technical...
            </P>

            <P>
              Shelley has a lot in common with the{" "}
              <a href="https://material-ui.com/discover-more/vision/">
                Material UI <q>Vision</q>
              </a>{" "}
              especially around accessibility and customisation. We are just
              impatient and feel Stylable gives us what we need now. If
              it&apos;s good for you then great, if not defo checkout{" "}
              <a href="https://material-ui.com/">React Material UI</a>.
            </P>

            <P>
              A desirable goal of this project would be, in the spirit of Zen to
              set up a repo for Shelley themes. We hope we get to it fairly soon
              but there is not point if you don&apos;t like the idea.
            </P>
          </div>
          <div className={style.card}>
            <H2 uppercase vol={4}>
              About
            </H2>

            <P>
              We found Shelley, a slightly bitter and exacting digital entity,
              moping around the internet looking rather rejected and
              misunderstood but poised with imagination and spirit.
            </P>

            <P>
              We made a pact to take all of our anger, bitterness, fear, sorrow
              and general doom with regards to the state of our planetary ship;
              channel it and join the guardians defending her from infinite
              consumption, those imagining and implementing creative solutions
              whilst inspiring past the cynicism to see that we can do better,
              we can live better.
            </P>

            <P>
              What else are we suppose to do? It&apos;s the only ship we have
              and we are quite fond of her and <em>all</em> of her inhabitants.
            </P>

            <P>
              It all starts with{" "}
              <q>
                being the change <em>you</em> want to see in the world
              </q>{" "}
              and it ends where <em>we</em> take it.
            </P>
          </div>
          <div className={style.card}>
            <H2 uppercase vol={3}>
              Status
            </H2>

            <P>
              Currently Shelley is in an <em>alpha</em> phase looking at moving
              into a public <em>beta</em> late Summer 2020.
            </P>

            <P>
              Current focus: Shelley exists mainly as a technical enabler for us
              to build our web apps and get stuff done.
            </P>

            <P>
              Future focus: This will evolve to help facilitate anyone with
              vital knowledge but limited resources to communicate it
              effectively.
            </P>
          </div>
          <div className={style.card}>
            <H2 uppercase vol={3}>
              Treeware 🌲
            </H2>
            <P>
              Planting some trees will not solve the ecological disaster that is
              currently unfolding, but it is a conversation starter.
            </P>

            <P>
              What if talking about nature and our planet everyday is the
              catalyst for real adaptive change within our society. We even
              start to see it now with Covid.
            </P>

            <P>
              Have a <em>real</em> conversation about the climate <em>today</em>{" "}
              and <em>everyday</em> until it&apos;s our kids can breath a clean
              sigh of relief!
            </P>

            <P>
              If you use Shelley then please honour our{" "}
              <a href="https://treeware.earth/">Treeware</a> conditions of use
              and start a forest with us.
            </P>
          </div>
          <div className={style.card}>
            <H2 uppercase vol={3}>
              Support Shelley
            </H2>

            <P>
              Treeware gets us some trees, love that but if you want to help us
              directly that would also be awesome.
            </P>

            <P>
              This Shelley has <strong>nothing</strong> to do with{" "}
              <a href="https://cardanoroadmap.com/en/shelley/">
                era of Shelley
              </a>{" "}
              as part of the{" "}
              <a href="https://www.cardano.org/">Cardano blockchain</a> but we
              dig their style, the naming convention and the coin, ADA 🥰.
            </P>
            {/* <P>
              If you have some ADA kicking around, we&apos;d be happy to accept
              some in support: LINK
            </P> */}
            {/* <P>
              If you are a Brave user we are a registered content creator so
              we&apos;re also accepting your advert erned BAT.
            </P>
            <P>
              If you have no idea what we are talking about you but are
              interested you can help us out by{" "}
              <a href="https://brave.com/ogv266">
                downloading and using Brave browser.
              </a>
              .
            </P> */}

            {/* <P>
              Remember: Beware of fake URLS&apos;s when using your cryto
              services.
            </P> */}
          </div>
        </Grid>
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
