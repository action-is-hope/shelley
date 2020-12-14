/* menuExamples.tsx */
import React from "react";
/* Example Component */
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover
} from "./Menu";
/* Supporting Components */
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Text, { H2 } from "../Text/Text";
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";
import { classes as grid } from "../../styles/default/grid.st.css";
import { classes as spacing } from "../../styles/default/spacing.st.css";

export const meta = {
  name: "Menu"
};

export const QuickRef = () => (
  <CodeSample className={grid.mid}>{`import {
    Menu,
    MenuList,
    MenuButton
  } from "@action-is-hope/shelley";
\n
<Menu>
  <MenuButton
    variant={3}
  >
    Actions ▾
  </MenuButton>
  <MenuList>
    <MenuItem onSelect={() => alert("1")}>Option One</MenuItem>
    <MenuItem onSelect={() => alert("2")}>Option Two</MenuItem>
    <MenuItem onSelect={() => alert("3")}>Option Three</MenuItem>
  </MenuList>
</Menu>`}</CodeSample>
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
            ? `\n  vol={${labelDemoProps[3].value}}`
            : `\n  vol={false}`
        } ${
          labelDemoProps[4].value === "Yes"
            ? `\n  icon={<Icon><path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path></Icon>}`
            : ``
        }  \n>\n ${labelDemoProps[0].value}\n</Button>`}</CodeSample>
      }
    >
      {/* <MenuButton
        tone={labelDemoProps[1].value === 0 ? false : labelDemoProps[1].value}
        icon={
          labelDemoProps[4].value === "No" ? (
            false
          ) : (
            <Icon alt={labelDemoProps[1].value}>
              <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
            </Icon>
          )
        }
        variant={
          labelDemoProps[2].value === 0 ? false : labelDemoProps[2].value
        }
        vol={labelDemoProps[3].value === 0 ? false : labelDemoProps[3].value}
      >
        {labelDemoProps[0].value}
      </MenuButton> */}
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

export const Example1 = () => (
  <>
    <H2 vol={2} className={spacing.mb2} uppercase>
      Icon/Text Menu Button example
    </H2>
    <div className={grid.mid}>
      <Menu>
        <MenuButton
          vol={3}
          tone={2}
          variant={3}
          iconPos="start"
          icon={
            <Icon alt="Block settings">
              <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
            </Icon>
          }
        >
          Add Content
        </MenuButton>
        <MenuList>
          <MenuItem onSelect={() => alert("selected!")}>Page</MenuItem>
          <MenuItem onSelect={() => alert("selected!")}>Blog post</MenuItem>
          <MenuItem onSelect={() => alert("selected!")}>Event</MenuItem>
        </MenuList>
      </Menu>
    </div>
    <CodeSample className={grid.mid}>
      {`<Menu>
  <MenuButton
    vol={3}
    tone={2}
    variant={3}
    iconPos="start"
    icon={
      <Icon alt="Block settings">
        <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
      </Icon>
    }
  >
    Add Content
  </MenuButton>
  ... see quick reference
</Menu>`}
    </CodeSample>
  </>
);

export const Example2 = () => (
  <>
    <H2 vol={2} className={spacing.mb2} uppercase>
      Button Group example
    </H2>
    <div className={grid.mid}>
      <Menu>
        <ButtonGroup vol={4} tone={2} variant={3}>
          <Button fullWidth>Publish</Button>
          <MenuButton
            icon={
              <Icon alt="Block settings">
                <path d="M13 4v2l-5 5-5-5v-2l5 5z"></path>
              </Icon>
            }
            onMouseDown={() => console.log("hi2")}
          />
        </ButtonGroup>
        <MenuList>
          <Text as="label" uppercase vol={1}>
            Change status
          </Text>
          <MenuItem disabled onSelect={() => alert("selected!")}>
            Publish
          </MenuItem>
          <MenuItem onSelect={() => alert("selected!")}>Archive</MenuItem>
          <MenuItem onSelect={() => alert("selected!")}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </div>
    <CodeSample className={grid.mid}>
      {`<Menu>
  <ButtonGroup vol={4} tone={2} variant={3}>
    <Button fullWidth>Publish</Button>
    <MenuButton
      icon={
        <Icon alt="">
          <path d="M13 4v2l-5 5-5-5v-2l5 5z"></path>
        </Icon>
      }
      onMouseDown={() => console.log("hi2")}
    />
  </ButtonGroup>
  <MenuList>
    <Text as="label" uppercase vol={1}>
      Change status
    </Text>
    <MenuItem disabed onSelect={() => alert("selected!")}>Publish</MenuItem>
    <MenuItem onSelect={() => alert("selected!")}>Archive</MenuItem>
    <MenuItem onSelect={() => alert("selected!")}>Delete</MenuItem>
  </MenuList>
</Menu>`}
    </CodeSample>
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
