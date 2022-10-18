import type React from "react";
import { useState, Ref, forwardRef, HTMLAttributes, RefObject } from "react";
import type { TextInputType } from "../types";
import InputBase, { InputBaseProps } from "../InputBase/InputBase";
import { useTextField } from "react-aria";
import type { AriaTextFieldProps } from "@react-types/textfield";

/* = Style API. */
import { classes } from "./inputText.st.css";

import type { MergeElementProps } from "../utils";

interface ITextCustomProps
  extends InputBaseProps,
    Omit<AriaTextFieldProps, "label"> {
  rows?: number;
}

export interface TextareaProps extends ITextCustomProps {
  /** Defines the type of input. */
  type?: "textarea";
}

export interface TextInputProps extends ITextCustomProps {
  /** Defines the type of input. */
  type?: TextInputType;
  /** Defines the number of rows, only valid for type="textarea". */
  rows?: never;
}

export type InputTextProps<P extends React.ElementType = "input"> =
  MergeElementProps<P, TextareaProps | TextInputProps>;

function InputText(
  {
    errorMessage,
    validationState,
    description,
    disabled,
    variant,
    label,
    onChange,
    startAdornment,
    isReadOnly,
    isRequired,
    isDisabled,
    endAdornment,
    placeholder,
    labelPosition,
    disableLabelTransition,
    vol,
    type = "text",
    value,
    defaultValue,
    ...rest
  }: InputTextProps<"input" | "textarea">,
  ref?: Ref<HTMLTextAreaElement | HTMLInputElement>
) {
  /**
   * textValue stores the value to be used to format multiline and stylews for hasValue:
   * https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
   */
  // @todo useEffect else it won't work onload with values applied
  const [textValue, setTextValue] = useState(value || defaultValue);
  const rows = rest.rows || 0;
  const isTextArea = type === "textarea" || rows > 0;
  const textareaRef = ref as RefObject<HTMLTextAreaElement>;
  const inputRef = ref as RefObject<HTMLInputElement>;

  let isLabelSmall = false;
  if (textValue) {
    isLabelSmall = true;
  }

  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        value,
        defaultValue,
        label,
        isDisabled: disabled,
        isReadOnly,
        placeholder,
        isRequired,
        errorMessage,
        description,
        type,
        validationState,
        onChange: (value) => {
          setTextValue(value);
          onChange && onChange(value);
        },
        inputElementType: isTextArea ? "textarea" : "input",
        ...rest,
      },
      isTextArea ? textareaRef : inputRef
    );
  console.log(textValue);

  return (
    <InputBase
      {...{
        disabled,
        errorMessage,
        validationState,
        label,
        startAdornment,
        hasValue: isLabelSmall,
        isRequired,
        isReadOnly,
        endAdornment,
        description,
        variant,
        vol,
        labelProps,
        labelPosition,
        disableLabelTransition,
        descriptionProps,
        errorMessageProps,
      }}
      className={`${classes.root} ${classes[type]}`}
    >
      {/* span > textarea is valid mark up -as we want to mimic an inline input. */}

      {isTextArea ? (
        <div className={classes.textareaWrap} data-value={textValue}>
          <textarea
            className={classes.textareaInput}
            rows={rows}
            {...(inputProps as HTMLAttributes<HTMLTextAreaElement>)}
            ref={textareaRef}
          />
        </div>
      ) : (
        <input
          // className={classes.textareaInput}
          {...(inputProps as HTMLAttributes<HTMLInputElement>)}
          ref={inputRef}
        />
      )}
    </InputBase>
  );
}

const _InputText = forwardRef(InputText);
export { _InputText as InputText };
