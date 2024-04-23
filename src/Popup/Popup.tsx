"use client";
import React, { forwardRef, useRef, useEffect, useState, UIEvent } from "react";
import { FocusScope, FocusScopeProps } from "react-aria";
import type {
  ComponentBase,
  LoadMore,
  LoadingState,
} from "../typings/shared-types";
import { mergeRefs } from "@react-aria/utils";
import { usePopover, AriaPopoverProps, DismissButton } from "react-aria";
import { generateDataId } from "../utils";
import { st, classes } from "./popup.st.css";
import type { OverlayTriggerState } from "react-stately";

export interface PopupProps
  extends Omit<AriaPopoverProps, "popoverRef">,
    FocusScopeProps,
    ComponentBase,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Hide the arrow */
  hideArrow?: boolean;
  /**
   * Loadmore callback for when the scroller hits the bottom
   * OR when 'filling' up the available space.
   */
  onLoadMore?: LoadMore;
  /**
   * If set to 'idle' an attempt to call onLoadMore on opening
   * will be made until all available height is taken up and a
   * scrollbar is present.
   */
  loadingState?: LoadingState;
  /** State object see OverlayTriggerState */
  state: OverlayTriggerState | { isOpen: boolean; close: () => void };
  /** Specify an inline min-width for the popup. */
  width?: number;
}

function Popup(props: PopupProps, ref: React.Ref<HTMLDivElement>) {
  const {
    className: classNameProp,
    "data-id": dataId,
    hideArrow,
    onLoadMore,
    loadingState,
    state,
    width,
    //= AriaPopoverProps
    triggerRef,
    isNonModal,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
    arrowSize,
    boundaryElement,
    scrollRef,
    shouldUpdatePosition,
    maxHeight: maxHeightProp,
    arrowBoundaryOffset,
    placement: placementProp,
    containerPadding,
    offset,
    crossOffset,
    shouldFlip,
    //= FocusScopeProps,
    contain = false,
    restoreFocus = true,
    autoFocus = true,
    ...rest
  } = props;

  const internalRef = useRef<HTMLDivElement>(null);

  const { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      popoverRef: internalRef,
    },
    state as OverlayTriggerState
  );

  const [maxHeight, setMaxHeight] = useState<number>(0);

  /** Basic 'if we get close to bottom then loadMore' */
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const nearBottom =
      target.scrollHeight - target.scrollTop + 50 > target.clientHeight;
    if (nearBottom) onLoadMore && onLoadMore();
    props.onScroll && props.onScroll(e);
  };

  useEffect(() => {
    const cssValue = popoverProps?.style?.maxHeight;
    typeof cssValue === "number" && setMaxHeight(cssValue);
  }, [popoverProps]);

  useEffect(() => {
    /**
     * fix for issue where labels and buttons under Popup receive pointer events
     * when selecting items. Here we just add a class so we know when popup is open
     * and use the class to set pointer events to none in the popup styles.
     */
    state.isOpen === true && document.body.classList.add("hasPopup");
    return () => {
      setTimeout(() => document.body.classList.remove("hasPopup"), 0);
    };
  }, [state.isOpen]);

  /**
   * Ensure enough is loaded to fill up all available space
   * offered by Popup's max-height otherwise users won't be
   * able to 'scroll to the bottom' stopping loadMore from
   * firing onScroll.
   */
  useEffect(() => {
    const scrollHeight = internalRef?.current?.scrollHeight;
    if (scrollHeight && maxHeight)
      if (scrollHeight < maxHeight && loadingState === "idle") {
        onLoadMore && onLoadMore();
      }
  }, [loadingState, maxHeight, onLoadMore]);

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the menu is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope {...{ contain, restoreFocus, autoFocus }}>
      {!isNonModal && (
        <div
          {...underlayProps}
          className={classes.underlay}
          data-id={generateDataId(dataId, "underlay")}
        />
      )}
      <div
        className={st(classes.root, classNameProp)}
        {...popoverProps}
        style={{ ...popoverProps?.style, minWidth: width }}
        ref={ref ? mergeRefs(ref, internalRef) : internalRef}
        data-id={dataId}
        {...rest}
      >
        {!hideArrow && (
          <svg
            {...arrowProps}
            className={st(classes.arrow, {
              placement,
            })}
            data-id={generateDataId(dataId, "arrow")}
            data-placement={placement}
          >
            <path d="M0 0,L6 6,L12 0" />
          </svg>
        )}

        {!isNonModal && <DismissButton onDismiss={() => state.close()} />}
        {/* Seperate scroll div to keep the arrow visible. */}
        <div
          className={classes.scroller}
          data-id={generateDataId(dataId, "scroller")}
          onScroll={handleScroll}
          ref={(scrollRef as React.Ref<HTMLDivElement>) || undefined}
          style={{ maxHeight: popoverProps?.style?.maxHeight }}
        >
          {props.children}
        </div>
        <DismissButton onDismiss={() => state.close()} />
      </div>
    </FocusScope>
  );
}
Popup.displayName = "Popup";

/**
 * A Popup can be used to display some content on top of another; used internally in components like MenuTrigger and DialogTrigger.
 */
const _Popup = forwardRef(Popup);
export { _Popup as Popup };
