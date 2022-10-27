import {
  InputText,
  InputTextProps,
  InputBaseProps,
  Button,
  TextInputProps,
} from "../../indexLib";
import Eye from "../../components/icons/Eye";
import React, { useState, useMemo, useRef } from "react";

export interface Test extends InputBaseProps {
  /** The type of input field. */
  type: string;
}
export function TextFieldType(props: Test) {
  <>{props.type}</>;
}

export const TextFieldSizes = (args: TextInputProps) => {
  return (
    <>
      <InputText
        {...{
          label: "Name",
          vol: 1,
          placeholder: "volume 1",
        }}
        {...args}
      />
      <InputText
        {...{
          label: "Email",
          type: "email",
          vol: 2,
          placeholder: "volume 2",
        }}
        {...args}
      />
      <InputText
        {...{
          label: "Address",
          type: "textarea",
          vol: 3,
          placeholder: "volume 3",
        }}
        {...args}
      />
      <InputText
        {...{
          label: "Telephone",
          type: "tel",
          vol: 4,
          placeholder: "volume 4",
        }}
        {...args}
      />
      <InputText
        {...{
          label: "Fax",
          vol: 5,
          placeholder: "volume 5",
        }}
        {...args}
      />
      <InputText
        {...{
          label: "What3words",
          vol: 6,
          placeholder: "volume 6",
        }}
        {...args}
      />
    </>
  );
};

export const ValueExample = (args: InputTextProps) => {
  let [value, setValue] = useState("me@email.com");

  return (
    <>
      <InputText
        vol={1}
        {...args}
        label="Email (Uncontrolled)"
        defaultValue="me@email.com"
      />

      <InputText
        vol={1}
        {...args}
        label="Email (Controlled)"
        value={value}
        onChange={setValue}
      />
    </>
  );
};

export const EventExample = (args: InputTextProps) => {
  let [text, setText] = useState("");

  return (
    <>
      <InputText {...args} onChange={setText} label="Your text" />
      <pre>Mirrored text: {text}</pre>
    </>
  );
};

export const TypeExample = (args: TextInputProps) => {
  return (
    <>
      <InputText {...args} type="password" label="Password" />

      <InputText {...args} type="textarea" label="Textarea (default rows)" />

      <InputText
        {...args}
        type="textarea"
        label="Textarea (single row)"
        rows={1}
      />

      <InputText
        {...args}
        type="textarea"
        label="Textarea (four rows)"
        rows={4}
      />
    </>
  );
};

export const HelpTextExample = (args: InputTextProps) => {
  let [value, setValue] = useState("0");
  let isValid = useMemo(() => /^\d$/.test(value), [value]);

  return (
    <InputText
      validationState={isValid ? "valid" : "invalid"}
      value={value}
      onChange={setValue}
      label="Favorite number"
      maxLength={1}
      description="Enter a single digit number."
      errorMessage={
        value === ""
          ? "Empty input not allowed."
          : "Single digit numbers are 0-9."
      }
    />
  );
};

export const AdornmentExample = (args: InputTextProps) => {
  let [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <InputText label="Amount" startAdornment="$" />

      <InputText label="Weight" endAdornment="kg" />

      <InputText
        label="Password"
        type={showPassword ? "text" : "password"}
        ref={passwordRef}
        endAdornment={
          <Button
            variant="quiet"
            onPress={() => {
              setShowPassword(!showPassword);
              passwordRef?.current?.focus();
            }}
          >
            <Eye alt="Show password" />
          </Button>
        }
      />
    </>
  );
};
