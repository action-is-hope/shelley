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
import { ProgressCircle } from "../Progress";
import {
  useMultipleSelection,
  useCombobox,
  UseComboboxStateChangeTypes,
  UseMultipleSelectionStateChangeTypes,
} from "downshift";
import { ComboBoxMultiSelectItem } from "./ComboBoxMultiSelectItem";
import { st, classes } from "./comboBoxMultiSelect.st.css";
import { classes as fieldClasses } from "../Field/field.st.css";

export type ComboboxMultiSelectRenderItemFunction<T> = (
  item: T,
  isSelected?: boolean
) => React.ReactNode;

export interface ComboBoxMultiSelectRef<T> {
  removeSelectedItem: (selectedItem: T, callback?: () => void) => void;
}

export interface ComboBoxMultiSelectProps<T>
  extends Omit<FieldProps, "endAdornment">,
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
  /** Controlled value */
  value?: T[];
  /** Uncontrolled default value */
  defaultValue?: T[];
  /** On Selection change the highlighted index to 0 */
  resetHighlightedIndexOnSelect?: boolean;
  /** children as a render props where item and isSelected are parsed. */
  children: ComboboxMultiSelectRenderItemFunction<T>;
  /** Provide a custom filter function. */
  filterFunction?: (item: T, inputValue: string, selectedItems: T[]) => boolean;
  /** Callback fired when a selection is made. */
  onSelectionChange?: (
    selectedItems: T[],
    triggerAction:
      | UseComboboxStateChangeTypes
      | UseMultipleSelectionStateChangeTypes
  ) => void;
  /** The list of items. */
  items?: T[];
  /** Controlled input value. */
  inputValue?: string;
  /** The default value of the MultiSelectComboBox input (adjusts selection). */
  defaultInputValue?: string;
  /** Handler that is called when the MultiSelectComboBox input value changes. */
  onInputChange?: (value: string) => void;
  /** A placeholder for the input. */
  placeholder?: string;
  /** Provide a function to compare items. */
  compareItems?: (itemOne: T, itemTwo: T) => boolean;
  /** Callback fired when the dropdown is opened or closed. */
  onOpenChange?: (
    isOpen: boolean,
    triggerAction: UseComboboxStateChangeTypes
  ) => void;
  /** Enables deleting selected items on delete. */
  enableBackspaceDelete?: boolean;
  /** onBlur handler */
  onBlur?: () => void;
  /** Default is never but you can set it to be always or only if the menu is Open. */
  preventKeyAction?: "always" | "menuOpen";
}

function ComboBoxMultiSelect<
  T extends { title?: string; id?: string; key?: string }
>(props: ComboBoxMultiSelectProps<T>, ref?: React.Ref<HTMLInputElement>) {
  const {
    className: classNameProp,
    description,
    isDisabled,
    isReadOnly,
    errorMessage,
    hasValue,
    isInvalid,
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
    filterFunction,
    children,
    resetHighlightedIndexOnSelect,
    items,
    onSelectionChange,
    onInputChange,
    inputValue: inputValueProp,
    defaultInputValue,
    value,
    defaultValue,
    placeholder,
    compareItems: compareItemsProp,
    enableBackspaceDelete,
    onBlur,
    preventKeyAction,
    "data-id": dataId,
    // keepSelectedInOptions,
  } = props;

  // @todo: make this optiional
  const keepSelectedInOptions = true;

  /* eslint-disable @typescript-eslint/unbound-method*/
  const { contains } = useFilter({ sensitivity: "base" });
  const [inputValue, setInputValue] = useState(
    inputValueProp !== undefined ? inputValueProp : defaultInputValue || ""
  );

  // Determine the initial selected items based on controlled or uncontrolled state
  const initialSelectedItems: ComboBoxMultiSelectProps<T>["value"] =
    value !== undefined ? value : defaultValue || [];

  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  const compareItems = compareItemsProp
    ? compareItemsProp
    : (itemOne: T, itemTwo: T) =>
        itemOne?.id && itemTwo?.id
          ? itemOne?.id === itemTwo?.id
          : JSON.stringify(itemOne) === JSON.stringify(itemTwo);

  const getFilteredItems = useCallback(
    (
      selectedItems: ComboBoxMultiSelectProps<T>["defaultValue"],
      inputValue: string
    ) => {
      const shouldInclude = (item: T) =>
        (keepSelectedInOptions || !selectedItems?.includes(item)) &&
        filterFunction
          ? filterFunction(item, inputValue, selectedItems || [])
          : item?.title
          ? contains(item.title, inputValue)
          : // eslint-disable-next-line no-console
            console.warn(
              "title does not exist on item; provide your own filterFunction"
            );
      return items?.filter(shouldInclude);
    },
    [contains, filterFunction, items, keepSelectedInOptions]
  );

  const filteredItems =
    useMemo(
      () => getFilteredItems(selectedItems, inputValue),
      [selectedItems, inputValue, getFilteredItems]
    ) ?? [];

  const { getDropdownProps, removeSelectedItem } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          if (!isReadOnly && newSelectedItems && enableBackspaceDelete) {
            setSelectedItems(newSelectedItems);
            onSelectionChange && onSelectionChange(newSelectedItems, type);
          }
          break;
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          if (!isReadOnly && newSelectedItems) {
            setSelectedItems(newSelectedItems);
            onSelectionChange && onSelectionChange(newSelectedItems, type);
          }
          break;
        default:
          break;
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
            highlightedIndex: keepSelectedInOptions
              ? resetHighlightedIndexOnSelect
                ? 0
                : state.highlightedIndex
              : 0,
          };
        default:
          return changes;
      }
    },
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
      isOpen: newIsOpen,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            // Toggle selected state for items when keepSelectedInOptions is enabled
            if (
              !isReadOnly &&
              keepSelectedInOptions &&
              selectedItems &&
              selectedItems.some((item) => {
                return compareItems(item, newSelectedItem);
              })
            ) {
              const newSelectedItems = selectedItems.filter(
                (item) => !compareItems(item, newSelectedItem)
              );
              setSelectedItems(newSelectedItems);
              onSelectionChange && onSelectionChange(newSelectedItems, type);
            } else {
              const newSelectedItems = selectedItems
                ? [...selectedItems, newSelectedItem]
                : [newSelectedItem];
              !isReadOnly && setSelectedItems(newSelectedItems);
              !isReadOnly &&
                onSelectionChange &&
                onSelectionChange(newSelectedItems, type);
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

      if (props.onOpenChange && newIsOpen !== undefined) {
        props.onOpenChange(newIsOpen, type);
      }
    },
  });
  const buttonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const fieldContainerRef = useRef<HTMLDivElement>(null);

  const [popUpWidth, setPopUpWidth] = useState(0);

  let preventKeyActionValue = false; // never
  if (preventKeyAction === "always") preventKeyActionValue = true;
  if (preventKeyAction === "menuOpen") preventKeyActionValue = isOpen;

  const inputProps = {
    ...getInputProps({
      ...getDropdownProps({
        preventKeyAction: preventKeyActionValue,
        ref: inputRef,
        disabled: isDisabled,
        readOnly: isReadOnly,
      }),
      value: inputValueProp !== undefined ? inputValueProp : inputValue,
    }),
    className: fieldClasses.fieldInput,
    "data-id": dataId ? `${dataId}--input` : undefined,
  };

  const menuRef = useRef<HTMLUListElement>(null);
  // Supress error which is due to us rendering in a portal.
  // Requires more investigation -> https://github.com/downshift-js/downshift/issues/1272
  const menuProps = getMenuProps({ ref: menuRef }, { suppressRefError: true });
  const toggleProps = getToggleButtonProps({
    disabled: isDisabled || isReadOnly,
  });

  const triggerProps = {
    ...toggleProps,
    onClick: undefined,
    onPress: (event: PressEvent | MouseEvent) =>
      toggleProps.onClick && toggleProps.onClick(event as MouseEvent),
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
    // Update inputValue when inputValueProp changes for controlled scenarios
    if (inputValueProp !== undefined) {
      setInputValue(inputValueProp);
    }
  }, [inputValueProp]);

  useEffect(() => {
    onInputChange && onInputChange(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  // Expose the remove selected item function.
  useImperativeHandle(ref as React.Ref<ComboBoxMultiSelectRef<T>>, () => ({
    removeSelectedItem: (selectedItem: T, callback?: () => void) => {
      removeSelectedItem(selectedItem);
      callback && callback(); // Invoke the callback if provided
    },
  }));

  const popup = (
    <Popup
      className={classes.popup}
      isOpen={isOpen && Boolean(filteredItems?.length) && !isReadOnly}
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
          "data-id": dataId ? `${dataId}--listBox` : undefined,
        }}
      >
        {isOpen &&
          filteredItems?.map((item, index) => {
            const isSelected = selectedItems?.some((selectedItem) =>
              compareItems(selectedItem, item)
            );
            const key: string = item?.key
              ? item.key
              : item?.id || `multiCombo${index}`;
            return (
              <ComboBoxMultiSelectItem
                {...getItemProps({ item, index })}
                key={key}
                isSelected={isSelected}
                isFocused={highlightedIndex === index}
              >
                {/* Render the children via the children render prop. */}
                {children(item, isSelected)}
              </ComboBoxMultiSelectItem>
            );
          })}
      </ul>
    </Popup>
  );

  return (
    <Field
      {...{
        isDisabled,
        isReadOnly,
        disableLabelTransition: disableLabelTransition || isOpen,
        "data-id": dataId,
        errorMessage,
        // errorMessageProps,
        isInvalid,
        description,
        // descriptionProps,
        fieldContainerProps: {
          ref: fieldContainerRef,
        },
        hasValue: hasValue ?? Boolean(inputProps.value),
        label,
        labelPosition,
        labelProps: getLabelProps(),
        variant,
        vol,
        startAdornment,
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
                aria-label="Show suggestions"
                aria-haspopup="listbox"
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
      }}
      className={st(classes.root, classNameProp)}
    >
      {/* Fragment required to stop the clone inside Field. */}
      <>
        <input
          {...inputProps}
          placeholder={placeholder}
          readOnly={isReadOnly}
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          ref={ref ? mergeRefs(ref, inputProps.ref) : inputProps.ref}
          onBlur={onBlur}
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
  );
}

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ComboBoxMultiSelect = forwardRef(ComboBoxMultiSelect) as <T>(
  props: ComboBoxMultiSelectProps<T> & {
    ref?: Ref<HTMLInputElement | ComboBoxMultiSelectRef<T>>;
  }
) => ReactElement;
export { _ComboBoxMultiSelect as ComboBoxMultiSelect };
