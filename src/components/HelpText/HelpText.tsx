/** HelpText.tsx */
import type React from "react";
import { ReactNode, HTMLAttributes, forwardRef } from "react";
import type { Validation } from "../../typings/shared-types";
import Warning from "../icons/Warning";
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
  /** Add predefined data-id to ease testing or analytics. */
  includeDataIds?: boolean;
}

function HelpText(props: HelpTextProps, ref?: React.Ref<HTMLDivElement>) {
  const {
    description,
    errorMessage,
    validationState,
    isDisabled,
    showErrorIcon,
    descriptionProps,
    errorMessageProps,
    className: classNameProp,
    includeDataIds = false,
  } = props;
  const isErrorMessage =
    (errorMessage && validationState === "invalid") || false;
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
              <div
                {...errorMessageProps}
                className={st(classes.helpText)}
                data-id={includeDataIds ? "help--error" : undefined}
              >
                {errorMessage}
              </div>
            </>
          ) : (
            <div
              {...descriptionProps}
              className={st(classes.helpText)}
              data-id={includeDataIds ? "help--description" : undefined}
            >
              {description}
            </div>
          )}
        </div>
      )}
    </>
  );
}

const _HelpText = forwardRef(HelpText);
export { _HelpText as HelpText };
