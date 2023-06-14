/** Disclosure.tsx */
import React, { useEffect, useRef, ReactNode } from "react";
import { st, classes } from "./disclosureGroup.st.css";
import { Text } from "../Text/Text";
import { Button } from "../Button";
import AngleDown from "../icons/AngleDown";
import { useId } from "@react-aria/utils";

import useDisclosure from "./useDisclosure";

export interface DisclosureProps extends React.HTMLAttributes<HTMLElement> {
  /** ID, required for accessibility aria assignment. */
  id?: string;
  /** Disclosure title */
  title: string;
  /** Provide your own icon for the Trigger */
  triggerIcon?: ReactNode;
  /** Data attribute for Cypress tests. */
  "data-id"?: string;
}

const Disclosure: React.VFC<DisclosureProps> = ({
  id: idProp,
  className,
  children,
  title,
  triggerIcon = <AngleDown />,
  "data-id": dataId,
  ...rest
}) => {
  const id = useId(idProp);
  const hiddenContentRef = useRef<HTMLDivElement>(null);
  const { triggerProps, contentProps, isExpanded } = useDisclosure({
    id,
    hiddenContentRef,
    children,
  });

  useEffect(() => {
    /* https://bcdigital.atlassian.net/browse/BEACON-2193 hide focusable links inside of aria-hidden. */
    const links = hiddenContentRef?.current?.querySelectorAll("a");
    for (const key in links) {
      if (Object.prototype.hasOwnProperty.call(links, key))
        (links[key] as HTMLElement).tabIndex = isExpanded ? 0 : -1;
    }
  }, [isExpanded]);

  return (
    <article
      className={st(
        classes.disclosure,
        { isExpanded: triggerProps["aria-expanded"] },
        className
      )}
      {...rest}
      data-id={dataId ? `${dataId}--disclosure` : undefined}
    >
      <Button
        className={classes.trigger}
        icon={triggerIcon}
        variant={false}
        tone={false}
        {...triggerProps}
        onClick={() => triggerProps.onClick()}
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
};

export default Disclosure;
