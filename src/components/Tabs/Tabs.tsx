import { useTabListState } from "react-stately";
import React, { useEffect, useRef, useState } from "react";
import {
  useTab,
  useTabList,
  useTabPanel,
  useFocusRing,
  mergeProps,
} from "react-aria";
import { st, classes } from "./tabs.st.css";

interface TabProps {
  item: any;
  state: any;
  children: any;
}

function Tab({ item, state }: TabProps) {
  const ref = useRef();
  const { tabProps } = useTab(item, state, ref);

  return (
    <div {...tabProps} ref={ref}>
      {item.rendered}
    </div>
  );
}

interface TabPanelProps {
  state: any;
  [key: string]: any;
}

function TabPanel({ state, ...props }: TabPanelProps) {
  const ref = useRef();
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}

export interface TabsProps {
  [key: string]: any;
}

export function Tabs(props: TabProps) {
  const state = useTabListState(props);
  const ref = useRef();
  const { tabListProps } = useTabList(props, state, ref);

  const [activeTabStyle, setActiveTabStyle] = useState({
    width: 0,
    transform: "translateX(0)",
  });

  useEffect(() => {
    const activeTab = ref.current.querySelector(
      '[role="tab"][aria-selected="true"]'
    );
    setActiveTabStyle({
      width: activeTab?.offsetWidth,
      transform: `translateX(${activeTab?.offsetLeft}px)`,
    });
  }, [state.selectedKey]);

  const { focusProps, isFocusVisible } = useFocusRing({
    within: true,
  });

  return (
    <div className={st(classes.root, { isFocusVisible })}>
      <div className={classes.tabListContainer}>
        <div
          className={(classes.tabSelection, isFocusVisible ? "focused" : "")}
          style={{ zIndex: -1, ...activeTabStyle }}
        />
        <div {...mergeProps(tabListProps, focusProps)} ref={ref}>
          {[...state.collection].map((item) => (
            <Tab key={item.key} item={item} state={state} />
          ))}
        </div>
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

Tabs.displayName = "Tabs";

export default Tabs;
