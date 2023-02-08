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
  (props: IconProps, ref?: React.Ref<SVGSVGElement>) => {
    const {
      children,
      className: classNameProp,
      alt,
      viewBox = "0 0 16 16",
      /* Pull off the aria label so we can honour an accessible solution. */
      // "aria-label": ariaLabel,
      ...rest
    } = props;
    // const label = alt ? alt : ariaLabel;
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

export default Icon;
