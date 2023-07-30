import { createBoard } from "@wixc3/react-board";
import { P } from "../../Text/Text";

export default createBoard({
  name: "Paragraph",
  Board: () => (
      <P>Paragraph</P>
  ),
});
