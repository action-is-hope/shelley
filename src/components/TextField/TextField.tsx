import type React from "react";
import { useState, Ref, forwardRef, HTMLAttributes, RefObject } from "react";
import type { MergeElementProps } from "../utils";
import type { ComponentBase, TextInputType } from "../types";
import { Field, FieldProps } from "../Field/Field";
import { useTextField } from "react-aria";
import type { AriaTextFieldProps } from "@react-types/textfield";

/* = Style API. */
import { st, classes } from "./textField.st.css";
interface ITextCustomProps
  extends FieldProps,
    Omit<AriaTextFieldProps, "label">,
    ComponentBase {
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

function TextField(
  props: InputTextProps<"input" | "textarea">,
  ref?: Ref<HTMLTextAreaElement | HTMLInputElement>
) {
  const {
    className: classNameProp,
    description,
    isDisabled,
    errorMessage,
    validationState,
    variant,
    label,
    labelPosition,
    disableLabelTransition,
    vol,
    onChange,
    startAdornment,
    isReadOnly,
    isRequired,
    endAdornment,
    type = "text",
    value,
    defaultValue,
    "data-id": dataId,
  } = props;
  /**
   * textValue stores the value to be used to format multiline and stylews for hasValue:
   * https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
   */
  // @todo useEffect else it won't work onload with values applied
  const [textValue, setTextValue] = useState(value || defaultValue);
  const rows = props.rows || 0;
  const isTextArea = type === "textarea" || rows > 0;
  const textareaRef = ref as RefObject<HTMLTextAreaElement>;
  const inputRef = ref as RefObject<HTMLInputElement>;

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(
      {
        ...props,
        onChange: (value) => {
          setTextValue(value);
          onChange && onChange(value);
        },
        inputElementType: isTextArea ? "textarea" : "input",
      },
      isTextArea ? textareaRef : inputRef
    );

  return (
    <Field
      {...{
        isDisabled,
        errorMessage,
        validationState,
        label,
        startAdornment,
        hasValue: Boolean(textValue),
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
      data-id={dataId}
      className={st(classes.root, classNameProp)}
    >
      {/* span > textarea is valid mark up -as we want to mimic an inline input. */}
      {isTextArea ? (
        <div className={classes.textareaWrap} data-value={textValue}>
          <textarea
            className={classes.textareaInput}
            rows={rows}
            {...(inputProps as HTMLAttributes<HTMLTextAreaElement>)}
            data-id={dataId ? `${dataId}--textarea` : undefined}
            ref={textareaRef}
          />
        </div>
      ) : (
        <input
          {...(inputProps as HTMLAttributes<HTMLInputElement>)}
          data-id={dataId ? `${dataId}--input` : undefined}
          ref={inputRef}
        />
      )}
    </Field>
  );
}

const _InputText = forwardRef(TextField);
export { _InputText as TextField };
