/* buttonExamples.tsx */
import React from "react";
/* Example Component */
import Button from "./Button";
/* Supporting Components */
import Icon from "../../components/Icon/Icon";
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";
import { classes as grid } from "../../style/grid.st.css";
export const meta = {
  name: "HTMLInputElement"
};

export const QuickRef = () => (
  <CodeSample
    className={grid.mid}
  >{`import Button from "@action-is-hope/shelley";
\n<Button>Climate fight club</Button>
/* One rule: We don't fight, we act on climate change with intent. */`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "children",
      label: "children",
      type: "text",
      value: "Earth Solutionists required"
    },
    {
      name: "tone",
      label: "tone",
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
      name: "icon",
      label: "icon",
      type: "select",
      value: "No",
      options: ["Yes", "No"]
    },
    {
      name: "tip",
      label: "tip",
      type: "text",
      value: "@todo - unsure on this..."
    }
  ]);
  return (
    <PropsDemo
      demoProps={labelDemoProps}
      componentName="Button"
      setDemoProps={setLabelDemoProps}
      tsExtends="HTMLButtonElement"
      renderExample={
        <CodeSample>{`import { Button, Icon } from "@action-is-hope/shelley";\n\n<Button ${
          labelDemoProps[1].value > 0
            ? `\n  tone={${labelDemoProps[1].value}}`
            : `\n  tone={false}`
        } ${
          labelDemoProps[2].value > 0
            ? `\n  variant={${labelDemoProps[2].value}}`
            : `\n  variant={false}`
        } ${
          labelDemoProps[3].value > 0
            ? `\n  volume={${labelDemoProps[3].value}}`
            : `\n  volume={false}`
        } ${
          labelDemoProps[4].value === "Yes"
            ? `\n  icon={<Icon><path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path></Icon>}`
            : ``
        }  \n>\n ${labelDemoProps[0].value}\n</Button>`}</CodeSample>
      }
    >
      <Button
        tone={labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value}
        icon={
          labelDemoProps[4].value === "No" ? (
            false
          ) : (
            <Icon alt={labelDemoProps[1].value}>
              {/* crack open an svg to find the path and shove it in. */}
              <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
              {/* <path d="M16 14h-16v-12h16v12zM1 13h14v-10h-14v10z"></path> */}
              {/* <path d="M2 10v2h12v-1c0 0 0.2-1.7-2-2-1.9-0.3-2.2 0.6-3.8 0.6-1.1 0-0.9-1.6-3.2-1.6-1.7 0-3 2-3 2z"></path> */}
              {/* <path d="M13 6c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path> */}
            </Icon>
          )
        }
        variant={
          labelDemoProps[2].value === 0 ? false : labelDemoProps[2].value
        }
        vol={labelDemoProps[3].value === 0 ? false : labelDemoProps[3].value}
        // tip="hi"
      >
        {labelDemoProps[0].value}
      </Button>
      {/* <Button
        tone={labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value}
        icon={
          <Icon>
            <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
          </Icon>
        }
        variant={
          labelDemoProps[2].value === 0 ? false : labelDemoProps[2].value
        }
        vol={labelDemoProps[3].value === 0 ? false : labelDemoProps[3].value}
      >
        &nbsp;
      </Button> */}
    </PropsDemo>
  );
};

export const ComponentHTML = () => (
  <CodeSample>{`<button class="button-root button-tone1 button-variant1 button-vol2">
  <span class="button-inner">Earth Guardians</span>
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
Button.tone1 {}
Button.tone2 {}
Button.tone3 {}
Button.tone4 {}
Button.tone5 {}
Button.tone6 {}

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
