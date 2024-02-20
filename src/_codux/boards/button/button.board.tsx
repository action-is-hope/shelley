import { createBoard } from "@wixc3/react-board";
import { Button } from "../../../Button/Button";

export default createBoard({
  name: "Button",
  Board: () => (
    <Button variant="lead" onPress={() => alert("HELLO")}>
      I am a Button
    </Button>
  ),
  environmentProps: {
    canvasHeight: 36,
  },
});
