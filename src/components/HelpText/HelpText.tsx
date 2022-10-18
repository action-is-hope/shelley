/** HelpText.tsx */
import type React from "react";
import { ReactNode, HTMLAttributes, forwardRef } from "react";
import type { Validation } from "../../typings/shared-types";
import Warning from "../icons/Warning";
/* = Style API. */
import { st, classes } from "./helpText.st.css";

interface HelpTextProps extends Validation, React.HTMLProps<HTMLDivElement> {
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
  let {
    description,
    errorMessage,
    validationState,
    isDisabled,
    showErrorIcon,
    descriptionProps,
    errorMessageProps,
    className: classNameProp,
  } = props;
  let isErrorMessage = (errorMessage && validationState === "invalid") || false;

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
        >
          {isErrorMessage ? (
            <>
              {showErrorIcon && <Warning />}
              <div {...errorMessageProps} className={st(classes.helpText)}>
                {errorMessage}
              </div>
            </>
          ) : (
            <div {...descriptionProps} className={st(classes.helpText)}>
              {description}
            </div>
          )}
        </div>
      )}
    </>
  );
}

/**
 * Help text provides either an informative description or an error message that gives more context about what a user needs to input. It's commonly used in forms.
 */
const _HelpText = forwardRef(HelpText);
export { _HelpText as HelpText };
