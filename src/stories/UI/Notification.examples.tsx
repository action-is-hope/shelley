import { Notification } from "../../indexLib";

export const InlineNotification = () => {
  return (
    <Notification
      role="alert"
      title="Notification title"
      subtitle="subtitle goes here"
    />
  );
};

export const InlineNotificationWithChildren = () => {
  return (
    <Notification
      role="alert"
      title="Notification title"
      subtitle="subtitle goes here"
    >
      <p>Notification content goes here</p>
    </Notification>
  );
};
