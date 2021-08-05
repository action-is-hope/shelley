/* buttonGroupExamples.tsx */
import React from "react";
import { Button, ButtonGroup, Icon } from "../../indexLib";
/* Supporting Components */
import PropsDemo from "../../components-site/PropsDemo/PropsDemo";
import CodeSample from "../../components-site/CodeSample/CodeSample";
import { classes as grid } from "../../styles/default/grid.st.css";
export const meta = {
  name: "ButtonGroup",
};

export const QuickRef = () => (
  <CodeSample
    className={grid.mid}
  >{`import { ButtonGroup, Button } from "@actionishope/shelley";
\n<ButtonGroup vol={2} tone={2} variant={1}>
  <Button>Button one</Button>
  <Button>Button two</Button>
</ButtonGroup>`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "tone",
      label: "tone",
      type: "number",
      min: 0,
      max: 6,
      value: 1,
    },
    {
      name: "variant",
      label: "variant",
      type: "select",
      value: "primary",
      options: ["primary", "secondary", "quiet", "fab", "false"],
    },
    {
      name: "volume",
      label: "volume",
      type: "number",
      min: 0,
      max: 6,
      value: 2,
    },
    {
      name: "orientation",
      label: "orientation",
      type: "select",
      value: "horizontal",
      options: ["horizontal", "vertical"],
    },
  ]);
  return (
    <PropsDemo
      demoProps={labelDemoProps}
      componentName={meta.name}
      setDemoProps={setLabelDemoProps}
      tsExtends="HTMLDivElement"
      renderExample={
        <CodeSample>{`import { Button, Icon } from "@actionishope/shelley";\n\n<ButtonGroup ${
          labelDemoProps[0].value > 0
            ? `\n  tone={${labelDemoProps[0].value}}`
            : `\n  tone={false}`
        } ${
          labelDemoProps[1].value !== "undefined"
            ? `\n  variant={${labelDemoProps[1].value}}`
            : `\n  variant={false}`
        } ${
          labelDemoProps[2].value > 0
            ? `\n  vol={${labelDemoProps[2].value}}`
            : `\n  vol={false}`
        } ${
          labelDemoProps[3].value === "vertical"
            ? `\n  orientation="vertical"`
            : ``
        } \n>
  <Button>Button one</Button>
  <Button>Button two</Button>
</ButtonGroup>`}</CodeSample>
      }
    >
      <ButtonGroup
        fullWidth
        tone={labelDemoProps[0].value === 0 ? false : labelDemoProps[0].value}
        variant={
          labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value
        }
        vol={labelDemoProps[2].value === 0 ? false : labelDemoProps[2].value}
        orientation={labelDemoProps[3].value}
      >
        <Button>Button one</Button>
        <Button>Button two</Button>
      </ButtonGroup>
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
    >{`import { ButtonGroup, Button } from "@actionishope/shelley";
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
