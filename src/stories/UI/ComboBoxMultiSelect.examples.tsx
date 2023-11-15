import { useState, useRef } from "react";
import { useAsyncList } from "react-stately";
import {
  Button,
  Grid,
  ComboBoxMultiSelectProps,
  ComboBoxMultiSelect,
  ComboBoxMultiSelectRef,
} from "../../indexLib";
import Close from "../../icons/Close";
import { useFilter } from "react-aria";

/**
 * TypeDoc is not liking finding types when forward ref and generic
 * type params. The following is used in the story file defining the
 * prop table.
 */
export type ComboBoxPropsDocs = ComboBoxMultiSelectProps<object>;
export function ComboBoxMultiSelectType(props: ComboBoxPropsDocs) {
  <>{props}</>;
}

type Book = { id: string; author: string; title: string } | undefined;
const books: Book[] | undefined = [
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
  const { contains } = useFilter({ sensitivity: "base" });
  const initialSelectedItems = [books[0], books[1]];
  return (
    <>
      <ComboBoxMultiSelect
        label="Favorite Book"
        portalSelector="#portal"
        items={books}
        defaultValue={initialSelectedItems}
        placeholder="Placeholder"
        // value={initialSelectedItems}
        // loadingState={"loading"}
        // inputValue="Lee"
        // scrollLock
        // removeTrigger
        // resetHighlightedIndexOnSelect
        onInputChange={(value) => console.log(value)}
        onOpenChange={(isOpen, triggerAction) =>
          console.log("onOpenChange", isOpen, triggerAction)
        }
        filterFunction={(item, inputValue) => {
          return item
            ? contains(item.title, inputValue) ||
                contains(item.author, inputValue)
            : false;
        }}
        onSelectionChange={(selectedItems) => {
          console.log("Selected Items:", selectedItems);
        }}
      >
        {(item) => {
          return (
            <div>
              {item?.title}, {item?.author}
            </div>
          );
        }}
      </ComboBoxMultiSelect>
    </>
  );
};

export const LabelingExample = () => {
  return (
    <>
      <ComboBoxMultiSelect
        label="Label 'side'"
        labelPosition="side"
        items={books}
        portalSelector="#portal"
      >
        {(item) => (
          <div>
            {item?.title}, {item?.author}
          </div>
        )}
      </ComboBoxMultiSelect>

      <ComboBoxMultiSelect
        label="Label 'top'"
        labelPosition="top"
        items={books}
        portalSelector="#portal"
      >
        {(item) => (
          <div>
            {item?.title}, {item?.author}
          </div>
        )}
      </ComboBoxMultiSelect>
      <ComboBoxMultiSelect
        label="Label 'over'"
        labelPosition="over"
        items={books}
        portalSelector="#portal"
      >
        {(item) => (
          <div>
            {item?.title}, {item?.author}
          </div>
        )}
      </ComboBoxMultiSelect>
      <ComboBoxMultiSelect
        label="Label 'hidden'"
        labelPosition="hidden"
        placeholder="Label 'hidden' - this is the placeholder"
        items={books}
        portalSelector="#portal"
      >
        {(item) => (
          <>
            {item?.title}, {item?.author}
          </>
        )}
      </ComboBoxMultiSelect>
    </>
  );
};

export const SelectionExample = () => {
  type Option = {
    id: number;
    name: string;
  };
  const { contains } = useFilter({ sensitivity: "base" });

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
  const [selectedProducts, setselectedProducts] = useState<Option[]>([
    { id: 2, name: "Adobe XD" },
  ]);

  // const selectedProducts = [
  //   { id: 2, name: "Adobe XD" },
  //   { id: 3, name: "Adobe InDesign" },
  // ];
  const comboBoxRef = useRef<ComboBoxMultiSelectRef<Option>>(null);

  return (
    <Grid
      variant={"two-col"}
      style={{ padding: "60px", alignItems: "baseline" }}
    >
      <ComboBoxMultiSelect
        ref={comboBoxRef}
        label="Pick an Adobe product (Controlled)"
        items={options}
        value={selectedProducts}
        filterFunction={(item, inputValue) => {
          return item ? contains(item.name, inputValue) : false;
        }}
        onSelectionChange={(selected, type) => {
          setselectedProducts(selected);
          console.log(selected, type);
        }}
        portalSelector="#portal"
        enableBackspaceDelete
        preventKeyAction="menuOpen"
      >
        {(item) => <>{item?.name}</>}
      </ComboBoxMultiSelect>
      <div>
        {selectedProducts?.map((item) => {
          return (
            <span key={item.id} className={"test"}>
              {item.name}
              <Button
                onPress={() => comboBoxRef?.current?.removeSelectedItem(item)}
                icon={<Close alt="Remove item" />}
                variant={false}
                tone={false}
              />
            </span>
          );
        })}
      </div>
    </Grid>
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

  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <ComboBoxMultiSelect
      label="Star Wars Character Lookup"
      items={list.items}
      filterFunction={(item, inputValue) => {
        return item ? contains(item.name, inputValue) : false;
      }}
      defaultInputValue={list.filterText}
      onInputChange={list.setFilterText}
      loadingState={list.loadingState}
      onLoadMore={list.loadMore}
      portalSelector="#portal"
      onSelectionChange={(item) => console.log(item)}
    >
      {(item) => <div key={item.name}>{item.name}</div>}
    </ComboBoxMultiSelect>
  );
};

export const HelpTextExample = () => {
  return (
    <ComboBoxMultiSelect
      label="Pick an Book"
      items={books}
      portalSelector="#portal"
      description="Pick your favorite book."
    >
      {(item) => <>{item?.title}</>}
    </ComboBoxMultiSelect>
  );
};

export const DisabledExample = () => {
  return (
    <ComboBoxMultiSelect
      isDisabled
      label="Pick an Book"
      items={books}
      portalSelector="#portal"
      description="Pick your favorite book."
    >
      {(item) => <>{item?.title}</>}
    </ComboBoxMultiSelect>
  );
};

export const ReadOnlyExample = () => {
  return (
    <ComboBoxMultiSelect
      isReadOnly
      label="Pick an Book"
      items={books}
      portalSelector="#portal"
      description="Pick your favorite book."
    >
      {(item) => <>{item?.title}</>}
    </ComboBoxMultiSelect>
  );
};
