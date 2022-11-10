import React from "react";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";
/* = Style API. */
import { st, classes } from "./icon.st.css";

/**
 * Icon props extending those of an svg element.
 */
export interface IconProps
  extends Pick<
    React.SVGProps<SVGSVGElement>,
    Exclude<keyof React.SVGProps<SVGSVGElement>, "color">
  > {
  /** Alternative text via VisuallyHidden */
  alt?: string;
  /** Defaults to "0 0 16 16" based on vaadin icon set:
   *  https://github.com/vaadin/vaadin-icons/tree/master/assets/svg
   * For material-ui set to "0 0 24 24".]
   */
  viewBox?: string;
}

const Icon = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      alt,
      viewBox = "0 0 16 16",
      /* Pull off the aria label so we can honour an accessible solution. */
      "aria-label": ariaLabel,
      ...attrs
    }: IconProps,
    ref?: React.Ref<SVGSVGElement>
  ) => {
    const label = alt ? alt : ariaLabel;

    return (
      <>
        <svg
          className={st(classes.root, classNameProp)}
          // focusable="false"
          viewBox={viewBox}
          aria-hidden={true}
          ref={ref}
          {...attrs}
        >
          {children}
        </svg>
        {/* We use a VisuallyHidden label in pace of a svg title or aria-label 
            on a non-focusable element. The is a very reliable method. 
            - https://simplyaccessible.com/article/7-solutions-svgs/. 
        */}
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </>
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
