"use client";
import { useRef, useState, useEffect, forwardRef } from "react";
import { useTabListState } from "react-stately";
import {
  useTabList,
  useFocusRing,
  mergeProps,
  AriaTabListProps,
} from "react-aria";
import { mergeRefs } from "@react-aria/utils";
import { Tab } from "./Tab";
import { TabPanel } from "./TabPanel";
import { st, classes } from "./tabs.st.css";
import type { ComponentBase } from "../typings/shared-types";

export interface TabsProps<T> extends AriaTabListProps<T>, ComponentBase {
  /** Add a class to the content div. */
  className?: string;
  /**
   * Sets the volume of the tabs, use `false` to unset
   * @default 1
   */
  vol?: 1 | 2 | 3 | false;
}

function Tabs<T extends object>(
  props: TabsProps<T>,
  ref?: React.Ref<HTMLDivElement>
) {
  const localRef = useRef<HTMLDivElement>(null);
  const {
    className: classNameProp,
    orientation = "horizontal",
    vol = 1,
    "data-id": dataId,
  } = props;
  const state = useTabListState(props);
  const { tabListProps } = useTabList(props, state, localRef);

  const { focusProps, isFocusVisible } = useFocusRing({
    within: true,
  });

  const [activeTabStyle, setActiveTabStyle] = useState(
    props.orientation === "vertical"
      ? {
          height: 0,
          transform: "translateY(0)",
        }
      : {
          width: 0,
          transform: "translateX(0)",
        }
  );

  useEffect(() => {
    const activeTab = localRef?.current?.querySelector(
      '[role="tab"][aria-selected="true"]'
    );
    // Active tab width or height calculation.
    setActiveTabStyle(
      orientation === "vertical"
        ? {
            height: (activeTab as HTMLElement)?.offsetHeight,
            transform: `translateY(${(activeTab as HTMLElement)?.offsetTop}px)`,
          }
        : {
            width: (activeTab as HTMLElement)?.offsetWidth,
            transform: `translateX(${
              (activeTab as HTMLElement)?.offsetLeft
            }px)`,
          }
    );
  }, [state.selectedKey, orientation]);

  return (
    <div
      className={st(
        classes.root,
        { orientation, vol: vol || undefined },
        classNameProp
      )}
      data-id={dataId}
    >
      <div className={classes.tabListContainer}>
        <div
          className={classes.tabList}
          {...mergeProps(tabListProps, focusProps)}
          ref={ref ? mergeRefs(ref, localRef) : localRef}
          // ref={ref}
          data-id={dataId ? `${dataId}-tab-list` : undefined}
        >
          {[...state.collection].map((item) => (
            <Tab
              key={item.key}
              item={item}
              state={state}
              data-id={dataId ? `${dataId}-tab-item` : undefined}
            />
          ))}
        </div>
        <div
          className={st(classes.indicator, {
            isFocusVisible,
          })}
          style={{ ...activeTabStyle }}
        />
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

const _Tabs = forwardRef(Tabs);
export { _Tabs as Tabs };
