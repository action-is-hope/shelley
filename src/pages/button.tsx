import React from "react";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import Text, { P, H2 } from "../components/Text/Text";

import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import text from "../projects/default/css/text.st.css";
import grid from "../projects/default/css/grid.st.css";
import Blockquote from "../components/Blockquote/Blockquote";
import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS
} from "../components/Button/__buttonExamples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";
import Button from "../components/Button/Button";

const ButtonDocs = () => {
  const inputEl = React.useRef();
  const test = React.createRef<HTMLBaseElement>();
  const onButtonClick = () => {
    const node = test.current;
    console.log(node);
    // `current` points to the mounted text input element
    node && node.focus();
  };

  return (
    <DefaultLayout>
      <PageTitle>Button</PageTitle>
      <Grid variant={1} tag="main">
        <P vol={4} className={text.intro}>
          Buttons are &apos;selected&apos; not everyone is clicking, lets forget
          the mouse, the key resides in the keyboard. Deep.
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
          as you need, attributes are spread down to the actual{" "}
          <code>button</code> so treat it as an HTML button when it comes to
          supporting our assistive tech friends.
        </P>

        <P>
          Lets take a look at a few variations, there are a load of permutaions
          but you will likely end up using only a few as defined by your design
          system.
        </P>

        <ComponentDemo />

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
          <em>predictable</em>, so no auto-forwarding or context shifting{" "}
          <code>onKeydown</code> or anything weird, <em>use</em> buttons.
        </P>

        <P>
          As mentioned earlier get more familar with{" "}
          <a href="https://www.w3.org/TR/wai-aria-practices/#button">
            aria and buttons
          </a>{" "}
          as you need but it is useful to scan read them now so that light goes
          off in your head when you need it to.
        </P>

        <div className={grid.mid}>
          <Button onClick={() => onButtonClick()} vol={1}>
            Test Ref
          </Button>{" "}
          <Text tag="span" ref={test} tabIndex={1} vol={2}>
            TODO: Remove and add tests for refs in general.
          </Text>
        </div>
      </Grid>
    </DefaultLayout>
  );
};

export default ButtonDocs;
