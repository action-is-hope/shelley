"use-client";
/** Disclosure.tsx */
import React, { VFC, useRef, ReactNode, forwardRef } from "react";
import { Button, ButtonCustomProps } from "../Button";
import AngleDown from "../icons/AngleDown";
import type { AlignPos, ComponentBase } from "../typings/shared-types";
import useDisclosure from "./useDisclosure";
import { st, classes } from "./disclosure.st.css";
import type { IconProps } from "../Icon";

/* Disclosure is a component that allows users to toggle the visibility of content.:
1. The `useDisclosure` hook is used to manage the state of the disclosure.
2. The `triggerProps` and `transitionProps` are spread onto the elements to manage the aria attributes.
3. The `transitionProps` are spread onto the transition element to manage the aria-hidden attribute.
4. The `contentRef` is used by useDisclosure to query the hidden content for focusable elements and manage the tabindex/disabled attribute where appropriate.
5. The `triggerProps` are spread onto the trigger element to manage the aria-expanded attribute.
6. The `useId` hook is used to generate an id for the disclosure if one is not provided. this is done inside useDisclosure */

export interface DisclosureProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    ComponentBase {
  /** Disclosure title */
  title: string | ReactNode;
  /** Provide your own icon for the Trigger */
  triggerIcon?: VFC<IconProps>;
  /** Icon position "top" | "end" | "bottom" | "start" @default 'end' */
  iconPos?: AlignPos;
  /** defaultExpanded */
  defaultExpanded?: boolean;
  /** isExpanded */
  isExpanded?: boolean;
  /** Callback fired when trigger is selected. */
  onExpandedChange?: () => void;
  /** Button props, for icoon use triggerIcon. */
  triggerProps?: Omit<ButtonCustomProps, "icon">;
  /** Visually render the icon alt text. */
  iconAltVisible?: boolean;
  /** Icon alt text in a collapsed state. @default 'Expand' */
  expandString?: string;
  /** Icon alt text in an expanded state. @default 'Collapse' */
  collapseString?: string;
}

function Disclosure(props: DisclosureProps, ref?: React.Ref<HTMLDivElement>) {
  const {
    className,
    children,
    title,
    iconAltVisible,
    expandString = "Expand",
    collapseString = "Collapse",
    triggerIcon: TriggerIcon = AngleDown,
    iconPos = "end",
    isExpanded: isExpandedProp,
    defaultExpanded,
    onExpandedChange,
    triggerProps: triggerPropsFromProps,
    "data-id": dataId,
    ...rest
  } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const { triggerProps, transitionProps, isExpanded } = useDisclosure({
    id: props?.id,
    isExpanded: isExpandedProp,
    onExpandedChange,
    defaultExpanded,
    contentRef,
    children,
  });

  return (
    <article
      className={st(classes.root, { isExpanded }, className)}
      data-id={dataId}
      ref={ref}
      {...rest}
    >
      <Button
        icon={
          <TriggerIcon
            altVisible={iconAltVisible}
            alt={isExpanded ? expandString : collapseString}
          />
        }
        iconPos={iconPos}
        variant={false}
        tone={false}
        vol={false}
        {...triggerPropsFromProps}
        className={classes.trigger}
        {...triggerProps}
        data-id={dataId ? `${dataId}--trigger` : undefined}
      >
        {title}
      </Button>

      <div
        className={st(classes.transition)}
        {...transitionProps}
        data-id={dataId ? `${dataId}--transition` : undefined}
      >
        <div
          ref={contentRef}
          className={st(classes.content)}
          data-id={dataId ? `${dataId}--content` : undefined}
        >
          {children}
        </div>
      </div>
    </article>
  );
}

const _Disclosure = forwardRef(Disclosure);
export { _Disclosure as Disclosure };
