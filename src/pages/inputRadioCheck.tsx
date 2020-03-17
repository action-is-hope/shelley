import React from "react";
import DefaultLayout from "../layouts";
import { P, H1, H2 } from "../components/Text/Text";
import InputSelection from "../components/InputSelection/InputSelection";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import Grid from "../components/Grid/Grid";

import PageTitle from "../components_site/PageTitle/PageTitle";
import CodeSample from "../components_site/CodeSample/CodeSample";

import grid from "../themes/default/css/grid.st.css";
import Icon from "../components/Icon/Icon";
import Label from "../components/Label/Label";
import InputSelectionControl from "../components/InputSelectionControl/InputSelectionControl";
import Button from "../components/Button/Button";

const InputSelectionDocs = () => {
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
      options: ["start", "end", "above", "below"]
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
    <DefaultLayout>
      <PageTitle>InputSelection</PageTitle>
      <Grid variant={1}>
        <P vol={4}>
          Allows our wonderful users to tell us something interesting by
          inputting some text into a little box. Tap Tap Taparoo!
        </P>
      </Grid>
      <Grid>
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
      </Grid>
      <Grid>
        <div className={grid.colContent}>
          <P>
            <Button onClick={() => onButtonClick()}>Boom</Button>
          </P>

          <P>
            <Label
              // hint={labelDemoProps[1].value}
              htmlFor="TEST"
              inputPos="bottom"
              inputControl={<InputSelectionControl id="TEST" type="toggle" />}
              // inputControl={<input type="checkbox" />}
            >
              <Icon viewBox="0 0 24 24" label="Toggle preview">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </Icon>
            </Label>
          </P>
          <InputSelection
            id="preview"
            inputPos="top"
            label={
              <Icon viewBox="0 0 24 24">
                {/* <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path> */}
                {/* <path d="M8 3.9c-6.7 0-8 5.1-8 5.1s2.2 4.1 7.9 4.1 8.1-4 8.1-4-1.3-5.2-8-5.2zM5.3 5.4c0.5-0.3 1.3-0.3 1.3-0.3s-0.5 0.9-0.5 1.6c0 0.7 0.2 1.1 0.2 1.1l-1.1 0.2c0 0-0.3-0.5-0.3-1.2 0-0.8 0.4-1.4 0.4-1.4zM7.9 12.1c-4.1 0-6.2-2.3-6.8-3.2 0.3-0.7 1.1-2.2 3.1-3.2-0.1 0.4-0.2 0.8-0.2 1.3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-0.5-0.1-0.9-0.2-1.3 2 0.9 2.8 2.5 3.1 3.2-0.7 0.9-2.8 3.2-7 3.2z"></path> */}
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </Icon>
            }
            // type="textarea"
            // rows={2}

            // touched={true}
            error="You have an error here yo"
            type="toggle"
            // disabled
            vol={2}
          />
          <br />
          <br />
          <br />
          <br />

          <InputSelection
            id="laptop"
            inputPos="top"
            name="viewPort"
            label={
              <Icon label="Laptop">
                {/* laptop */}
                <path d="M14 11v-9h-12v9h-2v2h16v-2h-2zM10 12h-4v-1h4v1zM13 10h-10v-7h10v7z"></path>
              </Icon>
            }
            error="You have an error here yo"
            type="radio"
            vol={1}
          />
          <InputSelection
            id="tablet"
            inputPos="top"
            name="viewPort"
            label={
              <Icon label="Tablet">
                {/* tablet.svg */}
                <path d="M0 2v12h16v-12h-16zM13 13h-11v-10h11v10zM15 9h-1v-2h1v2z"></path>
              </Icon>
            }
            error="You have an error here yo"
            type="radio"
            vol={1}
          />
          <InputSelection
            id="mobile"
            inputPos="top"
            name="viewPort"
            label={
              <Icon label="Mobile">
                {/* mobile */}
                <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
              </Icon>
            }
            error="You have an error here yo"
            type="radio"
            vol={1}
          />
          <br />
          <br />
          <br />
          <br />
          <InputSelection id="blah2" label={"name"} type="checkbox" vol={7} />
          <InputSelection id="blah2" label={"vol6"} type="checkbox" vol={6} />
          <InputSelection id="blah2" label={"vol5"} type="checkbox" vol={5} />
          <InputSelection id="blah2" label={"vol4"} type="checkbox" vol={4} />
          <InputSelection id="blah3" label={"vol3"} type="checkbox" vol={3} />
          <InputSelection
            id="blah4"
            // hint="Enter your full name"
            label={"vol2"}
            type="checkbox"
            vol={2}
          />
        </div>
      </Grid>
    </DefaultLayout>
  );
};

export default InputSelectionDocs;
