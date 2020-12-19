/** Logo.tsx */
import React from "react";
import classnames from "classnames";
import Logo from "../Logo/Logo";
import Text from "../../components/Text/Text";
import Grid from "../../components/Grid/Grid";
/* = Style API. */
import { st, classes } from "./shelleyBanner.st.css";

const ShelleyBanner = ({
  className: classNameProp
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Grid className={st(classnames(classes.root, classNameProp))}>
      <div className={classes.internalGrid}>
        <Text as="h1" className={classes.title} uppercase vol={8}>
          Shelley
        </Text>
        <Text as="p" className={classes.tld} vol={2}>
          .earth
        </Text>

        <Logo className={classes.logoPosition} />

        <Text as="p" className={classes.tagline} vol={2} uppercase>
          {/* Stylable <abbr title="User Interface">UI</abbr> blocks */}A{" "}
          {/* <a href="http://jhdjdii.com">Stylable</a> User Interface */}
          Stylable User Interface
        </Text>
      </div>
    </Grid>
  );
};

export default ShelleyBanner;
