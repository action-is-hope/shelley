"use client";
import React, {
  Ref,
  forwardRef,
  RefObject,
  useRef,
  useEffect,
  useState,
  UIEvent,
} from "react";
import type { ReactFocusOnProps } from "react-focus-on/dist/es5/types";
import type { PositionProps } from "@react-types/overlays";
import type { LoadMore, LoadingState } from "../typings/shared-types";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import {
  useOverlay,
  DismissButton,
  useOverlayPosition,
  AriaOverlayProps,
} from "react-aria";
import { st, classes } from "./popup.st.css";
import { FocusOn } from "react-focus-on";

export interface PopupProps
  extends AriaOverlayProps,
    PositionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * The ref for the element which the popup positions itself with respect to.
   */
  triggerRef: Ref<HTMLElement>;
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
  /** Props for the internal `FocusOn` component see - https://github.com/theKashey/react-focus-on#api */
  focusOnProps?: Pick<
    ReactFocusOnProps,
    Exclude<keyof ReactFocusOnProps, "children">
  >;
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
  /** Specify a width for the popup as in ComboBox.*/
  width?: number;
}

function Popup(props: PopupProps, ref: React.Ref<HTMLDivElement>) {
  const {
    className: classNameProp,
    triggerRef,
    hideArrow,
    isOpen,
    isDismissable = true,
    isKeyboardDismissDisabled,
    onClose,
    shouldCloseOnBlur,
    placement: placementProp,
    containerPadding,
    offset,
    crossOffset,
    shouldFlip,
    focusOnProps,
    onLoadMore,
    loadingState,
    "data-id": dataId,
    width,
    ...rest
  } = props;

  const internalRef = useRef<HTMLDivElement>(null);
  const { overlayProps } = useOverlay(
    {
      onClose,
      isOpen,
      isDismissable,
      isKeyboardDismissDisabled,
      shouldCloseOnBlur,
    },
    internalRef
  );

  // Get MenuPopup positioning props relative to the trigger
  const {
    overlayProps: overlayPositionProps,
    arrowProps,
    placement,
  } = useOverlayPosition({
    targetRef: triggerRef as RefObject<HTMLElement>,
    overlayRef: internalRef as RefObject<HTMLElement>,
    placement: placementProp,
    containerPadding,
    offset,
    crossOffset,
    shouldFlip,
  });

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
    const cssValue = overlayPositionProps?.style?.maxHeight;
    typeof cssValue === "number" && setMaxHeight(cssValue);
  }, [overlayPositionProps]);

  useEffect(() => {
    /**
     * fix for issue where labels and buttons under Popup receive pointer events
     * when selecting items. Here we just add a class so we know when popup is open
     * and use the class to set pointer events to none in the popup styles.
     */
    isOpen === true && document.body.classList.add("hasPopup");
    return () => {
      setTimeout(() => document.body.classList.remove("hasPopup"), 0);
    };
  }, [isOpen]);

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

  // Wrap in <FocusOn> so that focus is restored back to the
  // trigger when the menu is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusOn
      preventScrollOnFocus={true}
      returnFocus={{ preventScroll: true }}
      {...focusOnProps}
    >
      <div
        className={st(classes.root, classNameProp)}
        {...mergeProps(overlayProps, overlayPositionProps, rest)}
        style={{ ...overlayPositionProps?.style, minWidth: width }}
        ref={ref ? mergeRefs(ref, internalRef) : internalRef}
        data-id={dataId}
      >
        {!hideArrow && (
          <svg
            {...arrowProps}
            className={st(classes.arrow, {
              placement,
            })}
            data-id={dataId ? `${dataId}-arrow` : undefined}
            data-placement={placement}
          >
            <path d="M0 0,L6 6,L12 0" />
          </svg>
        )}

        <DismissButton onDismiss={props.onClose} />
        {/* Seperate scroll div to keep the arrow visible. */}
        <div
          className={classes.scroller}
          style={{ maxHeight: overlayPositionProps?.style?.maxHeight }}
          onScroll={handleScroll}
          data-id={dataId ? `${dataId}-scroller` : undefined}
        >
          {props.children}
        </div>
        <DismissButton onDismiss={props.onClose} />
      </div>
    </FocusOn>
  );
}
Popup.displayName = "Popup";

/**
 * A Popup can be used to display some content on top of another; used internally in components like MenuTrigger and DialogTrigger.
 */
const _Popup = forwardRef(Popup);
export { _Popup as Popup };
