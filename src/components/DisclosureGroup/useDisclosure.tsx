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
