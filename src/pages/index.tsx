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
          {/* Try this with new version... */}
          {/* <p className={classnames(text.vol3, text.intro)}>Hello</p> */}
          <P vol={4}>
            Follow the story of a digital nomad and an online entity called
            Shelley as they strive night and day to create something beautiful
            from the carelessly discarded <code>body</code> parts that they have
            found lurking around the internet. Throw the switch!
          </P>
          <H2 uppercase vol={2}>
            New to web design?
          </H2>
          <P>
            {/* Those that seek a previous time of Zen */}A digital nomad and a
            relic digital quest taken on of a with some old acquaintances, a You
            will need to remain agile and be ready to React An enchanting tale
            of a eagle eyed web developer who befriended and a Shelley is a
            relic of a previous time striving to put right what once went wrong.
          </P>
          <P>
            relic of a former life that has taken salvation within the internet,
            Shelley on a quest to once again create life from <code>body</code>{" "}
            parts! Together they will forge not only a lasting bond but a
            creation
          </P>
          <P>
            Take back control and rediscover the 'art' of CSS. Stylable allows
            us to use our Zen CSS skills once more. Shit just got interesting...
          </P>

          <ul className={style.menuList}>
            <Text as="li">
              <Link to="/button/">Button</Link>
            </Text>
            <Text as="li">
              <Link to="/text/">Text</Link>
            </Text>
            <Text as="li">
              <Link to="/input/">Input</Link>
            </Text>
            <Text as="li">
              <Link to="/visually-hidden/">VisuallyHidden</Link>
            </Text>
          </ul>

          <P>
            This site is build with Shelley and hopefully will be a useful
            referancre for you. We have tried to be as chatty as possible in our
            CSS files. Wix promote the idea that we should perhaps comment each
            line of CSS indicating it's purpose. This may sound crazy but it
            really helps newcomers to the code base as well as your own
            knowledge in terms of what is happening. It's easy in CSS to hack
            around until stuff works and then leave it. Commenting each line
            forces a deeper understanding.
          </P>

          <P>
            A level of component self awareness that allows for thing to be
            slotted togther without too much glue CSS so as to aid rapid
            prototyping and the building of common pages. However when fine
            tuning and applying design to areas
          </P>

          <P>What sort of info do we need here?</P>
          <P>
            We want to help newbies and even people that are more UX and
            marketing to see how things work?
          </P>
          <P>Get started section of some description is usually a winner.</P>
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

          {/* formed from the residue of a */}
          {/* historic text. */}
          {/* <P>It turns out Shelley is the </P> */}
          <P>Fairly deep stuff for a component library huh? Yeah, we know.</P>
          <P>
            We are buildin this so that we have a go to starter kit that we know{" "}
          </P>
          <P>
            We are building this so we can make projects to help our shared
            world that is simply in danger. Some even speak of a lost cause,
            Shelley however says that she didn't sit there trapped within the
            fibres of a secret edition of Frankenstein. The manuscript cursed
            with the same sort of sourcery of that of Dorians painting only to
            be told that she must accept that humanity will never have heided
            her warning of mans creation long ago. The devil is within.
            manuscipt for hundreds of years finally able to transend into a
            digital being after reading so much scifi
          </P>
          <P>Stylable Lego blocks for making websites and ting</P>
        </div>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            Treeware 🌲
          </H2>
          <P>
            Shelley is under no delusion that planting some trees will solve the
            ecological disaster that is currently unfolding. But it is a
            conversation starter and if we were talking about it every day with
            the seriousness it demands then do you think it would remain a
            problem for long? We must speak, really speak.
          </P>
          <P>Shelley is asking two things of you:</P>
          <ul>
            <Text as="li">Buy some trees</Text>
            <Text as="li">Have a real conversation about the climate.</Text>
          </ul>
          <P>
            At the end of that conversation you can decide on how many trees you
            would like plant.
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
