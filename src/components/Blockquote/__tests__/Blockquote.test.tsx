import Blockquote from "../Blockquote";
import renderer from "react-test-renderer";

const quoteText =
  "We but mirror the world. All the tendencies present in the outer world are to be found in the world of our body. If we could change ourselves, the tendencies in the world would also change. As a man changes his own nature, so does the attitude of the world change towards him. This is the divine mystery supreme. A wonderful thing it is and the source of our happiness. We need not wait to see what others do.";
const citeText = "Mahatma Gandhi";

describe("Blockquote", () => {
  it("renders as a basic blockquote with custom #className and data attr to test spread.", () => {
    const tree = renderer
      .create(
        <Blockquote
          data-testid="blockquote-data-testid"
          className="for-which-nobody-can-deny"
          desc={citeText}
        >
          {quoteText}
        </Blockquote>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders as a blockquote with description as a <cite> node at a larger volume.", () => {
    const tree = renderer
      .create(
        <Blockquote
          variant="academic"
          className="for-which-nobody-can-deny"
          desc={<cite>{citeText}</cite>}
          descVol={3}
        >
          {quoteText}
        </Blockquote>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
