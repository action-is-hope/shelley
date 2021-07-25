import type React from "react";
import { P, H2, Grid, Blockquote } from "../../indexLib";

import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
} from "./__blockquoteExamples";

import PageTitle from "../../components_site/PageTitle/PageTitle";
import StyleInfo from "../../components_site/StyleInfo/StyleInfo";

const BlockquoteDocs: React.VFC = () => {
  return (
    <>
      <PageTitle>Blockquote</PageTitle>

      <Grid variant={1} tag="main" formatted>
        <P vol={4}>
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
          There isn&apos;t much to blockquotes, just that they work best in
          conjunction with the <code>Text</code> components.
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
          In terms of{" "}
          <abbr title="Web Content Accessibility Guidelines">
            <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
          </abbr>{" "}
          and the law, this is ranked as Level A which makes it a requirement
          for us.
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
    </>
  );
};

export default BlockquoteDocs;
