import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Button from "../components/Button/Button";
import { P, SPAN, H1 } from "../components/Text/Text";

const ButtonDocs = () => (
  <DefaultLayout>
    <div className="bodyCopy">
      <H1 vol={3}>
        <SPAN uppercase>
          <Link to="/">Back to Components</Link>
        </SPAN>{" "}
        <br />
        <SPAN vol={8}>Button</SPAN>
      </H1>
      <P>This is a basic button.</P>
    </div>

    <div>
      <Button onClick={() => alert("I like big buttons and I cannot lie!")}>
        Boom
      </Button>
    </div>
  </DefaultLayout>
);

export default ButtonDocs;
