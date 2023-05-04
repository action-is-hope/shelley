import { Ref, useRef, ReactElement, forwardRef } from "react";
import { useTab } from "react-aria";
import { Node } from "@react-types/shared";
import { TabListState } from "react-stately";

import { st, classes } from "./tab.st.css";

export interface TabProps<T> {
  /** Add a class to the content div. */
  className?: string;
  id?: string;
  /** Tab item */
  item: Node<T>;
  state: TabListState<T>;
  /** Add predefined data-id to ease testing or analytics. */
  dataId?: string;
}

function Tab<T extends object>({
  item,
  state,
  className,
  dataId,
}: TabProps<T>) {
  const { key, rendered } = item;
  const ref = useRef<HTMLDivElement>(null);
  const { tabProps } = useTab({ key }, state, ref);

  return (
    <div
      className={st(classes.root, className)}
      {...tabProps}
      ref={ref}
      data-id={dataId}
    >
      {rendered}
    </div>
  );
}

export default Tab;

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Tab = forwardRef(Tab) as <T>(
  props: TabProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _Tab as Tab };
