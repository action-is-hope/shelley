import React from "react";
import {
  ComboBoxMultiSelectProps,
  ComboBoxMultiSelect,
} from "../../src/indexLib";

const comboBoxField = '[data-id="comboBox"]';
const fieldLabel = '[data-id="comboBox--label"]';
const trigger = '[data-id="comboBox--trigger"]';
const textInput = '[data-id="comboBox--input"]';
const popup = '[data-id="comboBox--popup"]';
const listBox = '[data-id="comboBox--listBox"]';
const fieldLoader = '[data-id="comboBox--progressCircle"]';
// const listBoxLoader = '[data-id="comboBox--listBox--progressCircle"]';
const fieldDesc = '[data-id="comboBox--helpText--description"]';
const fieldError = '[data-id="comboBox--helpText--error"]';

const itemOne = '[id$="item-0"]';
const itemTwo = '[id$="item-1"]';
const itemThree = '[id$="item-2"]';

type BookType = { id: string; author: string; title: string } | undefined;
const books: BookType[] | undefined = [
  { id: "1", author: "Author One", title: "Item One" },
  { id: "2", author: "Author Two", title: "Item Two" },
  { id: "3", author: "Author Three", title: "Item Three" },
];

const BasicComboBox = function (
  props: Partial<ComboBoxMultiSelectProps<BookType>>
) {
  return (
    <div style={{ padding: "0 10px" }}>
      <ComboBoxMultiSelect
        data-id="comboBox"
        label="ComboBox label"
        portalSelector="#portal"
        items={books}
        {...props}
      >
        {(item) => {
          return (
            <div>
              {item?.title}, {item?.author}
            </div>
          );
        }}
      </ComboBoxMultiSelect>
    </div>
  );
};

describe("Basic ComboBox", () => {
  it("Renders correct parts.", () => {
    cy.mount(<BasicComboBox />);
    cy.get(fieldLabel).should("exist").and("have.text", "ComboBox label");
    cy.get(comboBoxField).should("exist");
    cy.get(trigger).should("exist");
    cy.get(popup).should("not.exist");
  });

  it("renders with custom class name", () => {
    cy.mount(<BasicComboBox className="cypress-test" />);
    cy.get(comboBoxField)
      .should("have.attr", "class")
      .and("to.have.string", "ComboBox")
      .and("to.have.string", "cypress-test");
  });

  it("renders label and #a11y related attributes correctly.", () => {
    cy.mount(<BasicComboBox />);
    // Label field association and input attributes.
    cy.get(fieldLabel)
      .should("have.text", "ComboBox label")
      .invoke("attr", "id")
      .then((id) =>
        cy
          .get(textInput)
          .should("have.attr", "aria-labelledby", id)
          .and("have.attr", "role", "combobox")
          .and("have.attr", "aria-expanded", "false")
          .and("have.attr", "aria-autocomplete", "list")
          // Non-aria attributes
          .and("have.attr", "autocomplete", "off")
          .and("have.attr", "autocorrect", "off")
          .and("have.attr", "spellcheck", "false")
      );
    // Trigger has listbox popup.
    cy.get(trigger).should("have.attr", "aria-haspopup", "listbox");
    // Trigger should be not expanded.
    cy.get(trigger).should("have.attr", "aria-expanded", "false");
    // Trigger should be expanded.
    cy.get(trigger).click().should("have.attr", "aria-expanded", "true");
    // Input should be set to expanded.
    cy.get(textInput).should("have.attr", "aria-expanded", "true");
    // ListBox trigger association.
    cy.get(listBox)
      .invoke("attr", "id")
      .then((id) => cy.get(trigger).should("have.attr", "aria-controls", id));
  });

  it("isDisabled.", () => {
    cy.mount(<BasicComboBox isDisabled />);
    cy.get(comboBoxField)
      .should("have.attr", "class")
      .and("to.have.string", "isDisabled");
    cy.get(textInput).should("be.disabled");
  });

  it("readOnly.", () => {
    cy.mount(<BasicComboBox isReadOnly />);
    cy.get(comboBoxField)
      .should("have.attr", "class")
      .and("to.have.string", "isReadOnly");
    cy.get(textInput).should("have.attr", "readonly");
  });
});

describe("Content", () => {
  it("Has correct content", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).click();
    cy.get('[role="option"]').should("have.length", 3);
    cy.get(itemOne).should("have.text", "Item One, Author One");
    cy.get(itemTwo).should("have.text", "Item Two, Author Two");
    cy.get(itemThree).should("have.text", "Item Three, Author Three");
  });
});

describe("Opening and closing", () => {
  it("Opens and closes with mouse click", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).click();
    cy.get(popup).should("exist");
    cy.get(listBox).should("exist");
    cy.get("body").realClick({ position: "bottomLeft" });
    cy.get(popup).should("not.exist");
  });

  it("Opens and closes with keyboard: Enter", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).focus();
    cy.realPress("Enter");
    cy.get(popup).should("exist");
    cy.get(listBox).should("exist");
    cy.realPress("Escape");
    cy.get(popup).should("not.exist");
  });

  it("Opens and closes with keyboard: Space + Escape", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).focus();
    cy.realPress("Space");
    cy.get(popup).should("exist");
    cy.get(listBox).should("exist");
    cy.realPress("Escape");
    cy.get(popup).should("not.exist");
  });

  it("Down arrow opens and focuses first item", () => {
    cy.mount(<BasicComboBox />);
    cy.get(textInput).focus();
    cy.realPress("{downarrow}");
    cy.get(popup).should("exist");
    cy.get(itemOne)
      .should("have.attr", "class")
      .and("to.have.string", "isFocused");
  });

  it("Trigger opens and focuses the text input", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).click();
    cy.get(popup).should("exist");
    cy.get(textInput).should("be.focused");
  });
});

describe("Selection", () => {
  it("Default value selected", () => {
    cy.mount(<BasicComboBox defaultValue={[books[1]]} />);
    cy.get(trigger).click();
    cy.get(itemOne).get('[data-id="selected-icon"]').should("exist");
  });

  it("Allows multi-item selection", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).click();
    cy.get(itemOne)
      .click()
      .get(`${itemOne} > [data-id="selected-icon"]`)
      .should("exist");
    cy.get(itemTwo)
      .click()
      .get(`${itemTwo} > [data-id="selected-icon"]`)
      .should("exist");
    cy.get(itemOne)
      .get(`${itemOne} > [data-id="selected-icon"]`)
      .should("exist");
  });

  it("Allows deselection", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).click();
    cy.get(itemThree)
      .click()
      .get(`${itemThree} > [data-id="selected-icon"]`)
      .should("exist");
    cy.get(itemThree)
      .click()
      .get(`${itemThree} > [data-id="selected-icon"]`)
      .should("not.exist");
  });
});

describe("Style checks", () => {
  it("Popup is the same width as the field.", () => {
    cy.mount(<BasicComboBox />);
    cy.get(trigger).click();
    cy.get(comboBoxField)
      .invoke("outerWidth")
      .then((width) =>
        cy.get(popup).invoke("outerWidth").should("equal", width)
      );
  });
});

describe("Events", () => {
  it("onInputChange", () => {
    const onInputChangeSpy = cy.spy().as("onInputChangeSpy");
    cy.mount(<BasicComboBox onInputChange={onInputChangeSpy} />);
    cy.get(textInput).type("1");
    cy.get("@onInputChangeSpy").should("have.been.calledWith", "1");
  });

  it("onSelectionChange", () => {
    const onSelectionChangeSpy = cy.spy().as("onSelectionChangeSpy");
    cy.mount(<BasicComboBox onSelectionChange={onSelectionChangeSpy} />);
    cy.get(trigger).click();
    cy.get(itemOne).click();
    cy.get("@onSelectionChangeSpy").should("have.been.calledWith", [books[0]]);
  });
});

describe("Autocomplete", () => {
  // Autocomplete
  it("Shows items matching string only", () => {
    cy.mount(<BasicComboBox />);
    cy.get(textInput).type("Item One");
    cy.get(itemOne).should("exist");
    cy.get(itemTwo).should("not.exist");
    cy.get(itemThree).should("not.exist");
  });

  it("Partial match", () => {
    cy.mount(<BasicComboBox />);
    cy.get(textInput).type("em ");
    cy.get(itemOne).should("exist");
    cy.get(itemTwo).should("exist");
    cy.get(itemThree).should("exist");
  });
});

describe("Loading", () => {
  it("ComboBox loader does not appear by default", () => {
    cy.mount(<BasicComboBox />);
    cy.get(fieldLoader).should("not.exist");
  });

  it("ComboBox loadingStates", () => {
    cy.mount(<BasicComboBox loadingState="filtering" />);
    cy.get(fieldLoader).should("exist");
    cy.mount(<BasicComboBox loadingState="loading" />);
    cy.get(fieldLoader).should("exist");
    cy.mount(<BasicComboBox loadingState="sorting" />);
    cy.get(fieldLoader).should("exist");
    cy.mount(<BasicComboBox loadingState="loadingMore" />);
    cy.get(fieldLoader).should("not.exist");
  });

  // @todo
  // it("listBox loader does not appear by default", () => {
  //   cy.mount(<BasicComboBox />);
  //   cy.get(trigger).realClick();
  //   cy.get(listBoxLoader).should("not.exist");
  // });

  // it("listBox loader appears for 'loadingMore'", () => {
  //   cy.mount(<BasicComboBox loadingState="loadingMore" />);
  //   cy.get(trigger).realClick();
  //   cy.get(listBoxLoader).should("exist");
  // });
});

describe("ComboBox Help", () => {
  it("renders description correctly.", () => {
    cy.mount(<BasicComboBox description="Number 5 likes input." />);
    cy.get(fieldDesc).should("have.text", "Number 5 likes input.");
    // @todo
    // .invoke("attr", "id")
    // .then((id) =>
    //   cy.get(textInput).should("have.attr", "aria-describedby", id)
    // );
  });
  it("renders errorMessage correctly.", () => {
    cy.mount(
      <BasicComboBox errorMessage="No input!" validationState="invalid" />
    );
    cy.get(fieldError).should("have.text", "No input!");
    // @todo
    // .invoke("attr", "id")
    // .then((id) =>
    //   cy.get(textInput).should("have.attr", "aria-describedby", id)
    // );
  });

  it("renders errorMessage instead of description.", () => {
    cy.mount(
      <BasicComboBox
        description="Number 5 likes input."
        errorMessage="No input!"
        validationState="invalid"
      />
    );
    cy.get(fieldDesc).should("not.exist");
    cy.get(fieldError).should("have.text", "No input!");
    // @todo:
    // .invoke("attr", "id")
    // .then((id) =>
    //   cy.get(textInput).should("have.attr", "aria-describedby", id)
    // );
  });
});
