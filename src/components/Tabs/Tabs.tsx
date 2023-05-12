import {
  Ref,
  useRef,
  ReactElement,
  useState,
  useEffect,
  forwardRef,
} from "react";
import { useTabListState } from "react-stately";
import {
  useTabList,
  useFocusRing,
  mergeProps,
  AriaTabListProps,
} from "react-aria";
import { Tab } from "./Tab";
import { TabPanel } from "./TabPanel";
import { st, classes } from "./tabs.st.css";

export interface TabsProps<T> extends AriaTabListProps<T> {
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

  const { focusProps, isFocusVisible } = useFocusRing({
    within: true,
  });

  const orientation = props.orientation || "horizontal";

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
    const activeTab = ref?.current?.querySelector(
      '[role="tab"][aria-selected="true"]'
    );
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
      className={st(classes.root, { orientation }, classNameProp)}
      data-id={dataId}
    >
      <div className={classes.tabListContainer}>
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
        <div
          className={st(classes.tabSelection, {
            isFocusVisible,
          })}
          style={{ ...activeTabStyle }}
        />
      </div>
      <TabPanel
        key={state.selectedItem?.key}
        className={classes.tabPanel}
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
