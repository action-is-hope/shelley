import React, { Ref, forwardRef, RefObject, ReactElement, useRef } from "react";
import { createPortal } from "react-dom";
import Field from "../Field/Field";
import type { FieldProps } from "../Field/Field";
import { useSelectState } from "react-stately";
import { HiddenSelect, useSelect, AriaSelectOptions } from "react-aria";
import { mergeRefs } from "@react-aria/utils";
import Popup from "../Popup/Popup";
import Button from "../Button/Button";
import ListBox from "../ListBox/ListBox";
/* = Style API. */
import { st, classes } from "./select.st.css";

export interface SelectProps<T>
  extends Omit<AriaSelectOptions<T>, "excludeFromTabOrder" | "isDisabled">,
    Omit<FieldProps, "label" | "startAdornment" | "endAdornment"> {
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
    validationState,
    portalSelector = "body",
    variant,
    label,
    labelPosition,
    disableLabelTransition,
    vol,
    children,
    placeholder = "Select an option",
    shouldFocusOnHover = true,
  } = props;
  // Create state based on the incoming props
  const state = useSelectState(props);

  const localRef = useRef<HTMLButtonElement>(null);

  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    errorMessageProps,
    descriptionProps,
  } = useSelect(props, state, localRef as RefObject<HTMLButtonElement>);

  return (
    <Field
      {...{
        isDisabled,
        errorMessage,
        validationState,
        errorMessageProps,
        description,
        descriptionProps,
        label,
        labelPosition,
        labelProps: {
          ...labelProps,
          onClick: () => {
            // Manually trigger a click on the button if clicking the label text.
            !state.isOpen &&
              (localRef as RefObject<HTMLButtonElement>)?.current?.click();
          },
        },
        disableLabelTransition:
          disableLabelTransition || state.isOpen || Boolean(state.selectedItem),
        variant,
        vol,
      }}
      className={st(classes.root, classNameProp)}
    >
      <>
        <Button
          {...triggerProps}
          // This is where we put the forwardedRef and the local one.
          ref={ref ? mergeRefs(ref, localRef) : localRef}
          variant={false}
          className={classes.trigger}
        >
          <span {...valueProps}>
            {/* {state.selectedItem ? state.selectedItem.rendered : placeholder} */}
            {state.selectedItem ? (
              state.selectedItem.rendered
            ) : (
              <span className={classes.placeholder}>{placeholder}</span>
            )}
          </span>
        </Button>
        <HiddenSelect
          state={state}
          triggerRef={localRef as RefObject<HTMLButtonElement>}
          label={props.label}
          name={props.name}
        />
        {state.isOpen &&
          createPortal(
            <Popup
              isOpen={state.isOpen}
              onClose={() => state.close()}
              triggerRef={localRef}
              placement="bottom start"
              shouldCloseOnBlur
              focusOnProps={{
                onDeactivation: () => {
                  // Manually setting focus back as return focus only works once. @todo Investigate.
                  localRef?.current && localRef.current.focus();
                },
                returnFocus: false,
              }}
            >
              <ListBox
                {...menuProps}
                {...{
                  items: props?.items,
                  children,
                  shouldFocusOnHover,
                  state,
                }}
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
const _Select = forwardRef(Select) as <T>(
  props: SelectProps<T> & { ref?: Ref<HTMLButtonElement> }
) => ReactElement;
export { _Select as Select };
