import { Modal } from "../Modal";
import renderer from "react-test-renderer";

describe("Modal", () => {
  it("renders correctly with classname", () => {
    const tree = renderer
      .create(
        <Modal
          isOpen
          transition={false}
          data-id="modal-test"
          className={"modal-classname-test"}
          portalSelector={false}
        >
          <div>Content</div>
        </Modal>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
