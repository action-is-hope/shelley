"use client";
import { ActionButton } from "../ActionButton";
import { DialogContext, DialogContextValue } from "./context";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import React, { useContext, useRef, ReactNode, Children } from "react";
import type { AriaDialogProps } from "@react-types/dialog";
import { useDialog } from "@react-aria/dialog";
import { st, classes } from "./dialog.st.css";
import Close from "../icons/Close";
import type { ComponentBase } from "../typings/shared-types";

export interface DialogProps
  extends AriaDialogProps,
    Omit<React.HTMLProps<HTMLElement>, "role" | "size" | "type" | "ref">,
    ComponentBase {
  /** The contents of the Dialog. */
  children: ReactNode;
  /** The size of the Dialog. Only applies to "modal" type Dialogs. */
  size?: "small" | "medium" | "large" | "fullscreen";
  /** Whether the Dialog is dismissable. See the [examples](#examples) for more details. */
  isDismissable?: boolean;
  /** Handler that is called when the 'x' button of a dismissable Dialog is clicked. */
  onDismiss?: () => void;
  /** An icon to use as your close icon. */
  closeIcon?: ReactNode;
  /** A aria-label for the close button. */
  dismissLabel?: string;
}

function Dialog(props: DialogProps, ref: React.Ref<HTMLElement>) {
  const { type = "modal", ...contextProps } =
    useContext(DialogContext) || ({} as DialogContextValue);
  const {
    children,
    className: classNameProp,
    isDismissable = contextProps.isDismissable,
    onDismiss = contextProps.onClose,
    size: sizeProp,
    closeIcon,
    dismissLabel = "Close dialog",
    "data-id": dataId,
    ...rest
  } = props;

  const size = type === "popup" ? sizeProp || "small" : sizeProp || "large";
  const localRef = useRef(null);

  const { dialogProps, titleProps } = useDialog(
    mergeProps(contextProps, props),
    localRef
  );

  return (
    <section
      {...dialogProps}
      className={st(classes.root, { size, isDismissable }, classNameProp)}
      ref={mergeRefs(ref, localRef)}
      data-id={dataId}
      /**
       * TabIndex is set to -1 by useDialog, this interferes
       * with react-focus-on auto-focusing. Adobe's FocusScope
       * likely supports this.
       */
      tabIndex={undefined}
      // Adobe libs don't add set aria-modal="true" they use aria-hidden as do we.
      {...rest}
    >
      <div className={classes.grid}>
        {Children.map(Children.toArray(children), (child) => {
          // We could do more here, add internal classes for the grid areas perhaps?
          if (React.isValidElement(child)) {
            return "data-title" in child.props
              ? React.cloneElement(child, {
                  ...titleProps,
                })
              : child;
          } else {
            return child;
          }
        })}
        {isDismissable && (
          <ActionButton
            isQuiet
            className={classes.closeButton}
            aria-label={dismissLabel}
            onPress={onDismiss}
            data-id={dataId ? `${dataId}--closeButton` : undefined}
          >
            {closeIcon || <Close />}
          </ActionButton>
        )}
      </div>
    </section>
  );
}

/**
 * Dialogs are windows containing contextual information, tasks, or workflows that appear over the user interface.
 * Depending on the kind of Dialog, further interactions may be blocked until the Dialog is acknowledged.
 */
const _Dialog = React.forwardRef(Dialog);
export { _Dialog as Dialog };
