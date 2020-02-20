import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Text, { P, H1, H2, H3 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";

import Blockquote from "../components/Blockquote/Blockquote";
import CodeSample from "../components_site/CodeSample/CodeSample";
import PageTitle from "../components_site/PageTitle/PageTitle";
import text from "../themes/default/css/text.st.css";

const VisuallyHiddenDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>VisuallyHidden</PageTitle>

      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Allows us to leave hidden messages only visible to people using
          assistive technology such as screen readers as well as to search bots
          such as Google.
        </P>

        {/* <P vol={4} className={text.intro}>
          Allows us to help people using assistive technology to more easily use
          features and access content non-sighted users
        </P> */}
        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <CodeSample>
          {`import VisuallyHidden from "@action-is-hope/shelley";
<VisuallyHidden>
  Hidden text that remains accessible and indexable.
</VisuallyHidden>`}
        </CodeSample>
        <P>
          Say hello to those people and help them more easily use features and
          access content. The search engines will make better sense of it too so
          there is a really tangable thing to look at in terms of direct{" "}
          <abbr title="Return on Investment">ROI</abbr> from time spent in this
          area.
        </P>
        <P>
          Often referred to as <code>srOnly</code> elsewhere on the web and not
          to be confused with <code>visibility: hidden</code> which will hide it
          from everybody. Visually is different from visibility but we get
          muddled up sometimes.
        </P>
        <H2 vol={4} uppercase>
          Why?
        </H2>
        <P>
          Quite often in web design we find situations where context can be
          derived visually from the layout / design of a page via the
          surrounding text and imagary.
        </P>
        <P>
          But what if you cannot see the surrounding text or imagary? Imagine
          you have lost all peripheral vision.
        </P>
        <P>
          If you struggle with low vision you might be using a screen reader and
          a cool feature that allows you read out all links on a page. Pretty
          handy on the face of it right?
        </P>

        {/* We have no peripheral vision whatsoever. */}
        <H2 vol={2} uppercase>
          Example: See more
        </H2>
        <P>
          But wait. Lets take an imaginary screen reader for a spin. Consider a
          typical <em>see more...</em> link, like that you&apos;ve seen a
          hundred times, one that gives gives no meaningful context at all, just
          dots, three of them. How thoughtful.
          {/* Lest take a look at a typical scenario on the web; a &rsquo;See
          more&rsquo; link without any context. */}
        </P>

        <CodeSample>
          {`<h2>What is Climate Change?</h2>
<p>Nasa has a great resource for kids/adults all about climate change.</p>
<img 
  alt="Childrens playground next to a fracking site." 
  src="https://www.flickr.com/photos/momscleanairforce/30013805087/" 
/>
<p>
  <a href="https://climatekids.nasa.gov/climate-change-meaning/">See more...</a>
</p>`}
        </CodeSample>
        <P>
          How does a page full of those bad boys sound on our screen reader?
        </P>
        <Blockquote variant={2}>
          <P>See more... See more... See more... See more... See more...</P>
        </Blockquote>
        <P>
          Ahhh, crap! That&rsquo;s about as useful as expanding the worlds
          airports in the wake of a planetary climate emergency.
        </P>
        <P>
          This is just one of many things that would likely piss off our screen
          reader using alter-egos when using websites that do not adhere to the{" "}
          <a href="https://www.w3.org/TR/WCAG20/">
            Web Content Accessibiliy Guidelines 2.0 (WCAG)
          </a>{" "}
          which covers this type of stuff.
        </P>

        <H3 vol={2} uppercase>
          Fixing the problem
        </H3>
        <P>
          If we look at the link in isolation we can make a few changes and
          ensure that it is clear what is on the other end of it. Steps:
        </P>
        <ol>
          <Text as="li">
            Hide the ... from assistive tech via <code>aria-hidden</code>, the
            logical opposite to <code>VisuallyHidden</code>. Handy.
          </Text>
          <Text as="li">
            Define some text for the link itself to give it context and then
            hide it with <code>VisuallyHidden</code>. Done.
          </Text>
        </ol>

        <CodeSample>
          {`<a href="https://climatekids.nasa.gov/climate-change-meaning/">
    See more<span aria-hidden>&hellip;</span>
    <VisuallyHidden>
      over at the Nasa climate kids website.
    </VisuallyHidden>
  </a>`}
        </CodeSample>

        <P>
          Witht the changes in place our screen reader will announce the entire
          link shilst sighted users will simply see &rsquo;See
          more&hellip;&rsquo; as <del>God intended</del>&hellip; I mean as your{" "}
          <ins>designer requested</ins>. 😇
        </P>

        <P>Maybe thigs aren't so easy in a CMS?</P>

        <P>
          When choosing link text or building webpages we need awareness and
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
          citeUrl="https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html"
          cite="Link Purpose (In Context): Understanding Success Criterion 2.4.4"
          accent={2}
          // cite={
          //   <>
          //     Link Purpose (In Context):{" "}
          //     <a
          //       href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html"
          //       target="_blank"
          //       rel="noopener noreferrer"
          //     >
          //       Understanding Success Criterion 2.4.4
          //     </a>
          //   </>
          // }
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
          citeUrl="https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html"
          cite="Link Purpose (In Context): Understanding Success Criterion 2.4.4"
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
          The peeps over there do a great job; it&rsquo;s a tough task, we
          empathise with them. Ultimatley they are trying to make these things
          as exact as possible so as to remove ambiguity. This is essential for
          all implementers, from developers to browser vendors. Handy from a
          legal perspective too if you happen to be suing for non-compliance.
        </P>
        <P>
          So it is exact but it somehow misses the &rsquo;why&rsquo;. We should
          look for the &rsquo;why&rsquo;; accessibility then becomes less of a
          &rsquo;tick box&rsquo; exercise and more thought provoking. Lets have
          a go at rewriting it from the perspective of our glorious users!
        </P>
        <Blockquote cite="Shelley UI - Yes we are quoting ourselves.">
          <H2 vol={4}>
            Accessible Links: Good for your readers, good for{" "}
            <abbr title="Search Engine Optimisation">SEO</abbr>
          </H2>
          <P>
            When reading out links by themsleves, I can get a good idea of where
            the link will take me or what it will do if I select it. Unless
            it&rsquo;s something like a game of &rsquo;snap&rsquo; where it
            would kindda of defeat the point of the game if I can see through
            the card. Obvs. ;-)
          </P>
        </Blockquote>
        <P>
          Put yourself in the position of that screen reader user... Do you
          really want to piss yourself off? Nah, don&rsquo;t do it! An inclusive
          approach will lead to a better experience and superior SEO if you care
          about such things.
        </P>

        <P>
          If you are using a CMS then; for external links you can provide an
          extra field to capture the hidden text and for internal pages you can
          dynamically append the destination page title:
        </P>
        <CodeSample>
          {`<a href="/more-people-switching-to-plant-based-diet/">
  More Information<VisuallyHidden>: Why people are switching to a plant based diet.</VisuallyHidden>
</a>`}
        </CodeSample>
        <P>
          We really need a new breed of clever CMS, including link text tips and
          decent framing of the &rsquo;why&rsquo;. Continual auditing
          doesn&rsquo;t work; it is admirable but unless you are educating
          authors you are just gonna have the same issues over and over.
        </P>

        <P>
          Make your creations accessible - it&rsquo;s your duty as a master
          builder ;-)
        </P>

        {/* <P>
          And don't forget about the search engines too. Is this "clever
          business in a competative market"? #InclusionCapitalisum - Oh do piss
          off capitalisum, this is about improving reach to useful information
          and services not for whatever you want to exploit it for. 😇
        </P> */}
      </Grid>
    </DefaultLayout>
  );
};

export default VisuallyHiddenDocs;
