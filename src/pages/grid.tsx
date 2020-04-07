import React from "react";
import DefaultLayout from "../layouts";
import classnames from "classnames";
import Text, { P, H2, H3 } from "../components/Text/Text";
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
  Example1,
  Example2
} from "../components/Grid/__gridExamples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";

const GridDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Grid</PageTitle>

      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Grid is for layout; personal to your site or style, limited only by
          old skool thinking around grid systems.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <P>
          You already have the grid system in CSS, <code>display: grid;</code>{" "}
          this is more about configuration. We find having a <code>Grid</code>{" "}
          component is useful for housing our core grid configs and their
          fallbacks.
        </P>

        <P>
          No demo, too big so here is a quick look at the props before we move
          on:
        </P>

        {/* <ul className={classnames(grid.mt1, grid.mb1)}>
          <Text tag="li">
            <code>tag</code> - string name of the HTML tag to render as the root
            for your grid.
          </Text>
          <Text tag="li">
            <code>typographic</code> - boolean designed to toggle typographic
            alignment rules.
          </Text>
          <Text tag="li">
            <code>variant</code> - number index of the grid variant to use.
          </Text>
        </ul> */}

        <CodeSample
          className={grid.mid}
        >{`/** HTML tag to render as the root for your grid. */
tag?: string;
/** Designed to toggle typographic alignment rules. */
typographic?: boolean;
/** Variant index. */
variant?: number;`}</CodeSample>

        <H2 vol={4} uppercase>
          Styling
        </H2>

        <P>
          It is quite hard to write something down for grid... because{" "}
          <em>you</em> control the CSS and we don&apos;t usually talk too much
          about the CSS implementation here usually pointing you to our
          project/theme styles as a starting point.
        </P>

        <P>
          In this instance however, it might be best to work through the Shelley
          grid as a walkthrough; we don&apos;t want to leave you hanging without
          a layout grid! First, what are we working with?
        </P>

        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
        />

        <H2 vol={5} uppercase weight={4}>
          Shelley&apos;s field grid
        </H2>

        <P className={grid.mb1}>
          This is our <q>one we made earlier</q> moment, our main grid variant.
          It started to resemble a games field so we just went with it.
          Outrageous, I know!
        </P>

        {/* <P className={grid.mb1}>
          It resembled a pitch so we just went with it. Wreckless!
        </P> */}

        <Example1 />

        <P className={grid.mt2}>
          We like this layout as a concept, inspired by Medium; designed to
          support an{" "}
          <a href="https://baymard.com/blog/line-length-readability">
            optimal reading width of between 50-75 characters
          </a>{" "}
          for the main content flow across devices.
        </P>

        {/* <source srcset="/sites/default/files/styles/clvi_photo_large/public/2019-10/Salam_Jashim_water%20world_2.jpg?itok=CgNsC_GS 1000w, /sites/default/files/styles/clvi_photo_xlarge/public/2019-10/Salam_Jashim_water%20world_2.jpg?itok=j-UHf2xH 1200w, /sites/default/files/styles/clvi_photo_xxlarge/public/2019-10/Salam_Jashim_water%20world_2.jpg?itok=-s2AY5V8 1600w" media="screen" type="image/jpeg" sizes="96vw"> */}

        <P>
          In general our approach is more <q>fluid</q> over <q>snap</q> although
          we do combine our <code>goal</code> and <code>edge</code> gridlines as
          we get narrower; check the example with your device inspector.
        </P>

        <P>
          The fact that the container has been combined into the grid means that
          we can treat the whole screen as a single <q>Tetris style</q> column
          with rails to align components as we drop them in.
        </P>

        <P>
          A simple foundation component like this paragraph can just sit quite
          happily in the <code>mid</code> section whilst an application
          component might need to span <code>edge-start / edge-end</code> and
          handle it&apos;s layout internally.
        </P>

        <P>
          Taking the image + caption below as an example, we have a{" "}
          <code>figure</code> which needs to wrap both the image and the caption
          but we want to sit the <code>figcaption</code> on the same grid lines
          as this paragraph. Nesting time!
        </P>

        <P>
          We insert the <code>figure</code> and assign it to <code>edge</code>.
          We then apply our main grid variant styles directly to it turning it
          into a nested mirror of its parent thus allowing us to position the
          image and the <code>figcaption</code> as we please.
        </P>

        <Grid
          tag="figure"
          className={classnames(grid.edge, grid.mt2, grid.mb2)}
          variant={1}
        >
          <img
            src="https://climatevisuals.org/sites/default/files/styles/clvi_hero_xxlarge/public/2019-09/44707910262_dc5cfb5f87_o.jpg?itok=x4VEEUbc"
            alt="She looks happy, perhaps thankful for the scrapes of water that remain in her barren landscape. She is sitting in the water raising her hands out to her sides as droplets rain off her hands back into the spring. She looks as mother nature might, stunning."
            className={grid.pen}
            style={{ width: "100%" }}
          />
          <Text
            tag="figcaption"
            vol={2}
            className={classnames(grid.mid, grid.mt1)}
          >
            A Maasai woman is sprinkling her feet with hot spring water,
            believed to be medicinal. Lake Magadi is among the salt lakes that
            will vanish in approximately 15 years due to human encroachment and
            climate change. The photo was captured during &apos;Photography for
            Conservation Project&apos; in 2017.{" "}
            <a href="https://climatevisuals.org/images?id=1367">
              Photo by David Macharia
            </a>
          </Text>
        </Grid>

        <P>
          Nice image isn&apos;t it? This is one of many from the fantastic{" "}
          <a href="https://climatevisuals.org/">Climate Visuals project</a>{" "}
          coming from the wonderful people at{" "}
          <a href="https://climateoutreach.org/">Climate outreach</a>.
        </P>

        <H2 vol={4} uppercase>
          Shelley grid evolution
        </H2>

        <P>
          Getting back to the CSS, we thought it might be nice to do a little
          walkthrough of how we ended up were we did. Fairly rough notes:
        </P>

        <P>
          We started with a 12 col grid, as you do, and a known width{" "}
          <code>grid-gap</code> of <code>1rem</code> forming our <q>gutters</q>{" "}
          which has some fluidity because we have a responsive text scale on our{" "}
          <code>html</code> element... more on that later.
        </P>

        <CodeSample className={grid.mid}>{`.grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
}`}</CodeSample>
        <P>
          To give us that container we added some <code>auto</code> columns to
          the outside but without limits on the internal column widths these
          will never engage and only give us a gutter width which maybe is ok
          for a mobile style.
        </P>

        <CodeSample
          className={grid.mid}
        >{`grid-template-columns: auto repeat(12, 1fr) auto;`}</CodeSample>

        <P>
          Now we have a 14 col grid, but you can consider the <code>auto</code>{" "}
          cols as a your lock container with 12 columns inside of that, the
          actual playing surface.
        </P>

        <P>
          To make our <code>auto</code> columns chunkier we messed about with{" "}
          <code>minmax()</code> limiting the width of our internal columns thus
          distrubuting it to the autos.
        </P>

        <CodeSample
          className={grid.mid}
        >{`grid-template-columns: auto repeat(12, minmax(0, 4.6vw)) auto;`}</CodeSample>

        <P>
          Thinking ahead; we added some named grid lines so we could assign
          children to a variable like name over an index; as the viewport
          shrinks we can collapse the areas by moving some grid lines to the
          same line.
        </P>

        <P>
          This is where we decided to name the lines after typical areas found
          on a sports field. A few developers like sport... I think, maybe...
        </P>

        <dl className={classnames(grid.mt1, grid.mb1, text.dl)}>
          <Text tag="dt">
            <code>mid</code>
          </Text>
          <Text tag="dd">
            midfield lines - <q>majority of the action</q>
          </Text>
          <Text tag="dt">
            <code>pen</code>
          </Text>
          <Text tag="dd">
            penalty / 22 yard lines - <q>it&apos;s a hell of a run!</q>
          </Text>
          <Text tag="dt">
            <code>goal</code>{" "}
          </Text>
          <Text tag="dd">
            goal lines - <q>end to end stuff!</q>
          </Text>
          <Text tag="dt">
            <code>edge</code>{" "}
          </Text>
          <Text tag="dd">
            touch lines - <q>the crowd goes wild!</q>
          </Text>
        </dl>

        <CodeSample
          className={grid.goal}
          language="css"
        >{`/* When something so simple becomes seemingly so complicated... It is still simple though, promise! Yes, it is annoyingly long... 'end to end' you might say. Oh dear, I can't even show my self out as I am #selfIsolating. Bugger.*/
grid-template-columns: [edge-start] auto [goal-start] repeat(2, minmax(0, 4.6vw)) [pen-start] repeat(2, minmax(0, 4.6vw)) [mid-start] repeat(2, minmax(0, 4.6vw)) [half] repeat(2, minmax(0, 4.6vw)) [mid-end] repeat(2, minmax(0, 4.6vw)) [pen-end] repeat(2, minmax(0, 4.6vw)) [goal-end] auto [edge-end];`}</CodeSample>

        <P>Hmmm, well that looks rediculous but it does work!</P>

        <P>
          We used something like this for a few weeks as we built out other
          things, moving the <code>mid</code> grid lines based on the viewport
          width via media queries in an attempt to maintain a good reading
          width.
        </P>

        <P>
          On reflection chasing an optimal reading width across breakpoints by
          snapping the grid lines at different resolutions was crap, we needed a
          smaller amount of flex in the <code>mid</code> section. What could we
          do instead?
        </P>

        <P>
          We also noticed that when we used a nested grid as a container then
          the internal columns would have a width of zero inflating the autos
          blowing out everything on the parent. Do we even need the{" "}
          <code>minmax()</code> anymore?
        </P>

        <P>
          What if we get rid of the <code>minmax()</code> and maybe split{" "}
          <code>mid</code> into two columns and size them with our{" "}
          <code>rem</code> value is responsive?
        </P>

        <CodeSample
          className={grid.pen}
        >{`/* A lot shorter now which is nice. */
grid-template-columns: [edge-start] auto [goal-start] 4vw 4vw [pen-start] 4vw [mid-start] 11.75rem [half] 11.75rem [mid-end] 4vw [pen-end] 4vw 4vw [goal-end] auto [edge-end];`}</CodeSample>

        <P>
          As we did this we also changed our <code>grid-gap</code> opting for
          more fluidity via the <q>viewport width</q> unit <code>vw</code> to
          stop the contents beoming too wide leaving us with horizontal
          scrollies at narrower widths.
        </P>

        <P>
          So after some tweaks and messing about this is what we end up with for
          our grid, including breakpoints:
        </P>

        <CodeSample className={grid.pen} language="css">{`/* Shelley grid */
Grid {
  display: grid;
  grid-gap: 3vw;
}

/* We will use this as our default, variant1 is the defualt setting for the component. */
Grid.variant1 {
  grid-template-columns: [edge-start goal-start] auto [pen-start] 4vw [mid-start] 9rem [half] 9rem [mid-end] 4vw [pen-end] auto [goal-end edge-end];
}

/* We are just tweaking the contral column widths our rem value. */
@media only screen and (min-width: 568px) {
  Grid.variant1 {
    grid-template-columns: [edge-start goal-start] auto [pen-start] 4vw [mid-start] 10rem [half] 10rem [mid-end] 4vw [pen-end] auto [goal-end edge-end];
  }
}

@media only screen and (min-width: 950px) {
  Grid.variant1 {
    grid-template-columns: [edge-start] auto [goal-start] 4vw 4vw [pen-start] 4vw [mid-start] 11.75rem [half] 11.75rem [mid-end] 4vw [pen-end] 4vw 4vw [goal-end] auto [edge-end];
  }
}
/* When to add a new variant? Not straightway, maybe after you use it on more than one component, you don't really want a variant with just one usage.*/

/* Column helper classes / mixins */
Grid.variant1>.edge {
  /* assign element to the content column */
  grid-column: edge-start / edge-end;
  /* or the shorthand available for -start -end by default: */
  grid-column: edge;
}
Grid.variant1>.goal {
  grid-column: goal;
}
Grid.variant1>.pen {
  grid-column: pen;
}
Grid.variant1>.mid {
  grid-column: mid;
}`}</CodeSample>

        <P>
          This change means we no longer are using a 12 column grid system!
          Maybe it will be too limiting in future? Ahhhh! It&apos;s ok, this is
          better for us, we&apos;re all about agile and what acutually works for
          us in the here and now based on what we know.
        </P>

        <P>
          We are not working to a design, just faffing about in the browser;
          when we are working with a static design we tend to use it as a
          guideline or a starting point. It serves to communicate the{" "}
          <q>vision</q> from where we can iterate in browser with{" "}
          <q>real feel</q>.
        </P>

        <P>
          When building to a fixed with design, you can start by aligning
          everything based on the visual but with fluid units. You should then
          do whatever works best in between your target breakpoints tweaking the
          fluid units as you see them in action.
        </P>
        <P>
          Collaborate if you are not the designer, demo and discuss the options,
          walk through them together and agree on the best outcome. Get your
          phones and ipads out, things always look different on device.
        </P>

        <H2 vol={4} uppercase>
          Fallbacks
        </H2>

        <P>Falbacks... they ruin all the fun don&apos;t they!?</P>

        <P>
          Fallback... don&apos;t you just love them and the way that they make
          you feel! Hacks with a fancy name but required if you are to support
          the annoying versions of IE that still pain us.
        </P>

        <P>
          IE11 but also early verison of Edge on things like TV&apos;s at large
          clients offices that they like to do demos on.
        </P>

        <P>
          We do support none grid browsers but we don&apos;t want to spend too
          much time on them so we tend to something that works and they hack
          together a fallback often opting for a visual but functional
          differace. As long as your main grid is solid then it shouldn&apos;t
          be too hard to hack in some fallbacks as and when.
        </P>

        <P>
          The <code>-ms-grid</code> implementaion implememtes the old spec,
          perhaps we can use that? Errr, nope, not in this instance unless you
          fancy specifing the index of each row, no thanks. It&apos;s also IE11+
          specific so is it that useful?
        </P>

        <P>
          Maybe we can just do something fairly simple for the main layout that
          isn&apos;t a proprietary Microsoft thang? I&apos;m pretty sure we can
          mimin our three main columns with some <code>max-width</code> and a
          litle <code>margin: auto</code>
        </P>

        <CodeSample className={grid.pen} language="css">{`/* Fallbacks */
Grid .goal {
  margin-left: auto;
  margin-right: auto;
  max-width: value(fallbackMaxWidth);
}
Grid .pen {
  margin-left: auto;
  margin-right: auto;
  max-width: value(fallbackMaxWidth);
}
Grid .mid {
  margin-left: auto;
  margin-right: auto;
  max-width: value(fallbackMaxWidth);
}`}</CodeSample>

        <P>
          If you need to support older browsers and you use this bare in mind
          you essentially need a rule not to touch the left and right margins of
          grid items using these helper classes.
        </P>

        <P>
          To set top and bottom margins do so specifically, i.e{" "}
          <code>margin-top: 2rem;</code> over <code>margin: 2rem 0;</code> which
          of course would be setting them to <code>0</code>.
        </P>

        <P>
          Superb article on grids:{" "}
          <a href="https://www.smashingmagazine.com/2019/07/inspired-design-decisions-pressing-matters/">
            Inspired Design Decisions: Pressing Matters
          </a>
        </P>

        <H2 vol={4} uppercase>
          Accessibility, UX &amp; the Law
        </H2>
        <P>
          In terms of WCAG and the law this, this is marked as Level A which
          makes it a requirement in terms both value that it provides and the
          law.
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default GridDocs;
