/* buttonExamples.tsx */
import React from "react";
/* Example Component */
import Button from "./Button";
/* Supporting Components */
import Icon from "../../components/Icon/Icon";
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";
import { classes as grid } from "../../styles/default/grid.st.css";
import { classes as spacing } from "../../styles/default/spacing.st.css";
export const meta = {
  name: "Button"
};
import { H2, P } from "../../components/Text/Text";

export const QuickRef = () => (
  <CodeSample className={grid.mid}>{`import Button from "@actionishope/shelley";
\n<Button>Climate fight club</Button>
/* One rule: Fight climate change, not each other. */`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "children",
      label: "children",
      type: "text",
      value: "Climate fight club"
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
      value: 3
    },
    {
      name: "volume",
      label: "volume",
      type: "number",
      min: 0,
      max: 6,
      value: 3
    },
    {
      name: "icon",
      label: "icon",
      type: "select",
      value: "No",
      options: ["Yes", "No"]
    },
    {
      name: "iconPos",
      label: "iconPos",
      type: "select",
      value: "end",
      options: ["top", "end", "bottom", "start"]
    }
  ]);
  return (
    <PropsDemo
      demoProps={labelDemoProps}
      componentName="Button"
      setDemoProps={setLabelDemoProps}
      tsExtends="HTMLButtonElement"
      renderExample={
        <CodeSample>{`import { Button, Icon } from "@actionishope/shelley";\n\n<Button ${
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
          labelDemoProps[4].value === "Yes"
            ? `\n  icon={<Icon><path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path></Icon>}`
            : ``
        } ${
          labelDemoProps[4].value === "Yes"
            ? `\n  iconPos={"${labelDemoProps[5].value}"}`
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
            <Icon>
              <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
            </Icon>
          )
        }
        iconPos={labelDemoProps[5].value}
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

export const Example1 = () => (
  <>
    <H2 vol={2} className={spacing.mb2} uppercase>
      Anchor link Buttons
    </H2>

    <P className={spacing.mb2}>
      To use <code>Button</code> styles in conjuction with a link you can use
      the <code>as</code> to provide a cutom <code>Link</code> component such as{" "}
      <code>gatsby-link</code> or just a plain old <code>a</code>.
    </P>

    <div className={grid.mid}>
      <Button
        variant={3}
        as={"a"}
        to="https://www.w3schools.com/html/html_links.asp"
      >
        Basic anchor link
      </Button>
    </div>
    <CodeSample className={grid.mid}>
      {`import Link from "gatsby-link";
/* use any Link component that supports a 'to' prop. */

<Button variant={3} as={Link} to="/path-to-resource">
  Custom Link component
</Button>

or

<Button variant={3} as={"a"} to="/path-to-resource">
  Anchor link Button
</Button>`}
    </CodeSample>
  </>
);
