import React from "react";
import DefaultLayout from "../layouts";
import { P, H2 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import text from "../projects/default/css/text.st.css";

import Blockquote from "../components/Blockquote/Blockquote";
import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS
} from "../components/Blockquote/__blockquoteExamples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";

const LabelsDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Blockquote</PageTitle>

      <Grid variant={1} tag="main" formatted>
        <P vol={4} className={text.intro}>
          Blockquote&apos;s are used for quoting peeps and papers; they tell any
          tech listening that this is a referance to someone elses words.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <P>
          Tech like a screen reader might emphasise <code>blockquote</code> text
          whilst a search bot might consider relavant when ranking.
        </P>

        <P>
          Digression Alert: Did you read the example quote?{" "}
          <a href="https://www.theguardian.com/technology/2020/feb/21/climate-tweets-twitter-bots-analysis">
            {" "}
            a quarter of all tweets about climate crisis produced by bots!
          </a>{" "}
          That is a lot. Is this not a <em>very</em> concerning trend? AI is
          advancing and our ability to sort fact from fiction is fast
          diminishing. Shelley suggests reading{" "}
          <a href="https://www.gutenberg.org/ebooks/42324">Frankeinstein</a>,
          apparently it&apos;s relatable and contains a warning about this type
          of crap from when it was released in 1818...2020... Huh.
          {/* the missing 1919... https://en.wikipedia.org/wiki/1919 :-0 */}
          {/* https://www.latimes.com/environment/story/2019-10-21/oil-companies-exxon-climate-change-denial-report */}
          {/* https://www.theguardian.com/commentisfree/2019/oct/23/exxon-climate-change-fossil-fuels-disinformation */}
        </P>

        <P>
          Anyway.... back to these blockquotes!{" "}
          <em>Keep Calm and Carry on Coding</em> would seem to be the current{" "}
          <em>action</em>, we do need to express and share ideas effectively
          after all. There isn&apos;t much to them, but they work best in
          conjunction with the <code>Text</code> components.
        </P>
        <P>
          Lets take a look at a few variations, note that we are using different{" "}
          <code>Text</code> volumes as best fits the use case. There are a load
          of permutaions but you will likely end up using only a few as defined
          by your design system and what works best in situ.
        </P>

        <ComponentDemo />

        <P>
          As ever, if this component isn&apos;t really working for you then you
          can make your own, clone ours for a starting point if you need a
          legup. It&apos;s pretty simple, we like simple.
        </P>

        <H2 vol={4} uppercase>
          Styling
        </H2>

        <P>
          Let&apos;s have a quick look at a typical output, nothing too crazy
          with plenty of style hookups.
        </P>

        <P>
          In terms of sizing this can can be defined by the children. Internally
          we use the <code>Text</code> component to render the <code>cite</code>{" "}
          tag but it has a class for you to latch on to for some styling love.
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
          In terms of WCAG and the law this, this is marked as Level A which
          makes it a requirement in terms both value that it provides and the
          law.
        </P>

        <Blockquote variant={1}>
          <P>
            First thing to think about is what is soil? For brevity i’m going to
            say soil is the culturing of weathered rock with a food web of
            microorganisms that leads to making rock nutrients solvable and
            stores them along with orgabic carbon (soil scientists, I know I’m
            over-simplifying).
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            I’m talking about aerobic soils formed with oxygen rather than
            anaerobic. Wetlands soils are amazing and do good. But there are
            reasons to focus in aerobic for now. (I’m a huge fan of wetlands and
            pond systems too)
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            Too much water and too much compaction removes oxygen. The system
            switches to anaerobes that live by yanking O off of soil nutrients
            making them smell bad and able to leave the soil. They also produce
            alcohols that prevent plant roots from growing.
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            So this kind of soil needs: enough air, water, contact with plants
            (that feed it with sugars and proteins made with photosynthesis and
            CO2 exuded from their roots.)
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            Rock weathers into subsoil without a lot of big life, when plants
            interact with it they build living subsoil through their roots and
            the accumulation of organic matter on top.
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            Living soil is protective. So it actually protects the subsoil from
            some of the processes that speed up formation. Which is why in
            natural conditions it can settle into a very slow rate of
            production.
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            We have been running civilizations in the use of this built up soil.
            Turning it killing fungi and structure to get bacterial blooms that
            feed out Annual crops.
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            This leads to Erosion rates more similar to mountain systems then
            the low lands where the soil formed. .we are burning through our
            soil to grow and crash quite a few civs
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            You have to understand. The buffering capacity of our plants souls
            could have handled the CO2 from fossil fuels. Only what we used
            fossil fuels for was to increase erosion, change the balance of
            water runoff, deforest, and plow over the grasslands every April.
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            I have to be off-line for a spell but I’ll continue with a
            discussion about how we designto accelerate that soil building
            process. Including some references in case studies
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            So i want to introduce a few puzzle pieces. The first is the work of
            this man PA Yeomans. He was a mining geologist who retired and
            starting thinking about soil care from a Geomorphologist
          </P>
        </Blockquote>

        <Blockquote variant={1}>
          <P>
            When he set off to tend his land, the Australian gov provided soil
            conservation literature focused on contour plowing. Based on the
            view that soil is precious(it is) but that it’s impossible to speed
            its production (it’s not)
          </P>
        </Blockquote>

        <Blockquote
          citeUrl="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#mid-structure-separation-programmatic"
          cite="Labels or Instructions: Understanding SC 3.3.2"
          variant={2}
        >
          <H2 vol={4}>
            1.3.1 Info and Relationships: Information, structure, and
            relationships conveyed through presentation can be programmatically
            determined or are available in text. (Level A)
          </H2>
          <P>
            ...ensure that information and relationships that are implied by
            visual or auditory formatting are preserved when the presentation
            format changes. For example, the presentation format changes when
            the content is read by a screen reader or when a user style sheet is
            substituted for the style sheet provided by the author.
          </P>
          <P>
            ...a change in voice pitch or speech rate may be used to emphasize
            important information or to indicate quoted text; etc.
          </P>
        </Blockquote>

        <P>
          This one is pretty simple to grasp... Visually quotes allow use to see
          that we can apply one of our wonderfully funny internal voices to
          something in the knowledge that it is a quote. We need to enable
          screen readers so that they too can read quotes out in a funny voice
          to their listeners.
        </P>

        <P>
          A life of listening to a monotone screen reader without any emotion is
          dull. We must give the assistive tech the hooks so that they can relay
          an alternate experiance.
        </P>

        <P>
          They will have other uses too, perhaps being pulled out as snippets by
          search bots or ranked as keywords. Let the content be the king though,
          don&apos;t try to manipulate the bots by loading with too many
          keywords.
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default LabelsDocs;
