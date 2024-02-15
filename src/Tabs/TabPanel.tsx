"use client";
import { useRef, ReactElement, forwardRef } from "react";
import { useTabPanel } from "react-aria";
import { mergeRefs } from "@react-aria/utils";
import type { TabListState } from "react-stately";
import { classes } from "./tabs.st.css";
export interface TabPanelProps<T> {
  state: TabListState<T>;
  dataId?: string;
}

function TabPanel<T extends object>(
  { dataId, state, ...props }: TabPanelProps<T>,
  ref?: React.Ref<HTMLDivElement>
) {
  const internalRef = useRef<HTMLDivElement>(null);
  const { tabPanelProps } = useTabPanel(props, state, internalRef);

  return (
    <div
      className={classes.tabPanel}
      {...tabPanelProps}
      ref={ref ? mergeRefs(ref, internalRef) : internalRef}
      data-id={dataId}
    >
      {(state.selectedItem?.props as { children: ReactElement })?.children}
    </div>
  );
}
TabPanel.displayName = "TabPanel";

const _TabPanel = forwardRef(TabPanel);
export { _TabPanel as TabPanel };
