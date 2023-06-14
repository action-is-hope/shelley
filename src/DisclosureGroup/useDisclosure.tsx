/** useDisclosure.tsx */
import { useCallback, useEffect, useState } from "react";

interface UseDisclosureProps {
  id: string;
  isExpanded?: boolean;
  hiddenContentRef?: React.RefObject<HTMLDivElement>;
  children?: any;
}

type TriggerProps = {
  id: string;
  onClick: () => void;
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
  isExpanded: boolean;
  trigger: () => void;
};

/* useDisclosure hook :
1. We create a function useDisclosure which takes an object as the argument. The object has the following properties:
   - id: A string to uniquely identify the disclosure.
   - isExpanded: A boolean to set the initial state of the disclosure. Optional.
   - hiddenContentRef: A React ref to the hidden content of the disclosure. Optional.
2. We then create the useDisclosureReturn object which has the following properties:
   - triggerProps: An object with the props that should be applied to the trigger element (the button).
   - contentProps: An object with the props that should be applied to the content (the hidden element).
   - isExpanded: A boolean to check if the disclosure is expanded or not.
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
  id,
  isExpanded: isExpandedProp,
  hiddenContentRef,
}: UseDisclosureProps): useDisclosureReturn => {
  const [isExpanded, setIsExpanded] = useState<boolean>(
    typeof isExpandedProp !== "undefined" ? isExpandedProp : false
  );
  const [height, setHeight] = useState<number>(0);

  const setHiddenContentHeight = useCallback(() => {
    if (hiddenContentRef && hiddenContentRef.current) {
      setHeight(hiddenContentRef.current.scrollHeight);
    }
    typeof isExpandedProp !== "undefined" && setIsExpanded(isExpandedProp);
  }, [hiddenContentRef, isExpandedProp]);

  useEffect(() => {
    // Fire when we resize (else text be overlapping!).
    window.addEventListener("resize", setHiddenContentHeight);
    return () => {
      // Tidy up
      window.removeEventListener("resize", setHiddenContentHeight);
    };
  }, [setHiddenContentHeight]);

  const trigger = useCallback(() => {
    setHiddenContentHeight();
    setIsExpanded((v) => !v);
  }, [setHiddenContentHeight]);

  const triggerProps: TriggerProps = {
    id: `${id}-trigger`,
    onClick: trigger,
    type: "button",
    "aria-expanded": isExpanded,
    "aria-controls": `${id}` + "-content",
  };

  const contentProps: ContentProps = {
    id: `${id}` + "-content",
    "aria-hidden": !isExpanded,
    "aria-labelledby": `${id}-trigger`,
    // If the disclosure is set to display none or maybe offscreen on initial load then
    // height might be 0 in which case fallback to height: auto (losing the transition).
    style: {
      height: isExpanded ? (height !== 0 ? `${height}px` : "auto") : "0px",
    },
  };

  return { triggerProps, contentProps, isExpanded, trigger };
};
export default useDisclosure;
