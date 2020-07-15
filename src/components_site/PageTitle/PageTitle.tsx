/** PageTitle.tsx */
import React from "react";
import style from "./pageTitle.st.css";
import classNames from "classnames";
import { H1 } from "../../components/Text/Text";
import Grid from "../../components/Grid/Grid";

interface PageTitleProps extends React.HTMLProps<HTMLDivElement> {
  id?: string;
  className?: string;
  vol?: 7 | 8 | 9 | 10 | 11;
}

const PageTitle = ({
  className: classNameProp,
  children,
  vol = 9,
  ...rest
}: PageTitleProps) => {
  return (
    <Grid {...style(classNames(style.root, classNameProp), {}, rest)}>
      <H1 vol={vol} className={style.title}>
        {/* <span>&lt;</span> */}
        {children}
        {/* <span>&gt;</span> */}
      </H1>
    </Grid>
  );
};

export default PageTitle;
