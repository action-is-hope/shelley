import React from "react";
import DefaultLayout from "../layouts";
import Text, { P, H2, H3 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";

import Blockquote from "../components/Blockquote/Blockquote";
import CodeSample from "../components_site/CodeSample/CodeSample";
import PageTitle from "../components_site/PageTitle/PageTitle";
import { classes as text } from "../styles/default/text.st.css";
import { classes as grid } from "../styles/default/grid.st.css";

// https://www.scottohara.me/blog/2018/05/05/hidden-vs-none.html

const VisuallyHiddenDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>VisuallyHidden</PageTitle>

      <Grid variant={1} formatted>
        <P vol={4} className={text.intro}>
          Allows us to leave hidden messages, visible only to those using
          assistive technologies such as screen readers but not only to
          assistive tech, to search bots as well. Very interesting!
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <CodeSample className={grid.mid}>
          {`import VisuallyHidden from "@action-is-hope/shelley";
<VisuallyHidden>
  Hidden text that remains accessible and indexable.
</VisuallyHidden>`}
        </CodeSample>
        <P>
          Say hello to everyone and help them access content and features more
          easily. The little search bots will make better sense of it too,
          giving us a tangible thing to look at in terms of direct{" "}
          <abbr title="Return on Investment">ROI</abbr> from time spent in this
          area.
        </P>

        <P>
          &apos;Visually Hidden&apos; as a concept is often referred to as{" "}
          <code>
            <abbr title="Screen Reader Only">srOnly</abbr>
          </code>{" "}
          and should not be confused with <code>visibility: hidden</code> which
          will hide stuff from everybody. Visually <em>sounds</em> like
          visibility but it&apos;s not. Got it? Great, let&apos;s move on.
        </P>
        <H2 vol={4} uppercase>
          Why?
        </H2>
        <P>
          Quite often in web design we find situations where context can be
          derived visually from the layout / design of a page via the
          surrounding text and imagery.
        </P>
        <P>
          But what if you cannot see the surrounding text or imagery? Imagine
          you have lost all peripheral vision.
        </P>
        <P>
          If you struggle with low vision, you might be using a screen reader
          and a cool feature that allows you read out all links on a page.
          Pretty handy on the face of it right?
        </P>

        <H2 vol={3} uppercase>
          Example: See more
        </H2>
        <P>
          But wait. Let&apos;s take an imaginary screen reader for a spin.
          Consider a typical <em>see more...</em> link, like that you&apos;ve
          seen a hundred times, one that gives no meaningful context at all,
          just dots, three of them. How thoughtful.
        </P>

        <CodeSample className={grid.mid}>
          {`<h2>What is Climate Change?</h2>
<p>Nasa has a great resource for kids/adults all about climate change.</p>
<p>
  <a href="https://climatekids.nasa.gov/climate-change-meaning/">See more...</a>
</p>`}
        </CodeSample>
        <P>
          How does a page full of those bad boys sound on our screen reader?
        </P>
        <Blockquote variant={1} citeVol={2} cite="Shelley 'Reader'">
          <P vol={2}>
            See more... See more... See more... See more... See more...
          </P>
        </Blockquote>
        <P>
          Oh dear&hellip; so basically the opposite of making sense out of
          context, this makes <em>no</em> sense to screen readers or search
          bots.
        </P>
        <P>
          This is just one of many things that would likely <em>irritate</em>{" "}
          our screen reader using alter-egos when using websites that do not
          adhere to the{" "}
          <a href="https://www.w3.org/TR/WCAG20/">
            Web Content Accessibility Guidelines 2.0 (WCAG)
          </a>{" "}
          which covers this type of stuff.
        </P>

        <P>
          We found a fantastic{" "}
          <a href="https://www.youtube.com/watch?v=ZUGHomfxTlY&feature=youtu.be&t=43">
            demonstration of &apos;click here&apos; links on a screen reader
          </a>
          , which you should check out. On the SEO front:
        </P>

        <Blockquote
          variant={2}
          citeVol={2}
          cite={
            <a href="https://moz.com/learn/seo/anchor-text">
              Source: Anchor text keyword density - Moz, Anchor Text article
            </a>
          }
        >
          <P vol={4}>
            With the Penguin algorithm update, Google began to look more closely
            at keywords in anchor text.
          </P>
        </Blockquote>

        <H3 vol={3} uppercase>
          Fixing the problem
        </H3>
        <P>
          If we look at the link in isolation we can make a few changes and
          ensure that it is clear what is on the other end of it. Steps:
        </P>
        <ol>
          <Text tag="li">
            Hide the ... from assistive tech via <code>aria-hidden</code>, the
            logical opposite to <code>VisuallyHidden</code>. Handy.
          </Text>
          <Text tag="li">
            Define some text for the link itself to give it context and then
            hide it with <code>VisuallyHidden</code>. Done.
          </Text>
        </ol>

        <CodeSample className={grid.mid}>
          {`<a href="https://climatekids.nasa.gov/climate-change-meaning/">
    See more<span aria-hidden>&hellip;</span>
    <VisuallyHidden>
      over at the Nasa climate kids website.
    </VisuallyHidden>
  </a>`}
        </CodeSample>

        <P>
          With the changes in place our screen reader will announce the entire
          link whilst sighted users will simply see &apos;See more&hellip;&apos;
          as <del>God intended</del>&hellip; I mean as your{" "}
          <ins>designer requested</ins>. 😇
        </P>

        <P>Maybe things aren&apos;t so easy in a CMS?</P>

        <P>
          When choosing link text or building web pages we need awareness and
          empathy when it comes to how others will interact with our creations.
          This is actually a legal requirement for most of us too!
        </P>
        {/* https://www.youtube.com/watch?v=HceSej_z8Ik
        https://developers.google.com/web/fundamentals/accessibility/how-to-review */}
        <P>
          Lets help you navigate the{" "}
          <abbr
            title="Web Content Accessibiliy
          Guidelines"
          >
            WCAG
          </abbr>
          , in this case we are looking at:
        </P>
        <Blockquote
          cite={
            <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html">
              Link Purpose (In Context): Understanding Success Criterion 2.4.4
            </a>
          }
          variant={2}
        >
          <H2 vol={4}>Navigable: Understanding Guideline 2.4</H2>
          <P>
            Provide ways to help users navigate, find content, and determine
            where they are.
          </P>
        </Blockquote>
        <P>
          But actually more specifically than that we are looking at the success
          criterion of 2.4.4 which states:
        </P>
        <Blockquote
          cite={
            <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html">
              Link Purpose (In Context): Understanding Success Criterion 2.4.4
            </a>
          }
          variant={2}
        >
          <H2 vol={4}>Link Purpose (In Context): Understanding SC 2.4.4</H2>
          <P>
            The purpose of each link can be determined from the link text alone
            or from the link text together with its programmatically determined
            link context, except where the purpose of the link would be
            ambiguous to users in general.
          </P>
        </Blockquote>
        <P>
          FML. How many times did you have to read that? Me too! ;-) Yes, these
          do tend to be a little wordy and walk the line in terms of plain and
          simple language; especially if you consider beginners to web
          development and we must...
        </P>
        <P>
          The peeps over there do a great job; it&apos;s a tough task, we
          empathise with them. Ultimately they are trying to make these things
          as exact as possible so as to remove ambiguity. This is essential for
          all implementers, from developers to browser vendors. Handy from a
          legal perspective too if you happen to be holding orgs to account.
        </P>
        <P>
          It is exact, but it somehow misses the &apos;why&apos;. We should
          always look for the &apos;why&apos;; accessibility then becomes less
          of a &apos;tick box&apos; exercise and more thought provoking. Lets
          have a go at rewriting it from the perspective of our glorious users!
        </P>

        {/* https://offset.earth/about   */}
        <Blockquote variant={2}>
          <P>
            When reading out links by themselves, I can get a good idea of where
            the link will take me or what it will do if I select it. Unless
            it&apos;s something like a game of &apos;snap&apos; where it would
            kinda of defeat the point of the game if I can see through the card.
            :-)
          </P>
        </Blockquote>
        <P>
          Put yourself in the position of that screen reader user... An
          inclusive approach will lead to a better experience and superior SEO
          if you care about such things.
        </P>

        <P>
          If you are using a CMS then; for external links you can provide an
          extra field to capture the hidden text and for internal pages you can
          dynamically append the destination page title:
        </P>
        <CodeSample className={grid.mid}>
          {`<a href="/more-people-switching-to-plant-based-diet/">
  More Information<VisuallyHidden>: Why people are switching to a plant based diet.</VisuallyHidden>
</a>`}
        </CodeSample>
        <P>
          We really need a new breed of clever CMS, including link text tips and
          decent framing of the <q>why</q>. Continual auditing doesn&apos;t
          work; it is admirable but unless you are educating authors you are
          just gonna have the same issues over and over.
        </P>

        <P>
          Make your creations accessible - it&apos;s your duty as a master
          builder ;-)
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default VisuallyHiddenDocs;
