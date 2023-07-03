/** useDisclosure.tsx */
import { useCallback, useEffect, useState } from "react";
import { useId } from "@react-aria/utils";

interface UseDisclosureProps {
  id?: string;
  isOpen?: boolean;
  onOpenChange?: () => void;
  defaultOpen?: boolean;
  contentRef?: React.RefObject<HTMLDivElement>;
  children?: any;
}

type TriggerProps = {
  id: string;
  onPress: () => void;
  type: "button" | "reset" | "submit" | undefined;
  "aria-expanded": boolean;
  "aria-controls": string;
};

type ContentProps = {
  id: string;
  "aria-hidden": boolean;
  "aria-labelledby": string;
  style: {
    [key: string]: string;
  };
};

type useDisclosureReturn = {
  triggerProps: TriggerProps;
  contentProps: ContentProps;
  isOpen: boolean;
  trigger: () => void;
};

/* useDisclosure hook :

This code defines a hook that manages the state of a disclosure used to hide and show content.
It needs to know the id of the disclosure, whether it is expanded, and a ref to the content that
is to be hidden and shown. The hook returns an object containing triggerProps and contentProps
that are to be spread onto the trigger and content respectively as well as isOpen and a
trigger function that can be used to toggle the disclosure state.

1. We create a function useDisclosure which takes an object as the argument. The object has the following properties:
   - id: A string to uniquely identify the disclosure.
   - isOpen: A boolean to set the initial state of the disclosure. Optional.
   - contentRef: A React ref to the hidden content of the disclosure. Optional.
2. We then create the useDisclosureReturn object which has the following properties:
   - triggerProps: An object with the props that should be applied to the trigger element (the button).
   - contentProps: An object with the props that should be applied to the content (the hidden element).
   - isOpen: A boolean to check if the disclosure is expanded or not.
   - trigger: A function that can be used to trigger the disclosure.
3. We then return the useDisclosureReturn object.
4. We then create the triggerProps object which has the following properties:
   - id: The id of the trigger element.
   - onClick: The function that should be called when the trigger is clicked.
   - type: The type of the trigger element.
   - aria-expanded: A string that should be set to true or false depending on the state of the disclosure.
   - aria-controls: The id of the content element.
5. We then create the contentProps object which has the following properties:
   - id: The id of the content element.
   - aria-hidden: A string that should be set to true or false depending on the state of the disclosure.
   - aria-labelledby: The id of the trigger element.
   - style: An object with the style properties that should be applied to the content element. Here we are setting the height of the element to be 0px if the disclosure is not expanded and to the height of the content if it is expanded.
6. We then return the useDisclosureReturn object. */

const useDisclosure = ({
  id: idProp,
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpenChange,
  contentRef,
}: UseDisclosureProps): useDisclosureReturn => {
  const id = useId(idProp);
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [height, setHeight] = useState<number>(0);

  const setHiddenContentHeight = useCallback(() => {
    if (contentRef && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
    // }, [contentRef]);
  }, [contentRef, isOpenProp]);

  useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  useEffect(() => {
    setHiddenContentHeight();
    // Fire when we resize (else text be overlapping!).
    window.addEventListener("resize", setHiddenContentHeight);
    return () => window.removeEventListener("resize", setHiddenContentHeight);
  }, [setHiddenContentHeight]);

  /**
   * Hides focusable links inside of aria-hidden.
   * @param {HTMLElement} contentRef - The hidden content ref.
   * @param {boolean} isOpen - The isOpen value.
   */
  useEffect(() => {
    const links = contentRef?.current?.querySelectorAll("a");
    if (links) {
      const linkArray = Array.from(links) as HTMLElement[];
      for (const link of linkArray) {
        link.tabIndex = isOpen ? 0 : -1;
      }
    }
    const formElements = contentRef?.current?.querySelectorAll(
      "input, button, select"
    );
    if (formElements) {
      const formElementsArray = Array.from(formElements) as HTMLInputElement[];
      for (const formElment of formElementsArray) {
        formElment.disabled = isOpen ? false : true;
      }
    }
  }, [isOpen]);

  const trigger = useCallback(() => {
    setHiddenContentHeight();
    onOpenChange ? onOpenChange() : setIsOpen((v) => !v);
  }, [setHiddenContentHeight]);

  const triggerProps: TriggerProps = {
    id: `${id}-trigger`,
    onPress: trigger,
    type: "button",
    "aria-expanded": isOpen,
    "aria-controls": `${id}` + "-content",
  };

  const contentProps: ContentProps = {
    id: `${id}` + "-content",
    "aria-hidden": !isOpen,
    "aria-labelledby": `${id}-trigger`,
    // If the disclosure is set to display none or maybe offscreen on initial load then
    // height might be 0 in which case fallback to height: auto (losing the transition).
    style: {
      height: isOpen ? (height !== 0 ? `${height}px` : "auto") : "0px",
    },
  };

  return { triggerProps, contentProps, isOpen, trigger };
};
export default useDisclosure;
