import { useTabListState } from "react-stately";
import React, { useEffect, useRef, useState } from "react";
import { useTabList, useFocusRing, mergeProps } from "react-aria";
import Tab from "../Tab/Tab";
import TabPanel from "../TabPanel/TabPanel";
import { st, classes } from "./tabs.st.css";

export interface TabsProps {
  [key: string]: any;
  className?: string;
}

const Tabs = (props: TabsProps) => {
  const state = useTabListState(props);
  const ref = useRef<HTMLDivElement>(null);
  const { tabListProps } = useTabList(props, state, ref);

  const { focusProps } = useFocusRing({
    within: true,
  });

  return (
    <div className={st(classes.root)}>
      <div className={classes.tabListContainer}>
        <div className={classes.tabSelection} />
        <div
          className={classes.tabList}
          {...mergeProps(tabListProps, focusProps)}
          ref={ref}
        >
          {[...state.collection].map((item) => (
            <Tab key={item.key} item={item} state={state} />
          ))}
        </div>
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
};

Tabs.displayName = "Tabs";

export default Tabs;
