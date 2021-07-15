/** PageTitle.tsx */
import type React from "react";
import classNames from "classnames";
import { H1 } from "../../components/Text/Text";
import Grid from "../../components/Grid/Grid";
/* = Style API. */
import { st, classes } from "./pageTitle.st.css";

interface PageTitleProps extends React.HTMLProps<HTMLDivElement> {
  id?: string;
  className?: string;
  vol?: 7 | 8 | 9 | 10 | 11;
}

const PageTitle: React.VFC<PageTitleProps> = ({
  className: classNameProp,
  children,
  vol = 9
}) => {
  return (
    <Grid className={st(classNames(classes.root, classNameProp))}>
      <H1 vol={vol} className={classes.title}>
        {/* <span>&lt;</span> */}
        {children}
        {/* <span>&gt;</span> */}
      </H1>
    </Grid>
  );
};

export default PageTitle;
