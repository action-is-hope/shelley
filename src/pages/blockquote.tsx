import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import { P, H2 } from "../components/Text/Text";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../themes/default/css/text.st.css";
import grid from "../themes/default/css/grid.st.css";
import Blockquote from "../components/Blockquote/Blockquote";

const LabelsDocs = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "accent",
      label: "accent",
      type: "number",
      min: 0,
      max: 6,
      value: 1
    },
    {
      name: "variant",
      label: "variant",
      type: "number",
      min: 0,
      max: 6,
      value: 0
    },
    {
      name: "cite",
      label: "cite",
      type: "text",
      value: "Donella Meadows, environmental scientist, 1941-2001 "
    },
    {
      name: "citeUrl",
      label: "citeUrl",
      type: "text",
      value: "https://en.wikipedia.org/wiki/Donella_Meadows"
    }
  ]);

  const quotes = [
    `A system is a set of related components that work together in a 
    particular environment to perform whatever functions are required to 
    achieve the system's objective.`,

    `Technology and the limits to growth`,

    `Faith in technology as the ultimate solution to all problems
    can thus divert our attention from the most fundamental
    problem-the problem of growth in a wfinite system and prevent
    us from taking effective action to solve it.`
  ];

  return (
    <DefaultLayout>
      <PageTitle>Blockquote</PageTitle>
      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Blockquote&apos;s are used for quoting peeps and papers, they tell any
          tech listening that this is a referance to someone elses words. A
          screen reader could emphasise it when reading or a search bot could
          consider it when indexing.
        </P>

        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */}
        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <CodeSample>{`import Blockquote from "shelley-ui";\n
<Blockquote
  citeUrl="https://www.theguardian.com/link-to-post"
  cite="The Guardian"
  >
  <P>
    These findings suggest a substantial impact of mechanized bots in amplifying 
    denialist messages about climate change, including support for Trump’s 
    withdrawal from the Paris agreement.
  </P>
</Blockquote>`}</CodeSample>
        {/* https://www.theguardian.com/technology/2020/feb/21/climate-tweets-twitter-bots-analysis  */}
        {/* https://www.latimes.com/environment/story/2019-10-21/oil-companies-exxon-climate-change-denial-report */}
        {/* https://www.theguardian.com/commentisfree/2019/oct/23/exxon-climate-change-fossil-fuels-disinformation */}
        {/* <P>
          It&apos;s an interesting story:{" "}
          <a href="https://www.theguardian.com/technology/2020/feb/21/climate-tweets-twitter-bots-analysis">
            {" "}
            a quarter of all tweets about climate crisis produced by bots.
          </a>{" "}
          Is this not very concerning as a trend? AI is advancing and our
          ability to sort fact from fiction is diminishing. Shelley reckons we
          should{" "}
          <a href="https://www.gutenberg.org/ebooks/42324">
            read Frankeinstein
          </a>{" "}
          again, apparently it&apos;s relatable and contained a warning about
          this type of crap when it was released in 1818. Huh, 2020...{" "}
          <a href="https://en.wikipedia.org/wiki/1919">
            what happened in 1919?
          </a>
        </P> */}
        <P>
          Digression Alert:{" "}
          <a href="https://www.theguardian.com/technology/2020/feb/21/climate-tweets-twitter-bots-analysis">
            {" "}
            a quarter of all tweets about climate crisis produced by bots!
          </a>{" "}
          Is this not a <em>very</em> concerning trend? AI is advancing and our
          ability to sort fact from fiction is fast diminishing. Shelley
          suggests reading{" "}
          <a href="https://www.gutenberg.org/ebooks/42324">Frankeinstein</a>,
          apparently it&apos;s relatable and contains a warning about this type
          of crap from when it was released in 1818...2020...?
        </P>

        <P>
          Okaaay,{" "}
          <a href="https://en.wikipedia.org/wiki/1919">
            what happened in 1919?
          </a>{" "}
          Ummmmmmmm... the "League of Nations" was founded - Yay, we're all
          saved! Oh, wait... Feeling pumped? Hell yeah!
        </P>

        {/* <P vol={4} className={text.intro}>
          Internally they make use of the <code>label</code> tag which is one of
          the most important semantic tags to get right in terms of usability,
          accessibility and the law!
        </P> */}

        <P>
          Right then, back to these bloody blockquotes!{" "}
          <em>Keep Calm and Carry on Coding</em> would seem to be the current{" "}
          <em>action</em>, we need to share and express ideas effectively after
          all. There isn&apos;t much too them, but they work best in conjunction
          with the <code>Text</code> components.
        </P>

        <P>
          Lets take a look at a few variations, note that we are using different
          Text sizes as best fits the use case. There are a load of permutaions
          but you will likely end up using only a few as definded by your system
          and what works best with your variant designs:
        </P>

        {/* <div className={classnames(grid.gridColumnOutset1, grid.exampleBox)}>

        </div> */}
      </Grid>
      <Grid variant={1}>
        <PropsDemo
          demoProps={labelDemoProps}
          setDemoProps={setLabelDemoProps}
          tsExtends="HTMLQuoteElement"
          renderExample={
            <CodeSample>{`import { Blockquote } from "@action-is-hope/shelley";\n\n<Blockquote ${
              labelDemoProps[0].value > 0
                ? `\n  accent={${labelDemoProps[0].value}}`
                : `\n  accent={false}`
            } ${
              labelDemoProps[1].value > 0
                ? `\n  variant={${labelDemoProps[1].value}}`
                : `\n  variant={false }`
            } ${
              labelDemoProps[2].value
                ? `\n  cite="${labelDemoProps[2].value}"`
                : ``
            } ${
              labelDemoProps[1].value
                ? `\n  citeUrl="${labelDemoProps[3].value}"`
                : ``
            }  \n>\n ${labelDemoProps[3].value}\n</Blockquote>`}</CodeSample>
          }
        >
          <Blockquote
            accent={
              labelDemoProps[0].value === 0 ? false : labelDemoProps[0].value
            }
            variant={
              labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value
            }
            cite={labelDemoProps[2].value}
            citeUrl={labelDemoProps[3].value}
          >
            {/* Render a few examples based on the variant */}
            {labelDemoProps[1].value == 0 && <P vol={4}>{quotes[0]}</P>}
            {labelDemoProps[1].value == 1 && <P>{quotes[0]}</P>}
            {labelDemoProps[1].value == 2 && (
              <>
                <H2 vol={4}>{quotes[1]}</H2>
                <P>{quotes[2]}</P>
              </>
            )}
            {labelDemoProps[1].value > 2 && <P>{quotes[0]}</P>}
          </Blockquote>
        </PropsDemo>
      </Grid>
      <Grid variant={1}>
        <P>
          As ever, if this component isn't really working for you then you can
          make your own, clone ours for a starting point if you need a legup.
          It's pretty simple, we like simple.
        </P>
        {/* <CodeSample>{`<label for="myTextField">Label text</Label>\n<input id="myTextField" type="text" placeholder="Focus people!"/>`}</CodeSample> */}
        {/* https://www.bbc.co.uk/sounds/play/w3csyx5b - we've been here before */}
        {/* <P>
          The <code>for</code> attribute is essentially a labels way of
          announcing to an input that they are meant to be together. How sweet,
          they complete each other.
        </P> */}

        {/* https://www.w3.org/TR/2008/REC-WCAG20-20081211/#content-structure-separation-programmatic */}
        {/* ensure that information and relationships that are implied by visual or auditory formatting are preserved when the presentation format changes. For example, the presentation format changes when the content is read by a screen reader or when a user style sheet is substituted for the style sheet provided by the author. */}
        {/* a change in voice pitch or speech rate may be used to emphasize important information or to indicate quoted text; etc. */}

        {/* https://www.w3.org/TR/WCAG20-TECHS/H49.html#H49-tests */}

        {/* https://www.w3.org/TR/2016/NOTE-UNDERSTANDING-WCAG20-20161007/content-structure-separation-programmatic.html */}

        <Blockquote
          citeUrl="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#content-structure-separation-programmatic"
          cite="Labels or Instructions: Understanding SC 3.3.2"
          variant={2}
        >
          <H2 vol={4}>
            1.3.1 Info and Relationships: Information, structure, and
            relationships conveyed through presentation can be programmatically
            determined or are available in text. (Level A)
          </H2>
          <P>
            ...ensure that information and relationships that are implied by
            visual or auditory formatting are preserved when the presentation
            format changes. For example, the presentation format changes when
            the content is read by a screen reader or when a user style sheet is
            substituted for the style sheet provided by the author.
          </P>
          <P>
            ...a change in voice pitch or speech rate may be used to emphasize
            important information or to indicate quoted text; etc.
          </P>
        </Blockquote>

        <P>
          In terms of WCAG and the law this one is required as a Level A
          requirement and it fits under{" "}
          <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error.html">
            Guideline 3.3: Input Assistance: Help users avoid and correct
            mistakes.
          </a>{" "}
          More specifically:
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default LabelsDocs;
