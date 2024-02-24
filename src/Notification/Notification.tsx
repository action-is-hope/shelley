"use client";
import type React from "react";
import { useRef, RefObject, forwardRef, ReactNode, useState } from "react";
import { Text, TextProps } from "../Text";
import { IconButton, IconButtonProps } from "../Button/IconButton";
import CloseIcon from "../icons/Close";

import InfoIcon from "../icons/Info";
import SuccessIcon from "../icons/Success";
import WarningIcon from "../icons/Warning";
import { default as DangerIcon } from "../icons/Error";

import { st, classes } from "./notification.st.css";
import type { Tone } from "../typings/shared-types";

function calculateIconButtonVol(titleVol: number): IconButtonProps["vol"] {
  // Ensure titleVol is within the expected range 1-10
  if (titleVol < 1 || titleVol > 10) {
    throw new Error("titleVol must be between 1 and 10");
  }

  // Derived iconButtonVol is titleVol - 1
  let iconButtonVol = titleVol - 1;

  // If on the lower limit, set to 1
  if (iconButtonVol < 1) {
    iconButtonVol = 1;
  }
  // If on the upper limit or beyond, set to 6
  else if (iconButtonVol >= 6) {
    iconButtonVol = 6;
  }

  return iconButtonVol as IconButtonProps["vol"];
}
export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to be rendered inside the component. */
  children?: ReactNode;
  /** Additional class name to be provided for the root element. */
  className?: string;
  /** Whether the Dialog is dismissable. See the [examples](#examples) for more details. */
  isDismissable?: boolean;
  /** Should the Icon be visible */
  hideIcon?: boolean;
  /** Optional title  */
  title?: string;
  /** Title Volume */
  titleVol?: TextProps["vol"];
  /** Optional subtitle  */
  subtitle?: string;
  /** Optional close icon  */
  closeIcon?: ReactNode;
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
  /** Provide a description for "close" icon button that can be read by screen readers */
  "aria-label"?: string;
  /** By default, this value is "status" unless a tone of `alert` is set. */
  role?: "status" | "alert" | "alertdialog" | "log";
  /** Custom icon */
  icon?: ReactNode;
  /** The tone, a tone of alert will yeild a role of `alert` */
  tone?: Tone;
  /** Footer content */
  footer?: ReactNode;
  /** Swap out the info icon */
  infoIcon?: ReactNode;
  /** Swap out the success icon */
  successIcon?: ReactNode;
  /** Swap out the warning icon */
  warningIcon?: ReactNode;
  /** Swap out the error icon */
  dangerIcon?: ReactNode;
}

function Notification(
  props: NotificationProps,
  ref?: React.Ref<HTMLDivElement>
) {
  const dataId = props["data-id"];
  const iconDataId = props["data-id"] ? `${props["data-id"]}--icon` : undefined;

  const {
    className,
    children,
    title,
    titleVol = 3,
    subtitle,
    role,
    tone = "lead",
    isDismissable,
    hideIcon = false,
    footer,
    icon,
    "aria-label": ariaLabel = "Close",
    closeIcon = <CloseIcon data-id={iconDataId} />,
    infoIcon = <InfoIcon data-id={iconDataId} />,
    successIcon = <SuccessIcon data-id={iconDataId} />,
    warningIcon = <WarningIcon data-id={iconDataId} />,
    dangerIcon = <DangerIcon data-id={iconDataId} />,
    ...rest
  } = props;
  const contentRef: RefObject<HTMLDivElement> = useRef(null);

  const [isOpen, setIsOpen] = useState(true);

  function handleCloseButtonClick() {
    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  const toneToRoleMap: {
    [key: string]: ReactNode;
  } = {
    lead: infoIcon,
    support: infoIcon,
    info: infoIcon,
    success: successIcon,
    warning: warningIcon,
    alert: dangerIcon,
    light: infoIcon,
    dark: infoIcon,
    contrast: infoIcon,
  };

  const iconToUse: ReactNode | undefined = tone
    ? toneToRoleMap?.[tone]
    : undefined;

  const roleToUse = role || tone === "alert" ? "alert" : "status";

  return (
    <div
      ref={ref}
      className={st(classes.root, { tone: tone || undefined }, className)}
      role={roleToUse}
      data-id={dataId}
      {...rest}
    >
      {(title || subtitle || isDismissable) && (
        <div className={classes.header}>
          {(title || subtitle) && (
            <div ref={contentRef} className={classes.textWrapper}>
              {title && (
                <Text
                  elementType="span"
                  startAdornment={icon || iconToUse}
                  vol={titleVol}
                  className={classes.title}
                  data-id={dataId ? `${dataId}--title` : undefined}
                >
                  {title}
                  {subtitle && (
                    <span
                      className={classes.subtitle}
                      data-id={dataId ? `${dataId}--subTitle` : undefined}
                    >
                      {subtitle}
                    </span>
                  )}
                </Text>
              )}
            </div>
          )}
          {isDismissable && (
            <IconButton
              className={classes.closeButton}
              data-id={dataId ? `${dataId}--closeButton` : undefined}
              onPress={handleCloseButtonClick}
              aria-label={ariaLabel}
              vol={titleVol && calculateIconButtonVol(titleVol)}
            >
              {closeIcon}
            </IconButton>
          )}
        </div>
      )}
      {children && <div className={classes.children}>{children}</div>}
      {footer && <div className={classes.footer}>{footer}</div>}
    </div>
  );
}

/**
 * Notification displays various notifications.
 */
const _Notification = forwardRef(Notification);
export { _Notification as Notification };
