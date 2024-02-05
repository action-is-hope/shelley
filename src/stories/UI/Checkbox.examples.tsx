import { P, Checkbox, CheckboxProps } from "../../indexLib";
import { useState } from "react";
import PropsTable from "../../utils/TableProps";
import data from "../../../componentInfo.json";
import {
  componentMetaDataReducer,
  ComponentDocs,
  PropRow,
  PropRowDisplay,
} from "../../utils/helpers";

export const TestProps = (args: CheckboxProps) => {
  // const reducedData = componentMetaDataReducer(data[1].props);

  const componentData: ComponentDocs[] = data as ComponentDocs[];
  const reducedData = componentMetaDataReducer(
    componentData[1]?.props as PropRow[]
  );

  return (
    <>
      <P>
        {componentData[0]?.displayName} - {componentData[1]?.filePath}
      </P>
      <PropsTable
        propMetaData={reducedData?.BlockquoteProps?.props as PropRowDisplay[]}
      />
    </>
  );
};

export const ValueExample = (args: CheckboxProps) => {
  const [selected, setSelected] = useState(true);

  return (
    <>
      <Checkbox {...args} defaultSelected>
        Subscribe (uncontrolled)
      </Checkbox>
      <Checkbox {...args} isSelected={selected} onChange={setSelected}>
        Subscribe (controlled)
      </Checkbox>
    </>
  );
};

export const EventExample = (args: CheckboxProps) => {
  const [selected, setSelection] = useState(false);

  return (
    <>
      <Checkbox {...args} isSelected={selected} onChange={setSelection}>
        I accept the terms and conditions
      </Checkbox>
      <P vol={1}>{`You ${selected ? "have accepted" : "have not accepted"}`}</P>
    </>
  );
};

export const CustomLabel = (args: CheckboxProps) => {
  return (
    <>
      <Checkbox {...args} id="123" className="custom">
        Custom label
      </Checkbox>
    </>
  );
};
