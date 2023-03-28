import type { TransitionProps } from "react-transition-group/Transition";
import type { ReactFocusOnProps } from "react-focus-on/dist/es5/types";
import React, { useRef, forwardRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { FocusOn } from "react-focus-on";
import { st, classes } from "./modal.st.css";

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

export type TransitionType = "up" | "zoom" | false;

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
  /** Disables the FocusLock */
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
  onDismiss?: (arg: any) => void;
  // onDismiss?(event: React.MouseEvent | React.KeyboardEvent): void;
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
  variant?: "fixed" | string;
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
  // @todo allowPinchZoom?: boolean;
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
    transitionProps: transitionPropsInput,
    variant = "fixed",
    transition = "zoom",
    disableFocusLock,
    disableEscapeKey,
    disableBackdropClick,
    "data-id": dataId,
    // state,
    ...rest
  } = props;
  const mouseDownTarget = useRef<EventTarget | null>(null);

  const activateFocusLock = React.useCallback(() => {
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [initialFocusRef]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    !disableBackdropClick && onDismiss(event);
    if (mouseDownTarget.current === event.target) {
      event.stopPropagation();
      !disableBackdropClick && onDismiss(event);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    mouseDownTarget.current = event.target;
  };

  const transitionProps = {
    unmountOnExit: true,
    ...transitionPropsInput,
  };

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
      !disableEscapeKey && onDismiss(event);
      focusOnPropsInput?.onEscapeKey && focusOnPropsInput?.onEscapeKey(event);
    },
    onActivation: activateFocusLock,
    // onClickOutside: () => console.log("works - yes"),
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
              variant,
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
