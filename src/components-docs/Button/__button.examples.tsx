/* buttonExamples.tsx */
import React from "react";
/* Example Component */
import { Button } from "../../indexLib";

/* Supporting Components */
import Icon from "../../components/Icon/Icon";
import PropsDemo from "../../components-site/PropsDemo/PropsDemo";
import CodeSample from "../../components-site/CodeSample/CodeSample";
import { classes as grid } from "../../styles/default/grid.st.css";
import { classes as spacing } from "../../styles/default/spacing.st.css";
export const meta = {
  name: "Button",
};
import { H2, P } from "../../components/Text/Text";

export const QuickRef = () => (
  <CodeSample className={grid.mid}>{`import Button from "@actionishope/shelley";
\n<Button>Hemp 4 Victory!</Button>
/* One rule: Fight climate change, not each other. */`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "children",
      label: "children",
      type: "text",
      value: "Hemp 4 Victory!",
    },
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
      value: 3,
    },
    {
      name: "icon",
      label: "icon",
      type: "select",
      value: "No",
      options: ["Yes", "No"],
    },
    {
      name: "iconPos",
      label: "iconPos",
      type: "select",
      value: "end",
      options: ["top", "end", "bottom", "start"],
    },
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
          labelDemoProps[2].value !== "false"
            ? `\n  variant="${labelDemoProps[2].value}"`
            : `\n  variant={false}`
        } ${
          labelDemoProps[3].value > 0
            ? `\n  vol={${labelDemoProps[3].value}}`
            : `\n  vol={false}`
        } ${
          labelDemoProps[4].value === "Yes" || labelDemoProps[2].value === "fab"
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
          labelDemoProps[4].value === "Yes" ||
          labelDemoProps[2].value === "fab" ? (
            <Icon>
              <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
            </Icon>
          ) : (
            false
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
  <CodeSample>{`<button class="button-root button-tone1 button-variant-primary button-vol2">
  <span class="button-inner">Earth Guardians</span>
</button>`}</CodeSample>
);

export const ComponentCSS = () => (
  <CodeSample fixedHeight>{`/** button.st.css selector examples... */

  /** Variants selectors */

  /* = 'Primary' */
  Button:variant(primary) {}

  /* = 'Secondary' */
  Button:variant(secondary) {}

  /* = 'Quiet' */
  Button:variant(quiet) {}

  /* = 'Floating Action Button'  */
  Button:variant(fab) {}

  /* You can also specify your own variants... */

  /** Volumes selectors (1-6) */
  Button:vol(1) {}
  Button:vol(2) {}
  Button:vol(3) {}
  Button:vol(4) {}
  Button:vol(5) {}
  Button:vol(6) {}

`}</CodeSample>
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
      <Button as={"a"} variant="secondary" href="hhii">
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
