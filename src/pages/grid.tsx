import React from "react";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import { P, H2, H3 } from "../components/Text/Text";
import Icon from "../components/Icon/Icon";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import text from "../projects/default/css/text.st.css";
import grid from "../projects/default/css/grid.st.css";
import Blockquote from "../components/Blockquote/Blockquote";
import CodeSample from "../components_site/CodeSample/CodeSample";
import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
  Example1
} from "../components/Grid/__gridExamples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";

const GridDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Grid</PageTitle>
      <Grid variant={1}>
        <P vol={4} className={grid.touch} style={{ gridRow: "1", margin: "0" }}>
          <code>touch-start / touch-end</code>
        </P>
        <P vol={4} className={grid.goal} style={{ gridRow: "1", margin: "0" }}>
          <code>goal-start / goal-end</code>
        </P>
        <P vol={4} className={grid.pen} style={{ gridRow: "1", margin: "0" }}>
          <code>pen-start / pen-end</code>
        </P>
        <P vol={4} className={grid.mid} style={{ gridRow: "1", margin: "0" }}>
          <code>mid-start / mid-end</code>
        </P>
      </Grid>
      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Grid is for layout and it is personal to your site or your way of
          building your site. It is limited only by our traditonal thinking
          around grid systems.
        </P>

        <P>
          CSS grid requires a different way of thinking about grids... First
          thing to say about css grid is that you are not limited by one system.
          Limited like a 12 col, in a 12 col in a 12 col as with a bootstrap
          type system.
        </P>

        <P>
          Second is that you don&apos;t really need a <code>container</code>{" "}
          anymore, it&apos;s so easy to set this all up as part of your grid
          styles.
        </P>

        <P>
          You can name grid lines and grid rows as well as use their numbering
          system.
        </P>

        <P>You can move things around with CSS with ease.</P>

        <P>
          You can have nested grids allowing you to have a main layout grid and
          then inside of those grid items you can use another grid and that one
          can be whatever you like... You have the most powerfull system,
          cssdon&apos;t{" "}
        </P>

        <P>
          12 columns are alwasy useful as they divide so nicely so we tend to
          use these as a basis for our main layout which is basically a Medium
          style of supporting a narrow reading width column with a multiple
          breakout widths from the central column.
        </P>

        <P>
          CSS grid is something we really feel that you need to feel out as you
          are building.
        </P>

        <P>
          What&apos; so great about CSS grid? Well you can pretty much replace
          the bootstrap grid system with a few lines for starters:
        </P>

        <CodeSample language="css">{`.grid-12-col {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}`}</CodeSample>

        <P>
          There are so many ways to use grid there isn&apos;t much point to tell
          you anything but more show you what we do with grid.
        </P>

        <P>What do we want from our main layout?</P>
        <ul>
          <li>
            Center based with different column widths available full screen.
          </li>
          <li>These column widths need to be responsive.</li>
          <li>Needs to support our typographic spacing rules.</li>
          <li>The children need to be able to be placed to site </li>
          <li>
            Responsive grid gap that is locked so it does&apos;t get too big.
          </li>
          <li></li>
          <li></li>
        </ul>

        {/* <P>
          Layout is fairly meaty topic but often ignored in UI frameworks today.
          I assume this is due to the rather opinionated view people take on
          which grid system is best and nobody wants to go there. People just
          use whatever they have gotten used to over the years and that is that,
          all plodding along wondering why there is not a modern day layout
          system, you know, a bit like a table...
        </P>
        <P>
          Some have moved over to some system using <code>flexbox</code>, (
          <a href="https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/">
            old but interesting article on why not to use flexbox for layout
          </a>
          ) some have stuck with a Bootstrap style system, some have strapped
          their own together in the form of{" "}
          <a href="http://oddbird.net/susy/">mixins via susy</a> and do not or
          can not move on.
        </P>
        <P>To quote the susy website:</P>
        <Blockquote>
          <P>
            With the advent of flexbox and the CSS Grid module, there are fewer
            and fewer reasons to use a grid library like Susy – and that’s
            wonderful!
          </P>
        </Blockquote>

        <P>
          All these things have been cool but have really only been paving the
          way for CSS Grid and now is the time to use it. Browser support is
          manageable, with only IE9/10/11 lacking support. To that end SUI
          provides a selection of preset fallback templates for IE10 and 11 via
          the <code>fallback</code> prop if so desire. If not, they will just
          stack up in a linear grid of one column and a default gutter.
        </P>
        <P>
          With Internet Explorer palmed off to one side, it is time to go and
          learn some Grid. Before you start, a few things which, I think, are
          especially noteworthy:
        </P>
        <H2 vol={4} uppercase>
          Cleaner markup
        </H2>
        <P>
          CSS basically <strong>IS</strong> the grid system and replaces the
          need for separate <code>Container, Row, Col</code> elements, whose
          dedicated role was only alignment. Your Grid can have the container
          styles applied to it and then you just tell the <code>Grid</code>{" "}
          component what type of grid you want directly with plain old CSS.
        </P>
        <P>
          With SUI Grid you do this via <code>props</code>, which mostly just
          map to CSS so you don&apos;t have to write a load of styles and media
          queries by hand.
        </P>
        <H2 vol={4} uppercase>
          Control over source order
        </H2>
        <P>
          The ability with grid to actually reflow the page with{" "}
          <code>gridTemplateAreas</code> is actually amazing. The effortless
          ability to move things around in such a performant manner is crazy
          cool. For accessibility and SEO alone this is great, but the placement
          control we have at breakpoints is insane (I need to get out more). We
          do need to experiment with screen readers, but it would make sense for
          them to follow source order, but you know what they say about
          assumptions... Ass u Me.
        </P>
        <H2 vol={4} uppercase>
          Internationalisation - i18n
        </H2>

        <P>
          I&apos;ll wrap this up with one three letter abbr{" "}
          <abbr title="Right to Left">RTL</abbr>. That&apos;s right, this thing
          is fully loaded, no more hacking the crap out of float based systems
          like Bootstrap wrestling with{" "}
          <code>col-md-offset-xx, col-xl-offset-xx</code> being too much of a
          nightmare to maintain when <code>dir="rtl"</code>. It&apos;s all
          automagical, now you just need to pick the right font. :-)
        </P>
        <H2 vol={4} uppercase>
          Lightweight
        </H2>
        <P>
          Actually, it is featherweight, because it ships with most, you just
          have to tell it what to do, and maybe tell IE10/11 to do something
          else. It can be used alongside other grid systems so a phased approach
          to moving to it is feasible.
        </P>
        <H2 vol={4} uppercase>
          Actually, it&apos;s all amazing!
        </H2>
        <P>
          It is! The alignment options are great, very similar to{" "}
          <code>flexbox</code>, but it takes some getting used to, and it can be
          easy to flatten your code out too much thus loosing semantic
          groupings. Don&apos;t be afraid to use lots of grids inside of grids
          and of course <code>flexbox</code> has it&apos;s place but usually for
          lower level things like local grid item alignment or inline lists as
          &apos;of the top of the head&apos; examples.
        </P>

        <P type="heading1">CSS is the Grid system</P>
        <P>
          What does that actually mean? Well, before we used{" "}
          <code>Container, Row, Col</code> and these made up our Grid system.
          Now these don&apos;t exist anymore and your grid is define directly
          with CSS...
        </P>
        <P>
          Take a look at the{" "}
          <a href="https://gridbyexample.com/patterns/">
            gridbyexample patterns
          </a>
          , notice the clean markup due to the CSS being applied to the actual
          semantic elements that make up the page.
        </P>
        <P>
          "Well that is awesome, but surely that means we loose the ability to
          strap together layouts like we used to with our frameworks? Does this
          not mean that we have to define CSS everytime we want to use a grid?"
        </P>
        <P>
          Actually, I do suppose there is some truth in that... You would have
          your standard grid classes set up in your CSS, but what about when you
          want to throw together - a quick layout your haven&apos;t got a class
          for? Well, yes I suppose you would need to go and add some styles, if
          you are using something like{" "}
          <a href="https://neat.bourbon.io/docs/latest/">neat</a> you are well
          used to this and prefer it, because you have been better than most of
          us and have never felt the wrappers in grid systems were ever
          justified, preferring to tailor your use of grid related CSS by
          applying styles directly to your semantic elements.
        </P>
        <P>
          And that is sort of the point, grid systems should have really always
          stayed with the CSS, but because it was always a nightmare, we ended
          up adding lots of generic wrappers. We never used to do this back in
          the Holy Grail days, we always used to have our layout in our CSS.
        </P>
        <P>
          With SUI Grid, you basically get the best of both worlds. You can
          basically write the CSS directly through the use of props, which
          essentially just map through to CSS. It&apos;s no different to
          specifying a load of <code>col-xx-x</code> on your more traditional
          grid systems. The default Grid components come with responsive gutters
          set within the theme.
        </P>
        <P>
          The <code>Box</code> component can be used as a grid item as it takes
          some of the grid child CSS as props (see Box docs for more info), like{" "}
          <code>gridArea</code>. Of course, it is also possible to use{" "}
          <code>Box</code> as a <code>flexbox</code>, but also have it as a grid
          item. Whhaaaaat? Yes, it will take a bit of getting used to, but only
          because we have to unlearn some of the way we have always done stuff.
        </P>
        <P>
          So far it seems to be that there are quite a few ways to strap a grid
          together, sometimes you can get what you need from{" "}
          <strong>only adding styles to the grid root element</strong>.
          Sometimes you can only get the results you need by using{" "}
          <strong>Grid CSS on the grid items</strong> and sometimes do some
          basic{" "}
          <strong>
            set up with the grid items via gridArea and then control things from
            the grid root
          </strong>{" "}
          element.
        </P>

        <H2 vol={4} uppercase>
          Resources:
        </H2>
        <P gutterBottom="6vh">
          <a href="https://scrimba.com/g/gR8PTE">
            A nice set of video tuts, each episode is short and sweet.
          </a>
        </P> */}

        {/* HERE */}
        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <QuickRef />
        <P>Pretty sure this is my new dream grid 'go to' grid config. </P>
        <P>
          https://codepen.io/michellebarker/full/zYOMYWv
          https://www.smashingmagazine.com/2019/07/inspired-design-decisions-pressing-matters/
          Layout is fairly meaty topic... Grid &apos;systems&apso; in general we
          find a bit crappy. They are usually a bit of a mind bend and assume
          much which makes them a bit limiting.
        </P>

        <P>
          So rather than give you a grid system we thought instead we might
          focus on learning CSS grid and share some things so that you can make
          your own.
        </P>

        <P>
          The thing is, CSS basically <em>is</em> the grid system and replaces
          the need for all those separate <code>Container, Row, Col</code>{" "}
          elements, whose role was one of alignment only.
        </P>
        <P>
          Your Grid can have the container styles applied to it and then you
          just tell the <code>Grid</code> component what type of grid you want
          directly with plain old CSS.
        </P>
        <P>
          We I guess are going to say something similar, your grid will be
          personal and number of grid variants yuo have and how you use grid
          will vary hugely.
        </P>

        <P>
          To this end we don&apos;t really expect you to use our grid component
          but rather build your own suited to your usecases. If ours fits for
          you then feel free to use it. We are still experimenting with it.
        </P>

        <ComponentDemo />

        <H2 vol={4} uppercase>
          Styling
        </H2>
        <P>
          Unlike some of our other components we do not use <code>vol</code> or{" "}
          <code>accent</code>. In the example above you saw us using inline
          styles which is a no no for accessibility. Why? It is hard for users
          to override styles with their own so inline sizing and color is
          especially bad.
        </P>
        <P>
          We tend to apply these &apos;glue&apos; styles within other component
          compositions, or application components if you will, where size and
          colour are a aspect. You can wrap this up and augment the api as you
          please.
        </P>
        <P>
          So at this level there isn&apos;t much to say on styling other than by
          default this is one of the few components that we so provide some
          default styles at the core.
        </P>

        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
        />

        <P>
          <strong>Note:</strong> In terms of text alternative we opted for
          visually hidden text over using titles within the <code>svg</code>{" "}
          itself or an <code>aria-label</code>. The icon is a non-focusable
          element so it might get ignored; in our experiance this is{" "}
          <a href="https://simplyaccessible.com/article/7-solutions-svgs/">
            a reliable method for accessible SVG icons
          </a>{" "}
          so we continue to adopt it.
        </P>
        <H2 vol={4} uppercase>
          Accessibility, UX &amp; the Law
        </H2>
        <P>
          In terms of WCAG and the law this, this is marked as Level A which
          makes it a requirement in terms both value that it provides and the
          law.
        </P>
        <Blockquote
          citeUrl="https://www.w3.org/TR/2016/NOTE-UNDERSTANDING-WCAG20-20161007/text-equiv-all.html"
          cite="Non-text Content: Understanding SC 1.1.1"
          variant={2}
        >
          <P>
            1.1.1 Non-text Content: All non-text content that is presented to
            the user has a text alternative that serves the equivalent purpose,
            except for the situations listed below. (Level A)
          </P>
        </Blockquote>
        <P>
          This is the same checkpoint that we would use when auditing an image
          and as such the same rules apply, this is a{" "}
          <a href="https://www.w3.org/WAI/tutorials/images/">
            handy breakdown of image concepts
          </a>
          . If you are using a visible label then an icon is classified as
          decorative, if you are not using a visible label then the image is
          functional and thus you should provide equivalent.
        </P>
        <H2 uppercase vol={4}>
          Examples
        </H2>

        <P>
          This is the shape of the Covid-19 exponential growth <Example1 />{" "}
          spread; we found an article that was using it just like that, loved
          it! When we find it we will post it! It will only work on the first
          line of a text block really at this size but it&apos;s a nice
          addition. Feels like this one should have an equivalent. See{" "}
          <code>Example1</code> within <a href="#">icon examples on github</a>.
        </P>

        <P>
          Of course you are likely to use icons in a multitude of places from
          input labels to buttons to definition lists. Just always be mindful
          when you are choosing icons, you might get what it means but will
          others? If you are in doubt; provide a visible label; otherwise
          provide the label as an alternative/equivalent via the{" "}
          <code>alt</code> prop.
        </P>

        <H2 vol={4} uppercase>
          What about icon fonts?
        </H2>
        <P>
          We don&apos;t like them and we don&apos;t recommend them as a
          professional solution, however are inventive; we like that about them
          - it&apos;s defo worth understanding how they work.
        </P>

        <H3 uppercase vol={2}>
          What is the problem?
        </H3>

        <P>
          They are not reliable enough, If you are working as part of any
          organisation that limits font downloads based on internal security
          restrictions, think UK public sector bodies, then they will not work
          and you will have wasted time trying to cut corners.
        </P>

        <P>
          We speak from experiance working within government sectors in the U.K.
          It will also trip you up if you have an international audiance, the
          Great Firewall of China is known to interfere with such things. So
          unless you like presenting a load of empty boxes to your stakeholders
          then avoid using icon fonts.
        </P>

        <P>
          They are usually inserted with via an <code>i</code> tag this does not
          stand for <em>icon</em> but for <em>italic</em>. Lastly they will all
          be downloaded even if you only use five. They are inventive though, we
          like that about them - it&apos;s defo worth understanding how they
          work.
        </P>

        <H3 uppercase vol={2}>
          Can I use a SVG sprite instead?
        </H3>

        <P>
          Perhaps the most tempting reason to use icon fonts is the fact that
          you get access to all of them in one go with no need to import import
          individual icons. Useful in a CMS if you are offering a number of icon
          options to your content authors.
        </P>

        <P>
          It is possible to do the same thing with inline SVG if you are happy
          to put a CSS sprite on the page. This can be convenient if you use the
          same icons a lot throughout an app.
        </P>

        <P>
          Maybe you can avoid the increased HTML payload of a SVG sprite by
          starting with an empty sprite injecting icons into it as a user
          progresses? Sounds fiddly and server side, well... Maybe use a sprite
          but try no to put a whole icon set in it if you only use 5 icons!
          Serve what you use.
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default GridDocs;
