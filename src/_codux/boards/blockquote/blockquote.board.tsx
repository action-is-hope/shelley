import { createBoard } from "@wixc3/react-board";
import { Blockquote } from "../../../Blockquote";

export default createBoard({
  name: "Blockquote",
  Board: () => (
    <Blockquote desc={"I'm the description"}>
      I am a blockquote and it's a really important thing that I'm saying.
    </Blockquote>
  ),
  environmentProps: {
    windowWidth: 960,
  },
});
