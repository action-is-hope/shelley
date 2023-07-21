// Notification.cy.tsx Notification component tests
import { Notification, NotificationProps } from "../../src/indexLib";

export const InlineNotification = ({
  role,
  hideCloseButton,
  children,
}: NotificationProps) => {
  return (
    <Notification
      role={role}
      hideCloseButton={hideCloseButton}
      title="Notification title"
      subtitle="Subtitle goes here"
      data-id="inline-notification"
    >
      {children}
    </Notification>
  );
};

const notification = '[data-id="inline-notification"]';
const notificationTitle = '[data-id="inline-notification--title"]';
const notificationSubTitle = '[data-id="inline-notification--subTitle"]';
const notificationCloseButton = '[data-id="inline-notification--closeButton"]';
const notificationIcon = '[data-id="inline-notification--icon"]';

// Basic tests to see if notification renders correctly
describe("Inline Notification", () => {
  it("renders working notification, title, subtitle.", () => {
    cy.mount(<InlineNotification role="info" />);
    cy.get(notification).should("exist");
    cy.get(notificationTitle).should("contain.text", "Notification title");
    cy.get(notificationSubTitle).should("contain.text", "Subtitle goes here");
  });

  // Children check
  it("renders children", () => {
    cy.mount(
      <InlineNotification role="info">
        <p data-id="inline-notification--children">Children</p>
      </InlineNotification>
    );
    cy.get('[data-id="inline-notification--children"]').should(
      "contain.text",
      "Children"
    );
  });

  // Icon check
  it("renders icon", () => {
    cy.mount(<InlineNotification role="info" />);
    cy.get(notificationIcon).should("exist");
  });

  // Role check
  it("renders correct role attributes", () => {
    cy.mount(<InlineNotification role="info" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "info");
    cy.mount(<InlineNotification role="success" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "success");
    cy.mount(<InlineNotification role="warning" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "warning");
    cy.mount(<InlineNotification role="alert" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "alert");
  });

  // Close button
  it("renders close button", () => {
    cy.mount(<InlineNotification role="info" />);
    cy.get(notificationCloseButton).should("exist");
  });

  // Close button click
  it("closes notification on close button click", () => {
    cy.mount(<InlineNotification role="info" />);
    cy.get(notificationCloseButton).click();
    cy.get(notification).should("not.exist");
  });

  // Hide close button
  it("hides close button", () => {
    cy.mount(<InlineNotification hideCloseButton />);
    cy.get(notificationCloseButton).should("not.exist");
  });

  // Classname check
  it("renders correct classnames", () => {
    cy.mount(<InlineNotification role="info" />);
    cy.get(notification)
      .should("have.attr", "class")
      .and("to.have.string", "root");
    cy.get(notificationTitle)
      .should("have.attr", "class")
      .and("to.have.string", "title");
    cy.get(notificationSubTitle)
      .should("have.attr", "class")
      .and("to.have.string", "subtitle");
    cy.get(notificationCloseButton)
      .should("have.attr", "class")
      .and("to.have.string", "closeButton");
  });
});
