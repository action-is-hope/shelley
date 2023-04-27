import React, { useRef } from "react";
import { useTabPanel } from "react-aria";
import { st, classes } from "./tabPanel.st.css";

export interface TabPanelProps {
  state: any;
  [key: string]: any;
}

const TabPanel = ({ state, ...props }: TabPanelProps) => {
  const ref = useRef();
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div className={st(classes.root)} {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
};

export default TabPanel;
