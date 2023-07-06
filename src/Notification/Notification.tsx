import React, {
  useRef,
  RefObject,
  forwardRef,
  ReactNode,
  useState,
} from "react";
import { Text } from "../Text";
import { IconButton } from "../IconButton/IconButton";
import CloseIcon from "../icons/Close";

import InfoIcon from "../icons/Info";
import SuccessIcon from "../icons/Success";
import WarningIcon from "../icons/Warning";
import ErrorIcon from "../icons/Error";

import { st, classes } from "./notification.st.css";

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to be rendered inside the component. */
  children?: ReactNode;
  /** Additional class name to be provided for the root element. */
  className?: string;
  /** Should the close button be visible */
  hideCloseButton?: boolean;
  /** Optional title  */
  title?: string;
  /** Optional subtitle  */
  subtitle?: string;
  /** Optional close icon  */
  closeIcon?: ReactNode;
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
  /** By default, this value is "info". You can also provide an alternate */
  role?: "info" | "alert" | "success" | "warning";
  /** Icons */
  infoIcon?: ReactNode;
  successIcon?: ReactNode;
  warningIcon?: ReactNode;
  errorIcon?: ReactNode;
}

function Notification(
  props: NotificationProps,
  ref?: React.Ref<HTMLDivElement>
) {
  const {
    className,
    children,
    title,
    subtitle,
    role = "info",
    hideCloseButton,
    closeIcon = <CloseIcon />,
    infoIcon = <InfoIcon />,
    successIcon = <SuccessIcon />,
    warningIcon = <WarningIcon />,
    errorIcon = <ErrorIcon />,
    "data-id": dataId,
    ...rest
  } = props;
  // const ref: RefObject<HTMLDivElement> = useRef(null);
  const contentRef: RefObject<HTMLDivElement> = useRef(null);

  // on press close button - set is open to false and hide the notification
  const [isOpen, setIsOpen] = useState(true);

  function handleCloseButtonClick() {
    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={st(classes.root, { role }, className)}
      role={role}
      data-id={dataId}
      {...rest}
    >
      <div className={st(classes.details)}>
        <div className={st(classes.icon)}>
          {role === "info" && infoIcon}
          {role === "success" && successIcon}
          {role === "warning" && warningIcon}
          {role === "alert" && errorIcon}
        </div>

        <div ref={contentRef} className={st(classes.textWrapper)}>
          {title && (
            <Text
              as="span"
              vol={3}
              className={st(classes.title)}
              data-id={dataId ? `${dataId}--title` : undefined}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              as="span"
              vol={2}
              className={st(classes.subtitle)}
              data-id={dataId ? `${dataId}--subTitle` : undefined}
            >
              {subtitle}
            </Text>
          )}
          {children}
        </div>
      </div>
      {!hideCloseButton && (
        <IconButton
          className={classes.closeButton}
          data-id={dataId ? `${dataId}--closeButton` : undefined}
          onPress={handleCloseButtonClick}
        >
          {closeIcon}
        </IconButton>
      )}
    </div>
  );
}

/**
 * Notification displays various notifications.
 */
const _Notification = forwardRef(Notification);
export { _Notification as Notification };
