"use client";
import { clamp } from "@react-aria/utils";
import type { AriaProgressCircleProps } from "@react-types/progress";
import { CSSProperties, Ref, forwardRef } from "react";
import { st, classes } from "./progressCircle.st.css";
import { useProgressBar } from "@react-aria/progress";
import type { ComponentBase } from "../typings/shared-types";

export interface ProgressCircleProps
  extends AriaProgressCircleProps,
    ComponentBase {
  /**
   * What the ProgressCircle's diameter should be.
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
  /** The [visual style](https://spectrum.adobe.com/page/progress-circle/#Over-background-variant) of the ProgressCircle. */
  variant?: "overBackground";
  className?: string;
}

function ProgressCircle(props: ProgressCircleProps, ref: Ref<HTMLDivElement>) {
  const {
    className: classNameProp,

    minValue = 0,
    maxValue = 100,
    size = "medium",
    variant,
    isIndeterminate = false,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...rest
  } = props;

  let { value = 0 } = props;
  value = clamp(value, minValue, maxValue);
  const { progressBarProps } = useProgressBar({ ...props, value });

  const subMask1Style: CSSProperties = {};
  const subMask2Style: CSSProperties = {};
  if (!isIndeterminate) {
    const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
    let angle;
    if (percentage > 0 && percentage <= 50) {
      angle = -180 + (percentage / 50) * 180;
      subMask1Style.transform = `rotate(${angle}deg)`;
      subMask2Style.transform = "rotate(-180deg)";
    } else if (percentage > 50) {
      angle = -180 + ((percentage - 50) / 50) * 180;
      subMask1Style.transform = "rotate(0deg)";
      subMask2Style.transform = `rotate(${angle}deg)`;
    }
  }

  if (!ariaLabel && !ariaLabelledby) {
    console.warn(
      "ProgressCircle requires an aria-label or aria-labelledby attribute for accessibility"
    );
  }

  return (
    <div
      className={st(
        classes.root,
        {
          isIndeterminate,
          size,
          variant,
        },
        classNameProp
      )}
      {...progressBarProps}
      {...rest}
      ref={ref}
    >
      <div className={st(classes.track)} />
      <div className={st(classes.fills)}>
        <div className={st(classes.fillMask1)}>
          <div
            className={st(classes.fillSubMask1)}
            data-testid="fillSubMask1"
            style={subMask1Style}
          >
            <div className={st(classes.fill)} />
          </div>
        </div>
        <div className={st(classes.fillMask2)}>
          <div
            className={st(classes.fillSubMask2)}
            data-testid="fillSubMask2"
            style={subMask2Style}
          >
            <div className={st(classes.fill)} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ProgressCircles show the progression of a system operation such as downloading, uploading, or processing, in a visual way.
 * They can represent determinate or indeterminate progress.
 */
const _ProgressCircle = forwardRef(ProgressCircle);
export { _ProgressCircle as ProgressCircle };
