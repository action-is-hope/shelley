import React from "react";
import classnames from "classnames";
import style from "./icon.st.css";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

/**
 * Icon props extending those of an svg element.
 */
interface IconProps
  extends Pick<
    React.SVGProps<SVGSVGElement>,
    Exclude<keyof React.SVGProps<SVGSVGElement>, "color">
  > {
  color?: number | false;
  label?: string;
  viewBox?: string;
}

const Icon = React.forwardRef(
  (
    {
      children,
      className: classNameProp,
      color = false,
      label: labelProp,
      /* Default viewBox based on vaadin icon set. 
         - https://github.com/vaadin/vaadin-icons/tree/master/assets/svg
        if using material-ui icons set to "0 0 24 24"
      */
      viewBox = "0 0 16 16",
      /* Pull off the aria label so we can honour an accessible solution. */
      "aria-label": ariaLabel,
      ...attrs
    }: IconProps,
    ref?: React.Ref<SVGSVGElement>
  ) => {
    const rootClassNames = classnames(
      style.root,
      style["color" + color],
      classNameProp
    );
    const label = labelProp ? labelProp : ariaLabel;

    return (
      <>
        <svg
          {...style(rootClassNames, {}, attrs)}
          focusable="false"
          viewBox={viewBox}
          aria-hidden={true}
          ref={ref}
          {...attrs}
        >
          {children}
        </svg>
        {/* We use a VisuallyHidden label in pace of a svg title or aria-label 
            on a our non-focusable element. The is a very reliable method. 
            - https://simplyaccessible.com/article/7-solutions-svgs/. 
        */}
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </>
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
