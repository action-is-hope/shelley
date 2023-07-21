import { Notification, NotificationProps } from "../../src/indexLib";

export const InlineNotification = ({ role }: NotificationProps) => {
  return (
    <Notification
      role={role}
      title="Notification title"
      subtitle="Subtitle goes here"
      data-id="inline-notification"
    />
  );
};

const notification = '[data-id="inline-notification"]';
const notificationTitle = '[data-id="inline-notification--title"]';
const notificationSubTitle = '[data-id="inline-notification--subTitle"]';
const notificationCloseButton = '[data-id="inline-notification--closeButton"]';

// Basic tests to see if notification renders correctly
describe("Inline Notification", () => {
  it("renders working notification, title, subtitle and children.", () => {
    cy.mount(<InlineNotification role="info" />);
    cy.get(notification).should("exist");
    cy.get(notificationTitle).should("contain.text", "Notification title");
    cy.get(notificationSubTitle).should("contain.text", "Subtitle goes here");
  });

  // Role check

  it("renders correct role attributes", () => {
    cy.mount(<InlineNotification role="info" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "info");
  });
});
