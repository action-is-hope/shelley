import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Input from "../components/TextInput/TextInput";
import { P, SPAN, H1, H2 } from "../components/Text/Text";
import Label from "../components/Label/Label";
import InputRow from "../components/InputRow/InputRow";
import RadioCheckInput from "../components/RadioCheckInput/RadioCheckInput";
import PropsDemo from "../components_site/PropsDemo/PropsDemo";

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
      max: 5,
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

  console.log("ME", InputDemoProps);

  return (
    <DefaultLayout>
      <div className="bodyCopy">
        <H1 vol={3}>
          <SPAN uppercase>
            <Link to="/">Back to Components</Link>
          </SPAN>{" "}
          <br />
          <SPAN vol={9}>Input</SPAN>
        </H1>
        <P>Provides an input or a multiline text area.</P>
        <P>We have choosen to put the error message before the </P>
      </div>

      <PropsDemo demoProps={InputDemoProps} setDemoProps={setInputDemoProps}>
        <InputRow
          id="username"
          // name="username"
          error={InputDemoProps[5].value}
          placeholder={InputDemoProps[2].value}
          hint={InputDemoProps[1].value}
          label={InputDemoProps[0].value}
          rows={InputDemoProps[3].value}
          multiline={InputDemoProps[3].value > 0}
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

      <InputRow
        id="blah"
        // name="username"
        placeholder="Enter your user name"
        hint="Enter your full name"
        label={"Username"}
        type="checkbox"
        onChange={() => console.log("MEMEM")}
        // error={true}
        // touched={true}
        // errorMessage="You have an error here yo"
        vol={4}
        autoFocus
      />

      <InputRow
        id="name"
        name="name"
        label="Name"
        hint="Enter your full name"
        onChange={() => console.log("MEMEM")}
        placeholder="Enter your full name"
        vol={3}
        startAdornment="£"
        autoFocus
      />

      {/* <InputRow
      error={true}
      touched={true}
      errorMessage="You have an error here yo"
    >
      <Label>
        <span>This is a checkbox</span>
        <input type="checkbox" />
      </Label>
    </InputRow> */}

      <div>
        <RadioCheckInput
          name="radioCheckInput-1-2"
          id="vegan"
          label="Plant based - vegan"
          type="radio"
          value="radioCheck1"
          // disabled
          // defaultChecked
          onClick={(e: any) => console.log(e.target.name, e.target.value)}
        />
        <RadioCheckInput
          name="radioCheckInput-1-2"
          id="veggie"
          value="veggie"
          label="Plant based - veggie"
          type="radio"
          // defaultChecked
          onClick={(e: any) =>
            console.log(e.target.checked, e.target.name, e.target.value)
          }
        />
        <br />
        <RadioCheckInput
          name="radioCheckInput-1-2"
          id="lowmeat"
          value="lowmeat"
          label="Plant based - low meat"
          type="checkbox"
          onClick={(e: any) =>
            console.log(e.target.checked, e.target.name, e.target.value)
          }
          defaultChecked
        />
        <RadioCheckInput
          name="radioCheckInput-1-2"
          id="meatCentered"
          value="meatCentered"
          label="Meat centered"
          type="radio"
          onClick={(e: any) => console.log(e.target.name, e.target.value)}
          // defaultChecked
        />
      </div>

      <div>
        <Input
          name="mark"
          id="markid"
          placeholder="1234"
          size={4}
          maxLength={4}
          onChange={() => console.log("MEMEM")}
        />
      </div>
      <br />
      <div>
        <Input
          name="mark"
          id="markid"
          placeholder="1234"
          defaultValue="error"
          type="password"
          error
        />
      </div>
      <br />
      <div>
        <Input name="mark" id="markid" defaultValue="Disabled" disabled />
      </div>
      <br />
      <div>
        <Input id="blah" name="multi" placeholder="Multiline input" multiline />
      </div>
      <br />
      <div>
        <Input
          name="mark"
          id="markid"
          placeholder="Multiline input with rows attribute"
          multiline
          rows={2}
        />
      </div>
      <br />
      <div className="bodyCopy">
        <H2 vol={6}>Input adornments</H2>
      </div>

      <div>
        <Input
          name="mark"
          id="markid"
          placeholder="369"
          startAdornment={<span>$</span>}
        />
      </div>
      <br />
      <div>
        <Input
          name="mark"
          id="markid"
          placeholder="Disabled"
          endAdornment={<span>Kg</span>}
          disabled
        />
      </div>
      <br />
      <div className="bodyCopy">
        <H2 vol={6}>Input volumes</H2>
      </div>
      <div>
        <Input name="mark" id="markid" vol={5} placeholder="Volume 5" />
      </div>
      <br />
      <div>
        <Input name="mark" id="markid" vol={4} placeholder="Volume 4" />
      </div>
      <br />
      <div>
        <Input name="mark" id="markid" vol={3} placeholder="Volume 3" />
      </div>
      <br />
      <div>
        <Input name="mark" id="markid" vol={2} placeholder="Volume 2" />
      </div>
      <br />
      <div>
        <Input name="mark" id="markid" vol={1} placeholder="Volume 1" />
      </div>
    </DefaultLayout>
  );
};

export default InputDocs;
