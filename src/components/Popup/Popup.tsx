/** Popup.tsx */
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
import { mergeProps, mergeRefs } from "@react-aria/utils";
import {
  useOverlay,
  DismissButton,
  useOverlayPosition,
  AriaOverlayProps,
} from "react-aria";

/* = Style API. */
import { st, classes } from "./popup.st.css";
import { FocusOn } from "react-focus-on";
import type { LoadMore, LoadingState } from "../types";

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

  //
  onLoadMore?: LoadMore;
  loadingState?: LoadingState;
  width?: number;
}

export const Popup = forwardRef(
  (props: PopupProps, ref?: Ref<HTMLDivElement>) => {
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

    const localRef = useRef<HTMLDivElement>(null);
    const { overlayProps } = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable,
        isKeyboardDismissDisabled,
        shouldCloseOnBlur,
      },
      localRef
    );

    // Get MenuPopup positioning props relative to the trigger
    const {
      overlayProps: overlayPositionProps,
      arrowProps,
      placement,
    } = useOverlayPosition({
      targetRef: triggerRef as RefObject<HTMLElement>,
      overlayRef: localRef as RefObject<HTMLElement>,
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

    /**
     * Ensure enough is loaded to fill up all available space
     * offered by Popup's max-height otherwise users won't be
     * able to 'scroll to the bottom' stopping loadMore from
     * firing onScroll.
     */
    useEffect(() => {
      const scrollHeight = localRef?.current?.scrollHeight;
      if (scrollHeight && maxHeight)
        if (scrollHeight < maxHeight && loadingState === "idle") {
          onLoadMore && onLoadMore();
        }
    }, [loadingState, maxHeight, onLoadMore]);

    // Wrap in <FocusOn> so that focus is restored back to the
    // trigger when the menu is closed. In addition, add hidden
    // <DismissButton> components at the start and end of the list
    // to allow screen reader users to dismiss the popup easily.
    return isOpen ? (
      <FocusOn
        preventScrollOnFocus={true}
        returnFocus={{ preventScroll: true }}
        {...focusOnProps}
      >
        <div
          className={st(classes.root, classNameProp)}
          {...mergeProps(overlayProps, overlayPositionProps, rest)}
          style={{ ...overlayPositionProps?.style, minWidth: width }}
          ref={ref ? mergeRefs(ref, localRef) : localRef}
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
    ) : (
      <></>
    );
  }
);
Popup.displayName = "Popup";

export default Popup;
