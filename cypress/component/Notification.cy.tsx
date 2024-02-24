// Notification.cy.tsx Notification component tests
import { Notification, NotificationProps } from "../../src/indexLib";

export const InlineNotification = ({
  role,
  tone,
  isDismissable,
  children,
}: NotificationProps) => {
  return (
    <Notification
      role={role}
      tone={tone}
      isDismissable={isDismissable}
      title="Notification title"
      subtitle="Subtitle goes here"
      data-id="inline-notification"
      aria-label="Close"
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
    cy.mount(<InlineNotification tone="info" />);
    cy.get(notification).should("exist");
    cy.get(notificationTitle).should("contain.text", "Notification title");
    cy.get(notificationSubTitle).should("contain.text", "Subtitle goes here");
  });

  it("renders children", () => {
    cy.mount(
      <InlineNotification tone="info">
        <p data-id="inline-notification--children">Children</p>
      </InlineNotification>
    );
    cy.get('[data-id="inline-notification--children"]').should(
      "contain.text",
      "Children"
    );
  });

  it("renders icon", () => {
    cy.mount(<InlineNotification tone="info" />);
    cy.get(notificationIcon).should("exist");
  });

  it("renders correct role attributes", () => {
    cy.mount(<InlineNotification tone="info" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "status");
    cy.mount(<InlineNotification tone="success" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "status");
    cy.mount(<InlineNotification tone="warning" role="alert" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "alert");
    cy.mount(<InlineNotification tone="alert" />);
    cy.get(notification)
      .should("have.attr", "role")
      .and("to.have.string", "alert");
  });

  it("does not render close button by default", () => {
    cy.mount(<InlineNotification />);
    cy.get(notificationCloseButton).should("not.exist");
  });

  it("renders close button via isDismissable", () => {
    cy.mount(<InlineNotification tone="info" isDismissable />);
    cy.get(notificationCloseButton).should("exist");
  });

  it("closes notification on close button click", () => {
    cy.mount(<InlineNotification tone="info" />);
    cy.get(notificationCloseButton).click();
    cy.get(notification).should("not.exist");
  });

  it("renders correct classnames", () => {
    cy.mount(<InlineNotification tone="info" />);
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

  it("renders correct aria attributes", () => {
    cy.mount(<InlineNotification tone="info" aria-label="Close" />);
    cy.get(notificationCloseButton)
      .should("have.attr", "aria-label")
      .and("to.have.string", "Close");
  });
});
