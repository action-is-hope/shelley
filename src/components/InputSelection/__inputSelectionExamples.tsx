/* buttonExamples.tsx */
import React from "react";
// Example Component
import InputSelection from "./InputSelection";
import InputSelectionControl from "../../components/InputSelectionControl/InputSelectionControl";

// Supporting Components
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";
import Button from "../Button/Button";
import Label from "../../components/Label/Label";
import { P, H1, H2 } from "../../components/Text/Text";
import Icon from "../../components/Icon/Icon";

import { classes as grid } from "../../styles/default/grid.st.css";
import { classes as spacing } from "../../styles/default/spacing.st.css";

export const meta = {
  name: "InputSelection"
};

export const QuickRef = () => (
  <CodeSample className={grid.mid}>{`import Icon from "@action-is-hope/shelley";
\n<Icon>
  {/* crack open an svg to find the path and shove it in. */}
  <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
</Icon>
{/* viewBox prop defaults to "0 0 16 16", match this the svg you have. */}`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [InputDemoProps, setInputDemoProps]: any = React.useState([
    {
      name: "label",
      label: "label",
      type: "text",
      value: "Form item label"
    },
    {
      name: "hint",
      label: "hint",
      type: "text",
      value: ""
    },
    {
      name: "type",
      label: "type",
      type: "text",
      value: "checkbox"
    },
    {
      name: "variant",
      label: "variant",
      type: "number",
      min: 0,
      max: 6,
      value: 1
    },
    {
      name: "vol",
      label: "vol",
      type: "number",
      min: 1,
      max: 6,
      value: 3
    },
    {
      name: "inputPos",
      label: "inputPos",
      type: "select",
      value: "end",
      options: ["top", "end", "bottom", "start"]
    },
    {
      name: "error",
      label: "error",
      type: "text",
      value: "Form item error message"
    },
    {
      name: "touched",
      label: "touched",
      type: "checkbox",
      value: false
    },
    {
      name: "disabled",
      label: "disabled",
      type: "checkbox",
      value: false
    }
  ]);
  // const inputEl = React.useRef();
  const selectionRef = React.createRef<HTMLInputElement>();
  const onButtonClick = () => {
    const node = selectionRef.current;
    // `current` points to the mounted text input element
    node && node.focus();
  };

  return (
    <>
      <PropsDemo
        demoProps={InputDemoProps}
        setDemoProps={setInputDemoProps}
        renderExample={
          <CodeSample>{`import InputSelection from "@action-is-hope/shelley-ui";

<InputSelection    ${
            InputDemoProps[0].value
              ? `\n  label="${InputDemoProps[0].value}"`
              : ``
          } ${
            InputDemoProps[1].value
              ? `\n  hint="${InputDemoProps[1].value}"`
              : ``
          } ${
            InputDemoProps[2].value
              ? `\n  type="${InputDemoProps[2].value}"`
              : ``
          } ${
            InputDemoProps[3].value > 0
              ? `\n  variant={${InputDemoProps[3].value}}`
              : `\n  variant={false}`
          } ${
            InputDemoProps[4].value
              ? `\n  vol={${InputDemoProps[4].value}}`
              : ``
          } ${
            InputDemoProps[5].value
              ? `\n  inputPos="${InputDemoProps[5].value}"`
              : ``
          } ${
            InputDemoProps[6].value
              ? `\n  error="${InputDemoProps[6].value}"`
              : ``
          } ${InputDemoProps[7].value ? `\n  touched` : ``} ${
            InputDemoProps[8].value ? `\n  disabled` : ``
          } 
/>
`}</CodeSample>
        }
      >
        <InputSelection
          id="username"
          label={InputDemoProps[0].value}
          // label={
          //   <Icon>
          //     <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
          //   </Icon>
          // }
          hint={InputDemoProps[1].value}
          type={InputDemoProps[2].value}
          variant={InputDemoProps[3].value}
          vol={InputDemoProps[4].value}
          inputPos={InputDemoProps[5].value}
          error={InputDemoProps[6].value}
          touched={InputDemoProps[7].value}
          disabled={InputDemoProps[8].value}
          ref={selectionRef}
          // autoFocus
        />
      </PropsDemo>

      <P>
        <Button onClick={() => onButtonClick()}>Boom</Button>
        <br />
        <br />
      </P>
    </>
  );
};

export const ComponentHTML = () => <CodeSample>{`TBC`}</CodeSample>;

export const ComponentCSS = () => (
  <CodeSample fixedHeight>
    {`/* This you get anyway from the core which we borrowed from Material UI. */`}
  </CodeSample>
);

export const Example1 = () => (
  <div className={grid.mid}>
    <H2 vol={2} uppercase>
      Icons for labels
    </H2>

    <InputSelection
      className={`${spacing.mt1} ${spacing.mb2}`}
      id="preview"
      label={
        <Icon viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </Icon>
      }
      vol={1}
      inputPos="bottom"
      type="toggle"
    />
    <br />

    <InputSelection
      id="laptop"
      inputPos="top"
      name="viewPort"
      label={
        <Icon alt="Laptop">
          {/* laptop */}
          <path d="M14 11v-9h-12v9h-2v2h16v-2h-2zM10 12h-4v-1h4v1zM13 10h-10v-7h10v7z"></path>
        </Icon>
      }
      type="radio"
      vol={1}
    />
    <InputSelection
      id="tablet"
      inputPos="top"
      name="viewPort"
      label={
        <Icon alt="Tablet">
          {/* tablet.svg */}
          <path d="M0 2v12h16v-12h-16zM13 13h-11v-10h11v10zM15 9h-1v-2h1v2z"></path>
        </Icon>
      }
      type="radio"
      vol={1}
    />
    <InputSelection
      id="mobile"
      inputPos="top"
      name="viewPort"
      label={
        <Icon alt="Mobile">
          {/* mobile */}
          <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
        </Icon>
      }
      type="radio"
      vol={1}
    />

    <CodeSample fixedHeight>
      {`/* = Preview toggle. */\n
<InputSelection
  id="preview"
  label={
    <Icon alt="Toggle preview">
      {/* Icon path here, adjust viewBox to suit. */}
    </Icon>
  }
  vol={1}
  inputPos="bottom"
  type="toggle"
/>

/* = Device selection radio group. */
<InputSelection
  id="laptop"
  inputPos="top"
  name="viewPort"
  label={
    <Icon alt="Laptop">
      {/* laptop svg path */}
    </Icon>
  }
  type="radio"
  vol={1}
/>
<InputSelection
  id="tablet"
  inputPos="top"
  name="viewPort"
  label={
    <Icon alt="Tablet">
    {/* tablet svg path */}
    </Icon>
  }
  type="radio"
  vol={1}
/>
<InputSelection
  id="mobile"
  inputPos="top"
  name="viewPort"
  label={
    <Icon alt="Mobile">
      {/* mobile svg path */}
    </Icon>
  }
  type="radio"
  vol={1}
/>
`}
    </CodeSample>

    {/* <div>
      <Label
        htmlFor="id-ex1-1"
        inputPos="bottom"
        inputControl={<InputSelectionControl id="id-ex1-1" type="toggle" />}
      >
        <Icon viewBox="0 0 24 24" alt="Toggle preview">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </Icon>
      </Label>
    </div> */}

    <InputSelection id="blah1" label={"vol1"} type="checkbox" vol={1} />
    <br />
    <InputSelection id="blah2" label={"vol2"} type="checkbox" vol={2} />
    <br />
    <InputSelection id="blah3" label={"vol3"} type="checkbox" vol={3} />
    <br />
    <InputSelection id="blah4" label={"vol4"} type="checkbox" vol={4} />
    <br />
    <InputSelection id="blah5" label={"vol5"} type="checkbox" vol={5} />
    <br />
    <InputSelection id="blah6" label={"vol6"} type="checkbox" vol={6} />
  </div>
);

// Add some tests to check refs and tings are spread properly.
// const inputEl = React.useRef();
// const test = React.createRef<HTMLButtonElement>();
// const onButtonClick = () => {
//   const node = test.current;
//   // `current` points to the mounted text input element
//   node && node.focus();
// };
