import {
  ToastProvider,
  useToast,
  ToastProviderProps,
  Button,
  CustomToastContent,
} from "../../src/indexLib";

const toastRegion = '[data-id="toastRegion"]';
const toastTrigger = '[data-id="toastTrigger"]';
const toast = '[data-id="toastRegion--toast"]';
const toastTitle = '[data-id="toastRegion--toast--title"]';
const toastClose = '[data-id="toastRegion--toast--closeButton"]';

const Provider = function (props: Partial<ToastProviderProps>) {
  const { children, ...rest } = props;
  return (
    <ToastProvider data-id="toastRegion" {...rest}>
      {children}
    </ToastProvider>
  );
};

const BasicToast = function (props: CustomToastContent) {
  const toastQueue = useToast();
  return (
    <Button
      data-id="toastTrigger"
      onPress={() => toastQueue && toastQueue?.add({ title: props.title })}
    >
      Add toast
    </Button>
  );
};

describe("Basic Toast", () => {
  it("renders functional toast with aria attributes", () => {
    cy.mount(
      <Provider>
        <BasicToast title="Show Default Toast" />
      </Provider>
    );
    cy.get(toastRegion).should("not.exist");
    cy.get(toastTrigger).realClick();
    cy.wait(500);
    cy.get(toastRegion).should("exist").and("have.attr", "role", "region");
    cy.get(toast)
      .should("exist")
      .and("have.attr", "role", "alert")
      .invoke("attr", "aria-labelledby")
      .then((labelledbyId) =>
        cy.get(toastTitle).should("have.attr", "id", labelledbyId)
      );
    cy.get(toastClose).focus().realPress("Enter");
    cy.wait(500);
    cy.get(toast).should("not.exist");
  });
});

describe("Toast", () => {
  it("renders classNames and click closes", () => {
    cy.mount(
      <Provider>
        <BasicToast title="Show Default Toast" />
      </Provider>
    );
    cy.get(toastRegion).should("not.exist");
    cy.get(toastTrigger).realClick();
    cy.wait(500);
    cy.get(toast)
      .should("have.attr", "class")
      .and("to.have.string", "toast")
      .and("to.have.string", "neutral");

    cy.get(toastClose).realClick();
    cy.wait(500);
    cy.get(toast).should("not.exist");
  });
});
