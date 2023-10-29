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
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import { useFilter } from "react-aria";
import type { PressEvent } from "@react-types/shared";
import type { PositionProps } from "@react-types/overlays";
import type { LoadMoreProps } from "../typings/shared-types";
import { mergeRefs } from "@react-aria/utils";
import { Field, FieldProps } from "../Field";
import { Popup } from "../Popup";
import { Button } from "../Button";
import AngleDown from "../icons/AngleDown";
import { ProgressCircle } from "../ProgressCircle";
import { st, classes } from "./comboBoxMultiSelect.st.css";
import { classes as fieldClasses } from "../Field/field.st.css";
import { useMultipleSelection, useCombobox } from "downshift";
import { MultiSelectItem } from "./MultiSelectItem";

interface AriaComboBoxMultiSelectProps<T> {
  /** The list of items. */
  items?: T[];
  /** The default value of the MultiSelectComboBox input (adjusts selection). */
  defaultInputValue?: string;
  /** Handler that is called when the MultiSelectComboBox input value changes. */
  onInputChange?: (value: string) => void;
  /**
   * The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
}

type RenderItemFunction<T> = (item: T, isSelected?: boolean) => React.ReactNode;

// Define the interface for the ComboBoxMultiSelectRef
export interface ComboBoxMultiSelectRef<T> {
  removeSelectedItem: (selectedItem: T) => void;
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
  children: RenderItemFunction<T>;
  filterFunction?: (item: T, inputValue: string, selectedItems: T[]) => boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
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
    loadingState,
    onLoadMore,
    startAdornment,
    scrollLock = false,
    triggerIcon = <AngleDown />,
    initialSelectedItems,
    keepSelectedInOptions,
    filterFunction,
    children,
    items,
    onSelectionChange,
    onInputChange,
    defaultInputValue,
    "data-id": dataId,
  } = props;

  // Setup filter function and state.
  /* eslint-disable @typescript-eslint/unbound-method*/
  const { contains } = useFilter({ sensitivity: "base" });
  const [inputValue, setInputValue] = useState(defaultInputValue || "");
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  const getFilteredItems = useCallback(
    (
      selectedItems: ComboBoxMultiSelectProps<T>["initialSelectedItems"],
      inputValue: string
    ) => {
      const shouldInclude = (item: T) =>
        (keepSelectedInOptions || !selectedItems?.includes(item)) &&
        filterFunction
          ? filterFunction(item, inputValue, selectedItems || [])
          : contains(item.title, inputValue);

      return items?.filter(shouldInclude);
      // return items;
    },
    [contains, filterFunction, items, keepSelectedInOptions]
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
          if (props.onSelectionChange && newSelectedItems) {
            props.onSelectionChange(newSelectedItems);
          }
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
    selectedItem,
  } = useCombobox({
    items: filteredItems,
    itemToString: (item) => (item ? item.title : ""),
    defaultHighlightedIndex: 0,
    selectedItem: null,
    inputValue,
    stateReducer(_, actionAndChanges) {
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
              const newSelectedItems = selectedItems.filter(
                (item) => item !== newSelectedItem
              );
              setSelectedItems(newSelectedItems);
              onSelectionChange && onSelectionChange(newSelectedItems);
            } else {
              const newSelectedItems = selectedItems
                ? [...selectedItems, newSelectedItem]
                : [newSelectedItem];
              setSelectedItems(newSelectedItems);
              onSelectionChange && onSelectionChange(newSelectedItems);
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

  useEffect(() => {
    onInputChange && onInputChange(inputValue);
  }, [inputValue]);

  // Expose the remove selected item function.
  useImperativeHandle(ref as React.Ref<ComboBoxMultiSelectRef<T>>, () => ({
    removeSelectedItem: (selectedItem: T) => {
      removeSelectedItem(selectedItem);
    },
  }));

  const popup = (
    <Popup
      className={classes.popup}
      isOpen={isOpen && Boolean(filteredItems?.length)}
      onClose={closeMenu}
      isDismissable
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
        className={classes.list}
        {...{
          ...menuProps,
          "data-id": dataId ? `${dataId}--menuList` : undefined,
        }}
      >
        {isOpen &&
          filteredItems?.map((item, index) => (
            <MultiSelectItem
              key={`${item.value}${index}`}
              isSelected={selectedItems?.includes(item)}
              {...getItemProps({ item, index })}
              isFocused={highlightedIndex === index}
              isFocusVisible={selectedItem === item}
            >
              {/* Render the children via the children render prop. */}
              {children(item, selectedItems?.includes(item))}
            </MultiSelectItem>
          ))}
      </ul>
    </Popup>
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
            {selectedItem.name}
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
}

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ComboBoxMultiSelect = forwardRef(ComboBoxMultiSelect) as <T>(
  props: ComboBoxMultiSelectProps<T> & {
    ref?: Ref<HTMLInputElement & ComboBoxMultiSelectRef<T>>;
  }
) => ReactElement;
export { _ComboBoxMultiSelect as ComboBoxMultiSelect };
