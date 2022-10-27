import React, { Ref, forwardRef, RefObject, ReactElement, useRef } from "react";
import ReactDOM from "react-dom";
import InputBase from "../InputBase/InputBase";

import type { InputBaseProps } from "../InputBase/InputBase";
/* = Style API. */
import { classes } from "./inputSelect.st.css";
import { useSelectState } from "react-stately";
import { HiddenSelect, useSelect, AriaSelectOptions } from "react-aria";

import Popup from "../Popup/Popup";
import Button from "../Button/Button";
import ListBox from "../ListBox/ListBox";

export interface InputSelectProps<T>
  extends AriaSelectOptions<T>,
    Omit<InputBaseProps, "label"> {
  disabled?: boolean;
  className?: string;
  /**
   * The selector of the element that the menu should render inside of.
   * @default 'body'
   */
  portalSelector?: string;
}

function InputSelect<T extends object>(
  props: InputSelectProps<T>,
  ref?: Ref<HTMLButtonElement>
) {
  const {
    className: classNameProp,
    id,
    disabled,
    isDisabled,
    errorMessage,
    errorMessageProps,
    description,
    descriptionProps,
    startAdornment,
    // endAdornment,
    portalSelector = "body",
    variant,
    label,
    labelPosition,
    vol,
    children,
    ...rest
  } = props;

  // Create state based on the incoming props
  const state = useSelectState(props);

  // Get props for child elements from useSelect
  const localRef = ref || useRef(null);

  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    { ...props, isDisabled: disabled },
    state,
    localRef as RefObject<HTMLButtonElement>
  );

  return (
    <InputBase
      {...{
        id,
        disabled,
        errorMessage,
        errorMessageProps,
        description,
        descriptionProps,
        label,
        labelPosition,
        labelProps,

        variant,
        vol,
        startAdornment,
        // endAdornment Fiddly to do a nice job, parking support for native select.
      }}
      className={`${classes.root} ${classNameProp}`}
    >
      <>
        <HiddenSelect
          state={state}
          triggerRef={localRef as RefObject<HTMLButtonElement>}
          label={props.label}
          name={props.name}
        />
        <Button {...triggerProps} ref={localRef} variant="quiet">
          <span {...valueProps}>
            {state.selectedItem
              ? state.selectedItem.rendered
              : "Select an option"}
          </span>
          <span aria-hidden="true" style={{ paddingLeft: 5 }}>
            ▼
          </span>
        </Button>

        {state.isOpen &&
          ReactDOM.createPortal(
            <Popup
              isOpen={state.isOpen}
              onClose={state.close}
              triggerRef={localRef}
            >
              <ListBox children={children} {...menuProps} state={state} />
            </Popup>,
            document.querySelector(portalSelector) as HTMLElement
          )}
      </>
    </InputBase>
  );
}

/**
 * InputSelects allow users to choose a single option from a collapsible list of options when space is limited.
 */
// forwardRef doesn't support generic parameters, so cast the result to the correct type
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _InputSelect = React.forwardRef(InputSelect) as <T>(
  props: InputSelectProps<T> & { ref?: Ref<HTMLButtonElement> }
) => ReactElement;
export { _InputSelect as InputSelect };
