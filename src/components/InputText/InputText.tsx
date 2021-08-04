import React, { useState } from "react";
import type { TextInputType } from "../types";
import InputBase, { InputBaseProps } from "../InputBase/InputBase";
/* = Style API. */
import { classes } from "./inputText.st.css";

import type { MergeElementProps } from "../utils";

interface ITextCustomProps extends InputBaseProps {
  /** Required to associate the form label and input #a11y. */
  id: string;
  /** onChange handler */
  onChange?: (e: React.ChangeEvent) => void;
  /** Defines the number of rows for a textarea and forces type to be 'textarea'. */
  rows?: number;
}

interface TextareaProps extends ITextCustomProps {
  /** Defines the type of input. */
  type?: "textarea";
}

interface TextInputProps extends ITextCustomProps {
  /** Defines the type of input. */
  type?: TextInputType;
  /** Defines the number of rows, only valid for type="textarea". */
  rows?: never;
}

type InputTextProps<P extends React.ElementType = "textarea"> =
  MergeElementProps<P, TextareaProps | TextInputProps>;

function InputTextBase(
  {
    error,
    touched,
    hint,
    variant,
    label,
    onChange,
    labelVisuallyHidden,
    startAdornment,
    // endAdornment,
    vol,
    type = "text",
    ...rest
  }: InputTextProps<"input" | "textarea">,
  ref?: React.Ref<HTMLTextAreaElement | HTMLInputElement>
) {
  /**
   * textareaValue stores the value to be used to format multiline:
   * https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
   */
  const [textareaValue, setTextareaValue] = useState("");

  const rows = rest.rows || 0;
  let input: React.ReactElement;

  if (type === "textarea" || rows > 0) {
    const props = rest as InputTextProps<"textarea">;
    const textareaRef = ref as React.Ref<HTMLTextAreaElement>;
    input = (
      // span > textarea is valid mark up -as we want to mimic an inline input.
      <div className={classes.textareaWrap} data-value={textareaValue}>
        <textarea
          className={classes.textareaInput}
          {...props}
          onChange={(e) => {
            setTextareaValue(e.target.value);
            onChange && onChange(e);
          }}
          ref={textareaRef}
        />
      </div>
    );
  } else {
    const props = rest as InputTextProps<"input">;
    const inputRef = ref as React.Ref<HTMLInputElement>;
    input = <input {...{ onChange, ...props, type }} ref={inputRef} />;
  }

  return (
    <InputBase
      {...{
        id: rest.id,
        disabled: rest.disabled,
        error,
        touched,
        label,
        labelVisuallyHidden,
        startAdornment,
        // endAdornment,
        hint,
        variant,
        vol,
      }}
      className={`${classes.root} ${classes[type]}`}
    >
      {input}
    </InputBase>
  );
}

const InputText = React.forwardRef(InputTextBase) as typeof InputTextBase;

export default InputText;
