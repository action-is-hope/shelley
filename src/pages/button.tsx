import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Button from "../components/Button/Button";
import Text, { P, H1 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";

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
      <Grid variant={1}>
        <P>This is a basic button.</P>
        <Text as="p">
          <Button ref={test} onClick={() => console.log("HI")}>
            Boom
          </Button>
        </Text>
      </Grid>

      <div>
        <Button onClick={() => onButtonClick()}>Boom</Button>
      </div>
    </DefaultLayout>
  );
};

export default ButtonDocs;
