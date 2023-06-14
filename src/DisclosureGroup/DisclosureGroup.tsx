/** DisclosureGroup.tsx */
import { st, classes } from "./disclosureGroup.st.css";
import Disclosure, { DisclosureProps } from "./Disclosure";

export interface DisclosureGroupProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Disclosure array of items */
  items: DisclosureProps[];
  /** Data attribute for Cypress tests. */
  "data-id"?: string;
}

const DisclosureGroup: React.VFC<DisclosureGroupProps> = ({
  className,
  items,
  "data-id": dataId,
  ...rest
}) => (
  <div
    className={st(classes.root, className)}
    {...rest}
    data-id={dataId ? `${dataId}--disclosureGroup` : undefined}
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
          <Disclosure id={item.id} title={item.title}>
            {item.children}
          </Disclosure>
        </li>
      ))}
    </ul>
  </div>
);

export default DisclosureGroup;
