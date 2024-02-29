import type React from "react";
import { ReactNode, HTMLAttributes, forwardRef } from "react";
import type { Validation } from "../typings/shared-types";
import Warning from "../icons/Warning";
import { st, classes } from "./helpText.st.css";
import type { ComponentBase } from "../typings/shared-types";

export interface HelpTextProps
  extends Validation,
    React.HTMLProps<HTMLDivElement>,
    ComponentBase {
  /** Whether the description is displayed with lighter text. */
  isDisabled?: boolean;
  /** Whether an error icon is rendered. */
  showErrorIcon?: boolean;
  /** A description for the field. Provides a hint such as specific requirements for what to choose. */
  description?: ReactNode;
  /** An error message for the field. */
  errorMessage?: ReactNode;
  /** Props for the help text description element. */
  descriptionProps?: HTMLAttributes<HTMLElement>;
  /** Props for the help text error message element. */
  errorMessageProps?: HTMLAttributes<HTMLElement>;
}

function HelpText(props: HelpTextProps, ref?: React.Ref<HTMLDivElement>) {
  const {
    description,
    errorMessage,
    isInvalid,
    isDisabled,
    showErrorIcon,
    descriptionProps,
    errorMessageProps,
    className: classNameProp,
    "data-id": dataId,
  } = props;
  const isErrorMessage = (errorMessage && isInvalid) || false;
  return (
    <>
      {(description || isErrorMessage) && (
        <div
          className={st(
            classes.root,
            { isErrorMessage, isDisabled },
            classNameProp
          )}
          ref={ref}
          data-id={dataId}
        >
          {isErrorMessage ? (
            <>
              {showErrorIcon && <Warning />}
              <div
                {...errorMessageProps}
                className={st(classes.helpText)}
                data-id={dataId ? `${dataId}--error` : undefined}
              >
                {errorMessage}
              </div>
            </>
          ) : (
            <div
              {...descriptionProps}
              className={st(classes.helpText)}
              data-id={dataId ? `${dataId}--description` : undefined}
            >
              {description}
            </div>
          )}
        </div>
      )}
    </>
  );
}
HelpText.displayName = "HelpText";

const _HelpText = forwardRef(HelpText);
export { _HelpText as HelpText };
