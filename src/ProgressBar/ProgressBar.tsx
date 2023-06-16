'use client';

import { clamp } from "@react-aria/utils";

import { CSSProperties, Ref, forwardRef } from "react";
import type { AriaProgressBarProps } from "@react-types/progress";
import { st, classes } from "./progressBar.st.css";
import { useProgressBar } from "@react-aria/progress";
import type { ComponentBase } from "../typings/shared-types";


export interface ProgressBarProps
  extends AriaProgressBarProps,
  ComponentBase {
  /**
   * What the ProgressCircle's diameter should be.
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
  /** The [visual style](https://spectrum.adobe.com/page/progress-circle/#Over-background-variant) of the ProgressCircle. */
  variant?: "overBackground";
  className?: string;
  totalSteps: number;

}


function ProgressBar(props: ProgressBarProps, ref: Ref<HTMLDivElement>) {
  let {
    label,
    className: classNameProp,
    value = 0,
    minValue = 0,
    maxValue = 100,
    size = "medium",
    variant,
    totalSteps = 1,
    isIndeterminate = false,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...rest
  } = props;
  let {
    progressBarProps,
    labelProps
  } = useProgressBar({ ...props, value });

  // Calculate the width of the progress bar as a percentage
  const percentage = clamp((value - minValue) / (maxValue - minValue), 0, 1);
  const barWidth = `${Math.round(percentage * 100)}%`;


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
      style={{ width: 200 }}
    >
      <div className={st(classes.label)} style={{ display: 'flex', justifyContent: 'space-between' }}>
        {label && (
          <span {...labelProps}>
            {label}
          </span>
        )}
      </div>
      <div style={{ height: 10, background: 'lightgray' }} className={st(classes.track)}>
        {/* <div style={{ width: barWidth, height: 10, background: 'orange' }} className={st(classes.fill)} /> */}
        <div className={st(classes.stepContainer)}>
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={st(classes.stepIndicator, {
                active: index < Math.floor(percentage * totalSteps)
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );

}


/**
 * ProgressBars show the progression of a system operation such as downloading, uploading, or processing, in a visual way.
 * They can represent determinate or indeterminate progress.
 */
const _ProgressBar = forwardRef(ProgressBar);
export { _ProgressBar as ProgressBar };
