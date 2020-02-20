import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import style from "./index.st.css";
import classnames from "classnames";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../themes/default/css/text.st.css";

// Global styles work with TS like this:
require("./example.css");

import Button from "../components/Button/Button";

import DefaultLayout from "../layouts";
import Text, { H1, H2, H3, P } from "../components/Text/Text";
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
        <div className={style.card}>
          <H2 uppercase vol={3}>
            Welcome
          </H2>
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
          <P>Stylable Lego blocks for making websites and ting</P>
        </div>
        <div className={style.card}>
          <H2 uppercase vol={3}>
            Treeware 🌲
          </H2>
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

        <P>Some truths if you are doubting you ability</P>
        <P>
          - The is a direct correlation between a developers 'ability' and their
          access to the internet. They look up a lot of stuff, on that large
          calculator we were told we would not have access to in school.
        </P>
        <P>
          - You won't have to learn a lot about web accessibility to know more
          than most that have worked on the web for years.
        </P>
        <P>Some truths if you are doubting you ability</P>

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

        <P>
          Organise some event to talk to a load of people who might be
          interested in learning. Have a machine (maybe we could get some
          sponsored laptops.)
        </P>
        <P>
          HEy devs, I know lots of you upgrade your machines and buy new ones
          and some of you end up with some machines lying around getting slower
          and less useful as time goes by... How about instead of selling it,
          you lend it to us so we can lend it to soemone with less privalage to
          learn. You can almost become like a mentor to them if yuo want, they
          will give you updates of where they are at. If you are happy with
          their progress maybe continiue to lend it to them... and agree that
          they will buy you a new machine when they can afford it from the cashj
          that they makle.
        </P>

        <P></P>
        <P>
          What do we get? Dunno yet but it seems like there is merit to do
          something like this and where there is good to be done there is sually
          rewards too. The trick is to not look for them, wait for them to
          present themeselves. A better understanding of people outside of our
          circles. Different perspectives and cultures fusing. A better
          understanding of todays issues from a perspective we cannot really
          imagine even if we this we can. We will never be people of colour even
          though we feel most rooted in their company. People of colour have
          alwasy had to be 'progressive', the rest of us are now trying it out
          and realising that to be progressive is to be willing to rip apart
          everything you know. Our education, our the knowledage passed down,
          the books we have read, the news tghat we read social cameleon.
        </P>

        <P>
          People of colour I need your help. I know I don't understand even
          though I try. Shit, 'try', rather a pathetic word to use in the
          context of understading racisum. To try suggests I accept failure as a
          possible outcome whihc allows it to fester with no due date.
        </P>

        <P>
          Maybe I literally can't. I mean, sure I can go somewhere that they
          hate white people and experiance 'racisum' but no that's not rasicum
          at ALL. That's a loathing in response to something that my ancestors
          did or rather something that my bredrin still do. Exploit the
          vuneralble.
        </P>

        <P>
          Where on thsi Earth can I go that I will experiance somebody thinking
          so little of me, my family, my people, my history that they deem
          themselves not superior but so superior, that they coul justify
          chaining me up with orders to tend their land. They would need to be
          so sure of this that they would be able to do this with a clean
          concise. land, if I am 'lucky' I will be the first to to sell my soul
          to become my masters sheep dog where I am forced to inflict pain on my
          bredrin. Where casn I go? All of this hatred would need to be based on
          something immeadiately regonisable visually and even perhaps verbally
          when combined with a birth name.
        </P>

        <P>
          Organise and do some live sessions for those those struggling to catch
          a break... Make it valuable to have been on it. Invite digital peeps
          from youth movements, XR etc etc.
        </P>

        <CodeSample>{`<P variant="title2">A large paragraph is fairly common and you can bet the one you have pre-baked into your component as largeParagraph is not the right size for this usecase. Bugger.</P>`}</CodeSample>
        <P>
          Too much calc? Maybe if every property had some crazy calc value based
          on viewport size then maybe things might get weird if resizing the
          browser... I've not the spare time to find out. I've seen some libs
          where they use a preprocessor to calculate at build time like (3 *
          $spacingUnit)px but I've yet to see many using calc instead calc(3 *
          $spacingUnit). Why would they if they can do it on build? Does that
          mean we shouldn't use them as live calcs?
        </P>
        <P>
          Calc has been around for donkies years, I mean even IE8 supports it.
          That is not true of many things in modern CSS yet alone something as
          powerful as calc. Only now do we see it really being used in
          mainstream CSS. This is likely down to the vh and vw additions which
          can be used in conjuntion with it.
        </P>
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

        <P id="test">
          Sometime we use grid for prototyping something, our grid should get it
          in the ball park and if we can't make it work then we start to cherry
          pick grid variables and apply them directly to our component.
        </P>
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
