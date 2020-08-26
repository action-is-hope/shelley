/* buttonGroupExamples.tsx */
import React from "react";
/* Example Component */
import Button from "../Button/Button";
/* Supporting Components */
import Icon from "../Icon/Icon";
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";
import { classes as grid } from "../../styles/default/grid.st.css";
import ButtonGroup from "./ButtonGroup";
export const meta = {
  name: "ButtonGroup"
};

export const QuickRef = () => (
  <CodeSample
    className={grid.mid}
  >{`import { ButtonGroup, Button } from "@action-is-hope/shelley";
\n<ButtonGroup vol={2} tone={2} variant={1}>
<Button>Publish</Button>
<Button
  icon={
    <Icon alt="Select action">
      {/* chevron-down-small path */}
    </Icon>
  }
  aria-label="Page actions"
  aria-haspopup="menu"
></Button>
</ButtonGroup>`}</CodeSample>
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
      name: "orientation",
      label: "orientation",
      type: "select",
      value: "horizontal",
      options: ["horizontal", "vertical"]
    }
  ]);
  return (
    <PropsDemo
      demoProps={labelDemoProps}
      componentName={meta.name}
      setDemoProps={setLabelDemoProps}
      tsExtends="HTMLDivElement"
      renderExample={
        <CodeSample>{`import { Button, Icon } from "@action-is-hope/shelley";\n\n<ButtonGroup ${
          labelDemoProps[1].value > 0
            ? `\n  tone={${labelDemoProps[1].value}}`
            : `\n  tone={false}`
        } ${
          labelDemoProps[2].value > 0
            ? `\n  variant={${labelDemoProps[2].value}}`
            : `\n  variant={false}`
        } ${
          labelDemoProps[3].value > 0
            ? `\n  vol={${labelDemoProps[3].value}}`
            : `\n  vol={false}`
        } ${
          labelDemoProps[5].value === "vertical"
            ? `\n  orientation="vertical"`
            : ``
        } ${
          labelDemoProps[4].value === "Yes"
            ? `\n  icon={<Icon><path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path></Icon>}`
            : ``
        }  \n>
  <Button>Button one</Button>
  <Button>Button two</Button>
</ButtonGroup>`}</CodeSample>
      }
    >
      <ButtonGroup
        orientation={labelDemoProps[5].value}
        tone={labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value}
        variant={
          labelDemoProps[2].value === 0 ? false : labelDemoProps[2].value
        }
        vol={labelDemoProps[3].value === 0 ? false : labelDemoProps[3].value}
      >
        <Button>Button one</Button>
        <Button>Button two</Button>
      </ButtonGroup>
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
  <CodeSample>{`
<div class="buttonGroup__root buttonGroup---orientation-10-horizontal">
{children}
</div>
`}</CodeSample>
);

export const ComponentCSS = () => (
  <CodeSample fixedHeight>{`/** buttonGroup.st.css */

/* Root */
ButtonGroup {}

ButtonGroup:orientation(vertical) {}

ButtonGroup:orientation(horizontal) {}`}</CodeSample>
);

export const Example1 = () => (
  <>
    <div className={grid.mid}>
      <ButtonGroup vol={2} tone={1} variant={3}>
        <Button>Publish</Button>
        <Button
          icon={
            <Icon alt="Select action">
              {/* < id="chevron-down-small"> */}
              <path d="M8 12l-6.32-6.32 1.67-1.68 4.65 4.65 4.65-4.65 1.67 1.68-6.32 6.32z"></path>
            </Icon>
          }
          aria-label="Page actions"
          aria-haspopup="menu"
        />
      </ButtonGroup>
    </div>

    <CodeSample
      className={grid.mid}
    >{`import { ButtonGroup, Button } from "@action-is-hope/shelley";
  \n<ButtonGroup vol={2} tone={2} variant={1}>
  <Button>Publish</Button>
  <Button
    icon={
      <Icon alt="Select action">\n<path d="M8 12l-6.32-6.32 1.67-1.68 4.65 4.65 4.65-4.65 1.67 1.68-6.32 6.32z"></path>
      </Icon>
    }
    aria-label="Page actions"
    aria-haspopup="menu"
  />
</ButtonGroup>`}</CodeSample>
  </>
);
// Add some tests to check refs and tings are spread properly.
// const inputEl = React.useRef();
// const test = React.createRef<HTMLButtonElement>();
// const onButtonClick = () => {
//   const node = test.current;
//   // `current` points to the mounted text input element
//   node && node.focus();
// };
