"use-client";
/** Disclosure.tsx */
import React, { useRef, ReactNode, forwardRef } from "react";
import { Button, ButtonCustomProps } from "../Button";
import AngleDown from "../icons/AngleDown";
import type { AlignPos, ComponentBase } from "../typings/shared-types";
import useDisclosure from "./useDisclosure";
import { st, classes } from "./disclosure.st.css";
import type { IconProps } from "../Icon";

/* Disclosure is a component that allows users to toggle the visibility of content.:
1. The `useDisclosure` hook is used to manage the state of the disclosure.
2. The `triggerProps` and `contentProps` are spread onto the elements to manage the aria attributes.
3. The `contentProps` are spread onto the hidden content element to manage the aria-hidden attribute.
4. The `contentRef` is used by useDisclosure to query the hidden content for focusable elements and manage the tabindex/disabled attribute where appropriate.
5. The `triggerProps` are spread onto the trigger element to manage the aria-expanded attribute.
6. The `useId` hook is used to generate an id for the disclosure if one is not provided. this is done inside useDisclosure */

export interface DisclosureProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    ComponentBase {
  /** Disclosure title */
  title: string | ReactNode;
  /** Provide your own icon for the Trigger */
  triggerIcon?: React.VFC<IconProps>;
  /** Icon position "top" | "end" | "bottom" | "start" */
  iconPos?: AlignPos;
  /** Complimentary text for the icon */
  iconText?: string;
  /** defaultOpen */
  defaultOpen?: boolean;
  /** isOpen */
  isOpen?: boolean;
  onOpenChange?: () => void;
  /** Button props */
  triggerProps?: Partial<ButtonCustomProps>;
  /** Visually render the icon alt text. */
  iconAltVisible?: boolean;
  /** Icon alt text in a collapsed state. */
  moreString?: string;
  /** Icon alt text in an expanded state. */
  lessString?: string;
}

function Disclosure(props: DisclosureProps, ref?: React.Ref<HTMLDivElement>) {
  const {
    className,
    children,
    title,
    iconAltVisible,
    moreString = "Show more",
    lessString = "Show less",
    triggerIcon: TriggerIcon = AngleDown,
    iconPos,
    isOpen: isOpenProp,
    defaultOpen,
    onOpenChange,
    triggerProps: triggerPropsFromProps,
    "data-id": dataId,
    ...rest
  } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const { triggerProps, contentProps, isOpen } = useDisclosure({
    id: props?.id,
    isOpen: isOpenProp,
    onOpenChange,
    defaultOpen,
    contentRef,
    children,
  });

  return (
    <article
      className={st(classes.root, { isOpen }, className)}
      data-id={dataId}
      ref={ref}
      {...rest}
    >
      <Button
        icon={
          <TriggerIcon
            altVisible={iconAltVisible}
            alt={isOpen ? moreString : lessString}
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
        {...contentProps}
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
