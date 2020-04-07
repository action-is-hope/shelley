import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import { P, H1, H2 } from "../components/Text/Text";

import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../projects/default/css/text.st.css";
import grid from "../projects/default/css/grid.st.css";
import utils from "../projects/default/css/utils.st.css";
import Blockquote from "../components/Blockquote/Blockquote";
import InputText from "../components/InputText/InputText";
import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS
} from "../components/Label/__labelExamples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";
const LabelsDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Label</PageTitle>
      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Labels are rather aptly <code>for</code> labelling things, form{" "}
          <code>input</code> tags specifically, <code>label</code> is one of the
          most important semantic tags to get right in terms of usability,
          accessibility and the law!
        </P>

        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */}
        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <QuickRef />

        <P>
          Pretty useless by themselves, <code>labels</code> should usually be
          associated with a form input. The most reliable way to do that is
          explicitly via the <code>for</code> and <code>id</code> attributes. In
          plain HTML:
        </P>

        <CodeSample
          className={grid.mid}
        >{`<label for="myTextField">Label text</Label>\n<input id="myTextField" type="text" placeholder="Focus people!"/>`}</CodeSample>
        {/*
          The for attribute is essentially a labels way of announcing to an 
          input that they are meant to be together. How sweet, they complete each other.
         */}

        <P>
          <strong>Note:</strong> In React world we have to use{" "}
          <code>htmlFor</code> instead and you will definitely forget this at
          some point, I have no hair. #justSaying
        </P>

        <H2 vol={4} uppercase>
          Why Bother?
        </H2>
        <P>It makes them clickable, Yay!</P>
        <P>
          Click the label below, it <em>should</em> focus the text field giving
          us a larger &apos;hit&apos; area; useful on mobile devices.
        </P>
        <div className={classnames(grid.pen, utils.exampleBox)}>
          <InputText
            id="labelExampleId1"
            label={"Label text"}
            placeholder="We need some focus, up in here, up in here!"
            type="text"
            vol={3}
          />
        </div>
        <P>
          It may seem like a small thing but more imortantly assistive
          technologies like screen readers use this relationship to properly
          announce form items. Without it people can be left fumberling around
          our poorly constructed forms.
        </P>

        <P>No excuses; this is basic HTML.</P>

        <H2 vol={4} uppercase>
          Usage
        </H2>

        <P>
          As you have seen, when we use <code>Label</code> in conjunction with
          text based inputs we usually render them adjacent to each other.
        </P>

        <P>
          Shelley chooses to render checkboxes, radios and switches{" "}
          <em>inside</em> of the labels so as to maximise the hit areas to
          include space in-between the two elements.
        </P>

        <P>
          To do this <em>we</em> use Shelley&apos;s{" "}
          <code>InputSelectionControl</code> component but you can use anything,
          just throw it inside via the <code>inputControl</code> prop.
        </P>

        <P>Let&apos;s have a poke around:</P>

        <ComponentDemo />

        <P>
          <strong>Note:</strong> Rendering an input inside does have the side
          effect of implicitly associating the elements but Shelley recommends
          always being explicit.
        </P>

        <P>
          If you do not know the ids of fields then always render them inside of
          labels but this should generally be avoided. It&apos;s a bit, hacky
          but it happens.
        </P>

        <H2 vol={4} uppercase>
          Styling
        </H2>

        <P>
          We are concerned with styling two main scenarios, one without an input
          and the other with.
        </P>

        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
        />

        <P>
          Shelley&apos;s styles [link]are fairly light for this one, we set our
          positional stuff using <code>flex</code>, <code>weight</code> but not
          much else. We use it as a foundation so customise contextually based
          on use case.
        </P>

        <P>
          <strong>Note:</strong> Labels are sometimes used erroneously in place
          of a <code>legand</code> tag so be sure that you are using the correct
          tag.
        </P>
        <H2 vol={4} uppercase>
          WCAG and the Law
        </H2>
        <P>
          In terms of WCAG and the law this one is required as a Level A
          requirement and it fits under{" "}
          <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error.html">
            Guideline 3.3: Input Assistance: Help users avoid and correct
            mistakes
          </a>
          , more specifically:
        </P>

        <Blockquote
          citeUrl="https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-cues.html"
          cite="Labels or Instructions: Understanding SC 3.3.2"
          accent={3}
          variant={2}
        >
          <H2 vol={4}>
            3.3.2 Labels or Instructions: Labels or instructions are provided
            when content requires user input. (Level A)
          </H2>
          <P>
            Note: When labels are provided for input objects, the input
            object&apos;s relationship to the label (or to redundant text
            serving as the label) must be programmatically determinable or
            available in text per Understanding Success Criterion 1.3.1 Info and
            Relationships.
          </P>
        </Blockquote>
        <P>
          <strong>Tip:</strong> We once dismissed a payment gateway during a
          sales pitch by simply asking the sales account manager to click on a
          form label whilist we could all see it on the big screen. Nothing
          happened. We stopped them mid flow and we told them straight:
        </P>
        <Blockquote variant={1}>
          <P>
            Sorry to interrupt but we can tell you right now that this does not
            conform to our legal accessibility obligations to adhere to{" "}
            <q>Level A</q> of the WCAG 2.0 guidelines. Do you know you are
            trying to sell us an illegal product?
          </P>
        </Blockquote>
        <P>
          What was concerning is that this surprised them. Ethics aside this was
          a large scale procurement for a public body and this is a legal
          requirement. They should have been better prepared.
        </P>
        <P>
          Failure to implement basic accessibility will cost you more than
          users, it will cost you large juicy clients too. It&apos;s a simply
          fact.
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default LabelsDocs;
