import {
  TextField,
  InputTextProps,
  FieldProps,
  Button,
  TextInputProps,
  P,
  Text,
} from "../../indexLib";
import Eye from "../../icons/Eye";
import Check from "../../icons/Check";
import { useState, useMemo, useRef, useEffect } from "react";

export interface InputTextPropsDocs extends FieldProps {
  /** The type of input field. */
  type?: string;
}
export function TextFieldType(props: InputTextPropsDocs) {
  <>{props.type}</>;
}

export const TextFieldSizes = (args: TextInputProps) => {
  return (
    <>
      <TextField
        {...{
          label: "Name",
          vol: 1,
          placeholder: "volume 1",
        }}
        {...args}
      />
      <TextField
        {...{
          label: "Email",
          type: "email",
          vol: 2,
          placeholder: "volume 2",
        }}
        {...args}
      />
      <TextField
        {...{
          label: "Address",
          type: "textarea",
          vol: 3,
          placeholder: "volume 3",
        }}
        {...args}
      />
      <TextField
        {...{
          label: "Telephone",
          type: "tel",
          vol: 4,
          placeholder: "volume 4",
        }}
        {...args}
      />
      <TextField
        {...{
          label: "Fax",
          vol: 5,
          placeholder: "volume 5",
        }}
        {...args}
      />
      <TextField
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
  const [value, setValue] = useState("me@email.com");

  return (
    <>
      <TextField
        vol={1}
        {...args}
        label="Email (Uncontrolled)"
        defaultValue="me@email.com"
      />

      <TextField
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
  const [text, setText] = useState("");

  return (
    <>
      <TextField {...args} onChange={setText} label="Your text" />
      <pre>Mirrored text: {text}</pre>
    </>
  );
};

export const TypeExample = (args: TextInputProps) => {
  return (
    <>
      <TextField {...args} type="password" label="Password" />

      <TextField {...args} type="textarea" label="Textarea (default rows)" />

      <TextField
        {...args}
        type="textarea"
        label="Textarea (single row)"
        rows={1}
      />

      <TextField
        {...args}
        type="textarea"
        label="Textarea (four rows)"
        rows={4}
      />
    </>
  );
};

export const HelpTextExample = () => {
  const [value, setValue] = useState("0");
  const isValid = useMemo(() => /^\d$/.test(value), [value]);

  return (
    <TextField
      isInvalid={!isValid}
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

export const AdornmentExample = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });

  useEffect(() => {
    setStrength({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[\W_]/.test(password),
    });
  }, [password]);

  return (
    <>
      <TextField label="Amount" startAdornment="$" />

      <TextField label="Weight" endAdornment="kg" />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        ref={passwordRef}
        onChange={setPassword}
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
        description={
          <div style={{ background: "white", padding: 20 }}>
            <ul>
              <li style={{ color: strength.length ? "green" : "red" }}>
                At least 8 characters
              </li>
              <li style={{ color: strength.lowercase ? "green" : "red" }}>
                Contains a lowercase letter
              </li>
              <li style={{ color: strength.uppercase ? "green" : "red" }}>
                Contains an uppercase letter
              </li>
              <li style={{ color: strength.digit ? "green" : "red" }}>
                Contains a digit
              </li>
              <li style={{ color: strength.specialChar ? "green" : "red" }}>
                Contains a special character
              </li>
            </ul>
          </div>
        }
      />
    </>
  );
};
