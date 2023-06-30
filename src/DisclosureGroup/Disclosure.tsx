"use-client";
/** Disclosure.tsx */
import React, { useEffect, useRef, ReactNode, forwardRef } from "react";
import { Text } from "../Text/Text";
import { Button } from "../Button";
import AngleDown from "../icons/AngleDown";
import type { AlignPos } from "../typings/shared-types";
import useDisclosure from "./useDisclosure";
import { st, classes } from "./disclosure.st.css";

/* Disclosure is a component that allows users to toggle the visibility of content.:
1. The `useDisclosure` hook is used to manage the state of the disclosure.
2. The `triggerProps` and `contentProps` are spread onto the elements to manage the aria attributes.
3. The `contentProps` are spread onto the hidden content element to manage the aria-hidden attribute.
4. The `hiddenContentRef` is used to query the hidden content for focusable elements and manage the tabindex attribute.
5. The `triggerProps` are spread onto the trigger element to manage the aria-expanded attribute.
6. The `useId` hook is used to generate an id for the disclosure. */

export interface DisclosureProps extends React.HTMLAttributes<HTMLElement> {
  /** Disclosure title */
  title: string;
  /** Provide your own icon for the Trigger */
  triggerIcon?: ReactNode;
  /** Data attribute for Cypress tests. */
  dataId?: string;
  /** Icon position "top" | "end" | "bottom" | "start" */
  iconPos?: AlignPos;
  /** Complimentary text for the icon */
  iconText?: string;
  /** defaultOpen */
  defaultOpen?: boolean;
  /** isOpen */
  isOpen?: boolean;
  onOpenChange?: () => void;
}

function Disclosure(props: DisclosureProps, ref?: React.Ref<HTMLDivElement>) {
  const {
    className,
    children,
    title,
    triggerIcon = <AngleDown />,
    dataId,
    iconPos,
    iconText,
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange,
    ...rest
  } = props;

  const hiddenContentRef = useRef<HTMLDivElement>(null);
  const { triggerProps, contentProps, isOpen } = useDisclosure({
    id: props.id,
    isOpen: isOpenProp,
    onOpenChange,
    defaultOpen,
    hiddenContentRef,
    children,
  });

  /**
   * Hides focusable links inside of aria-hidden.
   * @param {HTMLElement} hiddenContentRef - The hidden content ref.
   * @param {boolean} isOpen - The isOpen value.
   */
  useEffect(() => {
    const links = hiddenContentRef?.current?.querySelectorAll("a");
    if (links) {
      const linkArray = Array.from(links) as HTMLElement[];
      for (const link of linkArray) {
        link.tabIndex = isOpen ? 0 : -1;
      }
    }
  }, [isOpen]);

  return (
    <article
      className={st(
        classes.root,
        { isOpen: triggerProps["aria-expanded"] },
        className
      )}
      data-id={dataId ? `${dataId}--disclosure` : undefined}
      ref={ref}
      {...rest}
    >
      <Button
        className={classes.trigger}
        icon={triggerIcon}
        iconPos={iconPos}
        iconText={iconText}
        variant={false}
        tone={false}
        {...triggerProps}
        data-id={dataId ? `${dataId}--trigger` : undefined}
      >
        <Text
          as="span"
          vol={3}
          className={classes.title}
          data-id={dataId ? `${dataId}--title` : undefined}
        >
          {title}
        </Text>
      </Button>

      <Text
        as="div"
        vol={2}
        className={classes.hiddenContent}
        {...contentProps}
        data-id={dataId ? `${dataId}--hidden-content` : undefined}
      >
        <div
          ref={hiddenContentRef}
          className={classes.content}
          data-id={dataId ? `${dataId}--content` : undefined}
        >
          {children}
        </div>
      </Text>
    </article>
  );
}

const _Disclosure = forwardRef(Disclosure);
export { _Disclosure as Disclosure };
