/** Notification.tsx */
import type React from "react";
import { useRef, RefObject, forwardRef, ReactNode, useState } from "react";
import { Text } from "../Text";
import { IconButton } from "../Button/IconButton";
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
  /** Provide a description for "close" icon button that can be read by screen readers */
  "aria-label"?: string;
  /** By default, this value is "info". You can also provide an alternate */
  role?: "info" | "alert" | "success" | "warning";
  /** Footer content */
  footer?: ReactNode;
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
    footer,
    "data-id": dataId,
    "aria-label": ariaLabel = "Close",
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
      <div className={classes.header}>
        <div
          className={classes.icon}
          data-id={dataId ? `${dataId}--icon` : undefined}
        >
          {role === "info" && infoIcon}
          {role === "success" && successIcon}
          {role === "warning" && warningIcon}
          {role === "alert" && errorIcon}
        </div>

        {(title || subtitle) && (
          <div ref={contentRef} className={classes.textWrapper}>
            {title && (
              <Text
                elementType="span"
                vol={3}
                className={classes.title}
                data-id={dataId ? `${dataId}--title` : undefined}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                elementType="span"
                vol={2}
                className={classes.subtitle}
                data-id={dataId ? `${dataId}--subTitle` : undefined}
              >
                {subtitle}
              </Text>
            )}
          </div>
        )}
        {!hideCloseButton && (
          <IconButton
            className={classes.closeButton}
            data-id={dataId ? `${dataId}--closeButton` : undefined}
            onPress={handleCloseButtonClick}
            aria-label={ariaLabel}
          >
            {closeIcon}
          </IconButton>
        )}
      </div>
      <div className={classes.children}>{children}</div>
      {footer && <div className={classes.footer}>{footer}</div>}
    </div>
  );
}

/**
 * Notification displays various notifications.
 */
const _Notification = forwardRef(Notification);
export { _Notification as Notification };
