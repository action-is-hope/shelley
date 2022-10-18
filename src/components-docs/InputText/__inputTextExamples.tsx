/* buttonExamples.tsx */
import React from "react";
import { InputText, InputSelection, InputSelect } from "../../indexLib";

import PropsDemo from "../../components-site/PropsDemo/PropsDemo";
import CodeSample from "../../components-site/CodeSample/CodeSample";

// Styles.
import { classes as grid } from "../../styles/default/grid.st.css";

export const meta = {
  name: "InputText",
};

export const QuickRef = () => (
  <CodeSample
    className={grid.mid}
  >{`import InputText from "@actionishope/shelley";
\n<InputText
  id="id-required"
  label="Form item label" 
  placeholder="Placeholder text"   
  variant={1}
  vol={2}
/>`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [InputDemoProps, setInputDemoProps]: any = React.useState([
    {
      name: "label",
      label: "label",
      type: "text",
      value: "Form item label",
    },
    {
      name: "hint",
      label: "hint",
      type: "text",
      value: "Form item hint message",
    },
    {
      name: "placeholder",
      label: "placeholder",
      type: "text",
      value: "Placeholder text",
    },
    {
      name: "rows",
      label: "rows",
      type: "number",
      min: 0,
      max: 100,
      value: 0,
    },
    {
      name: "variant",
      label: "variant",
      type: "number",
      min: 0,
      max: 6,
      value: 1,
    },
    {
      name: "vol",
      label: "vol",
      type: "number",
      min: 1,
      max: 6,
      value: 3,
    },
    {
      name: "startAdornment",
      label: "startAdornment",
      type: "text",
      value: "",
    },
    {
      name: "endAdornment",
      label: "endAdornment",
      type: "text",
      value: "",
    },
    {
      name: "error",
      label: "error",
      type: "text",
      value: "Form item error message",
    },
    {
      name: "touched",
      label: "touched",
      type: "checkbox",
      value: false,
    },
    {
      name: "disabled",
      label: "disabled",
      type: "checkbox",
      value: false,
    },
  ]);

  return (
    <PropsDemo
      demoProps={InputDemoProps}
      setDemoProps={setInputDemoProps}
      renderExample={
        <CodeSample>{`import InputText from "@actionishope/shelley-ui";

<InputText    ${
          InputDemoProps[0].value
            ? `\n  label="${InputDemoProps[0].value}"`
            : ``
        } ${
          InputDemoProps[1].value ? `\n  hint="${InputDemoProps[1].value}"` : ``
        } ${
          InputDemoProps[2].value
            ? `\n  placeholder="${InputDemoProps[2].value}"`
            : ``
        } ${InputDemoProps[3].value > 0 ? `\n  type="textarea"` : ``} ${
          InputDemoProps[3].value > 0
            ? `\n  rows={${InputDemoProps[3].value}}`
            : ``
        } ${
          InputDemoProps[4].value > 0
            ? `\n  variant={${InputDemoProps[4].value}}`
            : `\n  variant={false}`
        } ${
          InputDemoProps[5].value ? `\n  vol={${InputDemoProps[5].value}}` : ``
        } ${
          InputDemoProps[6].value
            ? `\n  startAdornment="${InputDemoProps[6].value}"`
            : ``
        } ${
          InputDemoProps[7].value
            ? `\n  endAdornment="${InputDemoProps[7].value}"`
            : ``
        } ${
          InputDemoProps[8].value
            ? `\n  error="${InputDemoProps[8].value}"`
            : ``
        } ${InputDemoProps[9].value ? `\n  touched` : ``} ${
          InputDemoProps[10].value ? `\n  disabled` : ``
        } 
/>
/* variant defaults to 1 */
/* vol defaults to 3 */`}</CodeSample>
      }
    >
      <InputText
        id="username"
        label={InputDemoProps[0].value}
        hint={InputDemoProps[1].value}
        placeholder={InputDemoProps[2].value}
        rows={7}
        type="textarea"
        // type={InputDemoProps[3].value > 0 ? "textarea" : "text"}
        variant="outlined"
        vol={InputDemoProps[5].value}
        startAdornment={InputDemoProps[6].value}
        endAdornment={InputDemoProps[7].value}
        error={InputDemoProps[8].value}
        touched={InputDemoProps[9].value}
        disabled={InputDemoProps[10].value}
        onBlur={() => console.log("LOL")}
      />

      <InputText
        id="username"
        label={InputDemoProps[0].value}
        hint={InputDemoProps[1].value}
        placeholder={InputDemoProps[2].value}
        rows={InputDemoProps[3].value}
        type={InputDemoProps[3].value > 0 ? "textarea" : "text"}
        variant={InputDemoProps[4].value}
        vol={InputDemoProps[5].value}
        startAdornment={InputDemoProps[6].value}
        endAdornment={InputDemoProps[7].value}
        error={InputDemoProps[8].value}
        touched={InputDemoProps[9].value}
        disabled={InputDemoProps[10].value}
        onBlur={() => console.log("LOL")}
      />

      <InputSelect
        id="selectYo"
        label={InputDemoProps[0].value}
        hint={InputDemoProps[1].value}
        placeholder={InputDemoProps[2].value}
        // rows={InputDemoProps[3].value}
        // type={InputDemoProps[3].value > 0 ? "textarea" : "text"}
        variant={InputDemoProps[4].value}
        vol={InputDemoProps[5].value}
        startAdornment={InputDemoProps[6].value}
        endAdornment={InputDemoProps[7].value}
        error={InputDemoProps[8].value}
        touched={InputDemoProps[9].value}
        disabled={InputDemoProps[10].value}
        onBlur={() => console.log("LOL")}
      >
        <option>Yo</option>
      </InputSelect>

      <InputSelection
        id="laptop"
        inputPos="start"
        name="viewPort"
        label="Check the terms and conditions"
        error="You have an error here yo"
        type="radio"
        vol={InputDemoProps[5].value}
        touched={InputDemoProps[9].value}
        disabled={InputDemoProps[10].value}
      />
    </PropsDemo>
  );
};

export const ComponentHTML = () => <CodeSample>{`TBC`}</CodeSample>;

export const ComponentCSS = () => (
  <CodeSample
    fixedHeight
  >{`/* This you get anyway from the core which we borrowed from Material UI. */


`}</CodeSample>
);

export const Example1 = () => (
  <div className={grid.mid}>
    <InputText
      id="pageTitle"
      label="Page title"
      placeholder="Enter a page title"
      hint="Enter a page title"
      visuallyHideLabel
      vol={6}
      autoComplete="off"
      // type="text"
      rows={2}
    />
    <br />
    <InputText
      id="subTitle"
      label="Subtitle"
      placeholder="Enter a page subtitle"
      hint="Enter a page subtitle"
      visuallyHideLabel
      vol={4}
      autoComplete="off"
    />
    <InputText
      id="pageDescription"
      label="Page description"
      placeholder="Enter a page description"
      hint="Enter a page description"
      visuallyHideLabel
      vol={3}
      autoComplete="off"
    />
    <br />
    <br />
    <br />
  </div>
);
