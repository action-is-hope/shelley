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

function Tab({ item, state }) {
  const ref = useRef();
  const { tabProps } = useTab(item, state, ref);

  return (
    <div {...tabProps} ref={ref}>
      {item.rendered}
    </div>
  );
}

function TabPanel({ state, ...props }) {
  const ref = useRef();
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}

export function Tabs(props) {
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
    <div className="tabs">
      <div className="tablist-container">
        <div
          className={`tab-selection ${isFocusVisible ? "focused" : ""}`}
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
