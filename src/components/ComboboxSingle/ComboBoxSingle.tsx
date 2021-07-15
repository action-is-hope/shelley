import React, { useState, useRef } from "react";
// import { render } from "react-dom";
import { useCombobox } from "downshift";
import { st, classes } from "./comboboxSingle.st.css";

import { usePopper } from "react-popper";

type item = { id: string; value: string };
export interface ComboBoxSingleProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLInputElement>,
    Exclude<keyof React.ButtonHTMLAttributes<HTMLInputElement>, "onChange">
  > {
  items: item[];
  onChange: (selectedItem: item) => void;
}
const ComboboxSingle = React.forwardRef(
  (
    {
      className: classNameProp,
      children,
      items,
      onChange,
      ...rest
    }: ComboBoxSingleProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    const [inputItems, setInputItems] = useState(items);

    // const [referenceRef, setReferenceRef] = useState(null);
    // const [popperRef, setPopperRef] = useState(null);

    const referenceRef = useRef(null);
    const popperRef = useRef(null);

    const { styles, attributes } = usePopper(
      referenceRef.current,
      popperRef.current,
      {
        placement: "bottom",
        modifiers: [
          {
            name: "offset",
            enabled: true,
            options: {
              offset: [0, 10],
            },
          },
        ],
      }
    );

    const {
      isOpen,
      // reset,
      // selectedItem,
      // setInputValue,
      // setHighlightedIndex,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items: inputItems,
      itemToString: (item) => {
        return item ? item.value : "";
      },
      onInputValueChange: ({ inputValue }) => {
        const inputItem = items.filter(
          (item) =>
            inputValue &&
            // item.value.toLowerCase().startsWith(inputValue.toLowerCase())
            item.value.toLowerCase().includes(inputValue.toLowerCase())
        );
        setInputItems(inputValue ? inputItem : items);
      },
      onSelectedItemChange: ({ selectedItem }) => {
        onChange && selectedItem && onChange(selectedItem);
      },
    });

    return (
      <div className={st(classes.root, classNameProp)} ref={ref} {...rest}>
        {children}
        <div ref={referenceRef}>
          <label {...getLabelProps()}>Component:</label>
          <span {...getComboboxProps()}>
            <input {...getInputProps()} />
            <button
              type="button"
              {...getToggleButtonProps()}
              aria-label="toggle menu"
            >
              &#8595;
            </button>
          </span>
        </div>
        <div ref={popperRef} style={styles.popper} {...attributes.popper}>
          <ul
            className={classes.menuList}
            style={styles.offset}
            {...getMenuProps()}
          >
            {isOpen &&
              inputItems.map((item, index) => (
                <li
                  className={classes.menuItem}
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: "#bde4ff" }
                      : {}
                  }
                  key={`${item.id}`}
                  {...getItemProps({ item, index })}
                >
                  {item.value}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
);

ComboboxSingle.displayName = "ComboboxSingle";

export default ComboboxSingle;
