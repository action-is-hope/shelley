import React from "react";
import Link from "gatsby-link";
import classnames from "classnames";
import DefaultLayout from "../layouts";
/* Shelley */
import Text, { P, H1, H2 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import CodeSample from "../components_site/CodeSample/CodeSample";
import PageTitle from "../components_site/PageTitle/PageTitle";
/* Style imports */
import text from "../themes/default/css/text.st.css";
import grid from "../themes/default/css/grid.st.css";

const TextDocs = () => {
  const [TextDemoProps, setTextDemoProps]: any = React.useState([
    {
      name: "vol",
      label: "vol",
      type: "number",
      min: 1,
      max: 12,
      value: 3
    },
    {
      name: "truncate",
      label: "truncate",
      type: "checkbox",
      value: false
    },
    {
      name: "uppercase",
      label: "uppercase",
      type: "checkbox",
      value: false
    },
    {
      name: "children",
      label: "children",
      type: "textarea",
      value:
        // "The IPCC prepares comprehensive Assessment Reports about knowledge on climate change, its causes, potential impacts and response options. The IPCC also produces Special Reports, which are an assessment on a specific issue and Methodology Reports, which provide practical guidelines for the preparation of greenhouse gas inventories."
        "IPCC, how can I explain it, I'll take you frame by frame it. Shelley likes to rap about climate change reports in the hope that people might read them, go figure. Shelly also thanks Naughty By Nature for their contribution to music and head bopping."
    }
  ]);
  return (
    <DefaultLayout>
      <PageTitle>Text</PageTitle>
      <Grid variant={1}>
        <P vol={4} className={text.intro}>
          Text is for presenting words, we love words, they&apos;re the best,
          nobody knows more about words than us. Ridiculous.
        </P>
        {/* <P>
        we can use them to write all sorts of
          stuff from fake news to the importance of opening our eyes once more
          to the natural world.

          We called it Text because we got bored of wrangling the keyboard in
          failed, frustrated and sweary attempts to write Typography. 🥺
        </P> */}
        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <CodeSample>{`import { Text, P, H1, H2, H3, H4, H5, H6 } from "@action-is-hope/shelley";

<H1 vol="8">Shortcuts for html headings, h1-h6, set your own volume.</H1>
<P>The mighty paragraph, defaults to a volume of 3.</P>
<Text as="span">Text with your choice of tag via the "as" prop.</Text>`}</CodeSample>

        <P>
          Shelley uses a volume property, <code>vol</code> for the general
          sizing of components. Text accepts <code>{`vol={1-12}`}</code> as well
          as an option to turn it off, <code>{`vol={false}`}</code>. Simples.
        </P>

        <P>
          Using <code>{`vol={false}`}</code> is useful when we need all of the
          text styling apart from font-sizing, which is to be defined via custom
          class or by styling it as an named import inside of another component.
          {/* https://24ways.org/2017/styling-components-typed-css-with-stylable/ */}
        </P>

        {/* <H2 vol={4}>Getting into the detail:</H2> */}
      </Grid>
      <Grid variant={1}>
        <PropsDemo
          id="textPropsDemo"
          demoProps={TextDemoProps}
          setDemoProps={setTextDemoProps}
          tsExtends="HTMLBaseElement"
          renderExample={
            <CodeSample>{`import { P } from "@action-is-hope/shelley";\n<P ${
              TextDemoProps[0].value
                ? `\n  vol={${TextDemoProps[0].value}}`
                : ``
            } ${TextDemoProps[1].value ? `\n  truncate` : ``} ${
              TextDemoProps[3].value !== "none" ? `\n  uppercase` : ``
            } \n>\n  ${TextDemoProps[3].value}\n</P>`}</CodeSample>
          }
        >
          <Text
            id="username"
            as="p"
            // name="username"
            // error={true}
            // underline={true}
            vol={TextDemoProps[0].value}
            truncate={TextDemoProps[1].value}
            uppercase={TextDemoProps[2].value}
            // autoFocus
          >
            {TextDemoProps[3].value}
          </Text>
        </PropsDemo>
      </Grid>
      <Grid variant={1}>
        <H2 vol={5} className={text.outset} uppercase>
          Styling:
        </H2>
        <P>
          Text usually accounts for large proportion of a website / application
          and is integral to the overall typographic and layout approach of the
          design you are implementing.
        </P>

        <P>
          Shelley allows you to do whatever you want in terms of styling via
          pre-definded style hooks. You can of course add your own style
          variants by adding additional CSS class selectors within your{" "}
          <code>text.st.css</code> file:
        </P>

        <CodeSample fixedHeight>{`/** text.st.css */

:import {
  -st-from: "../../../components/Text/text.st.css";
  -st-default: Text;
}

/* Volume */
Text.vol1 {}
Text.vol2 {}
Text.vol3 {}
Text.vol4 {}
Text.vol5 {}
Text.vol6 {}
Text.vol7 {}
Text.vol8 {}
Text.vol9 {}
Text.vol10 {}
Text.vol11 {}
Text.vol12 {}

/* Extras */
Text.uppercase {}
Text.underline {}
Text.bold {}

/* State selectors - Note: Inherits functional styles from Shelley. */
Text:truncate {}

/* Whatever you need which you can use as classNames by importing your text.st.css */
Text.hint {}
Text.error {}
Text.taxonomy-color1 {}
Text.TupacOrBiggie {}
`}</CodeSample>

        <P>
          If you are starting from stratch then{" "}
          <a href="https://type-scale.com/">
            type-scale is a good starting place to geneate a text scale
          </a>
          . Just map the values into respective volume selectors above.
        </P>
        <P>
          {" "}
          <strong>Note: </strong>We set our typical copy text to a volume of
          three and then scale up/down from there; <code>1</code> is small,{" "}
          <code>12</code> is big. Just define the ones you need, it is doubtful
          you will need all twelve.
        </P>

        <H2 vol={4} uppercase>
          Shelley theme:
        </H2>

        <P>
          Shelley got adventurous and decided upon a full on fluid / modular
          scale. Typical. We quite like it so far, it was a bit trippy to set up
          but now it's working it seems solid.{" "}
          <a href="https://www.smashingmagazine.com/2016/05/fluid-typography/">
            Smashing mag did a worthwhile piece on fluid typograhy
          </a>{" "}
          back in 2016; probably the most memoriable thing to happen that
          year... Yup, think so.
        </P>

        <P>
          Check the preview below to see our scale looks like at the moment. The
          fact that the text scales without snapping is great as it really
          allows us to relax in the knowledge that the text will always be
          relatively similar in terms of the space used across all device
          widths. Phew!
        </P>

        <P>
          Shelley reckons "it&apos;s a touch" and we have left some
          [LINK]comments in our code so you can get a better idea of it all as
          and when you feel up to it.
        </P>

        <P>
          In terms of spacing and alignment you will notice these are pretty
          thin on the ground here. Go and checkout how we use [Link]Grid. and we
          might use some generic helper classes in future. No idea! We remain
          unlimited and agile!
        </P>

        <H2 vol={2} className={grid.mbSmall} uppercase>
          Preview:
        </H2>
        {/* 
        <div className={classnames(grid.exampleBox, grid.gridColumnOutset1)}>
          <P vol={1} id="hllo22" data-test="hi">
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
          <P vol={10}>vol 10. Text</P>
        </div> */}
      </Grid>

      {/* <hr /> */}

      {/* <Text as="label" htmlFor="hhh" vol={1} id="hllo22" data-test="hi">
      vol 1. Text
    </Text> */}

      <Grid>
        {/* <div className={classnames(grid.exampleBox, grid.gridColumnOutset1)}> */}
        <P vol={1} id="hllo22" data-test="hi">
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
        <P vol={10}>vol 10. Text</P>
        {/* </div> */}
      </Grid>
      {/* <hr /> */}
      {/* <P>
        Why not &apos;Typography&apos;? - We got bored flapping all over the
        keyboard. Call a spade a spade. Shelley reckons Typography is a bigger
        picture thing which ties in with your grid and your vertical rhythm. If
        you like a bit of rhythm in your life that is.
      </P> */}
      {/* 
      <P>"Seriously, How about something normal like size?"</P>
      <P>
        We knew you would ask... Shelley is a little fussy but she doesn't like
        to use prop names that conflict with HTML attributes and{" "}
        <code>size</code> is a valid attribute of an <code>input</code>. So we
        can't use it because we also like to be consistant, <code>vol</code>.
      </P> */}
      {/* 
      <P>
        Get familar with the properties below which will give you an idea of
        what style hooks you have to play with.
      </P> */}
      <Grid variant={1}>
        <P>
          Test with custom class and turning volume off to aid with custom
          styles.
        </P>
        <P vol={false} className={text.large}>
          Custom class no volume applied.
        </P>
        <P>
          The next example illustrates the Text component in use as part of an
          old skool global class <code>bodyCopy</code> class. Is this bad? We
          could provide another component?
        </P>

        <H1 vol={9}>IPCC</H1>

        <H2 vol={6}>The Importance of the Ocean and Cryosphere for People</H2>
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
        <H1 vol={6}>Observed changes and impacts</H1>
        <H2 vol={5}>Observed Physical Changes</H2>
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
