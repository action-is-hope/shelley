import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import { P, H1, H2 } from "../components/Text/Text";
import Label from "../components/Label/Label";
import InputRow from "../components/InputRow/InputRow";
import RadioCheckInput from "../components/RadioCheckInput/RadioCheckInput";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../themes/default/css/text.st.css";
import grid from "../themes/default/css/grid.st.css";
import Blockquote from "../components/Blockquote/Blockquote";

const LabelsInputsDocs = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "label",
      label: "label",
      type: "text",
      value: "Label for form input"
    },
    {
      name: "hint",
      label: "hint",
      type: "text",
      value: ""
    },
    {
      name: "htmlFor",
      label: "htmlFor",
      type: "text",
      value: "id-of-input-to-label"
    },
    {
      name: "visuallyHidden",
      label: "visuallyHidden",
      type: "checkbox",
      value: false
    },
    {
      name: "radioCheckInput",
      label: "radioCheckInput",
      type: "select",
      value: "checkbox",
      options: ["none", "radio", "checkbox", "switch"]
    }
  ]);

  const [labelNonDemoProps, setLabelNonDemoProps]: any = React.useState([
    {
      name: "test",
      label: "test",
      type: "select",
      value: "checkbox",
      options: ["none", "radio", "checkbox", "switch"]
    }
  ]);

  return (
    <DefaultLayout>
      <PageTitle>Label</PageTitle>
      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Labels are rather aptly <code>for</code> labelling things, form{" "}
          <code>input</code> tags specifically. Internally they make use of the{" "}
          <code>label</code> tag which is one of the most important semantic
          tags to get right in terms of usability, accessibility and the law!
        </P>
        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */}
        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <CodeSample>{`import Label from "shelley-ui";
<Label 
  hint="Optional, non-interactive hint text"
  htmlFor="id-of-input-to-label" 
>
  Label text
</Label>
`}</CodeSample>
        <P>
          Labels are pretty useless by themselves, they should <em>always</em>{" "}
          be associated with a form input. The most reliable way to do that is
          explicitly via the <code>for</code> and <code>id</code> attributes. In
          plain HTML:
        </P>

        <CodeSample>{`<label for="myTextField">Label text</Label>\n<input id="myTextField" type="text" placeholder="Focus people!"/>`}</CodeSample>
        {/* <P>
          The <code>for</code> attribute is essentially a labels way of
          announcing to an input that they are meant to be together. How sweet,
          they complete each other.
        </P> */}

        <P>
          <strong>Note:</strong> In React we have to use <code>htmlFor</code>{" "}
          instead and you will definitely forget this at some point, #justSaying
        </P>

        <H2 vol={4} uppercase>
          Why Bother?
        </H2>
        <P>It makes them clickable, Yay!</P>
        <P>
          Click the label below, it <em>should</em> focus the text field giving
          us a larger &apos;hit&apos; area; useful on mobile devices.s
        </P>
        <div className={classnames(grid.gridColumnOutset1, grid.exampleBox)}>
          <InputRow
            // className={grid.gridColumnContent}
            id="labelExampleId1"
            label={"Label text"}
            placeholder="We need some focus up in here! Our plant is in peril."
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
        <P>
          This should never be good enough for us, this is basic HTML after all.
        </P>
        <H2 vol={4} uppercase>
          Radios and checkboxes
        </H2>

        <P>
          Shelley chooses to render/output checkboxes and radio inputs types{" "}
          <em>inside</em> of a label so as to maximise the hit areas to include
          space in-between the two elements.
        </P>

        <P>
          To do this we use Shelley's <code>RadioCheckInput</code> component (or
          use your own) and throw it inside the Label via the{" "}
          <code>radioCheckInput</code> prop. Let&apos;s have a poke around:
        </P>

        <PropsDemo
          demoProps={labelDemoProps}
          setDemoProps={setLabelDemoProps}
          // setNonDemoProps={setLabelNonDemoProps}
          // demoNonProps={labelNonDemoProps}
          tsExtends="HTMLLabelElement"
          renderExample={
            <CodeSample>{`import { Label${
              labelDemoProps[4].value !== "none" ? `, RadioCheckInput` : ``
            } } from "@action-is-hope/shelley";\n<Label ${
              labelDemoProps[1].value
                ? `\n  hint="${labelDemoProps[1].value}"`
                : ``
            } ${
              labelDemoProps[2].value
                ? `\n  htmlFor="${labelDemoProps[2].value}"`
                : ``
            } ${
              labelDemoProps[4].value !== "none"
                ? `\n  radioCheckInput={\n    <RadioCheckInput id="${labelDemoProps[2].value}" type="${labelDemoProps[4].value}" />\n  }`
                : ``
            } \n>\n ${labelDemoProps[0].value}\n</Label>`}</CodeSample>
          }
        >
          <Label
            hint={labelDemoProps[1].value}
            htmlFor={labelDemoProps[2].value}
            visuallyHidden={labelDemoProps[3].value}
            radioCheckInput={
              labelDemoProps[4].value !== "none" ? (
                <RadioCheckInput
                  id={labelDemoProps[2].value}
                  type={labelDemoProps[4].value}
                />
              ) : (
                false
              )
            }
            // radioCheckInput={<input type="checkbox" />}
          >
            {labelDemoProps[0].value}
          </Label>
        </PropsDemo>

        <P>
          <strong>Note:</strong> Rendering an input inside of a label actually
          has the side effect of implicitly associating them, however it is
          always best to be explicit. Shelley recommends always being explicit
          by using the attributes.
        </P>

        <P>
          If you do not know the ids of fields then always render them inside of
          labels but this should generally be avoided. It&apos;s a bit, hacky
          but it happens.
        </P>

        <H2 vol={5} className={text.outset} uppercase>
          Styling:
        </H2>

        <P>
          Labels are sometimes used erroneously in place of a{" "}
          <code>legand</code> tag so be sure that you are using the correct tag.
        </P>

        <P>
          Shelley chooses to render checkboxes, radios and switches{" "}
          <em>inside</em> of the labels so as to maximise the hit areas to
          include space inbetween the two elements.
        </P>

        <P>
          Lets now have a look at the Shelley Label and it's properties, it can
          be used alongside text fields but it can also take an input.
        </P>

        <P>
          In terms of WCAG and the law this one is required as a Level A
          requirement and it fits under{" "}
          <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error.html">
            Guideline 3.3: Input Assistance: Help users avoid and correct
            mistakes.
          </a>{" "}
          More specifically:
        </P>
        <Blockquote
          citeUrl="https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-cues.html"
          cite="Labels or Instructions: Understanding SC 3.3.2"
        >
          <H2 vol={4}>
            3.3.2 Labels or Instructions: Labels or instructions are provided
            when content requires user input. (Level A)
          </H2>
          <P>
            Note: When labels are provided for input objects, the input object's
            relationship to the label (or to redundant text serving as the
            label) must be programmatically determinable or available in text
            per Understanding Success Criterion 1.3.1 Info and Relationships.
          </P>
        </Blockquote>
        <P>
          <strong>Tip:</strong> We once dismissed a payment gateway during a
          sales pitch by simply asking the sales account manager to click on a
          form label whilist we could all see it on the big screen. Nothing
          happened. We told them straight:
        </P>
        <Blockquote variant={2}>
          <P>
            This is basic, basic, basic stuff and as a result we have no
            confidance in your product. Cheerio.
          </P>
        </Blockquote>
        <P>
          What was concerning is that this surprised them, this is a legal
          requirement and this was a large scale procurement for a public sector
          body in the U.K. They should be better prepared.
        </P>
        <P>
          Failure to implement basic accessibility will cost you more than
          users, it will cost you large juicy clients as well. Fact.
        </P>
        {/* Guideline 3.3 Input Assistance: Help users avoid and correct mistakes.
        3.3.2 Labels or Instructions: Labels or instructions are provided when
        content requires user input. (Level A) */}
        {/* https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-cues.html */}
        {/* https://www.w3.org/WAI/tutorials/forms/labels/  */}
      </Grid>
    </DefaultLayout>
  );
};

export default LabelsInputsDocs;
