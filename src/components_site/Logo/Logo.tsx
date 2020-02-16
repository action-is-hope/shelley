/** Logo.tsx */
import React from "react";
import style from "./logo.st.css";
import classNames from "classnames";

import Text from "../../components/Text/Text";

const Logo = ({ className: classNameProp, ...rest }) => {
  return (
    <div {...style(classNames(style.root, classNameProp), {}, rest)}>
      {/* <h1 className={style.title}>Shelley</h1> */}
      <Text as="h1" className={style.title} uppercase vol={7}>
        Shelley
      </Text>
      <Text as="p" className={style.tld} vol={false}>
        .earth
      </Text>
      <div className={style.logoWrap}>
        <div className={style.logo}>
          <span className={style.logoInner}></span>
        </div>
      </div>
      <Text as="p" className={style.tagline} vol={1} uppercase>
        {/* Stylable <abbr title="User Interface">UI</abbr> blocks */}A{" "}
        {/* <a href="http://jhdjdii.com">Stylable</a> User Interface */}
        Stylable User Interface
      </Text>
    </div>
  );
};

export default Logo;
