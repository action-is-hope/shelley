import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";

import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../themes/default/css/text.st.css";

// Global styles work with TS like this:
require("./example.css");

import Button from "../components/Button/Button";

import DefaultLayout from "../layouts";
import { H1, H2, H3, P } from "../components/Text/Text";
import Input from "../components/TextInput/TextInput";
import Logo from "../components_site/Logo/Logo";
import Grid from "../components/Grid/Grid";

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
      <Grid className={style.logoGrid}>
        <Logo className={style.logo} />
      </Grid>

      <Grid variant={1}>
        <P>Stylable Lego blocks for making websites and tings&hellip;</P>
        <P id="test">
          If you want to make websites then you're going to need a User
          Interface. ANd you're going to need to be willing to learn HTML and
          CSS properly. Not like these Boom, you've come to the right place.
          Lets show you around before we scare you off with 'installation
          'backend' devs that dismiss it as benerth them only to cock it up all
          the time. It will pay you back in spades..
        </P>

        <P>
          Much like what is needed now in life we found we needed in tech. A
          simplier way.
        </P>
        <P>
          Stylable's ethos in terms of providing an HTML styling API reminds us
          of the old skool Holy Grail days and CSS Zen garden. Showing our age a
          bit there aren't we! #peek-a-boo, I see you. You see what type of shit
          we had to deal with? You kids don't know you've been born...
          http://www.positioniseverything.net/explorer/peekaboo.html 'Ok
          Boomer!' - Damn you pesky kids! We're actually Millenials, ghetto vet
          Millenials. Regulate mofos!
        </P>
        <P>
          Reading the spec is dull as! Happily you can learn most of what you
          need to know about HTML by learning about Accessibility, which is much
          more interesting because it is relatable to the physical realm. We can
          understand the 'why' of it all.
        </P>
        <H2 uppercase vol={3}>
          Common props
        </H2>
        <H3 uppercase vol={2}>
          Vol
        </H3>
        <P>
          We chose <code>vol</code> over variant because we didn't really like
          ending up in situations where our code looked a bit like this:
        </P>

        <CodeSample>{`<P variant="title2">A large paragraph is fairly common and you can bet the one you have pre-baked into your component as largeParagraph is not the right size for this usecase. Bugger.</P>`}</CodeSample>

        <P>
          It probably doesn't bother other people as much but Shelley is a bit
          fussy and likes to points out that a paragraph is semantically nothing
          like a title so it's flawed.
        </P>

        <P>
          'Volume' is based on the idea that headings 'can be a bit shouty' and
          if headings can be shouty then perhaps we could use a tonal scale use
          such 'shout', 'speak' and 'whisper'.
        </P>

        <P>Shelly said this was a bit 'novel', that's not good.</P>

        <P>
          So we agreed that we would just use a number scale. Shelley likes
          numbers, especially ones below 1.5&#8451; for some reason.
        </P>

        <H3 uppercase vol={2}>
          Variant
        </H3>
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
