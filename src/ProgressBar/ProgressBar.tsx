import { clamp } from "@react-aria/utils";
import { CSSProperties, forwardRef, Ref } from "react";

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
  currentStep: number;
  stepProgress: number;
}

function ProgressBar(
  props: ProgressBarProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    label,
    className: classNameProp,
    value = 0,
    minValue = 0,
    maxValue = 100,
    size = "medium",
    variant,
    totalSteps = 1,
    currentStep = 1,
    stepProgress = 0,
    isIndeterminate = false,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...rest
  } = props;

  const {
    progressBarProps,
    labelProps
  } = useProgressBar({ ...props, value });

  let barWidth = '100%';
  let percentage = 100;
  // Calculate the width of the progress bar as a percentage
  if (!isIndeterminate) {
    percentage = clamp((value - minValue) / (maxValue - minValue), 0, 1);
    barWidth = `${Math.round(percentage * 100)}%`;
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
      <div
        className={st(classes.label)}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {label && <span {...labelProps}>{label}</span>}
      </div>
      <div
        className={st(classes.track)}
      >
        {totalSteps && totalSteps > 1 ? (
          <div className={st(classes.stepContainer)}>
            {[...Array(totalSteps)].map((_, index) => {
              const stepClassName = st(classes.stepIndicator, {
                active: index < currentStep ? true : false
              });
              const fillStyle: CSSProperties = {
                width: index === currentStep - 1 ? `${stepProgress}%` : "100%",
                height: "100%",
                // background: index < currentStep ? "orange" : "lightgray"
              };
              const currentStepClassName = st(classes.stepIndicatorFill, {
                isActive: index < currentStep ? true : false
              });
              return (
                <div key={index} className={stepClassName}>
                  <div style={fillStyle} className={currentStepClassName} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={st(classes.stepIndicator)}>
              <div
                style={{ width: barWidth, height: 10 }}
                className={st(classes.fill)}
              />
          </div>
        )}
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
