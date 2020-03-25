import React from "react";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import { P, H2 } from "../components/Text/Text";

import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import text from "../projects/default/css/text.st.css";
import Blockquote from "../components/Blockquote/Blockquote";
import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS
} from "../components/Button/__buttonExamples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";

const ButtonDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Button</PageTitle>
      <Grid variant={2}>
        <P>Hi</P>
        <P>Hi</P>
        <P>Hi</P>
        <P>Hi</P>
      </Grid>
      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Button&apos;s are sometimes clicked but a more inclusive description
          would be &apos;selected&apos;; not everyone is clicking so we need to
          get that mouse out of our heads... the key resides in the keyboard.
          Deep.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <P>
          Get more familar with{" "}
          <a href="https://www.w3.org/TR/wai-aria-practices/#button">
            aria and buttons
          </a>{" "}
          as you need, attributes are spread so treat it as an HTML button when
          it comes to accessibility.
        </P>

        <P>
          Lets take a look at a few variations, note that we are using different
          Text sizes as best fits the use case. There are a load of permutaions
          but you will likely end up using only a few as definded by your system
          and what works best with your variant designs:
        </P>
      </Grid>

      <Grid variant={1}>
        <ComponentDemo />
      </Grid>

      <Grid variant={1}>
        <P>
          As ever, if this component isn&apos;t really working for you then you
          can make your own, clone ours for a starting point if you need a
          legup. It&apos;s pretty simple, we like simple.
        </P>

        <H2 vol={4} uppercase>
          Styling
        </H2>

        <P>
          We have an inner button which is pretty key if you are going to be
          throwing other things inside a button. We put out vertical alignment
          on the inner item so as to allow an adjacent icon the full height to
          move around in.
        </P>

        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
        />

        <H2 vol={4} uppercase>
          Accessibility, UX &amp; the Law
        </H2>

        <P>
          In terms of WCAG and the law this, this is marked as Level A which
          makes it a requirement in terms both value that it provides and the
          law.
        </P>

        <Blockquote
          citeUrl="https://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-unpredictable-change.html"
          cite="On Input: Understanding SC 3.2.2"
          variant={2}
        >
          <P>
            3.2.2 On Input: Changing the setting of any user interface component
            does not automatically cause a change of context unless the user has
            been advised of the behavior before using the component. (Level A)
          </P>
        </Blockquote>

        <P>
          It&apos;s a <code>button</code>, use it, don&apos;t use a{" "}
          <code>div</code> styled to look like a button, just use a button. Make
          sure it has good focus styles and make sure that it does what it
          should when you test it with the keyboard.
        </P>

        <P>
          If you are throwing an <code>Icon</code> inside with no visible text
          label then be sure to provide one via the <code>label</code> prop.
        </P>

        <P>
          Use them sensibly to ensure that your interface is{" "}
          <em>predictable</em>, so no auto-forwarding <code>onChange</code> or
          anything weird, <em>use</em> buttons.
        </P>

        <P>
          Get more familar with{" "}
          <a href="https://www.w3.org/TR/wai-aria-practices/#button">
            aria and buttons
          </a>{" "}
          as you need...{" "}
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default ButtonDocs;
