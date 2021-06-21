import type React from "react";

import DefaultLayout from "../../layouts";
import { P, H2, Grid, Blockquote } from "../../indexLib";
import { classes as text } from "../../styles/default/text.st.css";
// import { classes as grid } from "../../styles/default/grid.st.css";
import { classes as spacing } from "../../styles/default/spacing.st.css";
import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
  Example1
} from "./__buttonGroup.examples";

import PageTitle from "../../components_site/PageTitle/PageTitle";
import StyleInfo from "../../components_site/StyleInfo/StyleInfo";

const ButtonGroupDocs: React.VFC = () => {
  return (
    <DefaultLayout>
      <PageTitle>ButtonGroup</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4} className={text.intro}>
          If Buttons created a cooperative it would look like a ButtonGroup.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <P>
          The button related <code>props</code> set on the{" "}
          <code>ButtonGroup</code> are applied to the children unless a child
          has that prop set. Let's take a look at a few variations.
        </P>

        <ComponentDemo />

        <P>
          As ever, if this component isn't really working for you then you can
          make your own, clone ours for a starting point if you need a legup.
          It's pretty simple, we like simple.
        </P>

        <H2 vol={4} uppercase>
          Styling
        </H2>

        <P>
          In terms of HTML structure, we have a div with some buttons inside.
          Each button will inherit supported props set on the group unless
          overridden directly on an individual button.
        </P>

        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
          disableShelleyLink
        />

        <H2 vol={4} uppercase>
          Examples
        </H2>

        <P className={spacing.mb2}>
          Split button: Simple example, we've yet to add a
        </P>

        <Example1 />
        <H2 vol={4} uppercase>
          Accessibility, UX &amp; the Law
        </H2>

        <P>
          In terms of{" "}
          <abbr title="Web Content Accessibility Guidelines">
            <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
          </abbr>{" "}
          and the law, this is covered under Level A which makes it a
          requirement both in the value that it provides and the law.
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
          If you are throwing an <code>Icon</code> inside a button with no
          visible text label then be sure to provide one via the{" "}
          <code>alt</code> prop on the icon which mirrors that of an image.
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
      </Grid>
    </DefaultLayout>
  );
};

export default ButtonGroupDocs;
