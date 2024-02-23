import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Notification,
  NotificationProps,
  P,
} from "../../indexLib";

export const NotificationPropsTable = (props: NotificationProps) => {
  <Notification {...props} />;
};

export const InlineAlertNotification = () => {
  return (
    <Notification
      tone="alert"
      title="Alert notification title"
      titleVol={3}
      subtitle="Subtitle goes here"
      data-id="inline-alert-notification"
    />
  );
};

export const InlineInfoNotification = () => {
  return (
    <Notification
      tone="info"
      title="Info notification title"
      subtitle="Subtitle goes here"
      data-id="inline-info-notification"
    />
  );
};

export const InlineSuccessNotification = () => {
  return (
    <Notification
      tone="success"
      title="Success notification title"
      subtitle="Subtitle goes here"
      data-id="inline-success-notification"
    />
  );
};

export const InlineWarningNotification = () => {
  return (
    <Notification
      tone="warning"
      title="Warning notification title"
      subtitle="Subtitle goes here"
      data-id="inline-warning-notification"
    />
  );
};

export const InlineNotificationHideCloseButton = () => {
  return (
    <Notification
      hideCloseButton
      title="Notification title"
      subtitle="Subtitle goes here"
      data-id="inline-notification"
    />
  );
};

export const InlineNotificationWithChildren = () => {
  return (
    <Notification
      title="Notification title"
      subtitle="Subtitle goes here"
      data-id="notification-with-children"
      aria-label="Close button"
    >
      <P vol={2}>Notification content goes here</P>
    </Notification>
  );
};

export const InlineNotificationWithFooter = () => {
  const [isOpen, setIsOpen] = useState(true);

  return isOpen ? (
    <Notification
      title="Notification title"
      subtitle="Subtitle goes here"
      hideCloseButton
      footer={
        <ButtonGroup>
          <Button
            onClick={() => setIsOpen(false)}
            tone="contrast"
            variant="quiet"
          >
            Secondary
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            tone="contrast"
            variant="primary"
          >
            Primary
          </Button>
        </ButtonGroup>
      }
    >
      <P vol={2}>Notification content goes here</P>
    </Notification>
  ) : (
    <></>
  );
};
