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
  /**
   * The class name for the root element.
   */
  className?: string;
  /**
   * The total number of steps in the progress bar.
   * @default 1
   */
  totalSteps: number;
  /**
   * The current step in the progress bar.
   * This should be a number between 1 and totalSteps.
   * @default 1
   */
  currentStep: number;
  /**
   * The progress of the current step in the progress bar.
   * This should be a number between 0 and 100.
   * @default 0
   * */
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

  const { progressBarProps, labelProps } = useProgressBar({ ...props, value });

  const percentage = isIndeterminate
    ? 1
    : clamp((value - minValue) / (maxValue - minValue), 0, 1);
  const barWidth = isIndeterminate
    ? "100%"
    : `${Math.round(percentage * 100)}%`;

  if (!ariaLabel && !ariaLabelledby) {
    console.warn(
      "ProgressCircle requires an aria-label or aria-labelledby attribute for accessibility"
    );
  }

  const StepIndicator = ({
    index,
    currentStep,
    stepProgress,
  }: {
    index: number;
    currentStep: number;
    stepProgress: number;
  }) => {

    const stepClassName = st(classes.stepIndicator, {
      active: index < currentStep ? true : false
    });

    const fillStyle: CSSProperties = {
      width: index === currentStep - 1 ? `${stepProgress}%` : "100%",
      height: "100%",
    };
    const currentStepClassName = st(classes.stepIndicatorFill, {
      isActive: index < currentStep ? true : false,
    });

    return (
      <div key={index} className={stepClassName}>
        <div style={fillStyle} className={currentStepClassName} />
      </div>
    );
  };

  return (
    <div
      className={st(classes.root, { isIndeterminate, size, variant }, classNameProp)}
      {...progressBarProps}
      {...rest}
      ref={ref}
    >
      <div className={st(classes.label)}>
        {label && <span {...labelProps}>{label}</span>}
      </div>
      <div className={st(classes.track)}>
        {totalSteps && totalSteps > 1 ? (
          <div className={st(classes.stepContainer)}>
            {Array.from({ length: totalSteps }).map((_, index) => (
              <StepIndicator
                key={index}
                index={index}
                currentStep={currentStep}
                stepProgress={stepProgress}
              />
            ))}
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
const ForwardedProgressBar = forwardRef(ProgressBar);
export { ForwardedProgressBar as ProgressBar };