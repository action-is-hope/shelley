/** Logo.tsx */
import React from "react";
import style from "./shelleyBanner.st.css";
import classNames from "classnames";
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
    <Grid {...style(classNames(style.root, classNameProp), {}, rest)}>
      <div className={style.internalGrid}>
        <Text as="h1" className={style.title} uppercase vol={7}>
          Shelley
        </Text>
        <Text as="p" className={style.tld} vol={false}>
          .earth
        </Text>

        <Logo className={style.logoPosition} />

        <Text as="p" className={style.tagline} vol={1} uppercase>
          {/* Stylable <abbr title="User Interface">UI</abbr> blocks */}A{" "}
          {/* <a href="http://jhdjdii.com">Stylable</a> User Interface */}
          Stylable User Interface
        </Text>
      </div>
    </Grid>
  );
};

export default ShelleyBanner;
