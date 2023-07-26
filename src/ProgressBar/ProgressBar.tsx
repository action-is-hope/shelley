import { CSSProperties, forwardRef, Ref, useEffect, useState } from "react";
import type { AriaProgressBarProps } from "@react-types/progress";
import { st, classes } from "./progressBar.st.css";
import { useProgressBar } from "@react-aria/progress";
import type { ComponentBase, Volume } from "../typings/shared-types";
import { Text } from "../Text";

export interface ProgressBarProps
  extends Omit<AriaProgressBarProps, "formatOptions">,
    ComponentBase {
  /**
   * What the ProgressBar's size should be.
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
  /** The [visual style](https://spectrum.adobe.com/page/progress-bar/#Over-background-variant) of the ProgressBar. */
  variant?: "overBackground";
  /**
   * The class name for the root element.
   */
  className?: string;
  /**
   * The total number of steps in the progress bar.
   * @default 1
   */
  totalSteps?: number;
  /**
   * The volume of the labels.
   */
  vol?: Volume;
}

const calculateStepAndPercentage = (
  totalSteps: number,
  value: number,
  maxValue: number
) => {
  const scaledValue = (value / maxValue) * 100;
  const currentStep = Math.floor((scaledValue / 100) * totalSteps) + 1;
  const stepPercentage = (((scaledValue / 100) * totalSteps) % 1) * 100;

  return { currentStep, stepPercentage };
};

function ProgressBar(props: ProgressBarProps, ref: Ref<HTMLDivElement>) {
  const {
    label,
    className: classNameProp,
    value = 0,
    minValue = 0,
    maxValue = 100,
    size = "medium",
    variant,
    totalSteps = 1,
    vol = 1,
    isIndeterminate = false,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    valueLabel,
    "data-id": dataId,
    ...rest
  } = props;

  const { progressBarProps, labelProps } = useProgressBar({ ...props, value });

  if (!ariaLabel && !ariaLabelledby) {
    console.warn(
      "ProgressBar requires an aria-label or aria-labelledby attribute for accessibility"
    );
  }
  const [currentStep, setCurrentStep] = useState(1);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    const { currentStep, stepPercentage } = calculateStepAndPercentage(
      totalSteps,
      value,
      maxValue
    );
    setCurrentStep(currentStep);
    setStepProgress(stepPercentage);
  }, [value, totalSteps, maxValue]);

  const Step = ({
    index,
    currentStep,
    stepProgress,
  }: {
    index: number;
    currentStep: number;
    stepProgress: number;
  }) => {
    const fillStyle: CSSProperties = {
      width: isIndeterminate
        ? "100%"
        : index === currentStep - 1
        ? `${stepProgress}%`
        : "100%",
    };

    return (
      <div
        key={index}
        className={st(classes.track)}
        data-id={dataId ? `${dataId}-track` : undefined}
      >
        <div
          style={fillStyle}
          className={st(classes.fill, {
            isActive: index < currentStep ? true : false,
          })}
          data-id={dataId ? `${dataId}-fill` : undefined}
        />
      </div>
    );
  };

  return (
    <div
      className={st(
        classes.root,
        {
          isIndeterminate,
          size,
          variant,
          multistep: totalSteps > 1 ? true : false,
        },
        classNameProp
      )}
      {...progressBarProps}
      {...rest}
      data-id={dataId}
      ref={ref}
    >
      <Text as="div" vol={vol} className={st(classes.text)} {...labelProps}>
        {label && (
          <span
            className={st(classes.label)}
            data-id={dataId ? `${dataId}-label` : undefined}
          >
            {label}
          </span>
        )}
        {valueLabel && (
          <span
            className={st(classes.valueLabel)}
            data-id={dataId ? `${dataId}-valueLabel` : undefined}
          >
            {valueLabel}
          </span>
        )}
      </Text>
      <div className={st(classes.bar)}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Step
            key={index}
            index={index}
            currentStep={currentStep}
            stepProgress={stepProgress}
          />
        ))}
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
