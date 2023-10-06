"use client";
import React, {
  Ref,
  useRef,
  forwardRef,
  useEffect,
  useState,
  ReactElement,
  ReactNode,
  useMemo,
  useCallback,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useFilter } from "react-aria";
import type { PositionProps } from "@react-types/overlays";
import type { LoadMoreProps } from "../typings/shared-types";
import { mergeRefs } from "@react-aria/utils";
import { Field, FieldProps } from "../Field";
import { Popup } from "../Popup";
import { Button } from "../Button";
// import { ListBox } from "../ListBox";
import AngleDown from "../icons/AngleDown";
import { ProgressCircle } from "../ProgressCircle";
import { st, classes } from "./comboBoxMultiSelect.st.css";
import { classes as fieldClasses } from "../Field/field.st.css";

import { useMultipleSelection, useCombobox } from "downshift";
import type { PressEvent } from "@react-types/shared";

interface AriaComboBoxMultiSelectProps<T> {
  /** The list of ComboBox items (uncontrolled). */
  defaultItems?: T[];
  /** The list of ComboBox items (controlled). */
  items?: T[];
  /** Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu. */
  // onOpenChange?: (isOpen: boolean, menuTrigger?: MenuTriggerAction) => void,
  /** The value of the ComboBox input (controlled). */
  inputValue?: string;
  /** The default value of the ComboBox input (uncontrolled). */
  defaultInputValue?: string;
  /** Handler that is called when the ComboBox input value changes. */
  onInputChange?: (value: string) => void;
  /** Whether the ComboBox allows a non-item matching input value to be set. */
  allowsCustomValue?: boolean;
  // /**
  //  * Whether the Combobox should only suggest matching options or autocomplete the field with the nearest matching option.
  //  * @default 'suggest'
  //  */
  // completionMode?: 'suggest' | 'complete',
  /**
   * The interaction required to display the ComboBox menu.
   * @default 'input'
   */
  // menuTrigger?: MenuTriggerAction,
  /**
   * The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
}

export interface ComboBoxMultiSelectProps<T>
  extends AriaComboBoxMultiSelectProps<T>,
    Omit<FieldProps, "endAdornment">,
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
  /** */
  initialSelectedItems?: T[];
  keepSelectedInOptions?: boolean;
}

function ComboBoxMultiSelect<T extends { title: string; value: string }>(
  props: ComboBoxMultiSelectProps<T>,
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
    initialSelectedItems,
    keepSelectedInOptions,
    items,
    "data-id": dataId,
  } = props;

  // Setup filter function and state.
  /* eslint-disable @typescript-eslint/unbound-method*/
  const { contains } = useFilter({ sensitivity: "base" });
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  const getFilteredItems = useCallback(
    (
      selectedItems: ComboBoxMultiSelectProps<T>["initialSelectedItems"],
      inputValue: string
    ) => {
      return items?.filter(
        (item) =>
          ((keepSelectedInOptions || !selectedItems?.includes(item)) &&
            contains(item.title, inputValue)) ||
          contains(item.author, inputValue)
      );
    },
    [contains, items, keepSelectedInOptions]
  );

  const filteredItems =
    useMemo(
      () => getFilteredItems(selectedItems, inputValue),
      [selectedItems, inputValue, getFilteredItems]
    ) ?? [];

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems,
      onStateChange({ selectedItems: newSelectedItems, type }) {
        if (
          type ===
            useMultipleSelection.stateChangeTypes
              .SelectedItemKeyDownBackspace ||
          type ===
            useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete ||
          type ===
            useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace ||
          type ===
            useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem
        ) {
          setSelectedItems(newSelectedItems);
        }
      },
    });

  const {
    isOpen,
    closeMenu,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: filteredItems,
    itemToString: (item) => (item ? item.title : ""),
    defaultHighlightedIndex: 0,
    selectedItem: null,
    inputValue,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: 0,
          };
        default:
          return changes;
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            // Toggle selected state for items when keepSelectedInOptions is enabled
            if (
              keepSelectedInOptions &&
              selectedItems &&
              selectedItems.includes(newSelectedItem)
            ) {
              setSelectedItems(
                selectedItems.filter((item) => item !== newSelectedItem)
              );
            } else {
              selectedItems &&
                setSelectedItems([...selectedItems, newSelectedItem]);
            }
            setInputValue("");
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue ?? "");
          break;
        default:
          break;
      }
    },
  });
  const buttonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const fieldContainerRef = useRef<HTMLDivElement>(null);

  const [popUpWidth, setPopUpWidth] = useState(0);

  const inputProps = {
    ...getInputProps(
      getDropdownProps({ preventKeyAction: isOpen, ref: inputRef })
    ),
    className: fieldClasses.fieldInput,
    "data-id": dataId ? `${dataId}--input` : undefined,
  };

  const menuRef = useRef<HTMLUListElement>(null);
  // Supress error which is due to us rendering in a portal.
  // Requires more investigation -> https://github.com/downshift-js/downshift/issues/1272
  const menuProps = getMenuProps({ ref: menuRef }, { suppressRefError: true });

  const toggleProps = getToggleButtonProps();
  const triggerProps = {
    ...toggleProps,
    onPress: (event: PressEvent | MouseEvent) =>
      toggleProps.onPress && toggleProps.onPress(event as MouseEvent),
  };
  useEffect(() => {
    const inputWidth = inputRef?.current?.clientWidth;
    const fieldContainerWidth = fieldContainerRef?.current?.clientWidth;
    if (startAdornment) {
      inputWidth && setPopUpWidth(inputWidth);
    } else {
      fieldContainerWidth && setPopUpWidth(fieldContainerWidth);
    }
  }, [startAdornment, isOpen, inputRef]);

  const popup = (
    <Popup
      className={classes.popup}
      isOpen={isOpen && Boolean(filteredItems?.length)}
      hideArrow
      ref={popoverRef}
      triggerRef={fieldContainerRef}
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
      <ul
        {...{
          ...menuProps,
          "data-id": dataId ? `${dataId}--menuList` : undefined,
        }}
      >
        {isOpen &&
          filteredItems?.map((item, index) => (
            <li
              className={`py-2 px-3 shadow-sm flex flex-col ${
                highlightedIndex === index ? "bg-blue-300" : ""
              } ${selectedItems?.includes(item) ? "font-bold" : ""}`}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.title}</span>
              {selectedItems?.includes(item) && (
                <span className="text-sm text-gray-700">&#10003;</span>
              )}
              <span className="text-sm text-gray-700">{item.author}</span>
            </li>
          ))}
      </ul>
    </Popup>
  );

  const selectedItemsUI = (
    <>
      {selectedItems &&
        selectedItems.map((selectedItem, index) => (
          <span
            className="bg-gray-100 rounded-md px-1 focus:bg-red-400"
            key={`selected-item-${index}`}
            {...getSelectedItemProps({
              selectedItem,
              index,
            })}
          >
            {selectedItem.title}
            <span
              className="px-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                removeSelectedItem(selectedItem);
              }}
            >
              &#10005;
            </span>
          </span>
        ))}
    </>
  );
  return (
    <>
      <Field
        {...{
          isDisabled,
          isReadOnly,
          errorMessage,
          // errorMessageProps,
          validationState,
          description,
          // descriptionProps,
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
                  {...triggerProps}
                  icon={triggerIcon}
                  ref={buttonRef}
                  variant={false}
                  tone={false}
                  className={classes.trigger}
                  data-id={dataId ? `${dataId}--trigger` : undefined}
                />
              )}
            </>
          ),
          labelProps: getLabelProps(),
          disableLabelTransition:
            // disableLabelTransition || isOpen || Boolean(state.selectedItem),
            disableLabelTransition || isOpen,
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
            ref={ref ? mergeRefs(ref, inputProps.ref) : inputProps.ref}
          />
          {isOpen && portalSelector
            ? // If no portalSelector render inline.
              createPortal(
                popup,
                document.querySelector(portalSelector) as HTMLElement
              )
            : popup}
        </>
      </Field>
      {selectedItemsUI}
    </>
  );
}

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ComboBoxMultiSelect = forwardRef(ComboBoxMultiSelect) as <T>(
  props: ComboBoxMultiSelectProps<T> & { ref?: Ref<HTMLInputElement> }
) => ReactElement;
export { _ComboBoxMultiSelect as ComboBoxMultiSelect };
