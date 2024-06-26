import React, { useRef } from "react";

import { Popup, PopupProps, Button, Portal } from "../../src/indexLib";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "@react-stately/overlays";

const popup = '[data-id="popup"]';
const popupArrow = '[data-id="popup--arrow"]';
const popupScroller = '[data-id="popup--scroller"]';
const trigger = '[data-id="trigger"]';

// @todo: shouldFlip
export const BasicTemplate = (props: {
  isOpen?: boolean;
  hideArrow?: boolean;
  className?: string;
  id?: string;
}) => {
  // Setup a basic Trigger component.
  const triggerRef = useRef(null);
  const { isOpen, ...rest } = props;
  return (
    <Popup
      data-id="popup"
      state={{ isOpen: props?.isOpen || false, close: () => {} }}
      {...rest}
      triggerRef={triggerRef}
    >
      <div>Content</div>
    </Popup>
  );
};

export const PositionTemplate = (
  props: Omit<PopupProps, "triggerRef" | "state" | "children">
) => {
  // Setup a basic Trigger component.
  const triggerRef = useRef(null);
  const state = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  return (
    <div style={{ padding: "120px" }}>
      {/* Whatever you use as a trigger will need an onPress prop... */}
      <Button
        {...triggerProps}
        data-id="trigger"
        ref={triggerRef}
        style={{ width: "40px", height: "40px" }}
      >
        40px
      </Button>
      {state.isOpen && (
        <Portal>
          <Popup
            // Focus
            {...overlayProps}
            state={state}
            // isOpen={state.isOpen}
            // onClose={() => state.close()}
            {...props}
            triggerRef={triggerRef}
            data-id="popup"
          >
            <div style={{ height: "78px", width: "78px", background: "grey" }}>
              80px (78px + 2px border)
            </div>
          </Popup>
        </Portal>
      )}
    </div>
  );
};

export const FocusPopupTemplate = (
  props: Omit<PopupProps, "triggerRef" | "state" | "children">
) => {
  const triggerRef = useRef(null);
  const state = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  return (
    <div style={{ padding: "120px" }}>
      {/* Whatever you use as a trigger will need an onPress prop... */}
      <Button
        {...triggerProps}
        data-id="trigger"
        ref={triggerRef}
        style={{ width: "40px", height: "40px" }}
      >
        40px
      </Button>
      {state.isOpen && (
        <Portal selector="body">
          <Popup
            // Focus
            {...overlayProps}
            state={state}
            {...props}
            triggerRef={triggerRef}
            data-id="popup"
          >
            <div>
              <Button data-focus-test>Focusable button</Button>
            </div>
          </Popup>
        </Portal>
      )}
      <a id="focusLink" href="#">
        Focus me
      </a>
    </div>
  );
};

export const TriggerCustomContent = (
  props: Omit<PopupProps, "triggerRef" | "state">
) => {
  // Setup a basic Trigger component.
  const triggerRef = useRef(null);
  const state = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );
  return (
    <>
      <Button {...triggerProps} data-id="trigger" ref={triggerRef}>
        Trigger
      </Button>
      {state.isOpen && (
        <Portal>
          <Popup
            data-id="popup"
            {...overlayProps}
            state={state}
            {...props}
            triggerRef={triggerRef}
          >
            {props.children || <div>Content</div>}
          </Popup>
        </Portal>
      )}
    </>
  );
};

describe("Basic Popup", () => {
  it("Renders by default", () => {
    cy.mount(<BasicTemplate />);
    cy.get(popup).should("exist");
  });
  it("isOpen renders Popup with arrow", () => {
    cy.mount(<BasicTemplate isOpen />);
    cy.get(popup).should("exist").and("include.text", "Content");
    cy.get(popupArrow).should("exist");
  });
  it("isOpen renders Popup without arrow", () => {
    cy.mount(<BasicTemplate isOpen hideArrow />);
    cy.get(popup).should("exist").and("include.text", "Content");
    cy.get(popupArrow).should("not.exist");
  });
  it("Applies classname correctly to the popup div", () => {
    cy.mount(<BasicTemplate isOpen className={"test-class"} />);
    cy.get(popup)
      .should("have.attr", "class")
      .and("to.have.string", "popup")
      .and("to.have.string", "test-class");
  });
  it("Spreads #a11y html attributes to pop up - id, data-* etc", () => {
    cy.mount(<BasicTemplate id="test" data-random isOpen />);
    cy.get(popup)
      .should("be.visible")
      .should("have.attr", "id")
      .and("equal", "test");
    cy.get(popup).should("be.visible").should("have.attr", "data-random");
  });
});

describe("Focusing and Dismissing", () => {
  it("AutoFocus first item and Escape returns focus to trigger", () => {
    cy.mount(<FocusPopupTemplate />);
    cy.get(trigger).realClick();
    cy.get("[data-focus-test]").should("be.focused");
    cy.realPress("Escape");
    cy.get(trigger).should("be.focused");
  });

  it("closes onBlur by default.", () => {
    cy.mount(<FocusPopupTemplate />);
    cy.get(trigger).realClick();
    cy.get(popup).should("be.visible");
    cy.get("#focusLink").focus();
    cy.get(popup).should("not.exist");
  });

  it("is dismissable by default.", () => {
    cy.mount(<FocusPopupTemplate />);
    cy.get(trigger).realClick();
    cy.get(popup).should("be.visible");
    cy.get("body").realClick();
    cy.get(popup).should("not.exist");
    cy.get("#focusLink").realClick();
  });

  it("is keyboard dismissable by default.", () => {
    cy.mount(<FocusPopupTemplate />);
    cy.get(trigger).realClick();
    cy.get(popup).should("be.visible");
    cy.get(popup).realPress("Escape");
    cy.get(popup).should("not.exist");
  });

  it("isKeyboardDismissDisabled", () => {
    cy.mount(<FocusPopupTemplate isKeyboardDismissDisabled={true} />);
    cy.get(trigger).realClick();
    cy.get(popup).should("be.visible");
    cy.get(popup).realPress("Escape");
    cy.get(popup).should("exist");
  });

  it("shouldCloseOnInteractOutside", () => {
    cy.mount(<FocusPopupTemplate shouldCloseOnInteractOutside={() => false} />);
    cy.get(trigger).realClick();
    cy.get(popup).should("be.visible");
    cy.get("body").realClick({ position: "bottomRight" });
    cy.get(popup).should("exist");
  });
});

describe("Popup offsets", () => {
  it("offset is set for positive numbers", () => {
    cy.mount(<PositionTemplate offset={10} />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "170px");
  });

  it("offset is set for negative numbers", () => {
    cy.mount(<PositionTemplate offset={-10} />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "150px");
  });

  it("crossOffset is set for positive numbers", () => {
    cy.mount(<PositionTemplate crossOffset={10} />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "left", "110px");
  });

  it("crossoffset is set for negative numbers", () => {
    cy.mount(<PositionTemplate crossOffset={-10} />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "left", "90px");
  });
});

describe("Popup placement", () => {
  /* 'bottom' */
  it("'bottom' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="bottom" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "100px");
  });

  it("'bottom left' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="bottom left" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "120px");
  });

  it("'bottom right' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="bottom right" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "80px");
  });

  it("'bottom start' is positioned as expected (as 'bottom left' in ltr)", () => {
    cy.mount(<PositionTemplate placement="bottom start" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "120px");
  });

  it("'bottom end' is positioned as expected (as 'bottom right' in ltr)", () => {
    cy.mount(<PositionTemplate placement="bottom end" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "160px")
      .and("have.css", "left", "80px");
  });

  /* 'top' */
  it("'top' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="top" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "100px");
  });

  it("'top left' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="top left" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "120px");
  });

  it("'top right' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="top right" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "80px");
  });

  it("'top start' is positioned as expected (as 'top left' in ltr)", () => {
    cy.mount(<PositionTemplate placement="top start" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "120px");
  });

  it("'top end' is positioned as expected (as 'top right' in ltr)", () => {
    cy.mount(<PositionTemplate placement="top end" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "40px")
      .and("have.css", "left", "80px");
  });

  /* 'left' */
  it("'left' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="left" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "40px");
  });

  it("'left top' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="left top" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "40px");
  });

  it("'left bottom' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="left bottom" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "40px");
  });

  /* 'start' (same as 'left' in ltr) */
  it("'start' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="start" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "40px");
  });

  it("'start top' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="start top" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "40px");
  });

  it("'start bottom' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="start bottom" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "40px");
  });

  /* 'right' */
  it("'right' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="right" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "160px");
  });

  it("'right top' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="right top" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "160px");
  });

  it("'right bottom' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="right bottom" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "160px");
  });

  /* 'end' (same as 'right' in ltr) */
  it("'end' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="end" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "100px")
      .and("have.css", "left", "160px");
  });

  it("'end top' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="end top" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "120px")
      .and("have.css", "left", "160px");
  });

  it("'end bottom' is positioned as expected", () => {
    cy.mount(<PositionTemplate placement="end bottom" />);
    cy.get(trigger).realClick();
    cy.get(popup)
      .should("have.css", "position", "absolute")
      .and("have.css", "top", "80px")
      .and("have.css", "left", "160px");
  });
});

describe("LoadMore", () => {
  it("Loadmore event fires if not enough content to fit space", () => {
    const onLoadMore = cy.spy().as("onLoadMore");
    cy.mount(
      <TriggerCustomContent loadingState="idle" onLoadMore={onLoadMore}>
        <div>Content</div>
      </TriggerCustomContent>
    );
    cy.get(trigger).realClick();
    cy.get(popup).should("exist");
    cy.get("@onLoadMore").should("have.been.calledOnce");
  });

  it("Loadmore does not fire if enough content exists to force a scroll", () => {
    const onLoadMore = cy.spy().as("onLoadMore");
    cy.mount(
      <TriggerCustomContent loadingState="idle" onLoadMore={onLoadMore}>
        <div style={{ height: "110vh" }}>Content</div>
      </TriggerCustomContent>
    );
    cy.get(trigger).realClick();
    cy.get(popup).should("exist");
    cy.get("@onLoadMore").should("not.have.been.called");
  });

  it("Loadmore event fires on scroll to bottom of the scroller", () => {
    const onLoadMore = cy.spy().as("onLoadMore");
    cy.mount(
      <TriggerCustomContent loadingState="idle" onLoadMore={onLoadMore}>
        <div style={{ height: "110vh" }}>Content</div>
      </TriggerCustomContent>
    );
    cy.get(trigger).realClick();
    cy.get(popup).should("exist");
    cy.get(popupScroller).scrollTo("bottom");
    cy.get("@onLoadMore").should("have.been.calledOnce");
  });
});
