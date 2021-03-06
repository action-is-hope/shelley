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
  } from "@actionishope/shelley";
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

export const ComponentHTML = () => <CodeSample>{`TBC`}</CodeSample>;

export const ComponentCSS = () => (
  <CodeSample fixedHeight>{`/** menuList.st.css */

TBC - see Reach and local .st.css

/** menuItem.st.css */

TBC - see Reach and local .st.css

`}</CodeSample>
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
          <MenuItem onSelect={() => alert("🌎")}>Page</MenuItem>
          <MenuItem onSelect={() => alert("🌎")}>Blog post</MenuItem>
          <MenuItem onSelect={() => alert("🌎")}>Event</MenuItem>
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
      <Menu data-testid="test">
        <ButtonGroup vol={4} tone={2} variant={3}>
          <Button fullWidth>Publish</Button>
          <MenuButton
            icon={
              <Icon alt="Block settings">
                <path d="M13 4v2l-5 5-5-5v-2l5 5z"></path>
              </Icon>
            }
          />
        </ButtonGroup>
        <MenuList>
          <Text as="label" uppercase vol={1}>
            Change status
          </Text>
          <MenuItem disabled onSelect={() => alert("🌎")}>
            Publish
          </MenuItem>
          <MenuItem onSelect={() => alert("🌎")}>Archive</MenuItem>
          <MenuItem onSelect={() => alert("🌎")}>Delete</MenuItem>
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
    />
  </ButtonGroup>
  <MenuList>
    <Text as="label" uppercase vol={1}>
      Change status
    </Text>
    <MenuItem onSelect={() => alert("🌎")}>Publish</MenuItem>
    <MenuItem onSelect={() => alert("🌎")}>Archive</MenuItem>
    <MenuItem onSelect={() => alert("🌎")}>Delete</MenuItem>
  </MenuList>
</Menu>`}
    </CodeSample>
  </>
);

export const Example3 = () => (
  <>
    <H2 vol={2} className={spacing.mb2} uppercase>
      Icon Button example
    </H2>
    <div className={grid.mid}>
      <Menu>
        <MenuButton
          tone={10}
          variant={4}
          vol={1}
          icon={
            <Icon alt="Block settings">
              <g id="ellipsis-dots-h">
                <path d="M4 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
                <path d="M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
                <path d="M16 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
              </g>
            </Icon>
          }
        />

        <MenuList>
          {/* 'Manage blocks' is a consistant option thus always at the top. */}
          <MenuItem onSelect={() => alert("🌎 🚒")}>Manage blocks</MenuItem>
          <MenuItem onSelect={() => alert("🌎 🚒")}>Block settings</MenuItem>
          <MenuItem onSelect={() => alert("🌎 🚒")}>Delete block</MenuItem>
        </MenuList>
      </Menu>
    </div>
    <CodeSample className={grid.mid}>
      {`<Menu>
  <MenuButton
    tone={10}
    variant={4}
    vol={1}
    icon={
      <Icon alt="Block settings">
        <g id="ellipsis-dots-h">
          <path d="M4 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
          <path d="M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
          <path d="M16 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
        </g>
      </Icon>
    }
  />

  <MenuList>
    <MenuItem onSelect={() => alert("🌎 🚒")}>
      Manage blocks
    </MenuItem>
    <MenuItem onSelect={() => alert("🌎 🚒")}>
      Block settings
    </MenuItem>
    <MenuItem onSelect={() => alert("🌎 🚒")}>
      Delete block
    </MenuItem>
  </MenuList>
</Menu>`}
    </CodeSample>
  </>
);

export const Example4 = () => (
  <>
    <H2 vol={2} className={spacing.mb2} uppercase>
      Popover with arbitrary element
    </H2>
    <div className={grid.mid}>
      <Menu>
        <MenuButton>Activate</MenuButton>
        <MenuPopover className="test">
          <div className="arbitrary-element">
            <MenuItems>
              <MenuItem
                onSelect={() => {
                  alert("🌎 🚒");
                }}
              >
                Downloads
              </MenuItem>
            </MenuItems>
          </div>
        </MenuPopover>
      </Menu>
    </div>
    <CodeSample className={grid.mid}>
      {`<Menu>
  <MenuButton>Activate</MenuButton>
  <MenuPopover className="test">
    <div className="arbitrary-element">
      <MenuItems>
        <MenuItem
          onSelect={() => {
            alert("🌎 🚒");
          }}
        >
          Downloads
        </MenuItem>
      </MenuItems>
    </div>
  </MenuPopover>
</Menu>`}
    </CodeSample>
  </>
);
