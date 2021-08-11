import type React from "react";
import classnames from "classnames";

import { InputText, P, H2, Grid, Blockquote } from "../../indexLib";
import { classes as grid } from "../../styles/default/grid.st.css";
import { classes as utils } from "../../styles/shelley/utils.st.css";

import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
} from "./__labelExamples";

import CodeSample from "../../components-site/CodeSample/CodeSample";
import StyleInfo from "../../components-site/StyleInfo/StyleInfo";
import PageTitle from "../../components-site/PageTitle/PageTitle";

const LabelsDocs: React.VFC = () => {
  return (
    <>
      <PageTitle>Label</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4}>
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
          Pretty useless by themselves, <code>labels</code> should generally be
          paired and associated with a form input. The most reliable way to do
          that is explicitly via the <code>for</code> and <code>id</code>{" "}
          attributes. In plain HTML:
        </P>

        <CodeSample
          className={grid.mid}
        >{`<label for="myTextField">Label text</Label>\n<input id="myTextField" type="text" placeholder="Focus people!"/>`}</CodeSample>
        {/*
          The for attribute is essentially a labels way of announcing to an 
          input that they are meant to be together. Awwww, they complete each other.
         */}

        <P>
          <strong>Note:</strong> In the React world we have to use{" "}
          <code>htmlFor</code> instead and you will definitely forget this at
          some point; I have no hair, #justSaying
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
          It may seem like a small thing but more importantly assistive
          technologies like screen readers use this relationship to properly
          announce form items. Without it people can be left fumbling around our
          poorly constructed forms.
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
          labels but this should generally be avoided.
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
          on use-case.
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
          desc={
            <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-cues.html">
              Labels or Instructions: Understanding SC 3.3.2
            </a>
          }
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
          Remember that you can easily check or &apos;audit&apos; your form
          labels as you go by clicking them to see if they focus or check
          uncheck your standard inputs.
        </P>

        <P>
          We could tell you anecdotes of sales pitches gone wrong but that would
          be impolite to those who demoed inaccessible products to us. Suffice
          to say, failure to implement basic accessibility will cost you more
          than users, it will cost you clients as well. Fact. 👀
        </P>
      </Grid>
    </>
  );
};

export default LabelsDocs;
