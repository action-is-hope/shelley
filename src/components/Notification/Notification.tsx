import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import classnames from "classnames";
import { FocusOn } from "react-focus-on";
import style from "./notification.st.css";
import { NotificationProps } from "./";
import PropTypes from "prop-types";
import Expire from "react-expire";

export function wrapEvent(theirHandler, ourHandler) {
  return event => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}

const Notification = React.forwardRef(
  (
    {
      className,
      children,
      contentClassName,
      entryNode = document.body,
      focusOnProps: FocusOnPropsInput,
      initialFocusRef,
      isOpen,
      // onClick,
      onDismiss,
      // onKeyDown,
      // onMouseDown,
      theme,
      transitionProps: transitionPropsInput,
      autoHideDuration = 0,
      ...rest
    }: NotificationProps,
    forwardedRef?: React.Ref<HTMLDivElement>
  ) => {
    const activateFocusLock = React.useCallback(() => {
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
      }
    }, [initialFocusRef]);
    // const mouseDownTarget = React.useRef(null);
    /* TransitionProps props */
    const transitionProps = {
      unmountOnExit: true,
      ...transitionPropsInput
    };
    /* FocusOn props */
    const focusOnProps = {
      autoFocus: true,
      onActivation: activateFocusLock,
      returnFocus: true,
      // onEscapeKey: (event: Event) => onDismiss && onDismiss(event),
      ...FocusOnPropsInput,
      /**
       * If the notification is persistant in the DOM via `unmountOnExit: false` then
       * disable the isolation lock else everything else will have aria-hidden="true".
       *
       * @todo: Bug: noIsolation doesn't seem to work as described...
       * https://codesandbox.io/s/focus-on-lvw6p?fontsize=14&hidenavigation=1&theme=dark
       * Possible work around to use shards?
       */
      // noIsolation: !transitionProps.unmountOnExit
      noIsolation: true,
      shards: [document.body]
    };

    return ReactDOM.createPortal(
      <Expire until={isOpen ? autoHideDuration : 0}>
        {(expired: boolean) => {
          expired && onDismiss();
          const open = !expired && isOpen;
          return (
            <CSSTransition in={open} {...transitionProps}>
              <div className={theme}>
                <div {...style(classnames(style.root, className), {}, rest)}>
                  <FocusOn {...focusOnProps}>
                    <div
                      aria-modal="true"
                      className={classnames(
                        style.notification,
                        contentClassName
                      )}
                      ref={forwardedRef}
                      role="notification" //nope
                      // onKeyDown={onKeyDown}
                      // onMouseDown={wrapEvent(onMouseDown, event => {
                      //   mouseDownTarget.current = event.target;
                      // })}
                    >
                      {children}
                    </div>
                  </FocusOn>
                </div>
              </div>
            </CSSTransition>
          );
        }}
      </Expire>,
      entryNode
    );
  }
);

Notification.displayName = "Notification";
Notification.propTypes = {
  style: PropTypes.object
};

export default Notification;
export const proptype = Notification.propTypes;
