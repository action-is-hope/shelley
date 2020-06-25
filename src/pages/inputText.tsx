import React from "react";
import classnames from "classnames";
import DefaultLayout from "../layouts";
import { P, H1, H2 } from "../components/Text/Text";
import InputText from "../components/InputText/InputText";

import InputSelect from "../components/InputSelect/InputSelect";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import Grid from "../components/Grid/Grid";

import PageTitle from "../components_site/PageTitle/PageTitle";
import CodeSample from "../components_site/CodeSample/CodeSample";

import grid from "../projects/default/css/grid.st.css";
import InputSelection from "../components/InputSelection/InputSelection";

import formElements from "../projects/default/css/mixins/formElements.st.css";

const InputDocs = () => {
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
      value: "Form item hint message"
    },
    {
      name: "placeholder",
      label: "placeholder",
      type: "text",
      value: "Placeholder text"
    },
    {
      name: "rows",
      label: "rows",
      type: "number",
      min: 0,
      max: 100,
      value: 0
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
      name: "startAdornment",
      label: "startAdornment",
      type: "text",
      value: ""
    },
    {
      name: "endAdornment",
      label: "endAdornment",
      type: "text",
      value: ""
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

  return (
    <DefaultLayout>
      <PageTitle>InputText</PageTitle>
      <Grid variant={1} tag="main" formatted>
        <P vol={4}>
          Allows our wonderful users to tell us something interesting by
          inputting some text into a little box. Tap Tap Taparoo!
        </P>

        <PropsDemo
          demoProps={InputDemoProps}
          setDemoProps={setInputDemoProps}
          renderExample={
            <CodeSample>{`import InputText from "@action-is-hope/shelley-ui";

<InputText    ${
              InputDemoProps[0].value
                ? `\n  label="${InputDemoProps[0].value}"`
                : ``
            } ${
              InputDemoProps[1].value
                ? `\n  hint="${InputDemoProps[1].value}"`
                : ``
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
              InputDemoProps[5].value
                ? `\n  vol={${InputDemoProps[5].value}}`
                : ``
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

        <div className={grid.mid}>
          <InputText
            id="pageTitle"
            label="Page title"
            placeholder="Enter a page title"
            hint="Enter a page title"
            labelVisuallyHidden
            vol={6}
            autoComplete="off"
          />
          <br />
          <InputText
            id="subTitle"
            label="Subtitle"
            placeholder="Enter a page subtitle"
            hint="Enter a page subtitle"
            labelVisuallyHidden
            vol={4}
            autoComplete="off"
          />
          <InputText
            id="pageDescription"
            label="Page description"
            placeholder="Enter a page description"
            hint="Enter a page description"
            labelVisuallyHidden
            vol={3}
            autoComplete="off"
          />
          <br />
          <br />
          <br />
        </div>
        <P>@todo: more docs, improve examples, bit rough...</P>
        <P>
          If you find yourself in need to style someone elses form you have
          access to some form styles that are used to build Shelley forms.
        </P>
        <P>
          You can use some of the classes directly as shown below but more
          likely you will want to build some styles based targeted at a global
          classname.
        </P>
      </Grid>
    </DefaultLayout>
  );
};

export default InputDocs;
