import React from "react";
import DefaultLayout from "../layouts";
import { P, H2 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
import PageTitle from "../components_site/PageTitle/PageTitle";
import text from "../projects/default/css/text.st.css";

const LabelsDocs = () => {
  return (
    <DefaultLayout>
      <PageTitle>Styling</PageTitle>

      <Grid variant={1} tag="main" formatted>
        <P vol={4} className={text.intro}>
          Styling is the art of weilding CSS to create a wardrobe for our HTML
          to wear. Some call it a black art, perhaps but the dark arts are less
          required with the demise of{" "}
          <a href="https://en.wikipedia.org/wiki/Trident_(software)">Trident</a>
          .
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default LabelsDocs;
