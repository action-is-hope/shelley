import type React from "react";
import { P, H2, Grid } from "../../indexLib";

import {
  meta,
  QuickRef,
  ComponentDemo,
  ComponentHTML,
  ComponentCSS,
  Example1
} from "./__inputSelectionExamples";

import StyleInfo from "../../components_site/StyleInfo/StyleInfo";
import PageTitle from "../../components_site/PageTitle/PageTitle";

const InputSelectionDocs: React.VFC = () => {
  return (
    <>
      <PageTitle>InputSelection</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4}>
          Selecting those always visiable options such as radios, checkboxs or
          toggle switches. @todo
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
    </>
  );
};

export default InputSelectionDocs;
