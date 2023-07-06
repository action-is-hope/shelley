import { createBoard } from "@wixc3/react-board";
import { H1 } from "../../Text/Text";

export default createBoard({
  name: "H1",
  Board: () => (
    <div>
      <H1>Heading level one</H1>
    </div>
  ),
});
