import type { AriaProgressBarProps } from "@react-types/progress";
import { CSSProperties, Ref, forwardRef } from "react";
import { st, classes } from "./progressBar.st.css";
import { useProgressBar } from 'react-aria'

import type { ComponentBase } from "../types";

import type { SpectrumProgressBarProps } from '@react-types/progress';

export interface ProgressBarProps
  extends AriaProgressBarProps,
  ComponentBase {
  // value?: number,
  size?: "small" | "medium" | "large";
  // /** The [visual style](https://spectrum.adobe.com/page/progress-circle/#Over-background-variant) of the ProgressCircle. */
  variant?: "overBackground";
  className?: string;
  showValueLabel?: boolean;
}

function ProgressBar(props: ProgressBarProps, ref: Ref<HTMLDivElement>) {
  let {
    label,
    showValueLabel = !!label,
    className: classNameProp,
    value = 0,
    minValue = 0,
    maxValue = 100,
    size = "medium",
    isIndeterminate = false,

    variant,
    ...rest
  } = props;
  let {
    progressBarProps,
    labelProps
  } = useProgressBar(props);

  let barStyle: CSSProperties = {};
  if (!isIndeterminate) {
    let percentage = (value - minValue) / (maxValue - minValue);
    barStyle.width = `${Math.round(percentage * 100)}%`;

  }
  console.log(barStyle);
  console.log(performance);

  return (
    <div
      className={st(
        classes.root,
        // {
        //   // isIndeterminate,
        //   // size,
        //   // variant
        // },
        classNameProp
      )}
      {...progressBarProps}
      {...rest}
      ref={ref}
    >
      {label &&
        (
          <span {...labelProps}>
            {label}
          </span>
        )}
      {showValueLabel &&
        (
          <span>
            {progressBarProps['aria-valuetext']}
          </span>
        )}
      <div className={st(classes.track)}>
        <div className={st(classes.fill)} style={barStyle} />
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
