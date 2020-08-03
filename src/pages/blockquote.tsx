import React from "react";
import DefaultLayout from "../layouts";
import { P, H2 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import { classes as text } from "../styles/default/text.st.css";

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
          Blockquotes are used for quoting peeps and papers; they tell any tech
          listening that this is a reference to someone else&apos;s words.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>

        <QuickRef />

        <P>
          Tech like a screen reader might emphasise <code>blockquote</code> text
          whilst a search bot might consider it relevant when ranking.
        </P>

        <P>
          Digression Alert: Did you read the example quote?{" "}
          <a href="https://www.theguardian.com/technology/2020/feb/21/climate-tweets-twitter-bots-analysis">
            {" "}
            a quarter of all tweets about the climate crisis produced by bots!
          </a>{" "}
          That is a lot. Is this not a <em>very</em> concerning trend? AI is
          advancing and our ability to sort fact from fiction is fast
          diminishing. Shelley suggests reading{" "}
          <a href="https://www.gutenberg.org/ebooks/42324">Frankenstein</a>,
          apparently it&apos;s relatable even if released in 1818...2020... Huh.
          {/* the missing 1919... https://en.wikipedia.org/wiki/1919 :-0 */}
          {/* https://www.latimes.com/environment/story/2019-10-21/oil-companies-exxon-climate-change-denial-report */}
          {/* https://www.theguardian.com/commentisfree/2019/oct/23/exxon-climate-change-fossil-fuels-disinformation */}
        </P>

        <P>
          Anyway.... back to these blockquotes!{" "}
          <em>Keep Calm and Carry on Coding</em> would seem to be the current{" "}
          <em>action</em>, we do need to express and share ideas effectively
          after all. Anyways, there isn&apos;t much to blockquotes, just that
          they work best in conjunction with the <code>Text</code> components.
        </P>
        <P>
          Let&apos;s take a look at a few variations, note that we are using
          different <code>Text</code> volumes as best fits the use case. There
          are a load of permutations but you will likely end up using only a few
          as defined by your design system and what works best in situ.
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
          Sizing is defined by the children. Internally we use the{" "}
          <code>Text</code> component to render the <code>cite</code> tag but it
          has a class for you to latch on to for some custom love.
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
          In terms of WCAG and the law, this is ranked as Level A which makes it
          a requirement for us.
        </P>

        <Blockquote
          cite={
            <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#mid-structure-separation-programmatic">
              Labels or Instructions: Understanding SC 3.3.2
            </a>
          }
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
          This one is pretty simple to grasp... Visually, quotes allow people to
          see that we switch voices. We need to enable screen readers so that
          they too can &apos;see&apos; quotes as quotes. Semantics!
        </P>

        <P>
          A life of listening to a monotone screen reader without any emotion is
          dull. We must give the assistive tech the hooks so that they can relay
          a more true experiance, as the author intended.
        </P>

        <P>
          They will have other uses too, perhaps being pulled out as snippets by
          search bots or ranked as keywords. Let the content be the king though,
          don&apos;t try to manipulate the bots by loading them with too many
          keywords.
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default LabelsDocs;
