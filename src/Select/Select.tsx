"use client";
import React, {
  ReactNode,
  forwardRef,
  useRef,
  useState,
  useEffect,
  Ref,
  ReactElement,
} from "react";
import { Field } from "../Field/Field";
import type { LoadMoreProps } from "../typings/shared-types";
import type { FieldProps } from "../Field/Field";
import type { PositionProps } from "@react-types/overlays";
import type { CollectionChildren } from "@react-types/shared/src/collections";
import { useSelectState } from "react-stately";
import { HiddenSelect, useSelect, AriaSelectOptions } from "react-aria";
import { mergeRefs } from "@react-aria/utils";
import { Portal } from "../Portal";
import { Popup } from "../Popup";
import { Button } from "../Button";
import { ListBox } from "../ListBox";
import AngleDown from "../icons/AngleDown";
import { st, classes } from "./select.st.css";

export interface SelectProps<T>
  extends Omit<AriaSelectOptions<T>, "excludeFromTabOrder" | "isDisabled">,
    Omit<
      FieldProps,
      "label" | "startAdornment" | "endAdornment" | "isReadOnly"
    >,
    Pick<PositionProps, "offset" | "shouldFlip">,
    LoadMoreProps {
  className?: string;
  /**
   * The selector of the element that the menu should render inside of.
   * @default 'body'
   */
  portalSelector?: string;
  /**
   * Should the ListBox items be focused on hover.
   * Useful for scrolled lists to stop a jump on hover when reselecting.
   */
  shouldFocusOnHover?: boolean;
  children?: CollectionChildren<T>;
  triggerIcon?: ReactNode;
  /**
   * Disable the label transition.
   * @default bottom
   */
  placement?: "top" | "bottom";
}

function Select<T extends object>(
  props: SelectProps<T>,
  ref?: React.Ref<HTMLButtonElement>
) {
  const {
    className: classNameProp,
    description,
    isDisabled,
    errorMessage,
    isInvalid,
    portalSelector = "body",
    variant,
    label,
    labelPosition,
    disableLabelTransition,
    vol,
    placement = "bottom",
    offset = 6,
    shouldFlip,
    loadingState,
    onLoadMore,
    placeholder = "Select an option",
    shouldFocusOnHover = true,
    triggerIcon = <AngleDown />,
    "data-id": dataId,
    hasValue,
  } = props;
  // Create state based on the incoming props
  const state = useSelectState(props);

  const internalRef = useRef<HTMLButtonElement>(null);
  const fieldContainerRef = useRef<HTMLDivElement>(null);

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    errorMessageProps,
    descriptionProps,
  } = useSelect(props, state, internalRef);

  const [popUpWidth, setPopUpWidth] = useState(0);

  useEffect(() => {
    fieldContainerRef?.current?.clientWidth &&
      setPopUpWidth(fieldContainerRef?.current?.clientWidth);
  }, [state.isOpen]);

  const popup = (
    <Popup
      isOpen={state.isOpen}
      onClose={() => state.close()}
      triggerRef={internalRef}
      hideArrow
      width={popUpWidth}
      shouldCloseOnBlur
      {...{
        onLoadMore,
        loadingState,
        shouldFlip,
        offset,
        placement: placement === "top" ? "top start" : "bottom start",
        focusOnProps: {
          onDeactivation: () => {
            // Manually setting focus back as return focus only works once. @todo Investigate.
            internalRef?.current && internalRef.current.focus();
          },
          returnFocus: false,
          // Firefox issue where within a scroll container the popup flashes open/closed.
          scrollLock: false,
        },
        "data-id": dataId ? `${dataId}--popup` : undefined,
      }}
    >
      <ListBox
        {...{
          ...menuProps,
          shouldFocusOnHover,
          loadingState,
          state,
          "data-id": dataId ? `${dataId}--listBox` : undefined,
        }}
      />
    </Popup>
  );

  return (
    <Field
      {...{
        isDisabled,
        errorMessage,
        isInvalid,
        errorMessageProps,
        description,
        descriptionProps,
        label,
        labelPosition,
        labelProps: {
          ...labelProps,
          onClick: () => {
            // Manually trigger a click on the button if clicking the label text.
            !state.isOpen && internalRef?.current?.click();
          },
        },
        fieldContainerProps: {
          ref: fieldContainerRef,
        },
        hasValue,
        disableLabelTransition:
          disableLabelTransition || state.isOpen || Boolean(state.selectedItem),
        variant,
        vol,
        "data-id": dataId,
      }}
      className={st(classes.root, classNameProp)}
    >
      <>
        <Button
          {...triggerProps}
          icon={triggerIcon}
          iconPos="end"
          ref={ref ? mergeRefs(ref, internalRef) : internalRef}
          variant={false}
          tone={false}
          className={classes.trigger}
          vol={false}
          data-id={dataId ? `${dataId}--trigger` : undefined}
        >
          <span
            {...valueProps}
            data-id={dataId ? `${dataId}--value` : undefined}
          >
            {state.selectedItem ? (
              state.selectedItem.rendered
            ) : (
              <span className={classes.placeholder}>{placeholder}</span>
            )}
          </span>
        </Button>
        <HiddenSelect
          state={state}
          triggerRef={internalRef}
          label={props.label}
          name={props.name}
          isDisabled={isDisabled}
        />
        {state.isOpen && <Portal selector={portalSelector}>{popup}</Portal>}
      </>
    </Field>
  );
}
Select.displayName = "Select";

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Select = forwardRef(Select) as <T>(
  props: SelectProps<T> & { ref?: Ref<HTMLButtonElement> }
) => ReactElement;
export { _Select as Select };
