import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Text, { P, H1, H2, SPAN } from "../components/Text/Text";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import CodeSample from "../components_site/CodeSample/CodeSample";
import text from "../themes/default/css/text.st.css";

const TextDocs = () => {
  const [TextDemoProps, setTextDemoProps]: any = React.useState([
    {
      name: "content",
      label: "content",
      type: "text",
      value:
        "The IPCC prepares comprehensive Assessment Reports about knowledge on climate change, its causes, potential impacts and response options. The IPCC also produces Special Reports, which are an assessment on a specific issue and Methodology Reports, which provide practical guidelines for the preparation of greenhouse gas inventories."
    },
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
    }
  ]);
  return (
    <DefaultLayout>
      <div className="bodyCopy">
        <H1 vol={2}>
          <SPAN vol={2} uppercase>
            <Link to="/">Back to Components</Link>
          </SPAN>
          <br />
          <SPAN vol={9}>Text</SPAN>
        </H1>
        <P>
          Text is for clearly presenting, well text. We called it Text because
          we got bored of wrangling the keyboard in failed, frustrated and
          sweary attempts to write Typography. 🥺
        </P>

        <H2 vol={4}>Quick reference:</H2>
        <CodeSample>{`import Text, { P, H1, H2, H3, H4, H5, H6 } from "shelley-ui";

<H1 vol={8}>Heading level one</H1>
<H2 vol={6}>Heading level two</H2>
<P>Paragraph, defaults to vol={3}</P>
`}</CodeSample>

        <H2 vol={4}>Getting into the detail:</H2>
        <PropsDemo
          id="textPropsDemo"
          demoProps={TextDemoProps}
          setDemoProps={setTextDemoProps}
        >
          <Text
            id="username"
            as="p"
            // name="username"
            // error={true}
            // underline={true}
            vol={TextDemoProps[1].value}
            truncate={TextDemoProps[2].value}
            uppercase={TextDemoProps[3].value}
            // autoFocus
          >
            {TextDemoProps[0].value}
          </Text>
        </PropsDemo>

        <P>
          We are only displaying a sample of the 14 &#39;volume&#39; levels that
          are defined and available for styling.
        </P>
      </div>

      <hr />

      {/* <Text as="label" htmlFor="hhh" vol={1} id="hllo22" data-test="hi">
      vol 1. Text
    </Text> */}

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
      {/* <P vol={11}>vol 11. Text</P> */}
      {/* <H1>vol 8. Text</H1> */}

      <hr />

      <div className="bodyCopy">
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
      </div>
    </DefaultLayout>
  );
};

export default TextDocs;
