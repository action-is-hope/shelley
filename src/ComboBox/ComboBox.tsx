"use client";
import React, {
  useRef,
  forwardRef,
  useEffect,
  useState,
  ReactNode,
  Ref,
  ReactElement,
} from "react";
import { useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";
import type { AriaComboBoxProps } from "@react-types/combobox";
import type { PositionProps } from "@react-types/overlays";
import type { LoadMoreProps } from "../typings/shared-types";
import { mergeRefs } from "@react-aria/utils";
import { Field, FieldProps } from "../Field";
import { Popup } from "../Popup";
import { Portal } from "../Portal";
import { Button } from "../Button";
import { ListBox } from "../ListBox";
import AngleDown from "../icons/AngleDown";
import { ProgressCircle } from "../Progress";
import { generateDataId } from "../utils";
import { st, classes } from "./comboBox.st.css";
import { classes as fieldClasses } from "../Field/field.st.css";

export interface ComboBoxProps<T>
  extends AriaComboBoxProps<T>,
    Omit<FieldProps, "label" | "endAdornment">,
    Pick<PositionProps, "offset" | "shouldFlip" | "crossOffset">,
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
  /**
   * Disable the label transition.
   * @default bottom
   */
  placement?: "top" | "bottom";
  /**
   * Render with no Trigger.
   * @default false
   */
  removeTrigger?: boolean;
  /** Provide your own icon for the Trigger */
  triggerIcon?: ReactNode;
}

function ComboBox<T extends object>(
  props: ComboBoxProps<T>,
  ref?: React.Ref<HTMLInputElement>
) {
  const {
    className: classNameProp,
    description,
    isDisabled,
    isReadOnly,
    hasValue,
    errorMessage,
    isInvalid,
    portalSelector = "body",
    variant,
    label,
    labelPosition,
    disableLabelTransition,
    disableFieldset,
    vol,
    placement = "bottom",
    offset = 6,
    crossOffset,
    shouldFlip,
    removeTrigger,
    shouldFocusOnHover = true,
    loadingState,
    onLoadMore,
    startAdornment,
    triggerIcon = <AngleDown />,
    "data-id": dataId,
  } = props;

  // Setup filter function and state.
  /* eslint-disable @typescript-eslint/unbound-method*/
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  const buttonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const [popUpWidth, setPopUpWidth] = useState(0);
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
    },
    state
  );
  useEffect(() => {
    const inputWidth = inputRef?.current?.clientWidth;
    const inputContainerWidth = inputContainerRef?.current?.clientWidth;
    if (startAdornment) {
      inputWidth && setPopUpWidth(inputWidth);
    } else {
      inputContainerWidth && setPopUpWidth(inputContainerWidth);
    }
  }, [startAdornment, state.isOpen]);

  const popup = (
    <Popup
      className={classes.popup}
      data-id={generateDataId(dataId, "popup")}
      hideArrow
      ref={popoverRef}
      state={state}
      triggerRef={inputRef}
      width={popUpWidth}
      autoFocus={false}
      {...{
        isNonModal: true,
        crossOffset,
        offset,
        onLoadMore,
        placement: placement === "top" ? "top start" : "bottom start",
        loadingState,
        shouldFlip,
      }}
    >
      <ListBox
        data-id={generateDataId(dataId, "listBox")}
        ref={listBoxRef}
        {...{
          loadingState,
          state,
          ...listBoxProps,
          shouldFocusOnHover,
        }}
      />
    </Popup>
  );

  return (
    <Field
      {...{
        isDisabled,
        isInvalid,
        isReadOnly,
        description,
        descriptionProps,
        errorMessage,
        errorMessageProps,
        label,
        labelPosition,
        startAdornment,
        inputContainerProps: {
          ref: inputContainerRef,
        },
        endAdornment: (
          <>
            {(loadingState === "filtering" ||
              loadingState === "loading" ||
              loadingState === "sorting") && (
              <ProgressCircle
                className={classes.loader}
                data-id={generateDataId(dataId, "progressCircle")}
                isIndeterminate
                size="small"
              />
            )}
            {!removeTrigger && (
              <Button
                {...buttonProps}
                className={classes.trigger}
                data-id={generateDataId(dataId, "trigger")}
                icon={triggerIcon}
                ref={buttonRef}
                tone={false}
                variant={false}
              />
            )}
          </>
        ),
        labelProps,
        disableLabelTransition:
          disableLabelTransition || state.isOpen || Boolean(state.selectedItem),
        disableFieldset,
        variant,
        vol,
        "data-id": dataId,
        hasValue: hasValue ?? Boolean(inputProps.value),
      }}
      className={st(classes.root, classNameProp)}
    >
      {/* Fragment required to stop the clone inside Field. */}
      <>
        <input
          {...inputProps}
          className={fieldClasses.input}
          data-id={generateDataId(dataId, "input")}
          ref={ref ? mergeRefs(ref, inputRef) : inputRef}
        />
        {state.isOpen && <Portal selector={portalSelector}>{popup}</Portal>}
      </>
    </Field>
  );
}
ComboBox.displayName = "ComboBox";

/**
 * ComboBoxes combine a text entry with a picker menu, allowing users to filter longer lists to only the selections matching a query.
 */
// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ComboBox = forwardRef(ComboBox) as <T>(
  props: ComboBoxProps<T> & { ref?: Ref<HTMLInputElement> }
) => ReactElement;
export { _ComboBox as ComboBox };
