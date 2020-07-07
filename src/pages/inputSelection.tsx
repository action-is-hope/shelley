import React from "react";
import DefaultLayout from "../layouts";
import { P, H2 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";

import PageTitle from "../components_site/PageTitle/PageTitle";

import StyleInfo from "../components_site/StyleInfo/StyleInfo";

import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
  Example1
} from "../components/InputSelection/__inputSelectionExamples";

const InputSelectionDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>InputSelection</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4}>
          This one be for selecting tings, radio, checkbox or toggle switches
        </P>

        <H2 vol={2} uppercase>
          Quick reference:
        </H2>
        <QuickRef />

        <ComponentDemo />

        <H2 vol={4} uppercase>
          Styling
        </H2>
        <P>@todo</P>
        <StyleInfo
          componentName={meta.name}
          componentHTML={<ComponentHTML />}
          componentCSS={<ComponentCSS />}
        />

        <Example1 />
      </Grid>
    </DefaultLayout>
  );
};

export default InputSelectionDocs;
