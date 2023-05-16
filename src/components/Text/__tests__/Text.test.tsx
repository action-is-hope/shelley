import Text, { P, H1, H2, H3, H4, H5, H6 } from "../Text";
import renderer from "react-test-renderer";

describe("H", () => {
  test("H1", () => {
    const tree = renderer
      .create(
        <H1>I Am Groot!</H1>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("H2", () => {
    const tree = renderer
      .create(
        <H2>I Am Groot!</H2>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("H3", () => {
    const tree = renderer
      .create(
        <H3>I Am Groot!</H3>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("H3 volume", () => {
    const tree = renderer
      .create(
        <H3 vol={5}>I Am Groot!</H3>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("H4", () => {
    const tree = renderer
      .create(
        <H4>I Am Groot!</H4>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("H5", () => {
    const tree = renderer
      .create(
        <H5>I Am Groot!</H5>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("H6", () => {
    const tree = renderer
      .create(
        <H6>I Am Groot!</H6>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("H uppercase", () => {
    const tree = renderer
      .create(
        <H1 uppercase>I AM GROOT!</H1>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("P", () => {
  test("P", () => {
    const tree = renderer
      .create(
        <P>I Am Groot!</P>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("P volume", () => {
    const tree = renderer
      .create(
        <P vol={5}>I am Groot!</P>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("P vol weight", () => {
    const tree = renderer
      .create(
        <P vol={8} weight={2}>
          vol 8 Text
        </P>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  })
  test("P truncate", () => {
    const tree = renderer
      .create(
        <P truncate={2}>
          The cryosphere refers to frozen components of the Earth system. Around 10%
          of Earth’s land area is covered by glaciers or ice sheets. The ocean and
          cryosphere support unique habitats, and are interconnected with other
          components of the climate system through global exchange of water, energy
          and carbon.
        </P>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Text", () => {
  test("Text", () => {
    const tree = renderer
      .create(
        <Text as="h1">I Am Groot!</Text>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Text volume", () => {
    const tree = renderer
      .create(
        <Text as="h3" vol={6}>I Am Groot!</Text>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("Text as truncate vol", () => {
    const tree = renderer
      .create(
        <Text as="div" truncate={6} vol={false}>
          <P>
            All people on Earth depend directly or indirectly on the ocean and
            cryosphere. The global ocean covers 71% of the Earth surface and contains
            about 97% of the Earth’s water.
          </P>

          <P>
            The cryosphere refers to frozen components of the Earth system. Around 10%
            of Earth’s land area is covered by glaciers or ice sheets. The ocean and
            cryosphere support unique habitats, and are interconnected with other
            components of the climate system through global exchange of water, energy
            and carbon.
          </P>
        </Text>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

