import { useState } from "react";
import { useListData, Selection } from "react-stately";
import { TagGroup, Item, P } from "../../indexLib";

export const TagGroupBasic = () => {
  return (
    <TagGroup label="Description">
      <Item key="news">News</Item>
      <Item key="travel">Travel</Item>
      <Item key="gaming">Gaming</Item>
      <Item key="shopping">Shopping</Item>
    </TagGroup>
  );
};

export const RemoveTags = () => {
  const list = useListData({
    initialItems: [
      { id: 1, name: "News" },
      { id: 2, name: "Travel" },
      { id: 3, name: "Gaming" },
      { id: 4, name: "Shopping" },
    ],
  });
  return (
    <>
      <TagGroup
        label="Categories"
        items={list.items}
        onRemove={(keys) => list.remove(...keys)}
      >
        {(item) => <Item>{item.name}</Item>}
      </TagGroup>
    </>
  );
};

export const SelectTags = () => {
  const [selected, setSelected] = useState<Selection>(new Set(["parking"]));
  return (
    <TagGroup
      label="Amenities"
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      description={
        <>
          Current selection (controlled):{" "}
          {selected === "all" ? "all" : [...selected].join(", ")}
        </>
      }
    >
      <Item key="laundry">Laundry</Item>
      <Item key="fitness">Fitness center</Item>
      <Item key="parking">Parking</Item>
      <Item key="pool">Swimming pool</Item>
      <Item key="breakfast">Breakfast</Item>
    </TagGroup>
  );
};

export const DisabledTags = () => {
  return (
    <TagGroup
      label="Amenities"
      selectionMode="multiple"
      disabledKeys={["laundry"]}
    >
      <Item key="laundry">Laundry</Item>
      <Item key="fitness">Fitness center</Item>
      <Item key="parking">Parking</Item>
      <Item key="pool">Swimming pool</Item>
      <Item key="breakfast">Breakfast</Item>
    </TagGroup>
  );
};

export const EmptyState = () => {
  return (
    <TagGroup label="Amenities" emptyState={<P vol={1}>No categories</P>}>
      {[]}
    </TagGroup>
  );
};

export const TagsHelpText = () => {
  return (
    <TagGroup
      label="Amenities"
      selectionMode="single"
      description="Select all amenities that apply to your property."
    >
      <Item key="laundry">Laundry</Item>
      <Item key="fitness">Fitness center</Item>
      <Item key="parking">Parking</Item>
      <Item key="pool">Swimming pool</Item>
      <Item key="breakfast">Breakfast</Item>
    </TagGroup>
  );
};

export const TagsErrorText = () => {
  return (
    <TagGroup
      label="Amenities"
      selectionMode="multiple"
      description="Select all amenities that apply to your property."
      errorMessage="Please select at least one amenity."
      isInvalid
      data-id="tagGroup"
    >
      <Item key="laundry">Laundry</Item>
      <Item key="fitness">Fitness center</Item>
      <Item key="parking">Parking</Item>
      <Item key="pool">Swimming pool</Item>
      <Item key="breakfast">Breakfast</Item>
    </TagGroup>
  );
};
