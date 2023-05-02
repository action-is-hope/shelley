import { Ref, useRef, ReactElement, forwardRef } from "react";
import { useTabPanel } from "react-aria";
import { TabListState } from "react-stately";
import { st, classes } from "./tabPanel.st.css";

export interface TabPanelProps<T> {
  state: TabListState<T>;
}

function TabPanel<T extends object>({ state, ...props }: TabPanelProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div className={st(classes.root)} {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}

export default TabPanel;

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _TabPanel = forwardRef(TabPanel) as <T>(
  props: TabPanelProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _TabPanel as TabPanel };
