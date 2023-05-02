import { Ref, useRef, ReactElement, forwardRef } from "react";
import { useTab } from "react-aria";
import { Node } from "@react-types/shared";
import { TabListState } from "react-stately";

import { st, classes } from "./tab.st.css";

export interface TabProps<T> {
  id?: string;
  item: Node<T>;
  state: TabListState<T>;
}

function Tab<T extends object>({ item, state }: TabProps<T>) {
  const { key, rendered } = item;
  const ref = useRef<HTMLDivElement>(null);
  const { tabProps } = useTab({ key }, state, ref);

  return (
    <div className={st(classes.root)} {...tabProps} ref={ref}>
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
