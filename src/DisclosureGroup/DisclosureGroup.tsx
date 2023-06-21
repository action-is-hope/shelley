/** DisclosureGroup.tsx */
import { st, classes } from "./disclosureGroup.st.css";
import { Disclosure, DisclosureProps } from "./Disclosure";
import { forwardRef } from "react";

export interface DisclosureGroupProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Disclosure array of items */
  items: DisclosureProps[];
  /** Data attribute for Cypress tests. */
  "data-id"?: string;
}

function DisclosureGroup(
  props: DisclosureGroupProps,
  ref?: React.Ref<HTMLDivElement>
) {
  const { className, items, "data-id": dataId, ...rest } = props;
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
