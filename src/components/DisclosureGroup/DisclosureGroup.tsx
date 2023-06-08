/** DisclosureGroup.tsx */
import { st, classes } from "./disclosure.st.css";
import Disclosure, { DisclosureProps } from "./Disclosure";

export interface DisclosureGroupProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Disclosure array of items */
  items: DisclosureProps[];
}

const DisclosureGroup: React.VFC<DisclosureGroupProps> = ({
  className,
  items,
  ...rest
}) => (
  <div className={st(classes.root, className)} {...rest}>
    {/* DisclosureGroup - collection of disclosures */}
    <ul className={classes.accordion}>
      {items.map((item: DisclosureProps, index: number) => (
        <li key={index.toString()} className={classes.accordionItem}>
          <Disclosure id={item.id} title={item.title}>
            {item.children}
          </Disclosure>
        </li>
      ))}
    </ul>
  </div>
);

export default DisclosureGroup;
