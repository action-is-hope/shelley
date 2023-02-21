import { Field, FieldProps } from "../../indexLib";
import React, { useRef, useState, ElementType } from "react";
import { useTextField } from "react-aria";

export const FieldExample = (args: FieldProps) => {
  let ref = useRef(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(args, ref);

  return (
    <Field {...args} {...{ labelProps, descriptionProps, errorMessageProps }}>
      <input {...inputProps} ref={ref} />
    </Field>
  );
};

interface InputTextProps
  extends FieldProps,
    Omit<React.HTMLProps<HTMLInputElement>, "label"> {}

export const TextFieldExample = (props: InputTextProps) => {
  const { value, onChange } = props;
  const [textValue, setTextValue] = useState(value);
  return (
    <Field
      labelProps={{
        id: "label-id",
        // Match the id given to the input.
        htmlFor: "testField",
      }}
      labelPosition="over"
      // Only required for labelPosition -> "over".
      hasValue={Boolean(textValue)}
      {...props}
    >
      <input
        id="testField"
        type="text"
        // Match the id given to the label.
        aria-labelledby="label-id"
        onChange={(e) => {
          setTextValue(e.target.value);
          onChange && onChange(e);
        }}
      />
    </Field>
  );
};
