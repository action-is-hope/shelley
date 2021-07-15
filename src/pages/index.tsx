import type React from "react";
import { classes } from "./index.st.css";
import { Link } from "react-router-dom";

import Text, { H2, P } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import ShelleyBanner from "../components_site/ShelleyBanner/ShelleyBanner";

import { componentNav } from "../Routes";

const IndexPage: React.VFC = () => {
  return (
    <>
      <ShelleyBanner />

      <Grid tag="main">
        <Grid variant={5}>
          <div className={classes.card}>
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
              Shelley is a fully stylable{" "}
              <a href="https://www.thoughtworks.com/insights/blog/ui-components-design">
                foundation level
              </a>{" "}
              user interface library built in TypeScript with{" "}
              <a href="https://reactjs.org/">React</a> and{" "}
              <a href="https://stylable.io/">Stylable</a> in which you{" "}
              <em>own</em> the styles, 100%. You can use our styles as a base
              and evolve them or make your own from scratch (starter kit to
              come).
            </P>

            <P>
              We strive to excite and enable the passionate; experienced or
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
              Getting started
            </H2>
            <P>
              @todo Something about npm install and a link to the Gatsby / RCA /
              NextJS boilerplate and instructions for retrofit.
            </P>

            <H2 uppercase vol={2}>
              Contents
            </H2>

            <P>
              Each component page first describes the React side of things; then
              we talk about the actual HTML churned out by the component and the
              selectors you have to style it.
            </P>

            <P>
              We are also quite prone to comments so do look through our [LINK]
              code base, especially our theme when we &apos;finish&apos; it.
            </P>

            <ul className={classes.menuList}>
              {componentNav.map((item) => (
                <Text as="li" key={item.path}>
                  <Link to={item.path}>{item.linkText}</Link>
                </Text>
              ))}
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
              impatient and feel Stylable can give us all we need now. If
              it&apos;s useful for you, great! Otherwise defo checkout{" "}
              <a href="https://material-ui.com/">React Material UI</a> or
              [link].
            </P>

            <P>
              A desirable goal of this project would be, in the spirit of{" "}
              <a href="http://www.csszengarden.com/">Zen</a> to set up a repo
              for Shelley themes. We hope we get to it fairly soon, even if
              it&apos;s just Shelleys personal CSS dumping ground.
            </P>
          </div>
          <div className={classes.card}>
            <H2 uppercase vol={4}>
              About
            </H2>

            <P>
              We found Shelley, a slightly bitter and exacting digital entity,
              moping around the internet looking rather rejected and
              misunderstood but poised with imagination and spirit.
            </P>

            <P>
              We made a pact to take all of our bewildering emotion with regards
              to the state of our planetary ship; channel it and join those
              defending her from the barage of infinite consumption.
            </P>

            <P>
              We pledge to demonsrate thoughtfulness through emotional times and
              seek to faciliate those imagining and implementing creative
              solutions whilst inspiring us all past the cynicism.
            </P>
            {/* We are not quite sure what else <em>to</em> do. */}
            <P>
              Earth, <em>our only</em> ship, an heirloom passed down; we must
              keep her afloat for what comes next. This is our duty; all
              planetary debts to be repaid. Savvy?
            </P>

            <P>
              It all starts with{" "}
              <q>
                being the change <em>you</em> want to see in the world
              </q>{" "}
              and it will end where <em>we</em> take it.
            </P>

            {/* <P>
              We do struggle with the what though, many of us know we want
              change but we cannot quite imagine what we want. Start to
              challenge things in your mind, why not Chestnut trees instead of
              roads? No roads? Whaaaat! What might serve in their place?
              Delivery drones, electric shuttle quads and uber style car rentals
              connections perhaps? Miss the &apos;thrill&apos;? Book a trip to
              space.
            </P> */}
          </div>
          <div className={classes.card}>
            <H2 uppercase vol={3}>
              Status
            </H2>

            <P>
              Currently Shelley is in an <em>alpha</em> phase looking at moving
              into a public <em>beta</em> sometime 2021.
            </P>

            <P>
              Current focus: Shelley exists mainly as a technical enabler /
              facilitator for us to build our web apps and get stuff done.
            </P>

            <P>
              Future focus: This will evolve to help facilitate anyone with
              vital knowledge but limited resources to communicate it
              effectively.
            </P>

            <P>
              Obviously this has <strong>nothing</strong> to do with the{" "}
              <a href="https://www.cardano.org/">Cardano&apos;s</a> &apos;era of
              Shelley&apos; but we dig their naming convention and the{" "}
              <a href="https://cointelegraph.com/news/here-comes-shelley-ada-price-excels-with-cardano-upgrade-inbound">
                sustainability aspects of the upgrade.
              </a>
              .
            </P>
          </div>
          <div className={classes.card}>
            <H2 uppercase vol={3}>
              Treeware 🌲 TBC
            </H2>

            <P>
              If you use Shelley then please honour our{" "}
              <a href="https://treeware.earth/">Treeware</a> conditions of use
              and start a forest with us. TBC.
            </P>

            <P>
              Whilst planting some trees will not solve the ecological breakdown
              that is currently unfolding, it is however a conversation starter.
            </P>

            {/* <P>
              If we really talked about nature and safeguading our planets
              future everyday, then perhaps that would be the catalyst for real
              adaptive change.
            </P> */}

            <P>
              Maybe change the conversation for a moment, discover something new
              and have a <em>constructive</em> conversation about the{" "}
              <code>state</code> of our planet today.
            </P>
          </div>
          <div className={classes.card}>
            <H2 uppercase vol={3}>
              Support Shelley
            </H2>

            <P>
              Treeware gets us all some trees; love that, feels good, buuuut if
              you want to help us more directly that would also be awesome too.
              Ways to support us:
            </P>

            <P>TBC</P>

            <P>
              As developers we strive to make our codebase cleaner every time we
              touch it, why? Maintainability for future iterations /
              generations.
            </P>

            <P>
              With that in mind; the best way to support us is to apply that
              same level of pride, thoughtfulness and accounability to your
              planet, throughout life.
            </P>

            <P>
              Make everyday a <em>kickass</em> day!
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
    </>
  );
};

export default IndexPage;
