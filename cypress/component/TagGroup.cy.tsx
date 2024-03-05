import { TagGroup, TagGroupProps, Item } from "../../src/indexLib";
import { useListData } from "react-stately";
const tagGroup = '[data-id="tagGroup"]';
const tagGroupLabel = '[data-id="tagGroup--label"]';
const tagGroupDescription = '[data-id="tagGroup--helpText--description"]';
const tagGroupError = '[data-id="tagGroup--helpText--error"]';

const tagList = '[data-id="tagGroup--list"]';
const itemOne = '[data-key="item-one"]';
const itemTwo = '[data-key="item-two"]';
const itemThree = '[data-key="item-three"]';

const BasicTagGroup = function <T extends object>(
  props: Omit<TagGroupProps<T>, "children">
) {
  return (
    <TagGroup aria-label="Basic TagGroup" data-id="tagGroup" {...props}>
      <Item key="item-one">Item One</Item>
      <Item key="item-two">Item Two</Item>
      <Item key="item-three">Item Three</Item>
    </TagGroup>
  );
};

const RemoveTags = function <T extends object>(
  props: Omit<TagGroupProps<T>, "children" | "items">
) {
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
        {...props}
      >
        {(item) => <Item>{item.name}</Item>}
      </TagGroup>
    </>
  );
};

describe("Basic rendering", () => {
  it("Renders required aria attributes with label.", () => {
    cy.mount(<BasicTagGroup id="example1" label="Label" />);
    cy.get(tagGroup).should("exist");

    cy.get(tagGroupLabel)
      .should("have.text", "Label")
      .invoke("attr", "id")
      .then((id) =>
        cy
          .get(tagList)
          .and("have.attr", "role", "grid")
          .and("have.attr", "aria-atomic", "false")
          .and("have.attr", "aria-live", "off")
          .should("have.attr", "aria-labelledby")
          .and("contain", id)
      );
    cy.get(itemOne)
      .should("exist")
      .and("have.text", "Item One")
      .and("have.attr", "role", "gridcell");
    cy.get(itemTwo)
      .should("exist")
      .and("have.text", "Item Two")
      .and("have.attr", "role", "gridcell");
    cy.get(itemThree)
      .should("exist")
      .and("have.text", "Item Three")
      .and("have.attr", "role", "gridcell");
  });

  it("Renders description.", () => {
    cy.mount(
      <BasicTagGroup id="example1" label="Label" description="Description" />
    );
    cy.get(tagGroup).should("exist");

    cy.get(tagGroupDescription)
      .should("have.text", "Description")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(tagList).should("have.attr", "aria-describedby", id)
      );
  });

  it("Renders error instead of description.", () => {
    cy.mount(
      <BasicTagGroup
        id="example1"
        label="Label"
        description="Description"
        errorMessage="Error"
        isInvalid
      />
    );
    cy.get(tagGroup).should("exist");

    cy.get(tagGroupError)
      .should("have.text", "Error")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(tagList).should("have.attr", "aria-describedby", id)
      );

    cy.get(tagGroupDescription).should("not.exist");
  });

  it("Renders with custom classname.", () => {
    cy.mount(<BasicTagGroup className="custom-class" />);
    cy.get(tagGroup)
      .should("have.attr", "class")
      .and("to.include.string", "custom-class");
  });

  it("Visible focus classes.", () => {
    cy.mount(<BasicTagGroup />);
    cy.get(itemOne)
      .focus()
      .should("have.attr", "class")
      .and("to.include.string", "isFocused")
      .and("to.include.string", "isFocusVisible");
  });

  it("Renders empty state.", () => {
    cy.mount(
      <TagGroup
        label="Amenities"
        emptyState={<span data-id="no-items">No categories</span>}
      >
        {[]}
      </TagGroup>
    );
    cy.get("[data-id='no-items']")
      .should("exist")
      .and("to.have.text", "No categories");
  });
});

describe("Selection", () => {
  it("No selection by default.", () => {
    cy.mount(<BasicTagGroup />);
    cy.get(itemOne)
      .click()
      .should("not.have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.not.include.string", "isSelected");
  });

  it("Allows single selection.", () => {
    cy.mount(<BasicTagGroup selectionMode="single" />);
    cy.get(itemOne)
      .click()
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.include.string", "isSelected");
    cy.get(itemTwo).click().should("have.attr", "aria-selected", "true");
    cy.get(itemOne)
      .should("not.have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.not.include.string", "isSelected");
  });

  it("Allows multiple selection.", () => {
    cy.mount(<BasicTagGroup selectionMode="multiple" />);
    cy.get(itemOne)
      .click()
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.include.string", "isSelected");
    cy.get(itemTwo)
      .click()
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.include.string", "isSelected");
    cy.get(itemOne)
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.include.string", "isSelected");
  });

  it("Supports selected keys.", () => {
    cy.mount(
      <BasicTagGroup
        selectionMode="single"
        selectedKeys={["item-one", "item-three"]}
      />
    );
    cy.get(itemOne)
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.include.string", "isSelected");
    cy.get(itemTwo).should("not.have.attr", "aria-selected", "true");
    cy.get(itemThree)
      .should("have.attr", "aria-selected", "true")
      .should("have.attr", "class")
      .and("to.include.string", "isSelected");
  });

  it("Supports disabled keys.", () => {
    cy.mount(
      <BasicTagGroup
        selectionMode="single"
        disabledKeys={["item-one", "item-three"]}
      />
    );
    cy.get(itemOne)
      .should("have.attr", "aria-disabled", "true")
      .should("have.attr", "class")
      .and("to.include.string", "isDisabled");
    cy.get(itemTwo)
      .should("have.attr", "class")
      .and("to.not.include.string", "isDisabled");
    cy.get(itemThree)
      .should("have.attr", "aria-disabled", "true")
      .should("have.attr", "class")
      .and("to.include.string", "isDisabled");
    cy.get(itemOne).click().should("not.have.attr", "aria-selected", "true");
    cy.get(itemTwo).click().should("have.attr", "aria-selected", "true");
  });

  it("Event: onSelectionChange.", () => {
    const onSelectionSpy = cy.spy().as("onSelectionSpy");
    cy.mount(
      <BasicTagGroup
        selectionMode="single"
        onSelectionChange={(selection) =>
          onSelectionSpy(Array.from(selection)[0])
        }
      />
    );
    cy.get(itemOne).click();
    cy.get("@onSelectionSpy").should("have.been.calledWith", "item-one");
  });
});

describe("Deletion", () => {
  it("Allows deletion via icon.", () => {
    cy.mount(<RemoveTags />);
    cy.get(`[data-key="1"]`).should("exist");
    cy.get(`[data-key="1"] button`)
      .should("exist")
      .and("have.attr", "aria-label", "Remove")
      .click();
    cy.get(`[data-key="1"]`).should("not.exist");
  });
  it("Allows deletion via keyboard.", () => {
    cy.mount(<RemoveTags />);
    cy.get(`[data-key="1"]`).should("exist").focus().realPress("Delete");
    cy.get(`[data-key="1"]`).should("not.exist");
  });
});
