import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import { P, SPAN, H1, H2, H3 } from "../components/Text/Text";

import Blockquote from "../components/Blockquote/Blockquote";
import CodeSample from "../components_site/CodeSample/CodeSample";

const VisuallyHiddenDocs = () => {
  return (
    <DefaultLayout>
      <div className="bodyCopy">
        <H1 vol={3}>
          <SPAN uppercase>
            <Link to="/">Back to Components</Link>
          </SPAN>{" "}
          <br />
          <SPAN vol={8}>
            <span>{`<`}</span>VisuallyHidden
          </SPAN>
        </H1>
        <P>
          Provides text for screen readers that is visually hidden so as to keep
          your design clean. Often referred to as <code>srOnly</code> elsewhere
          on the web and not to be confused with <code>visibility: hidden</code>
          .
        </P>
        <H2 vol={4}>Quick reference:</H2>
        <CodeSample>
          {`<VisuallyHidden>
  Hidden text that remains accessible and indexable.
</VisuallyHidden>`}
        </CodeSample>
        <H2 vol={6}>What is it for?</H2>
        <P>
          Quite often in web design we find situations where context can be
          derived visually from the design of a page. Consider a typical
          &rsquo;See more&rsquo; link as an example.
        </P>
        <P>
          It&rsquo;s easy to scan the page and figure out where links go based
          on the surrounding text or imagary. But what if you cannot see the
          surrounding text or imagary?
        </P>
        <P>
          Well, in that case you might be using a screen reader. If that{" "}
          <em>is</em> the case; then you will likely be using a cool feature
          that allows you read out all links on a page. Cool huh?
        </P>
        <H2 vol={5}>Example: Crappy link text</H2>
        <P>
          Lest take a look at a typical scenario on the web; a &rsquo;See
          more&rsquo; link without any context.
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
          Assuming the page is littered with this type of crappy link, which is
          usually the case, how does it read using a screen reader?
        </P>
        <Blockquote variant={2}>
          <P>See more... See more... See more... See more... See more...</P>
        </Blockquote>
        <P>
          Ahhh, crap! That&rsquo;s about as useful as expanding the worlds
          airports in the wake of a planetary climate emergency.
        </P>
        <P>
          Yep, this is a reality for a lot of people trying to navigate the web.
          It is one of many things that will likley piss them off when using
          websites that do not adhere to the{" "}
          <a href="https://www.w3.org/TR/WCAG20/">
            Web Content Accessibiliy Guidelines 2.0 (WCAG)
          </a>
          , which covers this type of stuff.
        </P>
        <H3 vol={4}>Fixing the problem</H3>
        <P>
          In the following example, screen readers will announce the entire link
          even though sighted users will simply see &rsquo;See more&rsquo; as{" "}
          <del>God intended</del>, I mean as your <ins>designer requested</ins>.
          😇
        </P>
        <CodeSample>
          {`<h2>What is Climate Change?</h2>
<p>Nasa has a great resource for kids/adults all about climate change.</p>
<img 
  alt="Childrens playground next to a fracking site." 
  src="https://www.flickr.com/photos/momscleanairforce/30013805087/" 
/>
<p>
  <a href="https://climatekids.nasa.gov/climate-change-meaning/">
    See more <span aria-hidden>&hellip;</span>
    <VisuallyHidden>over at the Nasa Climate Kids website.</VisuallyHidden>
  </a>
</p>`}
        </CodeSample>
        <P>
          When choosing link text or building webpages we need awareness and
          empathy when it comes to how others will interact with our creations.
          This is actually a legal requirement for most of us so do it! Unless
          you are the type of person that would refuse to install an access ramp
          to a building. Who does that? Not us!
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
          {`<a href="/great-link-text/">
  More Information<VisuallyHidden>: How to write great link text.</VisuallyHidden>
</a>`}
        </CodeSample>
        <P>
          We really need a new breed of clever CMS, including link text tips and
          decent framing of the &rsquo;why&rsquo;. Continual auditing
          doesn&rsquo;t work; it is admirable but unless you are educating
          authors you are just gonna have the same issues over and over.
        </P>

        <P>
          Make your shizzle accessible - it&rsquo;s your duty as a master
          builder ;-)
        </P>
      </div>
    </DefaultLayout>
  );
};

export default VisuallyHiddenDocs;
