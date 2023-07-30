import { createBoard } from "@wixc3/react-board";
import { H1, H2, P } from "../../Text/Text";

export default createBoard({
  name: "Body",
  Board: () => (
    <div style={{ display: "grid", gap: ".3em" }}>
      <H1>Heading level one</H1>
      <P vol={4}>Introduction</P>
      <H2 vol={6} weight={4}>
        Heading level one
      </H2>
      <P>Paragraph</P>
      <P>Paragraph</P>
    </div>
  ),
});
