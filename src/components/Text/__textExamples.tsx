/* textExamples.tsx */
import React from "react";
// Example Component.
import Text from "./Text";
import Grid from "../../components/Grid/Grid";

// Supporting Components.
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";
import { P } from "../../components/Text/Text";

// Styles.
import { classes as grid } from "../../styles/default/grid.st.css";

export const meta = {
  name: "Button"
};

export const QuickRef = () => (
  <CodeSample className={grid.mid}>
    {`import { Text, P, H1, H2, H3, H4, H5, H6 } from "@action-is-hope/shelley";

<H1 vol={8}>Shortcuts for html headings, h1-h6, set your own volume.</H1>
  
<P>The mighty paragraph, defaults to a volume of 3.</P>
<Text tag="span">Text with your choice of tag via the "tag" prop.</Text>`}
  </CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [TextDemoProps, setTextDemoProps]: any = React.useState([
    {
      name: "vol",
      label: "vol",
      type: "number",
      min: 1,
      max: 12,
      value: 3
    },
    {
      name: "truncate",
      label: "truncate",
      type: "checkbox",
      value: false
    },
    {
      name: "uppercase",
      label: "uppercase",
      type: "checkbox",
      value: false
    },
    {
      name: "children",
      label: "children",
      type: "textarea",
      value:
        // "The IPCC prepares comprehensive Assessment Reports about knowledge on climate change, its causes, potential impacts and response options. The IPCC also produces Special Reports, which are an assessment on a specific issue and Methodology Reports, which provide practical guidelines for the preparation of greenhouse gas inventories."
        "IPCC, how can I explain it, I'll take you frame by frame it. Shelley likes to rap about climate change reports in the hope that people might read them, go figure. Shelley also thanks Naughty By Nature for their contribution to music and head bopping."
    }
  ]);

  return (
    <PropsDemo
      id="textPropsDemo"
      demoProps={TextDemoProps}
      setDemoProps={setTextDemoProps}
      tsExtends="HTMLBaseElement"
      // className={grid.goal}
      renderExample={
        <CodeSample>{`import { P } from "@action-is-hope/shelley";\n<P ${
          TextDemoProps[0].value ? `\n  vol={${TextDemoProps[0].value}}` : ``
        } ${TextDemoProps[1].value ? `\n  truncate` : ``} ${
          TextDemoProps[3].value !== "none" ? `\n  uppercase` : ``
        } \n>\n  ${TextDemoProps[3].value}\n</P>`}</CodeSample>
      }
    >
      <Text
        id="textDemo"
        tag="p"
        vol={TextDemoProps[0].value}
        truncate={TextDemoProps[1].value}
        uppercase={TextDemoProps[2].value}
      >
        {TextDemoProps[3].value}
      </Text>
      <br />
      <br />
      <Text tag="p" vol={3}>
        Just in case:{" "}
        <a href="https://www.ipcc.ch/reports/">
          <abbr title="Intergovernmental Panel on Climate Change">IPCC</abbr>{" "}
          reports
        </a>{" "}
        🌍
      </Text>
    </PropsDemo>
  );
};

export const ComponentHTML = () => <CodeSample>{`TBC`}</CodeSample>;

export const ComponentCSS = () => (
  <CodeSample className={grid.mid} fixedHeight>{`/** text.st.css */

  :import {
    -st-from: "../components/Text/text.st.css";
    -st-default: Text;
  }
  
  /* Volume */
  Text.vol1 {}
  Text.vol2 {}
  Text.vol3 {}
  Text.vol4 {}
  Text.vol5 {}
  Text.vol6 {}
  Text.vol7 {}
  Text.vol8 {}
  Text.vol9 {}
  Text.vol10 {}
  Text.vol11 {}
  Text.vol12 {}
  
  /* Extras */
  Text.uppercase {}
  Text.underline {}
  Text.bold {}
  
  /* State selectors - Note: Inherits functional styles from Shelley. */
  Text:truncate {}
  
  /* Whatever you need which you can use as classNames by importing your text.st.css */
  Text.hint {}
  Text.error {}
  Text.taxonomy-color1 {}
  Text.TupacOrBiggie {}
  `}</CodeSample>
);

export const Example1 = () => (
  // We have just used P for the demo, use vol as the design requires and the tags for semantics.
  <Grid variant={1}>
    <P vol={1} data-test="your-id">
      vol 1. Text
    </P>
    <P vol={2}>vol 2. Text</P>
    <P>vol 3. Text</P>
    <P vol={4}>vol 4. Text</P>
    <P vol={5}>vol 5. Text</P>
    <P vol={6}>vol 6. Text</P>
    <P vol={7}>vol 7. Text</P>
    <P vol={8}>vol 8. Text</P>
    <P vol={9}>vol 9. Text</P>
    <P vol={10}>
      vol 10. Text <br />
      <br />
    </P>
  </Grid>
);
