import React, { useRef } from "react";
import { useTab } from "react-aria";
import { st, classes } from "./tab.st.css";

export interface TabProps {
  item: any;
  state: boolean;
  children: any;
}

const Tab = ({ item, state }: TabProps) => {
  const ref = useRef();
  const { tabProps } = useTab(item, state, ref);

  return (
    <div className={st(classes.root)} {...tabProps} ref={ref}>
      {item.rendered}
    </div>
  );
};

export default Tab;
