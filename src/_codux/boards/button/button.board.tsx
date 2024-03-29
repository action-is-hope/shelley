import { createBoard } from "@wixc3/react-board";
import { Button } from "../../../Button";

export default createBoard({
  name: "Button",
  Board: () => (
    <Button variant="primary" onPress={() => alert("HELLO")}>
      I am a Button
    </Button>
  ),
  environmentProps: {
    canvasHeight: 36,
  },
});
