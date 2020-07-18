import React from "react";
import DefaultLayout from "../layouts";
import Text, { P, H2 } from "../components/Text/Text";

import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import { classes as text } from "../projects/default/css/text.st.css";
import { classes as grid } from "../projects/default/css/grid.st.css";
import stylesheet from "../projects/default/css/grid.st.css";
import Blockquote from "../components/Blockquote/Blockquote";
import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS
} from "../components/Button/__button.examples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";
import Button from "../components/Button/Button";

const ButtonDocs = () => {
  const test = React.createRef<HTMLBaseElement>();
  const onButtonClick = () => {
    const node = test.current;
    console.log(node);
    // `current` points to the mounted text input element
    node && node.focus();
  };

  console.log("ST", { stylesheet });

  return (
    <DefaultLayout>
      <PageTitle>Button</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4} className={text.intro}>
          Buttons are not clicked, they are &apos;selected&apos; so forget the
          mouse, the key resides in the keyboard. Deep.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <P>
          Get more familiar with{" "}
          <a href="https://www.w3.org/TR/wai-aria-practices/#button">
            aria and buttons
          </a>{" "}
          as you need, attributes are spread down to the actual{" "}
          <code>button</code> so treat it as a regular HTML button when it comes
          to supporting our friends using assistive tech.
        </P>

        <P>
          Let&apos;s take a look at a few variations, there are a load of
          permutations but you will likely end up using only a few as defined by
          your design system.
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
          In terms of HTML structure, we have a button and an inner button. The
          inner button is pretty key if we are to throw in other things like
          icons inside. We put out vertical alignment on the inner item so as to
          allow an adjacent icon to span the full height.
        </P>

        <P>
          When providing state styles for things like loading or pressed then we
          suggest you use the aria attributes and target the attribute states.
          @todo example
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
          makes it a requirement both in the value that it provides and the law.
        </P>

        <Blockquote
          cite={
            <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-unpredictable-change.html">
              On Input: Understanding SC 3.2.2
            </a>
          }
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
          label then be sure to provide one via the <code>alt</code> prop on the
          icon which mirrors that of an image.
        </P>

        <P>
          Use them sensibly to ensure that your interface is{" "}
          <em>predictable</em>, so no auto-forwarding or context shifting{" "}
          <code>onKeydown</code> or anything weird, <em>use</em> buttons.
        </P>

        <P>
          As mentioned earlier get more familiar with{" "}
          <a href="https://www.w3.org/TR/wai-aria-practices/#button">
            aria and buttons
          </a>{" "}
          as you need but worth a scan read when you have a mo so that light
          goes off in your head when you need it to.
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
