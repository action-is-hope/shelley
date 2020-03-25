import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
import classnames from "classnames";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../projects/default/css/text.st.css";

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

      <Grid variant={1}>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            Synopsis
          </H2>

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
          <label htmlFor="hiihs">Hi</label>

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
            <Text tag="li">
              <Link to="/button/">Button</Link>
            </Text>
            <Text tag="li">
              <Link to="/text/">Text</Link>
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

          <H2 uppercase vol={2}>
            Theming
          </H2>

          <P>
            Sylyable is build based on the CSS standards where some might see
            limitations we see as forgoing tools that will get us into trouble.
            Conveniance will always screw us, look at the state of the planet.
          </P>

          <P>
            You own the styles... We thin at the moment we will offer you our
            main theme but not by way of something that we intend to
            &apos;support&apos;. What do we mean by this?
          </P>
          <P>
            Shelley provides you with <em>unstyled</em> components, this is the
            core of Shelley. We think it makes Shelley stand out a bit and we
            find it very powerful. It&apos;s power comes from it&apos;s ability
            to promote and facilitae simplicity, transparancy, agility and
            flexibility.
          </P>
          <P>
            Simplicity: In that our components don&apos;t have to work so hard
            providing ever layout or colour option under the sun. We can focus
            instead on making sure the HTML output is solid whilst
            overengineering our CSS. Lovely.
          </P>
          <P>
            Transparancy: In that our components do not hide anything from you,
            you literally own the CSS, copy, paste, interate. We want you to
            take ownership of it, we need CSS experts again and we need
            libraries that facilitate the art.
          </P>
          <P>
            Agility: In that we have enough tools for us to hit a sweet spot of
            complexity and simplicity enabling us to throw things together
            quickly with easy maintence and can aid other inquisitive souls in a
            spot of rapid prototyping with a real look and feel.
          </P>

          <P>
            Flexibility: In that we have enough tools for us to hit a sweet spot
            of complexity and simplicity enabling us to throw things together
            quickly with easy maintence and can aid other inquisitive souls in a
            spot of rapid prototyping with a real look and feel.
          </P>

          <P>
            Focus: Yes that&apos;s right another F, but in actual fact we do
            like focus in general. When it comes to accessibility we like to
            embrace focus styles as part of the user experiance for everyone and
            in life we need focus now more than ever if we truly wish to stop
            enslaving the very planet that sustains us, <em>our</em> planet.
          </P>

          <P>
            Oh, look that was an accident, we spelled out <em>staff</em>... a
            very powerful weapon... There you have it, Shelley is actually an
            ancient metaphorical staff weapon... from Stargate... it&apos;s the
            best, and you use it in the fight of all fights - life.
          </P>
          <P>
            We have also tried to steer clear of any given nomenclature so that
            your code can remain free of internal naming politics. We use number
            indexes which you can map to your current internal nomencalture, we
            hate naming things.
          </P>
          <P>
            <q>This is the way.</q> <cite>- The Mandalorian</cite>
          </P>
          <P>
            You can copy over our main theme and use it as a base but then idea
            is that you own the CSS.
          </P>
          <P>
            We searched high and low for something that would enable us to build
            a UI library like this whilst keeping the essence of simple web
            design alive by going back to basics as much as possible. The
            answer?
          </P>
          <P>Stylable</P>
          <P>
            If you don&apos;t want to own the CSS then maybe this isn&apos;t for
            you.
          </P>
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
