/** DisclosureGroup.tsx */
import { st, classes } from "./disclosureGroup.st.css";
import Disclosure, { DisclosureProps } from "./Disclosure";
import { ReactElement, Ref, forwardRef } from "react";

export interface DisclosureGroupProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Disclosure array of items */
  items: DisclosureProps[];
  /** Data attribute for Cypress tests. */
  "data-id"?: string;
}

function DisclosureGroup(props: DisclosureGroupProps) {
  const { className, items, "data-id": dataId, ...rest } = props;
  return (
    <div
      className={st(classes.root, className)}
      {...rest}
      data-id={dataId ? dataId : undefined}
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

DisclosureGroup.displayName = "DisclosureGroup";

export default DisclosureGroup;

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _DisclosureGroup = forwardRef(DisclosureGroup) as (
  props: DisclosureGroupProps & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _DisclosureGroup as DisclosureGroup };
