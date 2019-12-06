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
      allowPinchZoom = false,
      className,
      children,
      contentClassName,
      entryNode = document.body,
      initialFocusRef,
      isOpen,
      onClick,
      onDismiss,
      onKeyDown,
      onMouseDown,
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
    return ReactDOM.createPortal(
      <CSSTransition in={isOpen} timeout={300} unmountOnExit>
        <div {...style(classnames(style.root, className), {}, rest)}>
          <FocusOn
            allowPinchZoom={allowPinchZoom}
            autoFocus
            onActivation={activateFocusLock}
            returnFocus
          >
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
              onKeyDown={wrapEvent(onKeyDown, event => {
                if (event.key === "Escape") {
                  event.stopPropagation();
                  onDismiss && onDismiss(event);
                }
              })}
              onMouseDown={wrapEvent(onMouseDown, event => {
                mouseDownTarget.current = event.target;
              })}
            >
              {children}
            </div>
          </FocusOn>
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
