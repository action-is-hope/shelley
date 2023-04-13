import React, { Ref, forwardRef, RefObject, ReactElement, useRef } from "react";
import { createPortal } from "react-dom";
import Field from "../Field/Field";
import type { FieldProps } from "../Field/Field";
import type { AriaComboBoxProps } from "@react-types/combobox";
// import type { AriaComboBoxOptions } from "react-aria";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import Popup from "../Popup/Popup";
import Button from "../Button/Button";
import ListBox from "../ListBox/ListBox";

import { useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";

/* = Style API. */
import { st, classes } from "./comboBox.st.css";

import { classes as fieldClasses } from "../Field/field.st.css";

// ComboBoxAria

export interface ComboBoxProps<T>
  extends AriaComboBoxProps<T>,
    Omit<FieldProps, "label" | "endAdornment"> {
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

  // selectionMode="multiple",
  // startAdornment?: any;
}

function ComboBox<T extends object>(
  props: ComboBoxProps<T>,
  ref?: React.Ref<HTMLInputElement>
) {
  const {
    className: classNameProp,
    description,
    isDisabled,
    errorMessage,
    validationState,
    portalSelector = "body",
    variant,
    label,
    labelPosition,
    disableLabelTransition,
    vol,
    children,
    shouldFocusOnHover = true,
    //
    startAdornment,
    "data-id": dataId,
  } = props;
  // Setup filter function and state.
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  // Create state based on the incoming props
  // const state = useSelectState(props);
  // Setup refs and get props for child elements.
  const buttonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listBoxRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  const localRef = useRef(null);

  // const {
  //   labelProps,
  //   triggerProps,
  //   valueProps,
  //   menuProps,
  //   errorMessageProps,
  //   descriptionProps,
  // } = useSelect(props, state, localRef as RefObject<HTMLInputElement>);

  const {
    buttonProps,
    inputProps,
    listBoxProps,
    labelProps,
    descriptionProps,
    errorMessageProps,
  } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
      // errorMessage
    },
    state
  );

  console.log("listBoxProps", listBoxProps);
  console.log("listBoxRef", listBoxRef);
  console.log("state", state);

  const inputPropsLocal: React.HTMLProps<HTMLInputElement> = {
    // onKeyDown: (key) => console.log("HEY2", key),
  };

  const popup = (
    <Popup
      isOpen={state.isOpen}
      onClose={() => state.close()}
      triggerRef={inputRef}
      // @todo placement/popup props
      placement="bottom start"
      ref={popoverRef}
      focusOnProps={{
        enabled: false,
      }}
      data-id={dataId ? `${dataId}--popup` : undefined}
    >
      <ListBox
        listBoxRef={listBoxRef}
        {...{
          // The example states you don't need these but it seems I had to manaully add this...
          // items: props?.defaultItems || props?.items,
          // children,
          shouldFocusOnHover,
          state,
        }}
        {...listBoxProps}
        data-id={dataId ? `${dataId}--listBox` : undefined}
      />
    </Popup>
  );

  return (
    <Field
      {...{
        isDisabled,
        errorMessage,
        errorMessageProps,
        validationState,
        description,
        descriptionProps,
        label,
        labelPosition,
        startAdornment,
        labelProps,
        disableLabelTransition:
          disableLabelTransition || state.isOpen || Boolean(state.selectedItem),
        variant,
        vol,
        "data-id": dataId,
      }}
      className={st(classes.root, classNameProp)}
    >
      {/* Fragment required. */}
      <>
        <input
          onKeyDown={(key) => console.log("HEY1", key)}
          {...mergeProps(inputPropsLocal, inputProps)}
          // This is where we put the forwardedRef and the local one.
          // ref={ref ? mergeRefs(ref, localRef) : localRef}
          ref={inputRef}
          className={fieldClasses.fieldInput}
          style={{
            background: "transparent",
          }}
          data-id={dataId ? `${dataId}--input` : undefined}
        />

        <Button
          {...buttonProps}
          ref={buttonRef}
          variant={false}
          className={classes.trigger}
          data-id={dataId ? `${dataId}--trigger` : undefined}
        >
          <span aria-hidden="true" style={{ padding: "0 2px" }}>
            ▼
          </span>
        </Button>
        {state.isOpen && portalSelector
          ? // If no portalSelector render inline.
            createPortal(
              popup,
              document.querySelector(portalSelector) as HTMLElement
            )
          : popup}
      </>
    </Field>
  );
}

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ComboBox = forwardRef(ComboBox) as <T>(
  props: ComboBoxProps<T> & { ref?: Ref<HTMLInputElement> }
) => ReactElement;
export { _ComboBox as ComboBox };
