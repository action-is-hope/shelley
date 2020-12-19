import React from "react";
import classnames from "classnames";
import { st, classes } from "./layout.st.css";

import { Grid, GridProps, Text } from "@actionishope/shelley";
import { classes as grid } from "@actionishope/shelley/styles/default/grid.st.css";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  gridMode: "default" | "previewFullScreen";
}
const Layout = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      gridMode = "default",
      ...rest
    }: LayoutProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        className={st(classnames(classes.root, classNameProp), { gridMode })}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

Layout.displayName = "Layout";

export default Layout;
