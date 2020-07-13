import React from "react";
import DefaultLayout from "../layouts";
/* Shelley */
import { P, H2, H3, H4 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
/* Style imports */
import text from "../projects/default/css/text.st.css";
import grid from "../projects/default/css/grid.st.css";

import StyleInfo from "../components_site/StyleInfo/StyleInfo";

import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS
} from "../components/Text/__textExamples";

const TextDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Text</PageTitle>
      <Grid variant={1} formatted>
        <P vol={4} className={text.intro}>
          Text is for presenting words, we love words, they&apos;re the best.
          Simple, enguaging and on point.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <P>
          Shelley uses a volume property, <code>vol</code> for the general
          sizing of components. Text accepts <code>{`vol={1-12}`}</code> as well
          as an option to turn it off, <code>{`vol={false}`}</code>. Simples.
        </P>

        <ComponentDemo />

        <H2 vol={4} uppercase>
          Styling
        </H2>
        <P>
          Text usually accounts for a large proportion of a website /
          application and is integral to the overall typographic approach and
          layout of the design you are implementing. Define it early, tweak as
          you need.
        </P>

        <P>
          Shelley allows you to do whatever you want in terms of styling via
          pre-defined style hooks. You can of course add your own style variants
          by adding additional CSS class selectors within your{" "}
          <code>text.st.css</code> file:
        </P>

        <P>
          If you are starting from scratch then{" "}
          <a href="https://type-scale.com/">
            type-scale is a good starting place to generate a text scale
          </a>
          . Just map the values into respective volume selectors above.
        </P>
        <P>
          <strong>Note: </strong>We set our typical copy text to a volume of
          three and then scale up/down from there; <code>1</code> is small,{" "}
          <code>12</code> is big. Just define the ones you need, it is doubtful
          you will need all twelve.
        </P>

        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
        />

        <H2 vol={3} uppercase>
          Shelley theme
        </H2>

        <P>
          Shelley got adventurous and decided upon a full on fluid / modular
          scale. Typical. We quite like it so far, it was a bit trippy to set up
          but now it&apos;s working it seems solid.{" "}
          <a href="https://www.smashingmagazine.com/2016/05/fluid-typography/">
            Smashing mag did a worthwhile piece on fluid typograhy
          </a>{" "}
          back in 2016; probably the most memorable thing to happen that year...
          Yup, think so.
        </P>

        <P>
          Check the preview below to see what our scale looks like at the
          moment. The fact that the text scales without snapping is great as it
          really allows us to relax in the knowledge that the text will always
          be relatively similar in terms of the space used across all device
          widths. Phew!
        </P>

        <P>
          Adjust your browser and see the text scale with no jumps and a ratio
          that holds form on smaller devices.
        </P>

        <P>
          Shelley reckons &quot;it&apos;s a touch&quot; and we have left some
          [LINK]comments in our code so you can get a better idea of it all as
          and when you feel up to it.
        </P>

        <P>
          In terms of spacing and alignment you will notice these are pretty
          thin on the ground here. Go and check out how we use [Link]Grid. and
          we might use some generic helper classes in future. No idea! We remain
          unlimited and agile!
        </P>

        <P>
          We found margins were best set in place on as part of a context else
          we end up always needing to override. You will likely have helpers for
          spacing defined elsewhere, your grid perhaps. That&apos;s where I
          think we will put ours initially at lease.
        </P>

        <H2 vol={2} className={grid.mbSmall} uppercase>
          Shelley text volumes
          <br />
          <br />
        </H2>
      </Grid>

      <Grid variant={1}>
        <P vol={1} data-test="your-id">
          vol 1. Text
        </P>
        <P vol={2}>vol 2. Text</P>
        <P>vol 3. Text</P>
        <P vol={4}>vol 4. Text</P>
        <P vol={5}>vol 5. Text</P>
        <P vol={6}>vol 6. Text</P>
        <P vol={7}>vol 7. Text</P>
        <P vol={8}>vol 8. Text</P>
        <P vol={9}>vol 9. Text</P>
        <P vol={10}>
          vol 10. Text <br />
          <br />
        </P>
      </Grid>

      <Grid variant={1} formatted>
        <H2 vol={2} uppercase>
          Text styles in Action
          <br />
          <br />
        </H2>
        <H2 vol={9}>IPCC</H2>

        <H3 vol={6}>The Importance of the Ocean and Cryosphere for People</H3>
        <P>
          All people on Earth depend directly or indirectly on the ocean and
          cryosphere. The global ocean covers 71% of the Earth surface and
          contains about 97% of the Earth’s water.
        </P>
        <P>
          The cryosphere refers to frozen components of the Earth system. Around
          10% of Earth’s land area is covered by glaciers or ice sheets. The
          ocean and cryosphere support unique habitats, and are interconnected
          with other components of the climate system through global exchange of
          water, energy and carbon.
        </P>

        <P>
          The projected responses of the ocean and cryosphere to past and
          current human-induced greenhouse gas emissions and ongoing global
          warming include climate feedbacks, changes over decades to millennia
          that cannot be avoided, thresholds of abrupt change, and
          irreversibility.
        </P>
        <P>&hellip;</P>
        <H3 vol={6}>Observed changes and impacts</H3>
        <H4 vol={5}>Observed Physical Changes</H4>
        <P>
          Permafrost temperatures have increased to record high levels
          (1980s-present) (very high confidence) including the recent increase
          by 0.29°C ± 0.12°C from 2007 to 2016 averaged across polar and
          high-mountain regions globally.
        </P>

        <P>
          Arctic and boreal permafrost contain 1460–1600 Gt organic carbon,
          almost twice the carbon in the atmosphere (medium confidence).
        </P>

        <P>
          There is medium evidence with low agreement whether northern
          permafrost regions are currently releasing additional net methane and
          CO2 due to thaw.
        </P>

        <P>
          Permafrost thaw and glacier retreat have decreased the stability of
          high-mountain slopes (high confidence). 2.2.4, 2.3.2, 3.4.1, 3.4.3,
          Figure SPM.1
        </P>
        <H2 vol={5}>Observed Impacts on People and Ecosystem Services</H2>
      </Grid>
    </DefaultLayout>
  );
};

export default TextDocs;
