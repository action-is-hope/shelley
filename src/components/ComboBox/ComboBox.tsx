import React, {
  Ref,
  useRef,
  forwardRef,
  useEffect,
  useState,
  ReactElement,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";
import type { AriaComboBoxProps } from "@react-types/combobox";
import type { PositionProps } from "@react-types/overlays";
import type { LoadMoreProps } from "../types";
import { mergeRefs } from "@react-aria/utils";
import { Field, FieldProps } from "../Field/Field";
import Popup from "../Popup/Popup";
import Button from "../Button/Button";
import { ListBox } from "../ListBox/ListBox";
import AngleDown from "../icons/AngleDown";
import { ProgressCircle } from "../ProgressCircle/ProgressCircle";

/* = Style API. */
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
  /**
   * Enable scrollLock for the Popup, useful for infinate scrolls.
   * @default false
   */
  scrollLock?: boolean;
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
    errorMessage,
    validationState,
    portalSelector = "body",
    variant,
    label,
    labelPosition,
    disableLabelTransition,
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
    scrollLock = false,
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
  const fieldContainerRef = useRef<HTMLDivElement>(null);

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
      // errorMessage
    },
    state
  );
  useEffect(() => {
    const inputWidth = inputRef?.current?.clientWidth;
    const fieldContainerWidth = fieldContainerRef?.current?.clientWidth;
    if (startAdornment) {
      inputWidth && setPopUpWidth(inputWidth);
    } else {
      fieldContainerWidth && setPopUpWidth(fieldContainerWidth);
    }
  }, [state.isOpen]);

  const popup = (
    <Popup
      className={classes.popup}
      isOpen={state.isOpen}
      onClose={() => state.close()}
      hideArrow
      ref={popoverRef}
      triggerRef={inputRef}
      width={popUpWidth}
      {...{
        onLoadMore,
        loadingState,
        shouldFlip,
        crossOffset,
        offset,
        placement: placement === "top" ? "top start" : "bottom start",
        focusOnProps: {
          focusLock: false,
          scrollLock,
        },
        "data-id": dataId ? `${dataId}--popup` : undefined,
      }}
    >
      <ListBox
        ref={listBoxRef}
        {...{
          loadingState,
          shouldFocusOnHover,
          state,
          ...listBoxProps,
          "data-id": dataId ? `${dataId}--listBox` : undefined,
        }}
      />
    </Popup>
  );

  return (
    <Field
      {...{
        isDisabled,
        isReadOnly,
        errorMessage,
        errorMessageProps,
        validationState,
        description,
        descriptionProps,
        label,
        labelPosition,
        startAdornment,
        fieldContainerProps: {
          ref: fieldContainerRef,
        },
        endAdornment: (
          <>
            {(loadingState === "filtering" ||
              loadingState === "loading" ||
              loadingState === "sorting") && (
              <ProgressCircle
                size="small"
                isIndeterminate
                className={classes.loader}
                data-id={dataId ? `${dataId}--progressCircle` : undefined}
              />
            )}
            {!removeTrigger && (
              <Button
                {...buttonProps}
                icon={triggerIcon}
                ref={buttonRef}
                variant={false}
                tone={false}
                className={classes.trigger}
                data-id={dataId ? `${dataId}--trigger` : undefined}
              ></Button>
            )}
          </>
        ),
        labelProps,
        disableLabelTransition:
          disableLabelTransition || state.isOpen || Boolean(state.selectedItem),
        variant,
        vol,
        "data-id": dataId,
        hasValue: Boolean(inputProps.value),
      }}
      className={st(classes.root, classNameProp)}
    >
      {/* Fragment required to stop the clone inside Field. */}
      <>
        <input
          {...inputProps}
          className={fieldClasses.fieldInput}
          ref={ref ? mergeRefs(ref, inputRef) : inputRef}
          data-id={dataId ? `${dataId}--input` : undefined}
        />
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
