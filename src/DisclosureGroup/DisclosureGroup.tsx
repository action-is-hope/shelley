"use-client";
/** DisclosureGroup.tsx */
import type React from "react";
import { Disclosure, DisclosureProps } from "./Disclosure";
import { forwardRef, ReactNode } from "react";
import type { AlignPos, ComponentBase } from "../typings/shared-types";
import { st, classes } from "./disclosureGroup.st.css";

export interface DisclosureGroupProps
  extends React.HTMLAttributes<HTMLElement>,
    ComponentBase {
  /** Disclosure array of items */
  items: DisclosureProps[];
  /** Provide your own icon for the Trigger */
  triggerIcon?: ReactNode;
  /** Icon position "top" | "end" | "bottom" | "start" */
  iconPos?: AlignPos;
  /** Complimentary text for the icon */
  iconText?: string;
}

function DisclosureGroup(
  props: DisclosureGroupProps,
  ref?: React.Ref<HTMLDivElement>
) {
  const {
    className,
    items,
    "data-id": dataId,
    triggerIcon,
    iconPos,
    iconText,
    ...rest
  } = props;
  return (
    <div
      className={st(classes.root, className)}
      data-id={dataId ? dataId : undefined}
      ref={ref}
      {...rest}
    >
      {/* DisclosureGroup - collection of disclosures */}
      <ul
        className={classes.accordion}
        data-id={dataId ? `${dataId}--accordion` : undefined}
      >
        {items.map((item: DisclosureProps, index: number) => (
          <li
            key={index.toString()}
            className={classes.accordionItem}
            data-id={dataId ? `${dataId}--accordionItem` : undefined}
          >
            <Disclosure
              id={item.id}
              title={item.title}
              triggerIcon={triggerIcon}
              iconPos={iconPos}
              iconText={iconText}
              dataId={dataId ? dataId : undefined}
            >
              {item.children}
            </Disclosure>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * DisclosureGroup is responsible for rendering a collection of disclosures
 */
const _DisclosureGroup = forwardRef(DisclosureGroup);
export { _DisclosureGroup as DisclosureGroup };
