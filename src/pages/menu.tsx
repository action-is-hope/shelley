import React from "react";
import DefaultLayout from "../layouts";
import Text, { P, H2 } from "../components/Text/Text";
import Icon from "../components/Icon/Icon";

import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import { classes as text } from "../styles/default/text.st.css";
import { classes as grid } from "../styles/default/grid.st.css";
import Blockquote from "../components/Blockquote/Blockquote";
import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
  Example1,
  Example2
} from "../components/Menu/__menu.examples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";
import Button from "../components/Button/Button";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover
} from "../components/Menu/Menu";
import ButtonGroup from "../components/ButtonGroup/ButtonGroup";

const MenuDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Menu</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4} className={text.intro}>
          Menus are for selecting an action. Keyboard acccess is via the arrow
          keys rather than tab.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <P>
          Menu is made up of a number of components provided by{" "}
          <a href="https://reach.tech/menu-button/">
            Reach UI's Menu Button package
          </a>{" "}
          with some Shelley classes and styles but you can still use the{" "}
          <code>data-type</code> attributes when styling the menu item states.
        </P>

        <P>
          The <code>MenuButton</code> is wrapped with a Shelley Button and
          behaves like one too.
        </P>

        <Example1 />

        <Example2 />

        <div className={grid.mid}>
          {" "}
          <Menu>
            <br />

            <ButtonGroup vol={4} tone={2} variant={3}>
              <Button fullWidth>Publish</Button>
              <MenuButton
                icon={
                  <Icon alt="Block settings">
                    <path d="M13 4v2l-5 5-5-5v-2l5 5z"></path>
                    {/* <path d="M3 7v2l5 5 5-5v-2l-5 5z"></path> */}
                  </Icon>
                }
                onMouseDown={() => console.log("hi2")}
              />
            </ButtonGroup>
            <MenuList>
              <Text as="label" uppercase vol={1}>
                Change status
              </Text>
              <MenuItem onSelect={() => console.log("hi")}>Publish</MenuItem>
              <MenuItem onSelect={() => console.log("hi")}>Archive</MenuItem>
              <MenuItem onSelect={() => console.log("hi")}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </div>
        {/* <path d='M3 2v2l5 5 5-5v-2l-5 5z'></path><path d='M3 7v2l5 5 5-5v-2l-5 5z'></path> */}
        <div className={grid.mid}>
          {" "}
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
              <MenuItem onSelect={() => console.log("hi")}>
                Manage blocks
              </MenuItem>
              <MenuItem onSelect={() => console.log("hi")}>
                Block settings
              </MenuItem>
              <MenuItem onSelect={() => console.log("hi")}>
                Delete block
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <P>Example 2</P>

        <div className={grid.mid}>
          <Menu>
            <MenuButton vol={5} tone={3} onMouseDown={() => console.log("hi2")}>
              Hello2
            </MenuButton>
            <MenuPopover className="test">
              <div className="arbitrary-element">
                <MenuItems>
                  <MenuItem
                    onSelect={() => {
                      console.log("HIS<S<S");
                    }}
                  >
                    Downloads
                  </MenuItem>
                  <MenuItem
                    onSelect={() => {
                      console.log("HIS<S<S");
                    }}
                  >
                    Downloads
                  </MenuItem>
                  <MenuItem
                    onSelect={() => {
                      console.log("HIS<S<S");
                    }}
                  >
                    Downloads
                  </MenuItem>
                </MenuItems>
              </div>
            </MenuPopover>
          </Menu>
        </div>

        {/* <ComponentDemo /> */}

        <H2 vol={4} uppercase>
          Styling
        </H2>

        <P>
          In terms of the <code>MenuButton</code> this is just a button so
          styling comes from there.
        </P>

        {/* <P>
          In terms of HTML structure, we have a button and an inner button. The
          inner button is pretty key if we are to throw in other things like
          icons inside. We put out vertical alignment on the inner item so as to
          allow an adjacent icon to span the full height.
        </P>

        <P>
          When providing state styles for things like loading or pressed then we
          suggest you use the aria attributes and target the attribute states.
          @todo example
        </P> */}

        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
        />

        <H2 vol={4} uppercase>
          Accessibility, UX &amp; the Law
        </H2>

        <P>
          In terms of{" "}
          <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> and the
          law, this is covered under Level A which makes it a requirement both
          in the value that it provides and the law.
        </P>

        <P>
          We've got buttons, pop ups, selectable options and probably icons as
          well so there is a lot to trip up on. We want it all to be keyboard
          accessible and predictable and understandable.
        </P>

        <Blockquote
          cite={
            <a href="https://www.w3.org/TR/WCAG20/">
              Guideline 2.1 Keyboard Accessible: Make all functionality
              available from a keyboard.
            </a>
          }
          variant={2}
        >
          <P>
            2.1.1 Keyboard: All functionality of the content is operable through
            a keyboard interface without requiring specific timings for
            individual keystrokes, except where the underlying function requires
            input that depends on the path of the user's movement and not just
            the endpoints. (Level A)
          </P>

          <P>
            2.1.2 No Keyboard Trap: If keyboard focus can be moved to a
            component of the page using a keyboard interface, then focus can be
            moved away from that component using only a keyboard interface, and,
            if it requires more than unmodified arrow or tab keys or other
            standard exit methods, the user is advised of the method for moving
            focus away. (Level A)
          </P>
        </Blockquote>

        <P>
          We have implemeted what the folks over at Reach have done, you will
          note that we force a focus trap when modals/dialogs are up so that you
          can't go tabbing all over the place. A 'focus trap' is intentional and
          not the same as a 'keyboard trap' which leaves you stuck with nowhere
          to go.
        </P>

        <Blockquote
          cite={
            <a href="https://www.w3.org/TR/WCAG20/">
              Guideline 3.2 Predictable: Make Web pages appear and operate in
              predictable ways.
            </a>
          }
          variant={2}
        >
          <P>
            3.2.1 On Focus: When any component receives focus, it does not
            initiate a change of context. (Level A)
          </P>
          <P>
            3.2.2 On Input: Changing the setting of any user interface component
            does not automatically cause a change of context unless the user has
            been advised of the behavior before using the component. (Level A)
          </P>
        </Blockquote>

        <P>
          If you are throwing an <code>Icon</code> inside with no visible text
          label then be sure to provide one via the <code>alt</code> prop on the
          icon which mirrors that of an image. Please try and remember!
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default MenuDocs;
