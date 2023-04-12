import React, { Ref, forwardRef, RefObject, ReactElement, useRef } from "react";
import { createPortal } from "react-dom";
import Field from "../Field/Field";
import type { FieldProps } from "../Field/Field";

import type { HiddenSelect, useSelect, AriaComboBoxOptions } from "react-aria";
import { mergeRefs, mergeProps } from "@react-aria/utils";
import Popup from "../Popup/Popup";
import Button from "../Button/Button";
import ListBox from "../ListBox/ListBox";

import { useButton, useComboBox, useFilter } from "react-aria";
import { Item, useComboBoxState } from "react-stately";

/* = Style API. */
import { st, classes } from "./comboBox.st.css";

import { classes as fieldClasses } from "../Field/field.st.css";

// ComboBoxAria

export interface ComboBoxProps<T>
  extends AriaComboBoxOptions<T>,
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
  startAdornment?: any;
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
    placeholder = "ComboBox an option",
    shouldFocusOnHover = true,
    //
    startAdornment,
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
        labelProps: {
          ...labelProps,
          // onClick: () => {
          //   // Manually trigger a click on the button if clicking the label text.
          //   !state.isOpen &&
          //     (localRef as RefObject<HTMLInputElement>)?.current?.click();
          // },
        },
        disableLabelTransition:
          disableLabelTransition || state.isOpen || Boolean(state.selectedItem),
        variant,
        vol,
      }}
      className={st(classes.root, classNameProp)}
    >
      <>
        <input
          onKeyDown={(key) => console.log("HEY1", key)}
          {...mergeProps(inputPropsLocal, inputProps)}
          // {...inputProps}
          // This is where we put the forwardedRef and the local one.
          // ref={ref ? mergeRefs(ref, localRef) : localRef}
          ref={inputRef}
          className={fieldClasses.fieldInput}
          style={{
            background: "transparent",
          }}
        />

        <Button
          {...buttonProps}
          ref={buttonRef}
          variant={false}
          className={classes.trigger}
        >
          <span aria-hidden="true" style={{ padding: "0 2px" }}>
            ▼
          </span>
        </Button>

        {createPortal(
          <Popup
            isOpen={state.isOpen}
            onClose={() => state.close()}
            triggerRef={inputRef}
            placement="bottom start"
            ref={popoverRef}
            focusOnProps={{
              returnFocus: false,
              autoFocus: false,
              enabled: false,
            }}
          >
            <ListBox
              listBoxRef={listBoxRef}
              {...{
                // The example states you don't need these but it seems I had to manaully add this...
                items: props?.defaultItems || props?.items,
                children,
                shouldFocusOnHover,
                state,
              }}
              {...listBoxProps}
            />
          </Popup>,
          document.querySelector(portalSelector) as HTMLElement
        )}
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
