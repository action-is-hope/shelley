/** StyleInfo.tsx */
import React from "react";
import style from "./styleInfo.st.css";
import classNames from "classnames";
import Grid from "../../components/Grid/Grid";
import { P } from "../../components/Text/Text";
import classnames from "classnames";

import grid from "../../projects/default/css/grid.st.css";
import text from "../../projects/default/css/text.st.css";

interface StyleInfoProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  componentName?: string;
  componentHTML: React.ReactNode;
  componentCSS: React.ReactNode;
}

const StyleInfo = ({
  className,
  // children,
  componentName,
  componentHTML,
  componentCSS,
  ...rest
}: StyleInfoProps) => {
  const rootClassNames = classNames(
    style.root,
    grid.gridColumnOutset,
    grid.mt1,
    grid.mb2,
    className
  );

  return (
    <Grid variant={2} {...style(rootClassNames, {}, rest)}>
      <div className={classnames(text.typographic, style.html)}>
        <P>
          The raw <code>HMTL</code> output from the <code>{componentName}</code>{" "}
          component:
        </P>
        {componentHTML}
      </div>
      <div className={classnames(text.typographic, style.css)}>
        <P>
          The default unstyled <code>CSS</code> selectors:
        </P>
        {componentCSS}
      </div>
      <div className={classnames(text.mtAuto, style.meta)}>
        <P vol={2}>
          View the Shelley {componentName} CSS on GitHub inclusive of comments
          :-)
        </P>
      </div>
    </Grid>
  );
};

export default StyleInfo;
