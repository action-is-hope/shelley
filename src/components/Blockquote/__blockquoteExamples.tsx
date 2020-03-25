/* __blockquoteExamples.tsx */
import React from "react";
// Example Component
import Blockquote from "./Blockquote";
// Supporting Components
import { P, H2 } from "../../components/Text/Text";
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";

export const meta = {
  name: "Blockquote"
};

export const QuickRef = () => (
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
);

// Props Demo - Used in our docs and as a 'style test harness' - a fancy way of saying 'style checker'.
export const ComponentDemo = () => {
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
  {
    /* https://www.bbc.co.uk/sounds/play/w3csyx5b - we've been here before! */
  }
  return (
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
          labelDemoProps[2].value ? `\n  cite="${labelDemoProps[2].value}"` : ``
        } ${
          labelDemoProps[1].value
            ? `\n  citeUrl="${labelDemoProps[3].value}"`
            : ``
        }  \n>\n ${labelDemoProps[3].value}\n</Blockquote>`}</CodeSample>
      }
    >
      <Blockquote
        accent={labelDemoProps[0].value === 0 ? false : labelDemoProps[0].value}
        variant={
          labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value
        }
        cite={labelDemoProps[2].value}
        citeUrl={labelDemoProps[3].value}
      >
        {/* Render a few deferent examples depending on the variant. */}
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
  );
};

export const ComponentHTML = () => (
  <CodeSample language="html">{`<blockquote class="blockquote--root blockquote--accent1">
  <div class="blockquote--content">
    <!-- children  - Text or whatever you like. -->
    <p class="text--root text--vol4">
      A system is a set of related components that work together...
    </p>
  </div>
  <footer class="blockquote--footer">
    <cite class="text--root text--vol3 blockquote--cite">
      <a href="#0">Donella Meadows, environmental scientist, 1941-2001</a>
    </cite>
  </footer>
</blockquote>`}</CodeSample>
);

export const ComponentCSS = () => (
  <CodeSample fixedHeight>{`/** blockquote.st.css */

/* Root */
Blockquote {}

/* Parts */
Blockquote::content {}
Blockquote::cite {}
Blockquote::footer {}

/* Accent colours */
Blockquote.accent1 {}
Blockquote.accent2 {}
Blockquote.accent3 {}
Blockquote.accent4 {}
Blockquote.accent5 {}
Blockquote.accent6 {}

/* Variants */
Blockquote.variant1 {}
Blockquote.variant2 {}
Blockquote.variant3 {}
Blockquote.variant4 {}
Blockquote.variant5 {}
Blockquote.variant6 {}`}</CodeSample>
);

// export const Example1 = () => <Demo></Demo>;
