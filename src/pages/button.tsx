import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import { P, H2 } from "../components/Text/Text";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../projects/default/css/text.st.css";
import grid from "../projects/default/css/grid.st.css";
import Button from "../components/Button/Button";
import Blockquote from "../components/Blockquote/Blockquote";

const ButtonDocs = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "children",
      label: "children",
      type: "text",
      value: "Yes to climate action"
    },
    {
      name: "color",
      label: "color",
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
      name: "volume",
      label: "volume",
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

  // const inputEl = React.useRef();
  const test = React.createRef<HTMLButtonElement>();
  const onButtonClick = () => {
    const node = test.current;
    // `current` points to the mounted text input element
    node && node.focus();
  };

  return (
    <DefaultLayout>
      <PageTitle>Button</PageTitle>
      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Button&apos;s are used for quoting peeps and papers, they tell any
          tech listening that this is a referance to someone elses words. A
          screen reader could emphasise it when reading or a search bot could
          consider it when indexing.
        </P>

        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label */}
        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <CodeSample>{`import Button from "shelley-ui";
        \n<Button>Climate action now</Button>`}</CodeSample>

        <P>
          Lets take a look at a few variations, note that we are using different
          Text sizes as best fits the use case. There are a load of permutaions
          but you will likely end up using only a few as definded by your system
          and what works best with your variant designs:
        </P>

        <P>This is a basic button.</P>
        <div className={grid.colContent}>
          <Button ref={test} onClick={() => console.log("HI")}>
            Boom
          </Button>
        </div>
        <P>
          <Button onClick={() => onButtonClick()}>Boom</Button>
        </P>

        {/* <div className={classnames(grid.gridColumnOutset1, grid.exampleBox)}>

        </div> */}
      </Grid>
      <Grid variant={1}>
        <PropsDemo
          demoProps={labelDemoProps}
          setDemoProps={setLabelDemoProps}
          tsExtends="HTMLButtonElement"
          renderExample={
            <CodeSample>{`import { Button } from "@action-is-hope/shelley";\n\n<Button ${
              labelDemoProps[1].value > 0
                ? `\n  color={${labelDemoProps[1].value}}`
                : `\n  color={false}`
            } ${
              labelDemoProps[2].value > 0
                ? `\n  variant={${labelDemoProps[2].value}}`
                : `\n  variant={false}`
            } ${
              labelDemoProps[3].value > 0
                ? `\n  volume={${labelDemoProps[3].value}}`
                : `\n  volume={false}`
            } ${
              labelDemoProps[1].value
                ? `\n  citeUrl="${labelDemoProps[3].value}"`
                : ``
            }  \n>\n ${labelDemoProps[3].value}\n</Button>`}</CodeSample>
          }
        >
          <Button
            color={
              labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value
            }
            variant={
              labelDemoProps[2].value === 0 ? false : labelDemoProps[2].value
            }
            vol={
              labelDemoProps[3].value === 0 ? false : labelDemoProps[3].value
            }
          >
            {labelDemoProps[0].value}
          </Button>
        </PropsDemo>
      </Grid>
      <Grid variant={1}>
        <P>
          As ever, if this component isn&apos;t really working for you then you
          can make your own, clone ours for a starting point if you need a
          legup. It&apos;s pretty simple, we like simple.
        </P>

        <Blockquote
          citeUrl="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#content-structure-separation-programmatic"
          cite="Labels or Instructions: Understanding SC 3.3.2"
          variant={2}
        >
          <H2 vol={4}>Spare</H2>
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

export default ButtonDocs;
