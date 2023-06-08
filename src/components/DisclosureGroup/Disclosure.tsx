/** Disclosure.tsx */
import React, { useEffect, useRef } from "react";
import { st, classes } from "./disclosureGroup.st.css";
import Text from "../Text/Text";
// import Icon from "../Icon/Icon";
import { useId } from "@react-aria/utils";

import useDisclosure from "./useDisclosure";

export interface DisclosureProps extends React.HTMLAttributes<HTMLElement> {
  /** ID, required for accessibility aria assignment. */
  id?: string;
  /** Disclosure title */
  title: string;
}

const Disclosure: React.VFC<DisclosureProps> = ({
  id: idProp,
  className,
  children,
  title,
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
    >
      <button
        className={classes.trigger}
        {...triggerProps}
        onClick={() => triggerProps.onClick()}
      >
        <Text as="span" className={classes.title}>
          {title}
        </Text>
        {/* <Icon icon="chevronDown" className={classes.triggerIcon} /> */}
      </button>

      <div className={classes.hiddenContent} {...contentProps}>
        <div ref={hiddenContentRef} className={classes.content}>
          {children}
        </div>
      </div>
    </article>
  );
};

export default Disclosure;
