import type React from "react";
import DefaultLayout from "../../layouts";

import { P, H2, Grid } from "../../indexLib";

import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
  Example1
} from "./__inputTextExamples";

import StyleInfo from "../../components_site/StyleInfo/StyleInfo";
import PageTitle from "../../components_site/PageTitle/PageTitle";

const InputDocs: React.VFC = () => {
  return (
    <DefaultLayout>
      <PageTitle>InputText</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4}>
          Allows our wonderful users to tell us something interesting by
          inputting some text into a little box. Tap Tap Taparoo!
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <QuickRef />

        <ComponentDemo />

        <Example1 />

        <H2 vol={4} uppercase>
          Styling
        </H2>
        <P>@todo</P>
        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
        />

        <P>@todo: more docs, improve examples, etc...</P>
        {/* <P>
          If you find yourself needing to style someone else&apos;s form you
          have access to some form styles that are used to build Shelley forms.
        </P>
        <P>
          You can use some of the classes directly as shown below but more
          likely you will want to build some styles based targeted at a global
          classname.
        </P> */}
      </Grid>
    </DefaultLayout>
  );
};

export default InputDocs;
