"use-client";
/** DisclosureGroup.tsx */
import type React from "react";
import type { ReactElement, Ref } from "react";
import { Disclosure, DisclosureProps } from "./Disclosure";
import { useState, forwardRef, ReactNode } from "react";
import type { AlignPos, ComponentBase } from "../typings/shared-types";
import { st, classes } from "./disclosureGroup.st.css";
import { useId } from "react-aria";

export type DisclosureChildren<T> =
  | ReactElement<T>
  | ReactElement<T>[]
  | ((item: T, index: number) => ReactElement<T>);

export interface DisclosureGroupProps<T>
  extends Omit<DisclosureProps, "onOpenChange" | "children">,
    ComponentBase {
  /** Disclosure array of items */
  items?: T[];
  /** Provide your own icon for the Trigger */
  // triggerIcon?: ReactNode;
  /** Icon position "top" | "end" | "bottom" | "start" */
  // iconPos?: AlignPos;
  /** Complimentary text for the icon */
  // iconText?: string;
  /** Childen or function if using items. */
  children?: DisclosureChildren<T>;
  /** Only one Disclosure will open at a time (accordian). */
  singleView?: boolean;
}

function DisclosureGroup<T extends DisclosureProps>(
  props: DisclosureGroupProps<T>,
  ref?: React.Ref<HTMLDivElement>
) {
  const {
    className,
    items,
    triggerIcon,
    iconPos,
    iconText,
    children,
    singleView,
    "data-id": dataId,
    ...rest
  } = props;
  const [openId, setOpenId] = useState<string | false>();

  return (
    <div
      className={st(classes.root, className)}
      data-id={dataId ? dataId : undefined}
      ref={ref}
      {...rest}
    >
      {/* DisclosureGroup - collection of disclosures */}
      {items
        ? items.map((item, index) => {
            const id = useId(item?.id);
            const singleViewprops = singleView
              ? {
                  isOpen: openId === id,
                  onOpenChange: () => setOpenId((v) => (v === id ? false : id)),
                }
              : {};
            return (
              <Disclosure
                {...{
                  id,
                  triggerIcon,
                  iconPos,
                  iconText,
                  "data-id": dataId ? `${dataId}--disclosure` : undefined,
                }}
                {...singleViewprops}
                className={classes.disclosure}
                title={item?.title}
                key={id}
              >
                {typeof children === "function"
                  ? children(item, index)
                  : item?.children}
              </Disclosure>
            );
          })
        : children}
    </div>
  );
}

/**
 * DisclosureGroup is responsible for rendering a collection of disclosures
 */
// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _DisclosureGroup = forwardRef(DisclosureGroup) as <T>(
  props: DisclosureGroupProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _DisclosureGroup as DisclosureGroup };
