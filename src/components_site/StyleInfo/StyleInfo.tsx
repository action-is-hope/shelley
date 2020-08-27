/** StyleInfo.tsx */
import React from "react";
import classNames from "classnames";
import Grid from "../../components/Grid/Grid";
import { P } from "../../components/Text/Text";
/* = Style API. */
import { st, classes } from "./styleInfo.st.css";
import { classes as grid } from "../../styles/default/grid.st.css";
import { classes as spacing } from "../../styles/shelley/mixins/spacing.st.css";

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
  componentCSS
}: // ...rest
StyleInfoProps) => {
  const rootClassNames = classNames(
    classes.root,
    grid.snapMidToGoal,
    grid.mt1,
    grid.mb2,
    className
  );

  const cssFileName =
    componentName &&
    componentName.charAt(0).toLowerCase() + componentName.slice(1);

  return (
    <Grid variant={2} className={st(rootClassNames)}>
      <div className={classes.html}>
        <P>
          The raw <code>HMTL</code> output from <code>{componentName}:</code>
        </P>
        {componentHTML}
        <P vol={2}>
          <a
            href={`https://github.com/action-is-hope/shelley/tree/master/src/components/${componentName}/${cssFileName}.st.css`}
          >
            Core styles
          </a>{" "}
        </P>
        <P vol={2}>
          <a
            href={`https://github.com/action-is-hope/shelley/blob/master/src/styles/default/${cssFileName}.st.css`}
          >
            Shelley default styles
          </a>{" "}
        </P>
        <P vol={2}>
          <a
            href={`https://github.com/action-is-hope/shelley/blob/master/src/styles/shelley/${cssFileName}.st.css`}
          >
            Shelley custom styles
          </a>{" "}
        </P>
      </div>
      <div className={classes.css}>
        <P>
          The default unstyled <code>CSS</code> selectors:
        </P>
        {componentCSS}
      </div>
    </Grid>
  );
};

export default StyleInfo;
