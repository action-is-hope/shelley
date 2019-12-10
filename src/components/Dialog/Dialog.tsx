import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import classnames from "classnames";
import { FocusOn } from "react-focus-on";
import style from "./dialog.st.css";
import { DialogProps } from "./";
import PropTypes from "prop-types";

export function wrapEvent(theirHandler, ourHandler) {
  return event => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}

const Dialog = React.forwardRef(
  (
    {
      className,
      children,
      contentClassName,
      entryNode = document.body,
      focusOnProps: FocusOnPropsInput,
      initialFocusRef,
      isOpen,
      onClick,
      onDismiss,
      onKeyDown,
      onMouseDown,
      theme,
      transitionProps: transitionPropsInput,
      ...rest
    }: DialogProps,
    forwardedRef?: React.Ref<HTMLDivElement>
  ) => {
    const activateFocusLock = React.useCallback(() => {
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
      }
    }, [initialFocusRef]);
    const mouseDownTarget = React.useRef(null);
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
      onEscapeKey: (event: Event) => onDismiss && onDismiss(event),
      ...FocusOnPropsInput,
      /**
       * If the dialog is persistant in the DOM via `unmountOnExit: false` then
       * disable the isolation lock else everything else will have aria-hidden="true".
       *
       * @todo: Bug: noIsolation doesn't seem to work as described...
       * https://codesandbox.io/s/focus-on-lvw6p?fontsize=14&hidenavigation=1&theme=dark
       * Possible work around to use shards?
       */
      noIsolation: !transitionProps.unmountOnExit
    };

    return ReactDOM.createPortal(
      <CSSTransition in={isOpen} {...transitionProps}>
        <div className={theme}>
          <div {...style(classnames(style.root, className), {}, rest)}>
            <FocusOn {...focusOnProps}>
              <div
                aria-hidden="true"
                className={style.background}
                onClick={wrapEvent(onClick, event => {
                  onDismiss && onDismiss(event);
                  if (mouseDownTarget.current === event.target) {
                    event.stopPropagation();
                    onDismiss && onDismiss(event);
                  }
                })}
              ></div>
              <div
                aria-modal="true"
                className={classnames(style.content, contentClassName)}
                ref={forwardedRef}
                role="dialog"
                onKeyDown={onKeyDown}
                onMouseDown={wrapEvent(onMouseDown, event => {
                  mouseDownTarget.current = event.target;
                })}
              >
                {children}
              </div>
            </FocusOn>
          </div>
        </div>
      </CSSTransition>,
      entryNode
    );
  }
);

Dialog.displayName = "Dialog";
Dialog.propTypes = {
  style: PropTypes.object
};

export default Dialog;
export const proptype = Dialog.propTypes;
