import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Button from "../components/Button/Button";
import { P, SPAN, H1, H2 } from "../components/Text/Text";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Blockquote from "../components/Blockquote/Blockquote";

const VisuallyHiddenDocs = () => {
  // const inputEl = React.useRef();
  const test = React.createRef<HTMLButtonElement>();
  const onButtonClick = () => {
    const node = test.current;
    // `current` points to the mounted text input element
    node && node.focus();
  };
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
          your design clean. It is the logical opposite of the aria-hidden
          attribute.
        </P>

        <P>
          In the following example, screen readers will announce the entire link
          even though sighted users will simply see 'See more' as <del>God</del>{" "}
          intended, I mean as your <ins>designer</ins> intended.
        </P>

        <SyntaxHighlighter language="jsx" style={atomDark}>
          {`
<h2>What is Climate Change?</h2>
<p>Nasa has a great resource for kids/adults all about climate change...</p>
<p>
  <a href="https://climatekids.nasa.gov/climate-change-meaning/">
    See more<VisuallyHidden> over at the Nasa Climate Kids website.</VisuallyHidden>
  </a>
</p>

        `}
        </SyntaxHighlighter>

        <P>
          Quite often in web design we find situations where context can be
          drawn visually through the design of a page such as a typically vague
          'See more' type of link. It is easy to scan the page and figure out
          where that link might go from the surrounding text or imagary.
        </P>
        <P>But what if you cannot see the surrounding text or imagary?</P>

        <P>
          Well then, in that case you might be using a screen reader and if that
          is the case you will likely be using a cool feature that allows you to
          collect up all the links on a page and read them all out.
        </P>

        <P>
          Cool huh? So how does that sound like if we provide crappy link text?
        </P>

        <Blockquote variant={2}>
          <P>See more, See more, See more, See more, See more...</P>
        </Blockquote>

        <P>
          Yes, that is the reality for a lot of people trying to navigate the
          interwebs. It is one of many things that likley piss them off when
          using websites that do not adhere to the Web Content Accessibiliy
          Guidelines, WCAG which cover this type of stuff.
        </P>

        <P>
          When choosing link text or building webpages we need awareness and
          empathy when it comes to how others will interact with our creations.
          This is actually a legal requirement for most of us so do it! Unless
          you are the type of person that would refuse to install an access ramp
          to a building. Who does that? Not us!
        </P>

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

        <div>
          <Button ref={test} onClick={() => console.log("HI")}>
            Boom
          </Button>
          <Button onClick={() => onButtonClick()}>Boom</Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VisuallyHiddenDocs;
