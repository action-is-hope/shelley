import React, { forwardRef } from "react";
import { VisuallyHidden } from "../VisuallyHidden";
import { st, classes } from "./icon.st.css";
import type { ComponentBase } from "../typings/shared-types";

/**
 * Icon props extending those of an svg element.
 */
export interface IconProps
  extends React.SVGProps<SVGSVGElement>,
    ComponentBase {
  /** Alternative text via VisuallyHidden */
  alt?: string;
  /** Visually render the alt text provided. */
  altVisible?: boolean;
  /** Set to match icon set; e.g. for Material UI icons use "0 0 24 24". */
  viewBox?: string;
}

function Icon(props: IconProps, ref: React.Ref<SVGSVGElement>) {
  const {
    altVisible,
    children,
    className: classNameProp,
    alt,
    viewBox = "0 0 16 16",
    ...rest
  } = props;

  const altText = altVisible ? (
    <span className={classes.alt}>{alt}</span>
  ) : (
    <VisuallyHidden>{alt}</VisuallyHidden>
  );
  if (alt && props["aria-label"])
    console.warn(
      "An <Icon> element has been given both an alt an aria-label. The aria-label will take precedence."
    );
  return (
    <>
      {/* We use a VisuallyHidden label in pace of a svg title or aria-label 
            on a non-focusable element. The is a very reliable method. 
            - https://simplyaccessible.com/article/7-solutions-svgs/. 
        */}
      {alt && !props["aria-label"] && altText}
      <svg
        className={st(classes.root, classNameProp)}
        viewBox={viewBox}
        aria-hidden={props["aria-label"] ? undefined : true}
        ref={ref}
        {...rest}
      >
        {children}
      </svg>
    </>
  );
}
Icon.displayName = "Icon";
Icon.toString = () => "Icon";
/**
 * Icon allows you to share common grids and allows for formatted content areas.
 */
const _Icon = forwardRef(Icon);
export { _Icon as Icon };
