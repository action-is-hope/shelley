import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Button from "../components/Button/Button";
import { P, SPAN, H1 } from "../components/Text/Text";

// function TextInputWithFocusButton() {
//   const inputEl = React.useRef(null);
//   const onButtonClick = () => {
//     // `current` points to the mounted text input element
//     inputEl && inputEl.current.focus();
//   };
//   return (
//     <>
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   );
// }

const ButtonDocs = () => {
  // const inputEl = React.useRef();
  const test = React.createRef<HTMLButtonElement>();
  const onButtonClick = () => {
    const node = test.current;
    // `current` points to the mounted text input element
    node && node.focus();
  };
  return (
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
        <Button ref={test} onClick={() => console.log("HI")}>
          Boom
        </Button>
        <Button onClick={() => onButtonClick()}>Boom</Button>
      </div>
    </DefaultLayout>
  );
};

export default ButtonDocs;
