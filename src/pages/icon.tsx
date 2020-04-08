import React from "react";
import DefaultLayout from "../layouts";
import { P, H2, H3 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import text from "../projects/default/css/text.st.css";
import Blockquote from "../components/Blockquote/Blockquote";

import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
  Collection,
  Example1
} from "../components/Icon/__iconExamples";
import StyleInfo from "../components_site/StyleInfo/StyleInfo";

const IconDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Icon</PageTitle>
      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Icon&apos;s are universal translators,some are more visually
          descriptive than others so consider labels.
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <QuickRef />

        <P>
          Shelley borrows from the mighty Material UI here. We really like the
          ease of using their <code>SVGIcon</code> in that it extends the base{" "}
          <code>svg</code> thus allowing to use any old icon you find on the web
          by shoving in a svg <code>path</code> as a child.
        </P>

        <P>
          An icon set is panned, it will likely be based on{" "}
          <a href="https://cdn.vaadin.com/vaadin-icons/4.3.1/demo/#icons-basic-demos">
            vaadin-icons
          </a>
          , an Open Source set that is fairly extensive. We do have some beef
          with the &apos;accessibility&apos; icon denoting a wheelchair... but
          this is not an issue specific to this icon set.
        </P>

        <P>
          If you use an icon as a replacement for a text label be sure to use
          the <code>label</code> prop which will output a{" "}
          <code>VisuallyHidden</code> one for you, it&apos;s the law.
        </P>
      </Grid>
      <Grid variant={1}>
        <ComponentDemo />
      </Grid>
      <Grid variant={1}>
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
          be downloaded even if you only use five. As we said, they are
          inventive though from that perspective they are flawless.
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

export default IconDocs;
