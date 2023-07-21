import { Notification } from "../../indexLib";

export const InlineAlertNotification = () => {
  return (
    <Notification
      role="alert"
      title="Alert notification title"
      subtitle="Subtitle goes here"
      data-id="inline-alert-notification"
    />
  );
};

export const InlineInfoNotification = () => {
  return (
    <Notification
      role="info"
      title="Info notification title"
      subtitle="Subtitle goes here"
      data-id="inline-info-notification"
    />
  );
};

export const InlineSuccessNotification = () => {
  return (
    <Notification
      role="success"
      title="Success otification title"
      subtitle="Subtitle goes here"
      data-id="inline-success-notification"
    />
  );
};

export const InlineWarningNotification = () => {
  return (
    <Notification
      role="warning"
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
    >
      <p>Notification content goes here</p>
    </Notification>
  );
};
