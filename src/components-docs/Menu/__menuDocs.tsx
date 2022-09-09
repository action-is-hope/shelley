import type React from "react";
import { P, H2, Grid, Blockquote } from "../../indexLib";

import {
  meta,
  QuickRef,
  ComponentHTML,
  ComponentCSS,
  Example1,
  Example2,
  Example3,
} from "./__menu.examples";

import StyleInfo from "../../components-site/StyleInfo/StyleInfo";
import PageTitle from "../../components-site/PageTitle/PageTitle";

const MenuDocs: React.VFC = () => {
  return (
    <>
      <PageTitle>Menu</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4}>
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
          The <code>MenuTrigger</code> is wrapped with a Shelley Button and
          behaves like one too.
        </P>

        <Example1 />

        <Example2 />

        <Example3 />

        {/* <ComponentDemo /> */}

        <H2 vol={4} uppercase>
          Styling
        </H2>

        <P>
          In terms of the <code>MenuButton</code> this is just a button so
          styling comes from there.
        </P>

        <P>
          @todo, for now see menu.st.css files in default theme and shelley
          theme folders.
        </P>

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
          desc={
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
          desc={
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
    </>
  );
};

export default MenuDocs;
