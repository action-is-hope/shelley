import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Input from "../components/TextInput/TextInput";
import { P, SPAN, H1, H2 } from "../components/Text/Text";
import Label from "../components/Label/Label";
import InputRow from "../components/InputRow/InputRow";

const InputDocs = () => (
  <DefaultLayout>
    <div className="bodyCopy">
      <H1 vol={3}>
        <SPAN uppercase>
          <Link to="/">Back to Components</Link>
        </SPAN>{" "}
        <br />
        <SPAN vol={8}>Input</SPAN>
      </H1>
      <P>Provides an input or a multiline text area.</P>
      <P>We have choosen to put the error message before the </P>
    </div>

    <InputRow
      id="name"
      name="name"
      inputLabel="Name"
      hint="Enter your full name"
      onChange={() => console.log("MEMEM")}
      placeholder="Enter your full name"
      vol={4}
      autoFocus
    />

    <InputRow
      id="username"
      // name="username"
      placeholder="Enter your user name"
      inputLabel={"Username"}
      onChange={() => console.log("MEMEM")}
      error={true}
      touched={true}
      errorMessage="You have an error here yo"
      vol={4}
      autoFocus
    />

    <InputRow
      id="username"
      // name="username"
      // placeholder="Enter your user name"
      inputLabel={"Username"}
      // onChange={() => console.log("MEMEM")}
      error={true}
      touched={true}
      errorMessage="You have an error here yo"
      vol={4}
      // autoFocus
    >
      <Label>
        <span>This is a checkbox</span>
        <input type="checkbox" />
      </Label>
    </InputRow>

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
      <Input name="multi" placeholder="Multiline input" multiline />
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

export default InputDocs;
