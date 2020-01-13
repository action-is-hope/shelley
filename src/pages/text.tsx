import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import { P, H1, H2, SPAN } from "../components/Text/Text";

const TextDocs = () => (
  <DefaultLayout>
    <div className="bodyCopy">
      <H1 vol={3}>
        <SPAN uppercase>
          <Link to="/">Back to Components</Link>
        </SPAN>
        <br />
        <SPAN vol={8}>Text - [WIP]</SPAN>
      </H1>
      <P>
        Use text to present your design and content as clearly and efficiently
        as possible. We called it &#39;Text&#39; because we get bored mistyping
        &#39;Typography&#39;. 🥺
      </P>

      <P>
        We are only displaying a sample of the 14 &#39;volume&#39; levels that
        are defined and available for styling.
      </P>
    </div>

    <hr />

    <P vol={1}>vol 1. Text</P>
    <P vol={2}>vol 2. Text</P>
    <P>vol 3. Text</P>
    <P vol={4}>vol 4. Text</P>
    <P vol={5}>vol 5. Text</P>
    <P vol={6}>vol 6. Text</P>
    <P vol={7}>vol 7. Text</P>
    <H1>vol 8. Text</H1>

    <hr />

    <div className="bodyCopy">
      <P>
        The next example illustrates the Text component in use as part of an old
        skool global class <code>bodyCopy</code> class. Is this bad? We could
        provide another component?
      </P>
    </div>
    <div className="bodyCopy">
      <H1 vol={9}>IPCC</H1>

      <H2 vol={6}>The Importance of the Ocean and Cryosphere for People</H2>
      <P>
        All people on Earth depend directly or indirectly on the ocean and
        cryosphere. The global ocean covers 71% of the Earth surface and
        contains about 97% of the Earth’s water.
      </P>
      <P>
        The cryosphere refers to frozen components of the Earth system. Around
        10% of Earth’s land area is covered by glaciers or ice sheets. The ocean
        and cryosphere support unique habitats, and are interconnected with
        other components of the climate system through global exchange of water,
        energy and carbon.
      </P>

      <P>
        The projected responses of the ocean and cryosphere to past and current
        human-induced greenhouse gas emissions and ongoing global warming
        include climate feedbacks, changes over decades to millennia that cannot
        be avoided, thresholds of abrupt change, and irreversibility.
      </P>
      <P>&hellip;</P>
      <H1 vol={6}>Observed changes and impacts</H1>
      <H2 vol={5}>Observed Physical Changes</H2>
      <P>
        Permafrost temperatures have increased to record high levels
        (1980s-present) (very high confidence) including the recent increase by
        0.29°C ± 0.12°C from 2007 to 2016 averaged across polar and
        high-mountain regions globally.
      </P>

      <P>
        Arctic and boreal permafrost contain 1460–1600 Gt organic carbon, almost
        twice the carbon in the atmosphere (medium confidence).
      </P>

      <P>
        There is medium evidence with low agreement whether northern permafrost
        regions are currently releasing additional net methane and CO2 due to
        thaw.
      </P>

      <P>
        Permafrost thaw and glacier retreat have decreased the stability of
        high-mountain slopes (high confidence). 2.2.4, 2.3.2, 3.4.1, 3.4.3,
        Figure SPM.1
      </P>
      <H2 vol={5}>Observed Impacts on People and Ecosystem Services</H2>
    </div>
  </DefaultLayout>
);

export default TextDocs;
