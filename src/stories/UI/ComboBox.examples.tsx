import { useState, Key, useRef, KeyboardEvent, useMemo } from "react";
import { Item } from "@react-stately/collections";
import { useAsyncList } from "react-stately";
import {
  ComboBoxProps,
  ComboBox,
  P,
  Grid,
  ComboBoxMultiSelect,
} from "../../indexLib";
import { useTreeData } from "react-stately";
import { classes as sr } from "../../styles/mixins/visuallyHidden.st.css";

/**
 * TypeDoc is not liking finding types when forward ref and generic
 * type params. The following is used in the story file defining the
 * prop table.
 */
export type ComboBoxPropsDocs = ComboBoxProps<object>;
export function ComboBoxType(props: ComboBoxPropsDocs) {
  <>{props}</>;
}

const books = [
  { id: "book-1", author: "Harper Lee", title: "To Kill a Mockingbird" },
  { id: "book-2", author: "Lev Tolstoy", title: "War and Peace" },
  { id: "book-3", author: "Fyodor Dostoyevsy", title: "The Idiot" },
  { id: "book-4", author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
  { id: "book-5", author: "George Orwell", title: "1984" },
  { id: "book-6", author: "Jane Austen", title: "Pride and Prejudice" },
  { id: "book-7", author: "Marcus Aurelius", title: "Meditations" },
  {
    id: "book-8",
    author: "Fyodor Dostoevsky",
    title: "The Brothers Karamazov",
  },
  { id: "book-9", author: "Lev Tolstoy", title: "Anna Karenina" },
  { id: "book-10", author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
];

export const BasicComboBox = () => {
  return (
    <>
      <ComboBoxMultiSelect
        label="Favorite Animal"
        portalSelector="#portal"
        items={books}
        initialSelectedItems={[]}
        keepSelectedInOptions
        // shouldFocusWrap
      />
    </>
  );
};

// export const BasicComboBox = () => {
//   return (
//     <>
//       <ComboBox
//         label="Favorite Animal"
//         portalSelector="#portal"
//         shouldFocusWrap
//       >
//         <Item key="red panda">Red Panda</Item>
//         <Item key="cat">Cat</Item>
//         <Item key="dog">Dog</Item>
//         <Item key="aardvark">Aardvark</Item>
//         <Item key="kangaroo">Kangaroo</Item>
//         <Item key="snake">Snake</Item>
//       </ComboBox>
//     </>
//   );
// };

export const ValueExample = () => {
  const options = [
    { id: 1, name: "Adobe Photoshop" },
    { id: 2, name: "Adobe XD" },
    { id: 3, name: "Adobe InDesign" },
    { id: 4, name: "Adobe AfterEffects" },
    { id: 5, name: "Adobe Illustrator" },
    { id: 6, name: "Adobe Lightroom" },
    { id: 7, name: "Adobe Premiere Pro" },
    { id: 8, name: "Adobe Fresco" },
    { id: 9, name: "Adobe Dreamweaver" },
  ];
  const [value, setValue] = useState("Adobe XD");

  return (
    <Grid variant={"two-col"} style={{ padding: "60px" }}>
      <ComboBox
        label="Adobe product (Uncontrolled)"
        defaultItems={options}
        defaultInputValue={"Adobe XD"}
        // portalSelector="#portal"
      >
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>

      <ComboBox
        label="Pick an Adobe product (Controlled)"
        defaultItems={options}
        inputValue={value}
        onInputChange={setValue}
        portalSelector="#portal"
      >
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
    </Grid>
  );
};

export const CustomValueExample = () => {
  const options = [
    { name: "Apple" },
    { name: "Banana" },
    { name: "Orange" },
    { name: "Honeydew" },
    { name: "Grapes" },
    { name: "Watermelon" },
    { name: "Cantaloupe" },
    { name: "Pear" },
  ];

  return (
    <>
      <P vol={1}>Choose from the list of preferred fruit or add your own.</P>
      <ComboBox
        label="Preferred fruit"
        defaultItems={options}
        portalSelector="#portal"
        allowsCustomValue
      >
        {(item) => <Item key={item.name}>{item.name}</Item>}
      </ComboBox>
    </>
  );
};

export const LabelingExample = () => {
  return (
    <>
      <ComboBox
        label="Label 'side'"
        labelPosition="side"
        portalSelector="#portal"
      >
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
      </ComboBox>

      <ComboBox
        label="Label 'top'"
        labelPosition="top"
        portalSelector="#portal"
      >
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
      </ComboBox>
      <ComboBox
        label="Label 'over'"
        labelPosition="over"
        portalSelector="#portal"
      >
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
      </ComboBox>
      <ComboBox
        label="Label 'hidden'"
        labelPosition="hidden"
        placeholder="Label 'hidden' - this is the placeholder"
        portalSelector="#portal"
      >
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
      </ComboBox>
    </>
  );
};

export const SelectionExample = () => {
  const options = [
    { id: 1, name: "Adobe Photoshop" },
    { id: 2, name: "Adobe XD" },
    { id: 3, name: "Adobe InDesign" },
    { id: 4, name: "Adobe AfterEffects" },
    { id: 5, name: "Adobe Illustrator" },
    { id: 6, name: "Adobe Lightroom" },
    { id: 7, name: "Adobe Premiere Pro" },
    { id: 8, name: "Adobe Fresco" },
    { id: 9, name: "Adobe Dreamweaver" },
  ];
  const [productId, setProductId] = useState<Key>(9);

  return (
    <Grid variant={"two-col"} style={{ padding: "60px" }}>
      <ComboBox
        label="Adobe product (Uncontrolled)"
        defaultItems={options}
        defaultSelectedKey={9}
        portalSelector="#portal"
      >
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>

      <ComboBox
        label="Pick an Adobe product (Controlled)"
        defaultItems={options}
        selectedKey={productId}
        onSelectionChange={(selected) => setProductId(selected)}
        portalSelector="#portal"
      >
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
    </Grid>
  );
};

export const EventsExample = () => {
  const options = [
    { id: 1, name: "Aerospace" },
    { id: 2, name: "Mechanical" },
    { id: 3, name: "Civil" },
    { id: 4, name: "Biomedical" },
    { id: 5, name: "Nuclear" },
    { id: 6, name: "Industrial" },
    { id: 7, name: "Chemical" },
    { id: 8, name: "Agricultural" },
    { id: 9, name: "Electrical" },
  ];

  const [value, setValue] = useState("");
  const [majorId, setMajorId] = useState<Key>("");

  const onSelectionChange = (id: Key) => {
    setMajorId(id);
  };

  const onInputChange = (value: string) => {
    setValue(value);
  };

  return (
    <>
      <P vol={1}>Current selected major id: {majorId}</P>
      <P vol={1}>Current input text: {value}</P>
      <ComboBox
        label="Pick a engineering major"
        defaultItems={options}
        selectedKey={majorId}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
        portalSelector="#portal"
      >
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
    </>
  );
};

export const DynamicCollection = () => {
  const options = [
    { id: 1, name: "Aerospace" },
    { id: 2, name: "Mechanical" },
    { id: 3, name: "Civil" },
    { id: 4, name: "Biomedical" },
    { id: 5, name: "Nuclear" },
    { id: 6, name: "Industrial" },
    { id: 7, name: "Chemical" },
    { id: 8, name: "Agricultural" },
    { id: 9, name: "Electrical" },
  ];
  const [majorId, setMajorId] = useState<Key>();

  return (
    <>
      <ComboBox
        label="Pick a engineering major"
        defaultItems={options}
        items={options}
        onSelectionChange={(selected) => setMajorId(selected)}
        portalSelector="#portal"
      >
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
      <P vol={1}>Selected topic id: {majorId}</P>
    </>
  );
};

export const FullyControlled = () => {
  const options = [
    { id: 1, name: "Aerospace" },
    { id: 2, name: "Mechanical" },
    { id: 3, name: "Civil" },
    { id: 4, name: "Biomedical" },
    { id: 5, name: "Nuclear" },
    { id: 6, name: "Industrial" },
    { id: 7, name: "Chemical" },
    { id: 8, name: "Agricultural" },
    { id: 9, name: "Electrical" },
  ];

  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null;
    inputValue: string;
  }>({
    selectedKey: "",
    inputValue: "",
  });

  const list = useTreeData({
    initialItems: options,
  });

  const onSelectionChange = (key: Key) => {
    setFieldState({
      inputValue: list.getItem(key)?.value.name ?? "",
      selectedKey: key,
    });
  };

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
    }));
  };

  return (
    <>
      <P vol={1}>Current selected major id: {fieldState.selectedKey}</P>
      <P vol={1}>Current input text: {fieldState.inputValue}</P>
      <ComboBox
        label="Pick a engineering major"
        defaultItems={list.items}
        selectedKey={fieldState.selectedKey}
        inputValue={fieldState.inputValue}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
        portalSelector="#portal"
      >
        {(item) => <Item>{item.value.name}</Item>}
      </ComboBox>
    </>
  );
};

// Multi support is not going to be supported in https://github.com/adobe/react-spectrum/issues/2140
export const MultiSelect = () => {
  const options = [
    { id: 1, name: "Aerospace" },
    { id: 2, name: "Mechanical" },
    { id: 3, name: "Civil" },
    { id: 4, name: "Biomedical" },
    { id: 5, name: "Nuclear" },
    { id: 6, name: "Industrial" },
    { id: 7, name: "Chemical" },
    { id: 8, name: "Agricultural" },
    { id: 9, name: "Electrical" },
  ];

  const list = useTreeData({
    initialItems: options,
  });

  const [selectedItems, setSelectedItems] = useState<Key[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [screenReaderMessage, setScreenReaderMessage] = useState("");

  const [fieldState, setFieldState] = useState<{
    selectedKey: Key;
    inputValue: string;
  }>({
    selectedKey: "",
    inputValue: "",
  });

  const onSelectionChange = (key: Key) => {
    // Reset input and set current selected key for a moment.
    setFieldState({
      inputValue: "",
      selectedKey: key,
    });
    // Add selected item to selelcted state.
    if (list.getItem(key) && !selectedItems.includes(key)) {
      const newArray = [...selectedItems, list.getItem(key)?.value.id];
      setSelectedItems(newArray);
    }
    // Remove selected key almost instantly after selection.
    setTimeout(() => {
      setFieldState({
        inputValue: "",
        selectedKey: "",
      });
    }, 1);
  };

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? "" : prevState.selectedKey,
    }));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    // Remove selected item on delete when input is empty and menu is closed.
    // FYI: If the menu is open and we remove the item, the aria-live update is not announced
    if (event.key === "Backspace" && !fieldState.inputValue && !isOpen) {
      const lastItem = selectedItems.slice(-1)[0];
      lastItem && removeSelectedItem(lastItem);
    }
  };

  const removeSelectedItem = (id: Key) => {
    // Remove item from selelctedItems
    setSelectedItems((prevValues) => prevValues.filter((item) => item !== id));
    // Inform the screen reader we have removed an item.
    const itemDeselectedString = `${list.getItem(id).value.name} deselected.`;
    setScreenReaderMessage(
      selectedItems.length > 1
        ? itemDeselectedString
        : `${itemDeselectedString} Nothing selected.`
    );
    // Reset input and set current selected.
    setFieldState({
      inputValue: "",
      selectedKey: "",
    });
  };

  const selectedTags = (
    <>
      {selectedItems.map((id) => (
        <span
          key={id}
          style={{
            background: "#444",
            display: "inline-block",
            padding: "0 4px",
            margin: "0 4px",
            borderRadius: "4px",
          }}
        >
          {list.getItem(id).value.name}
        </span>
      ))}
    </>
  );
  return (
    <>
      <P vol={1}>Current selected major id: {fieldState.selectedKey}</P>
      <P vol={1}>Current input text: {fieldState.inputValue}</P>
      <P vol={1}>selectedItems: {selectedItems}</P>

      {/* We want to interupt the screen reader with a message so we are 'assertive'. */}
      <span className={sr.visuallyHidden} aria-live="assertive">
        {screenReaderMessage}
      </span>

      <ComboBox
        label="Pick a engineering major"
        defaultItems={list.items}
        startAdornment={selectedItems.length > 0 && selectedTags}
        disabledKeys={selectedItems}
        portalSelector="#portal"
        onKeyDown={onKeyDown}
        selectedKey={fieldState.selectedKey}
        inputValue={fieldState.inputValue}
        onSelectionChange={(id) => onSelectionChange(id)}
        onInputChange={onInputChange}
        onOpenChange={(isOpen, triggerAction) => {
          // Useful in some cases.
          console.log(triggerAction);
          setIsOpen(isOpen);
        }}
      >
        {(item) => <Item>{item.value.name}</Item>}
      </ComboBox>
    </>
  );
};

interface Character {
  name: string;
}

export const AsyncLoadingExample = () => {
  const list = useAsyncList<Character>({
    async load({ signal, cursor, filterText }) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      // If no cursor is available, then we're loading the first page,
      // filtering the results returned via a query string that
      // mirrors the ComboBox input text.
      // Otherwise, the cursor is the next URL to load,
      // as returned from the previous page.
      const res = await fetch(
        cursor || `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal }
      );
      const json = await res.json();

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <ComboBox
      label="Star Wars Character Lookup"
      items={list.items}
      inputValue={list.filterText}
      onInputChange={list.setFilterText}
      loadingState={list.loadingState}
      onLoadMore={list.loadMore}
      portalSelector="#portal"
    >
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </ComboBox>
  );
};

export const AsyncLoadingExample2 = () => {
  const isFocused = useRef(false);
  const list = useAsyncList<Character>({
    async load({ signal, cursor, filterText, selectedKeys }) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      // If no cursor is available, then we're loading the first page,
      // filtering the results returned via a query string that
      // mirrors the ComboBox input text.
      // Otherwise, the cursor is the next URL to load,
      // as returned from the previous page.
      const res = await fetch(
        cursor || `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal }
      );
      const json = await res.json();

      let selectedText;
      const selectedKey =
        selectedKeys !== "all" && selectedKeys.values().next().value;

      // If selectedKey exists and combobox is not focused, update the input value with the selected key text
      // This allows the input value to be up to date when items load for the first time or the selected key text is updated server side.
      if (!isFocused.current && selectedKey) {
        const selectedItemName = json.results.find(
          (item: any) => item.name === selectedKey
        )?.name;
        if (selectedItemName != null && selectedItemName !== filterText) {
          selectedText = selectedItemName;
        }
      }

      return {
        items: json.results,
        cursor: json.next,
        filterText: selectedText ?? filterText,
      };
    },
    initialSelectedKeys: ["Luke Skywalker"],
    getKey: (item) => item.name,
  });

  const onSelectionChange = (key: Key) => {
    const itemText = list.getItem(key)?.name;
    list.setSelectedKeys(new Set([key]));
    list.setFilterText(itemText);
  };

  const onInputChange = (value: string) => {
    // Clear key if user deletes all text in the field
    if (value === "") {
      list.setSelectedKeys(new Set([""]));
      // list.setSelectedKeys(new Set([null]));
    }
    list.setFilterText(value);
  };

  const selectedKey =
    list.selectedKeys !== "all" && list.selectedKeys.values().next().value;

  console.log("LOADING", list);
  return (
    <ComboBox
      label="Star Wars Character Lookup"
      onFocusChange={(focus) => (isFocused.current = focus)}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      items={list.items}
      inputValue={list.filterText}
      onInputChange={onInputChange}
      loadingState={list.loadingState}
      onLoadMore={list.loadMore}
    >
      {(item) => <Item key={item.name}>{item.name}</Item>}
    </ComboBox>
  );
};

export const HelpTextExample = () => {
  const [animalId, setAnimalId] = useState<Key>();
  const options = [
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Cat" },
    { id: 3, name: "Dog" },
    { id: 4, name: "Kangaroo" },
    { id: 5, name: "Koala" },
    { id: 6, name: "Penguin" },
    { id: 7, name: "Snake" },
    { id: 8, name: "Turtle" },
    { id: 9, name: "Wombat" },
  ];
  const isValid = useMemo(() => animalId !== 2 && animalId !== 7, [animalId]);

  return (
    <ComboBox
      validationState={!animalId ? undefined : isValid ? "valid" : "invalid"}
      label="Favorite animal"
      description="Pick your favorite animal, you will be judged."
      errorMessage={
        animalId === 2
          ? "The author of this example is a dog person."
          : "Oh no it's a snake! Choose anything else."
      }
      items={options}
      selectedKey={animalId}
      onSelectionChange={(selected) => setAnimalId(selected)}
    >
      {(item) => <Item>{item.name}</Item>}
    </ComboBox>
  );
};

export const DisabledExample = () => {
  return (
    <>
      <ComboBox
        label="Favorite Animal"
        portalSelector="#portal"
        shouldFocusWrap
        isDisabled
      >
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
        <Item key="dog">Dog</Item>
        <Item key="aardvark">Aardvark</Item>
        <Item key="kangaroo">Kangaroo</Item>
        <Item key="snake">Snake</Item>
      </ComboBox>
    </>
  );
};

export const ReadOnlyExample = () => {
  return (
    <>
      <ComboBox
        label="Favorite Animal"
        selectedKey="red panda"
        portalSelector="#portal"
        shouldFocusWrap
        isReadOnly
      >
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
        <Item key="dog">Dog</Item>
        <Item key="aardvark">Aardvark</Item>
        <Item key="kangaroo">Kangaroo</Item>
        <Item key="snake">Snake</Item>
      </ComboBox>
    </>
  );
};
