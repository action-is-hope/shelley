import React from "react";
import DefaultLayout from "../layouts";
import { P, H1, H2 } from "../components/Text/Text";
import InputText from "../components/InputText/InputText";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";
import Grid from "../components/Grid/Grid";

import PageTitle from "../components_site/PageTitle/PageTitle";
import CodeSample from "../components_site/CodeSample/CodeSample";

import grid from "../themes/default/css/grid.st.css";

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
    }
  ]);

  return (
    <DefaultLayout>
      <PageTitle>InputText</PageTitle>
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
            } ${
              InputDemoProps[3].value > 0
                ? `\n  rows={${InputDemoProps[3].value}}`
                : ``
            } ${InputDemoProps[3].value > 0 ? `\n  type="textarea"` : ``} ${
              InputDemoProps[4].value
                ? `\n  vol={${InputDemoProps[4].value}}`
                : ``
            } ${
              InputDemoProps[5].value
                ? `\n  error="${InputDemoProps[5].value}"`
                : ``
            } ${InputDemoProps[6].value ? `\n  touched` : ``} 
/>
`}</CodeSample>
          }
        >
          <InputText
            id="username"
            // name="username"
            error={InputDemoProps[5].value}
            placeholder={InputDemoProps[2].value}
            hint={InputDemoProps[1].value}
            label={InputDemoProps[0].value}
            rows={InputDemoProps[3].value}
            type={InputDemoProps[3].value > 0 ? "textarea" : "text"}
            // multiline
            // type="textarea"
            // error={true}
            // touched={true}
            size={8}
            touched={InputDemoProps[6].value}
            // errorMessage="You have an error here yo"
            onBlur={() => console.log("LOL", InputDemoProps[3].value)}
            vol={InputDemoProps[4].value}
            // autoFocus
          />
        </PropsDemo>
      </Grid>
      <Grid>
        <div className={grid.colContent}>
          <InputText
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label="NEWWWW"
            // type="textarea"
            // rows={2}
            onChange={() => console.log("MEMEM")}
            // touched={true}
            error="You have an error here yo"
            // disabled
            vol={6}
            autoFocus
            autoComplete="off"
            startAdornment={<span>$</span>}
            endAdornment={<span>Kg</span>}
          />

          <InputText
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={"name"}
            type="text"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={7}
            autoFocus
            autoComplete="off"
          />
          <InputText
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={"vol6"}
            type="text"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={6}
            autoFocus
          />
          <InputText
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={"vol5"}
            type="text"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={5}
            autoFocus
            // autocomplete="off"
          />
          <InputText
            id="blah2"
            // name="username"
            placeholder="Enter your user name"
            // hint="Give a full description focusing on the major actions you will be taking on climate change"
            label={"vol4"}
            type="text"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={4}
            autoFocus
          />
          <InputText
            id="blah3"
            // name="username"
            placeholder="Enter your user name"
            // hint="Enter your full name"
            label={"vol3"}
            type="text"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={3}
            autoFocus
          />
          <InputText
            id="blah4"
            // name="username"
            placeholder="Enter your user name"
            // hint="Enter your full name"
            label={"vol2"}
            type="text"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={2}
            autoFocus
          />
          <InputText
            id="blah4"
            // name="username"
            placeholder="Enter your user name"
            // hint="Enter your full name"
            label={"vol1"}
            type="text"
            onChange={() => console.log("MEMEM")}
            // error={true}
            // touched={true}
            // errorMessage="You have an error here yo"
            vol={1}
            autoFocus
          >
            HELLO
          </InputText>
        </div>
      </Grid>
    </DefaultLayout>
  );
};

export default InputDocs;
