/** Disclosure.tsx */
import React, { useEffect, useRef, ReactNode, forwardRef } from "react";
import { st, classes } from "./disclosure.st.css";
import { Text } from "../Text/Text";
import { Button } from "../Button";
import AngleDown from "../icons/AngleDown";
import { useId } from "@react-aria/utils";

import useDisclosure from "./useDisclosure";

/* Disclosure is a component that allows users to toggle the visibility of content.:
1. The `useDisclosure` hook is used to manage the state of the disclosure.
2. The `triggerProps` and `contentProps` are spread onto the elements to manage the aria attributes.
3. The `contentProps` are spread onto the hidden content element to manage the aria-hidden attribute.
4. The `hiddenContentRef` is used to query the hidden content for focusable elements and manage the tabindex attribute.
5. The `triggerProps` are spread onto the trigger element to manage the aria-expanded attribute.
6. The `useId` hook is used to generate an id for the disclosure. */

export interface DisclosureProps extends React.HTMLAttributes<HTMLElement> {
  /** ID, required for accessibility aria assignment. */
  id: string;
  /** Disclosure title */
  title: string;
  /** Provide your own icon for the Trigger */
  triggerIcon?: ReactNode;
  /** Data attribute for Cypress tests. */
  dataId?: string;
}

function Disclosure(props: DisclosureProps, ref?: React.Ref<HTMLDivElement>) {
  const {
    id: idProp,
    className,
    children,
    title,
    triggerIcon = <AngleDown />,
    dataId,
    ...rest
  } = props;

  const id = useId(idProp);
  const hiddenContentRef = useRef<HTMLDivElement>(null);
  const { triggerProps, contentProps, isExpanded } = useDisclosure({
    id,
    hiddenContentRef,
    children,
  });

  /**
   * Hides focusable links inside of aria-hidden.
   * @param {HTMLElement} hiddenContentRef - The hidden content ref.
   * @param {boolean} isExpanded - The isExpanded value.
   */
  useEffect(() => {
    const links = hiddenContentRef?.current?.querySelectorAll("a");
    if (links) {
      const linkArray = Array.from(links) as HTMLElement[];
      for (const link of linkArray) {
        link.tabIndex = isExpanded ? 0 : -1;
      }
    }
  }, [isExpanded]);

  return (
    <article
      className={st(
        classes.root,
        { isExpanded: triggerProps["aria-expanded"] },
        className
      )}
      data-id={dataId ? `${dataId}--disclosure` : undefined}
      ref={ref}
      {...rest}
    >
      <Button
        className={classes.trigger}
        icon={triggerIcon}
        variant={false}
        tone={false}
        {...triggerProps}
        onClick={() => triggerProps.onClick()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            triggerProps.onClick();
          }
        }}
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
