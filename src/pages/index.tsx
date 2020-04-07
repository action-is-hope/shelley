import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
import classnames from "classnames";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../projects/default/css/text.st.css";
import grid from "../projects/default/css/grid.st.css";

// Global styles work with TS like this:
require("./example.css");

import DefaultLayout from "../layouts";
import Text, { H1, H2, H3, P } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import ShelleyBanner from "../components_site/ShelleyBanner/ShelleyBanner";
import Icon from "../components/Icon/Icon";
import { sign } from "crypto";
import InputSelect from "../components/InputSelect/InputSelect";

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
            <H2 uppercase vol={3}>
              Synopsis
            </H2>
            {/* 
          <InputSelect id="test" label="test" error="HELLLO" touched>
            <option>test</option>
          </InputSelect>
          <P>
            Explain generic prop set and why we dont alwasy do the same thing...
          </P>
          <img src="sskhshksk" />
          <img src="sskhshksk" alt="" />
          <h2>h2</h2>
          <h4>h4</h4>
          <label>Hi</label>
          <label htmlFor="hiihs">Hi</label> */}

            {/* Try this with new version... */}
            {/* <p className={classnames(text.vol3, text.intro)}>Hello</p> */}
            <P vol={4}>
              Follow the story of a digital nomad and an online entity called
              Shelley as they strive night and day to create something beautiful
              from the carelessly discarded <code>body</code> parts that they
              have found lurking around the internet. Throw the switch!
            </P>

            <H2 uppercase vol={2}>
              Introduction
            </H2>

            <P>
              This is a style library for React but this website also serves as
              a resource who want to know more about HTML, CSS and accessibility
              in general and see some relatable examples in the flesh.
            </P>

            <P>
              Each component page first describes the React side of things, with
              a demo; then we talk about the actual HTML that the component
              churns out and the CSS selectors you have to style it.
            </P>

            <P>
              We also throw in some links to our this sites CSS which you are
              free to use, customise and learn from AND you get to feel a bit
              better about your impact on the world buy buying a tree or
              starting your own forest.
            </P>

            <P>
              Shelley would not be possible without Stylable, a style managing
              solution built by a great team over at Wix who describe it as:{" "}
              <q>CSS for components</q>.
            </P>

            <P>
              Stylable reunites us with our inner Zen Garden &apos;skillz&apos;
              with a wonderful feeling of nostalgia with its simple and
              standards aware approach to managing styles.
            </P>
            <P>What is Stylable and why did we choose it?</P>

            <H2 uppercase vol={2}>
              Contents
            </H2>

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
            {/* 
            <H2 uppercase vol={2}>
              Getting started
            </H2>
            <P>We have build this site as a guide to the components but also to basic html and css and well</P>
            <P>
              If you are completly new to accessibility and even web development
              in general then we are looking to put together{" "}
              <a href="#">a few resources to help get you started</a>.
            </P>
            <P>
              If you are exclusively work in design or a UX and some developer
              has suggested that you use this as a basis then you can checkout
              some speal we wrote for you.
            </P>
            <H2 uppercase vol={2}>
              Theming
            </H2>

            <P>
              Sylyable is build based on the CSS standards where some might see
              limitations we see as forgoing tools that will get us into
              trouble. Conveniance will always screw us, look at the state of
              the planet.
            </P>

            <P>
              You own the styles... We thin at the moment we will offer you our
              main theme but not by way of something that we intend to
              &apos;support&apos;. What do we mean by this?
            </P>
            <P>
              Shelley provides you with <em>unstyled</em> components, this is
              the core of Shelley. We think it makes Shelley stand out a bit and
              we find it very powerful. It&apos;s power comes from it&apos;s
              ability to promote and facilitae simplicity, transparancy, agility
              and flexibility.
            </P> */}
          </div>
          <div className={style.card}>
            <H2 uppercase vol={3}>
              About
            </H2>

            <P>
              We found Shelley, a slightly bitter and exacting digital entity,
              moping around the internet looking rather rejected and
              misunderstood but poised with imagination and spirit.
            </P>

            <P>
              We made a pact to take all of our anger, bitterness, fear and
              sorrow with regards to the state of our planatary ship, channel it
              and join the army of guardians defending her from infinite
              consumption.
            </P>

            <P>
              What the bloody hell else are we supose to do? It&apos;s the only
              ship we have and we are quite fond on it and <em>all</em> of her
              inhabitants.
            </P>

            <P>
              Shelley exists mainly as a technical enabler for us to build our
              web apps and stuff done. but we also want to help anyone with
              vital knowledge to communicate it effectively. We wanted to open
              our work up so as to enable others.
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
              catalyst for real adaptive change within our society. We start to
              see it with Covid.
            </P>

            <P>
              Have a <em>real</em> conversation about the climate <em>today</em>{" "}
              and <em>everyday</em> until it&apos;s our kids can breathe a clean
              air sigh of relief!
            </P>

            <P>
              If you use Shelley then please honour our Treeware license and buy
              some trees. If use this site as a resource or you just like our
              style, perhaps you would consider it too?
            </P>
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
