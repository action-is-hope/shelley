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
import { generateDataId } from "../utils";
import { st, classes } from "./select.st.css";

export interface SelectProps<T>
  extends Omit<AriaSelectOptions<T>, "excludeFromTabOrder" | "isDisabled">,
    Omit<
      FieldProps,
      "label" | "startAdornment" | "endAdornment" | "isReadOnly"
    >,
    Pick<PositionProps, "offset" | "shouldFlip">,
    LoadMoreProps {
  children?: CollectionChildren<T>;
  /**
   * Custom className.
   */
  className?: string;
  /**
   * Whether the popover is non-modal, i.e. elements outside the popover
   * may be interacted with by assistive technologies.
   */
  isNonModal?: boolean;
  /**
   * Disable the label transition.
   * @default bottom
   */
  placement?: "top" | "bottom";
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
  /**
   * Whether focus should wrap around when the end/start is reached.
   */
  shouldFocusWrap?: boolean;
  /**
   * The icon to use as a trigger.
   */
  triggerIcon?: ReactNode;
}

function Select<T extends object>(
  props: SelectProps<T>,
  ref?: React.Ref<HTMLButtonElement>
) {
  const {
    className: classNameProp,
    description,
    errorMessage,
    isDisabled,
    isInvalid,
    isNonModal,
    portalSelector = "body",
    variant,
    label,
    labelPosition,
    disableLabelTransition,
    disableFieldset,
    vol,
    placement = "bottom",
    offset = 6,
    shouldFlip = true,
    shouldFocusWrap = true,
    loadingState,
    onLoadMore,
    placeholder = "Select an option",
    shouldFocusOnHover = true,
    triggerIcon = <AngleDown />,
    "data-id": dataId,
    hasValue,
  } = props;

  const state = useSelectState(props);
  const internalRef = useRef<HTMLButtonElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

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
    inputContainerRef?.current?.clientWidth &&
      setPopUpWidth(inputContainerRef?.current?.clientWidth);
  }, [state.isOpen]);

  const popup = (
    <Popup
      data-id={generateDataId(dataId, "popup")}
      hideArrow
      state={state}
      triggerRef={internalRef}
      width={popUpWidth}
      {...{
        isNonModal,
        loadingState,
        onLoadMore,
        offset,
        placement: placement === "top" ? "top start" : "bottom start",
        shouldFlip: shouldFlip,
      }}
    >
      <ListBox
        data-id={generateDataId(dataId, "listBox")}
        {...{
          ...menuProps,
          loadingState,
          shouldFocusWrap,
          shouldFocusOnHover,
          state,
        }}
      />
    </Popup>
  );

  return (
    <Field
      {...{
        isDisabled,
        isInvalid,
        description,
        descriptionProps,
        errorMessage,
        errorMessageProps,
        hasValue,
        label,
        labelPosition,
        labelProps: {
          ...labelProps,
          onClick: () => {
            // Manually trigger a click on the button if clicking the label text.
            !state.isOpen && internalRef?.current?.click();
          },
        },
        inputContainerProps: {
          ref: inputContainerRef,
        },
        disableLabelTransition:
          disableLabelTransition || state.isOpen || Boolean(state.selectedItem),
        disableFieldset,
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
          data-id={generateDataId(dataId, "trigger")}
        >
          <span {...valueProps} data-id={generateDataId(dataId, "value")}>
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
