import React, { forwardRef } from "react";

import type { MergeElementProps } from "../typings/utils";
import type { ButtonProps } from "./ButtonBase";
import { ButtonBase } from "./ButtonBase";
import { st, classes } from "./button.st.css";

function Button<
  V extends string,
  T extends string,
  P extends React.ElementType = "button"
>(
  props: MergeElementProps<P, ButtonProps<P, V, T>>,
  ref: React.Ref<HTMLElement>
) {
  const {
    className: classNameProp,
    tone = "lead",
    variant = "primary",
    isCta,
    ...rest
  } = props;

  return (
    <ButtonBase
      className={st(classes.root, { cta: isCta }, classNameProp)}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...{ tone, variant, ...(rest as ButtonProps) }}
    />
  );
}
Button.displayName = "Button";

const _Button = forwardRef(Button);
_Button.toString = () => "ShelleyButton";
export { _Button as Button };
