import React from "react";
import DefaultLayout from "../layouts";
import { P, H1, H2 } from "../components/Text/Text";
import InputRadioCheck from "../components/InputRadioCheck/InputRadioCheck";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import Grid from "../components/Grid/Grid";

import PageTitle from "../components_site/PageTitle/PageTitle";
import CodeSample from "../components_site/CodeSample/CodeSample";

import grid from "../themes/default/css/grid.st.css";
import Icon from "../components/Icon/Icon";

const InputRadioCheckDocs = () => {
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
      <PageTitle>InputRadioCheck</PageTitle>
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
            <CodeSample>{`import InputRadioCheck from "@action-is-hope/shelley-ui";

<InputRadioCheck    ${
              InputDemoProps[0].value
                ? `\n  label="${InputDemoProps[0].value}"`
                : ``
            } ${
              InputDemoProps[1].value
                ? `\n  hint="${InputDemoProps[1].value}"`
                : ``
            } ${
              InputDemoProps[5].value
                ? `\n  error="${InputDemoProps[5].value}"`
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
            }  ${InputDemoProps[6].value ? `\n  touched` : ``} ${
              InputDemoProps[7].value ? `\n  disabled` : ``
            } 
/>
`}</CodeSample>
          }
        >
          <InputRadioCheck
            id="username"
            // name="username"
            error={InputDemoProps[5].value}
            type={InputDemoProps[2].value}
            hint={InputDemoProps[1].value}
            label={InputDemoProps[0].value}
            variant={InputDemoProps[3].value}
            // type={InputDemoProps[3].value > 0 ? "textarea" : "text"}
            // multiline
            // type="textarea"
            // error={true}
            // touched={true}
            touched={InputDemoProps[6].value}
            disabled={InputDemoProps[7].value}
            // errorMessage="You have an error here yo"
            onBlur={() => console.log("LOL", InputDemoProps[3].value)}
            vol={InputDemoProps[4].value}
            // autoFocus
          />
        </PropsDemo>
      </Grid>
      <Grid>
        <div className={grid.colContent}>
          <InputRadioCheck
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={
              <Icon>
                <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
              </Icon>
            }
            // type="textarea"
            // rows={2}
            onChange={() => console.log("MEMEM")}
            // touched={true}
            error="You have an error here yo"
            // disabled
            vol={6}
          />

          <InputRadioCheck
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={"name"}
            type="checkbox"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={7}
            autoComplete="off"
          />
          <InputRadioCheck
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={"vol6"}
            type="checkbox"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={6}
          />
          <InputRadioCheck
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={"vol5"}
            type="checkbox"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={5}
            // autocomplete="off"
          />
          <InputRadioCheck
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={"vol4"}
            type="checkbox"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={4}
          />
          <InputRadioCheck
            id="blah3"
            // name="username"
            placeholder="Enter your user name"
            // hint="Enter your full name"
            label={"vol3"}
            type="checkbox"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={3}
          />
          <InputRadioCheck
            id="blah4"
            // name="username"
            placeholder="Enter your user name"
            // hint="Enter your full name"
            label={"vol2"}
            type="checkbox"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={2}
          />
        </div>
      </Grid>
    </DefaultLayout>
  );
};

export default InputRadioCheckDocs;
