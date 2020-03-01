import React from "react";
import Link from "gatsby-link";
import DefaultLayout from "../layouts";
import Button from "../components/Button/Button";
import Text, { P, H1 } from "../components/Text/Text";
import Grid from "../components/Grid/Grid";
// import grid from "../components/Grid/grid.st.css";
import grid from "../themes/default/css/grid.st.css";
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
      <Grid variant={0}>
        <P>This is a basic button.</P>
        <div className={grid.colContent}>
          <Button ref={test} onClick={() => console.log("HI")}>
            Boom
          </Button>
        </div>
        <div className={grid.colContent}>
          <Button ref={test} onClick={() => console.log("HI")}>
            Add content
          </Button>
        </div>
        <div className={grid.colContent}>
          <Button ref={test} onClick={() => console.log("HI")}>
            Publish page
          </Button>
        </div>
      </Grid>

      <div>
        <Button onClick={() => onButtonClick()}>Boom</Button>
      </div>
    </DefaultLayout>
  );
};

export default ButtonDocs;
