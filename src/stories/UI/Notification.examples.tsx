import { Notification } from "../../indexLib";

export const InlineNotification = () => {
  return (
    <Notification
      role="alert"
      title="Notification title"
      subtitle="subtitle goes here"
      data-id="inline-notification"
    />
  );
};

export const InlineNotificationWithChildren = () => {
  return (
    <Notification
      role="alert"
      title="Notification title"
      subtitle="subtitle goes here"
      data-id="notification-with-children"
    >
      <p>Notification content goes here</p>
    </Notification>
  );
};
