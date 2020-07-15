/** Logo.tsx */
import React from "react";
import style from "./shelleyBanner.st.css";
import classnames from "classnames";
import Logo from "../Logo/Logo";
import Text from "../../components/Text/Text";
import Grid from "../../components/Grid/Grid";

// interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
//   variant?: number;
// }

const ShelleyBanner = ({
  className: classNameProp,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Grid {...style(classnames(style.root, classNameProp), {}, rest)}>
      <div className={style.internalGrid}>
        <Text tag="h1" className={style.title} uppercase vol={8}>
          Shelley
        </Text>
        <Text tag="p" className={style.tld} vol={2}>
          .earth
        </Text>

        <Logo className={style.logoPosition} />

        <Text tag="p" className={style.tagline} vol={2} uppercase>
          {/* Stylable <abbr title="User Interface">UI</abbr> blocks */}A{" "}
          {/* <a href="http://jhdjdii.com">Stylable</a> User Interface */}
          Stylable User Interface
        </Text>
      </div>
    </Grid>
  );
};

export default ShelleyBanner;
