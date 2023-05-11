import { Ref, useRef, ReactElement, forwardRef } from "react";
import { useTabPanel } from "react-aria";
import { TabListState } from "react-stately";

export interface TabPanelProps<T> {
  /** Add a class to the content div. */
  className?: string;
  state: TabListState<T>;
  /** Add predefined data-id to ease testing or analytics. */
  dataId?: string;
}

function TabPanel<T extends object>({
  dataId,
  className,
  state,
  ...props
}: TabPanelProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div className={className} {...tabPanelProps} ref={ref} data-id={dataId}>
      {(state.selectedItem?.props as { children: ReactElement }).children}
    </div>
  );
}

// export default TabPanel;

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _TabPanel = forwardRef(TabPanel) as <T>(
  props: TabPanelProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _TabPanel as TabPanel };
