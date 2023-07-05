import React, { useRef, RefObject, forwardRef, ReactNode } from "react";
import { Text } from "../Text";
import { IconButton } from "../IconButton/IconButton";
import CloseIcon from "../icons/Close";

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
  /**
   * By default, this value is "status". You can also provide an alternate
   * role if it makes sense from the accessibility-side.
   */
  role: "alert" | "info" | "success" | "warning" | "error";
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
    role,
    hideCloseButton,
    closeIcon = <CloseIcon />,
    "data-id": dataId,
    ...rest
  } = props;
  // const ref: RefObject<HTMLDivElement> = useRef(null);
  const contentRef: RefObject<HTMLDivElement> = useRef(null);
  return (
    <div
      ref={ref}
      className={st(classes.root, { role }, className)}
      role={role}
      data-id={dataId}
      {...rest}
    >
      <div className={st(classes.details)}>
        <div className={st(classes.icon)}></div>
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
          data-id={dataId ? `${dataId}--closeButton` : undefined}
          className={classes.closeButton}
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
