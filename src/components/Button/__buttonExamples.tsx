/* buttonExamples.tsx */
import React from "react";
// Example Component
import Button from "./Button";
// Supporting Components
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";

export const meta = {
  name: "Button"
};

export const QuickRef = () => (
  <CodeSample>{`import Button from "@action-is-hope/shelley";
\n<Button>Climate action now</Button>`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
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
      value: 1
    },
    {
      name: "volume",
      label: "volume",
      type: "number",
      min: 0,
      max: 6,
      value: 2
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
  return (
    <PropsDemo
      demoProps={labelDemoProps}
      componentName="Button"
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
        }  \n>\n ${labelDemoProps[0].value}\n</Button>`}</CodeSample>
      }
    >
      <Button
        color={labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value}
        variant={
          labelDemoProps[2].value === 0 ? false : labelDemoProps[2].value
        }
        vol={labelDemoProps[3].value === 0 ? false : labelDemoProps[3].value}
      >
        {labelDemoProps[0].value}
      </Button>
    </PropsDemo>
  );
};

export const ComponentHTML = () => (
  <CodeSample>{`<button class="button--root button--accent1 button--variant1 button--vol2">
  <span class="button--inner">Yes to climate action</span>
</button>`}</CodeSample>
);

export const ComponentCSS = () => (
  <CodeSample fixedHeight>{`/** button.st.css */

/* Root */
Button {}

/* Parts */

/* 'inner' button, use for vertical spacing to give a potential Icon more room */
Button::inner {}

/* The divider which is rendered with an icon only. */
Button::divider {}

/* A basic CSS tooltip. */
Button::tip {}


/* Accent colours */
Button.accent1 {}
Button.accent2 {}
Button.accent3 {}
Button.accent4 {}
Button.accent5 {}
Button.accent6 {}

/* Volumes */
Button.vol1 {}
Button.vol2 {}
Button.vol3 {}
Button.vol4 {}
Button.vol5 {}
Button.vol6 {}

/* Variants */
Button.variant1 {}
Button.variant2 {}
Button.variant3 {}
Button.variant4 {}
Button.variant5 {}
Button.variant6 {}`}</CodeSample>
);

// export const Example1 = () => <Demo></Demo>;
// Add some tests to check refs and tings are spread properly.
// const inputEl = React.useRef();
// const test = React.createRef<HTMLButtonElement>();
// const onButtonClick = () => {
//   const node = test.current;
//   // `current` points to the mounted text input element
//   node && node.focus();
// };
