import { Select, SelectProps, Item } from "../../src/indexLib";
const selectField = '[data-id="select"]';
const fieldLabel = '[data-id="select--label"]';
const trigger = '[data-id="select--trigger"]';
const hiddenInput = '[data-id="select"] input';
const hiddenSelect = '[data-id="select"] select';
const FieldValue = '[data-id="select--value"]';
const popup = '[data-id="select--popup"]';
const listBox = '[data-id="select--listBox"]';
const listBoxLoader = '[data-id="select--listBox--progressCircle"]';
const fieldDesc = '[data-id="select--helpText--description"]';
const fieldError = '[data-id="select--helpText--error"]';

const itemOne = '[data-key="item-one"]';
const itemTwo = '[data-key="item-two"]';
const itemThree = '[data-key="item-three"]';

const BasicSelect = function <T extends object>(
  props: Omit<SelectProps<T>, "children">
) {
  return (
    <div style={{ padding: "0 10px" }}>
      <Select
        portalSelector="#portal"
        label="Select label"
        data-id="select"
        placeholder="Test placeholder"
        {...props}
      >
        <Item key="item-one">Item One</Item>
        <Item key="item-two">Item Two</Item>
        <Item key="item-three">Item Three</Item>
      </Select>
    </div>
  );
};

const DynamicCollection = function <T extends object>(
  props: Omit<SelectProps<T>, "children">
) {
  const options = [
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" },
    { id: 3, name: "Item Three" },
    { id: 4, name: "Item Four" },
    { id: 5, name: "Item Fix" },
    { id: 6, name: "Item Six" },
    { id: 7, name: "Item Seven" },
    { id: 8, name: "Item Eight" },
    { id: 9, name: "Item Nine" },
  ];

  return (
    <div style={{ padding: "0 10px" }}>
      <Select
        label="Select label"
        data-id="select"
        placeholder="Test placeholder"
        {...props}
        items={options}
      >
        {(item) => <Item>{item.name}</Item>}
      </Select>
    </div>
  );
};

describe("Basic Select", () => {
  it("Renders correct parts.", () => {
    cy.mount(<BasicSelect />);
    cy.get(fieldLabel).should("exist").and("have.text", "Select label");
    cy.get(selectField).should("exist");
    cy.get(trigger).should("exist");
    cy.get(popup).should("not.exist");
  });

  it("renders with custom class name", () => {
    cy.mount(<BasicSelect className="cypress-test" />);
    cy.get(selectField)
      .should("have.attr", "class")
      .and("to.have.string", "select")
      .and("to.have.string", "cypress-test");
  });

  it("renders label and #a11y related attributes correctly.", () => {
    cy.mount(<BasicSelect />);
    cy.get(fieldLabel)
      .should("have.text", "Select label")
      .invoke("attr", "id")
      .then((id) =>
        cy
          .get(trigger)
          .should("have.attr", "aria-labelledby")
          .and("contain", id)
      );
    // Inner value of button is part of the labelling for field.
    cy.get(FieldValue)
      .should("have.text", "Test placeholder")
      .invoke("attr", "id")
      .then((id) =>
        cy
          .get(trigger)
          .should("have.attr", "aria-labelledby")
          .and("contain", id)
      );
    // Trigger has listbox popup.
    cy.get(trigger).should("have.attr", "aria-haspopup", "listbox");
    // Trigger should be not expanded.
    cy.get(trigger).should("have.attr", "aria-expanded", "false");
    // Trigger should be expanded.
    cy.get(trigger).realClick().should("have.attr", "aria-expanded", "true");
    // ListBox trigger association.
    cy.get(listBox)
      .invoke("attr", "id")
      .then((id) => cy.get(trigger).should("have.attr", "aria-controls", id));
    // ListBox label association.
    cy.get(fieldLabel)
      .invoke("attr", "id")
      .then((id) =>
        cy
          .get(trigger)
          .should("have.attr", "aria-labelledby")
          .and("contain", id)
      );
  });

  it("isDisabled.", () => {
    cy.mount(<BasicSelect isDisabled />);
    cy.get(selectField)
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled");
    cy.get(trigger).should("be.disabled");
    cy.get(hiddenInput).should("be.disabled");
    cy.get(hiddenSelect).should("be.disabled");
  });
});

describe("Content", () => {
  it("Has correct content", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).realClick();
    cy.get('[role="option"]').should("have.length", 3);
    cy.get(itemOne).should("have.text", "Item One");
    cy.get(itemTwo).should("have.text", "Item Two");
    cy.get(itemThree).should("have.text", "Item Three");
  });

  it("Renders a dynamic collection", () => {
    cy.mount(<DynamicCollection />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get('[role="option"]').should("have.length", 9);
  });
});

describe("Opening and closing", () => {
  it("Opens and closes", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).realClick();
    cy.get(popup).should("exist");
    cy.get(listBox).should("exist");
    cy.get("body").realClick({ position: "bottomLeft" });
    cy.get(popup).should("not.exist");
  });

  it("First item focused by default when opened via the keyboard", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).focus();
    cy.realPress("Enter");
    cy.get(itemOne).should("be.focused");
  });

  it("Focus is returned to trigger onClose more than once", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).focus();
    cy.realPress("Enter");
    cy.get(itemOne).should("be.focused");
    cy.realPress("Escape");
    // Once
    cy.get(trigger).should("be.focused");
    cy.get(trigger).realPress("{downarrow}");
    cy.realPress("Escape");
    // Twice
    cy.get(trigger).should("be.focused");
  });

  it("Tabbing off (onBlur) closes and focus returned to trigger", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get(itemOne).should("be.focused");
    cy.realPress("Tab");
    cy.get(popup).should("not.exist");
    cy.get(trigger).should("be.focused");
  });

  it("Stays open onScroll", () => {
    cy.mount(
      <div id="scroller" style={{ height: "50vh", overflow: "scroll" }}>
        <BasicSelect />
        <div style={{ height: "200vh" }}>Content</div>
        <div id="scrollToPoint">Scroll</div>
      </div>
    );
    cy.get(trigger).realClick();
    cy.realPress("Tab");
    // Unable to test a realistic scroll
    cy.get("body").realPress("PageDown");
    cy.window().then(($window) => {
      expect($window.scrollY).to.be.eq(0);
    });
  });
});

describe("Events", () => {
  // Events
  it("onSelectionChange fires as expected on click", () => {
    const onSelecttionChangeSpy = cy.spy().as("onSelecttionChangeSpy");
    cy.mount(<BasicSelect onSelectionChange={onSelecttionChangeSpy} />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get(itemOne).click();
    cy.get("@onSelecttionChangeSpy").should("have.been.calledWith", "item-one");
  });

  it("onSelectionChange fires as expected on keyboard select", () => {
    const onSelecttionChangeSpy = cy.spy().as("onSelecttionChangeSpy");
    cy.mount(<BasicSelect onSelectionChange={onSelecttionChangeSpy} />);
    cy.get(trigger).focus();
    cy.get(trigger).realPress("Enter");
    cy.get(trigger).realPress("{downarrow}");
    cy.get(trigger).realPress("Enter");
    cy.get("@onSelecttionChangeSpy").should("have.been.calledWith", "item-two");
  });

  it("onOpenChangeSpy", () => {
    const onOpenChangeSpy = cy.spy().as("onOpenChangeSpy");
    cy.mount(<BasicSelect onOpenChange={onOpenChangeSpy} />);
    cy.get(trigger).click();
    cy.get("@onOpenChangeSpy").should("have.been.calledWith", true);
    cy.realPress("Escape");
    cy.get("@onOpenChangeSpy").should("have.been.calledWith", false);
  });
});

describe("Loading", () => {
  it("listBox loader does not appear by default", () => {
    cy.mount(<BasicSelect />);
    cy.get(trigger).realClick();
    cy.get(listBoxLoader).should("not.exist");
  });

  it("listBox loader appears for 'loadingMore'", () => {
    cy.mount(<BasicSelect loadingState="loadingMore" />);
    cy.get(trigger).realClick();
    cy.get(listBoxLoader).should("exist");
  });
});

describe("Select Help", () => {
  it("renders description correctly.", () => {
    cy.mount(<BasicSelect description="Number 5 likes input." />);
    cy.get(fieldDesc)
      .should("have.text", "Number 5 likes input.")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(trigger).should("have.attr", "aria-describedby", id)
      );
  });
  it("renders errorMessage correctly.", () => {
    cy.mount(<BasicSelect errorMessage="No input!" isInvalid />);
    cy.get(fieldError)
      .should("have.text", "No input!")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(trigger).should("have.attr", "aria-describedby", id)
      );
  });

  it("renders errorMessage instead of description.", () => {
    cy.mount(
      <BasicSelect
        description="Number 5 likes input."
        errorMessage="No input!"
        isInvalid
      />
    );
    cy.get(fieldDesc).should("not.exist");
    cy.get(fieldError)
      .should("have.text", "No input!")
      .invoke("attr", "id")
      .then((id) =>
        cy.get(trigger).should("have.attr", "aria-describedby", id)
      );
  });
});
