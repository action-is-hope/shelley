"use client";
import type { TransitionProps } from "react-transition-group/Transition";
import type { ReactFocusOnProps } from "react-focus-on/dist/es5/types";
import React, { useRef, forwardRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { FocusOn } from "react-focus-on";
import { st, classes } from "./modal.st.css";
import { mergeProps } from "react-aria";

export function composeEventHandlers(
  theirHandler: React.MouseEventHandler<HTMLDivElement>,
  ourHandler: React.MouseEventHandler<HTMLDivElement>
) {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}

export type TransitionType = "up" | "zoom" | string | false;

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls whether the dialog is open or not. */
  isOpen?: boolean;
  /** Accepts any renderable content. */
  children?: React.ReactNode;
  /** Add a class to the content div. */
  contentClassName?: string;
  /** Disables the backdrop click dismiss */
  disableBackdropClick?: boolean;
  /** Disables the EscapeKey dismiss */
  disableEscapeKey?: boolean;
  /** Disables the FocusLock - shortcut to focusOnProps */
  disableFocusLock?: boolean;
  /** Props for the internal `FocusOn` component see - https://github.com/theKashey/react-focus-on#api */
  focusOnProps?: Pick<
    ReactFocusOnProps,
    Exclude<keyof ReactFocusOnProps, "children">
  >;
  /**
   * Set the initial focused element via a ref. By default the
   * 'first focusable element' will receive focus when the dialog
   * opens.
   */
  initialFocusRef?:
    | React.RefObject<HTMLButtonElement>
    | React.RefObject<HTMLInputElement>;
  /** Fires when the backdrop is clicked. */
  onBackdropClick?: () => void;
  /**
   * This function is called whenever the user hits "Escape" or clicks outside
   * the dialog. _It's important to close the dialog `onDismiss`_.
   *
   * The only time you shouldn't close the dialog on dismiss is when the dialog
   * requires a choice and none of them are "cancel". For example, perhaps two
   * records need to be merged and the user needs to pick the surviving record.
   * Neither choice is less destructive than the other, so in these cases you
   * may want to alert the user they need to a make a choice on dismiss instead
   * of closing the dialog.
   */
  onDismiss?: () => void;
  /**
   * The selector of the element that the menu should render inside of.
   * @default 'body'
   */
  portalSelector?: string | false;
  /**
   * Type of transition
   * @default "up"
   */
  transition?: TransitionType;
  /** Props for the internal `CSSTransition` component see - https://reactcommunity.org/react-transition-group/css-transition */
  transitionProps?: Omit<TransitionProps, "addEndListener">;
  variant?: "fixed" | string | false;
  disableModalBackdropBlur?: boolean;
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
}

function Modal(props: ModalProps, ref?: React.Ref<HTMLDivElement>) {
  const {
    className: classNameProp,
    children,
    contentClassName,
    portalSelector = "body",
    focusOnProps: focusOnPropsInput,
    initialFocusRef,
    isOpen,
    onBackdropClick = () => null,
    onDismiss = () => null,
    onMouseDown = () => null,
    transitionProps: transitionPropsFromProps,
    variant = "fixed",
    transition = "zoom",
    disableFocusLock,
    disableEscapeKey,
    disableBackdropClick,
    disableModalBackdropBlur,
    "data-id": dataId,
    ...rest
  } = props;
  const mouseDownTarget = useRef<EventTarget | null>(null);

  const activateFocusLock = React.useCallback(() => {
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [initialFocusRef]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    !disableBackdropClick && onDismiss();
    if (mouseDownTarget.current === event.target) {
      event.stopPropagation();
      !disableBackdropClick && onDismiss();
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    mouseDownTarget.current = event.target;
  };

  const transitionPropsDefault = {
    unmountOnExit: true,
    ...transitionPropsFromProps,
    onEntering: () => {
      /* eslint-disable  @typescript-eslint/no-unsafe-call */
      typeof transitionPropsFromProps?.onEntering === "function" &&
        transitionPropsFromProps?.onEntering();
      !disableModalBackdropBlur &&
        document.body.classList.add(classes.blurBackground);
    },
    onExiting: () => {
      /* eslint-disable  @typescript-eslint/no-unsafe-call */
      typeof transitionPropsFromProps?.onExiting === "function" &&
        transitionPropsFromProps?.onExiting();
      !disableModalBackdropBlur &&
        document.body.classList.remove(classes.blurBackground);
    },
  };

  const transitionProps = transitionPropsFromProps
    ? mergeProps(transitionPropsDefault, transitionPropsFromProps)
    : transitionPropsDefault;

  const focusOnProps = {
    focusLock: !disableFocusLock,
    /**
     * If the dialog is persistent in the DOM via `unmountOnExit: false` then
     * disable the isolation lock else everything else will have aria-hidden="true".
     * noIsolation cannot be dynamically toggled with isOpen.
     * Possible work around to use shards?
     */
    noIsolation: !transitionProps.unmountOnExit,
    ...focusOnPropsInput,
    onEscapeKey: (event: Event) => {
      !disableEscapeKey && onDismiss();
      focusOnPropsInput?.onEscapeKey && focusOnPropsInput?.onEscapeKey(event);
    },
    onActivation: activateFocusLock,
  };

  const nodeRef = useRef(null);
  const modal = (
    <CSSTransition
      in={isOpen}
      timeout={190}
      {...transitionProps}
      nodeRef={nodeRef}
    >
      <>
        <div
          className={st(
            classes.root,
            {
              variant: variant || undefined,
              transition: transition || undefined,
            },
            classNameProp
          )}
          ref={nodeRef}
          data-id={dataId}
        >
          <FocusOn {...focusOnProps}>
            <div
              aria-hidden="true"
              className={classes.backdrop}
              data-id={dataId ? `${dataId}-backdrop` : undefined}
              onClick={composeEventHandlers(
                onBackdropClick,
                handleBackdropClick
              )}
            ></div>
            <div
              data-id={dataId ? `${dataId}-content` : undefined}
              className={st(classes.content, contentClassName)}
              onMouseDown={composeEventHandlers(onMouseDown, handleMouseDown)}
              ref={ref}
              {...rest}
            >
              {children}
            </div>
          </FocusOn>
        </div>
      </>
    </CSSTransition>
  );
  // If portalSelector then render inside portal elso render inline.
  // @todo check element exists.
  return portalSelector
    ? createPortal(modal, document.querySelector(portalSelector) as HTMLElement)
    : modal;
}

/**
 * Modal provides the structure for a Modal including transitions and
 * focus locks required to keep a user focused inside active dialogs without
 * being able to 'wonder about' behind the backdrop.
 */

const _Modal = forwardRef(Modal);
export { _Modal as Modal };
