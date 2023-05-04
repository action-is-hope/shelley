import { Ref, useRef, ReactElement, forwardRef } from "react";
import { useTabListState } from "react-stately";
import { useTabList, useFocusRing, mergeProps } from "react-aria";
import { TabListProps } from "react-stately";
import Tab from "../Tab/Tab";
import TabPanel from "../TabPanel/TabPanel";
import { st, classes } from "./tabs.st.css";

export interface TabsProps<T> extends TabListProps<T> {
  /** Add a class to the content div. */
  className?: string;
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
}

function Tabs<T extends object>(props: TabsProps<T>) {
  const { className: classNameProp, "data-id": dataId } = props;
  const state = useTabListState(props);
  const ref = useRef<HTMLDivElement>(null);
  const { tabListProps } = useTabList(props, state, ref);

  const { focusProps } = useFocusRing({
    within: true,
  });

  return (
    <div className={st(classes.root, classNameProp)} data-id={dataId}>
      <div className={classes.tabListContainer}>
        <div className={classes.tabSelection} />
        <div
          className={classes.tabList}
          {...mergeProps(tabListProps, focusProps)}
          ref={ref}
          data-id={dataId ? `${dataId}-tab-list` : undefined}
        >
          {[...state.collection].map((item) => (
            <Tab
              key={item.key}
              item={item}
              state={state}
              dataId={dataId ? `${dataId}-tab-item` : undefined}
            />
          ))}
        </div>
      </div>
      <TabPanel
        key={state.selectedItem?.key}
        state={state}
        dataId={dataId ? `${dataId}-tab-panel` : undefined}
      />
    </div>
  );
}

Tabs.displayName = "Tabs";

export default Tabs;

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _Tabs = forwardRef(Tabs) as <T>(
  props: TabsProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _Tabs as Tabs };
