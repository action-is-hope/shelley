/** DisclosureGroup.tsx */
import { st, classes } from "./disclosure.st.css";
import Disclosure, { DisclosureProps } from "./Disclosure";
import ContentContainer, {
  ContentContainerProps,
} from "../ContentContainer/ContentContainer";

export interface DisclosureGroupProps extends ContentContainerProps {
  /** Disclosure array of items */
  items: DisclosureProps[];
}

const DisclosureGroup: React.VFC<DisclosureGroupProps> = ({
  className,
  items,
  ...rest
}) => (
  <ContentContainer
    className={st(classes.root, className)}
    size="inset"
    {...rest}
  >
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
  </ContentContainer>
);

export default DisclosureGroup;
