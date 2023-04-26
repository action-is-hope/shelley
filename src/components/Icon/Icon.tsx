import React, { forwardRef } from "react";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
/* = Style API. */
import { st, classes } from "./icon.st.css";
import type { ComponentBase } from "../types";

/**
 * Icon props extending those of an svg element.
 */
export interface IconProps
  extends React.SVGProps<SVGSVGElement>,
    ComponentBase {
  /** Alternative text via VisuallyHidden */
  alt?: string;
  /** Set to match icon set; e.g. for Material UI icons use "0 0 24 24". */
  viewBox?: string;
}

export const Icon = forwardRef(
  (props: IconProps, ref?: React.Ref<SVGSVGElement>) => {
    const {
      children,
      className: classNameProp,
      alt,
      viewBox = "0 0 16 16",
      ...rest
    } = props;
    if (alt && props["aria-label"])
      console.warn(
        "An <Icon> element has been given both an alt an aria-label. The aria-label will take precedence."
      );
    return (
      <>
        <svg
          className={st(classes.root, classNameProp)}
          viewBox={viewBox}
          aria-hidden={props["aria-label"] ? undefined : true}
          ref={ref}
          {...rest}
        >
          {children}
        </svg>
        {/* We use a VisuallyHidden label in pace of a svg title or aria-label 
            on a non-focusable element. The is a very reliable method. 
            - https://simplyaccessible.com/article/7-solutions-svgs/. 
        */}
        {alt && !props["aria-label"] && <VisuallyHidden>{alt}</VisuallyHidden>}
      </>
    );
  }
);

Icon.displayName = "Icon";
Icon.toString = () => "Icon";

export default Icon;
