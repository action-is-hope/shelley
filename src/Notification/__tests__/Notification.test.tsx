import { Notification } from "..";
import renderer from "react-test-renderer";

describe("Notification", () => {
  it("success notifcation", () => {
    const tree = renderer
      .create(
        <Notification
          role="success"
          title="Success notification title"
          subtitle="Subtitle goes here"
          data-id="inline-success-notification"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("info notifcation", () => {
    const tree = renderer
      .create(
        <Notification
          role="info"
          title="Info notification title"
          subtitle="Subtitle goes here"
          data-id="inline-info-notification"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("warning notifcation", () => {
    const tree = renderer
      .create(
        <Notification
          role="warning"
          title="Warning notification title"
          subtitle="Subtitle goes here"
          data-id="inline-warning-notification"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("alert notifcation", () => {
    const tree = renderer
      .create(
        <Notification
          role="alert"
          title="Alert notification title"
          subtitle="Subtitle goes here"
          data-id="inline-alert-notification"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("hideCloseButton", () => {
    const tree = renderer
      .create(
        <Notification
          hideCloseButton
          title="Notification title"
          subtitle="Subtitle goes here"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with children", () => {
    const tree = renderer
      .create(
        <Notification title="Notification title">
          <p>Notification content goes here</p>
        </Notification>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with footer content", () => {
    const tree = renderer
      .create(
        <Notification
          title="Notification title"
          footer={<span>Do not show this again [x]</span>}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
