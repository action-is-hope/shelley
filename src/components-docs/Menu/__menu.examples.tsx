/* menuExamples.tsx */
import { MenuButton, Icon, Button, ButtonGroup, H2 } from "../../indexLib";

import { Item } from "@react-stately/collections";

/* Supporting Components */
import CodeSample from "../../components-site/CodeSample/CodeSample";
import { classes as grid } from "../../styles/default/grid.st.css";
import { classes as spacing } from "../../styles/default/spacing.st.css";

export const meta = {
  name: "Menu",
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
      <MenuButton
        vol={3}
        tone={2}
        variant="primary"
        iconPos="start"
        icon={
          <Icon alt="Block settings">
            <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
          </Icon>
        }
        label="Actions"
        onAction={(info: string) => alert(info)}
      >
        <Item key="page">Page</Item>
        <Item key="blog">Blog post</Item>
        <Item key="event">Event</Item>
      </MenuButton>
    </div>
    <CodeSample className={grid.mid}>
      {`<MenuButton
    vol={3}
    tone={2}
    variant="primary"
    iconPos="start"
    icon={
      <Icon alt="Block settings">
        <path d="M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"></path>
      </Icon>
    }
    label="Actions"
    onAction={(info: string) => alert(info)}
  >
    <Item key="page">Page</Item>
    <Item key="blog">Blog post</Item>
    <Item key="event">Event</Item>
  </MenuButton>`}
    </CodeSample>
  </>
);

export const Example2 = () => (
  <>
    <H2 vol={2} className={spacing.mb2} uppercase>
      Button Group example
    </H2>
    <div className={grid.mid}>
      <ButtonGroup vol={4} tone={2} variant="primary">
        <Button fullWidth>Publish</Button>
        <MenuButton
          vol={3}
          tone={2}
          variant="primary"
          iconPos="start"
          icon={
            <Icon alt="Change status">
              <path d="M13 4v2l-5 5-5-5v-2l5 5z"></path>
            </Icon>
          }
          onAction={(info: string) => alert(info)}
        >
          <Item key="publish">Publish</Item>
          <Item key="archive">Archive</Item>
          <Item key="delete">Delete</Item>
        </MenuButton>
      </ButtonGroup>
    </div>
    <CodeSample className={grid.mid}>
      {`<ButtonGroup vol={4} tone={2} variant="primary">
  <Button fullWidth>Publish</Button>
  <MenuButton
    vol={3}
    tone={2}
    variant="primary"
    iconPos="start"
    icon={
      <Icon alt="Change status">
        <path d="M13 4v2l-5 5-5-5v-2l5 5z"></path>
      </Icon>
    }
    onAction={(info: string) => alert(info)}
  >
    <Item key="publish">Publish</Item>
    <Item key="archive">Archive</Item>
    <Item key="delete">Delete</Item>
  </MenuButton>
</ButtonGroup>`}
    </CodeSample>
  </>
);

export const Example3 = () => (
  <>
    <H2 vol={2} className={spacing.mb2} uppercase>
      Icon Button example
    </H2>
    <div className={grid.mid}>
      <MenuButton
        tone={10}
        variant="fab"
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
        onAction={(info: string) => alert(info)}
      >
        <Item key="manage-block">Manage blocks</Item>
        <Item key="blog-settings">Block settings</Item>
        <Item key="delete-block">Delete block</Item>
      </MenuButton>
    </div>
    <CodeSample className={grid.mid}>
      {`<MenuButton
  tone={10}
  variant="fab"
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
  onAction={(info: string) => alert(info)}
>
  <Item key="manage-block">Manage blocks</Item>
  <Item key="blog-settings">Block settings</Item>
  <Item key="delete-block">Delete block</Item>
</MenuButton>`}
    </CodeSample>
  </>
);
