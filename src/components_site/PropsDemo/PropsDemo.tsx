/** PropsDemo.tsx */
import React from "react";
import style from "./propsDemo.st.css";
import classNames from "classnames";
import InputRow from "../../components/InputRow/InputRow";
import Text, { H2 } from "../../components/Text/Text";
import RadioCheck from "../../components/RadioCheckInput/RadioCheckInput";

interface PropsDemoProps extends React.HTMLProps<HTMLDivElement> {
  id: string;
  className?: string;
  demoProps?: any;
  setDemoProps: (demoProps) => void;
}

const PropsDemo = ({
  className,
  children,
  demoProps,
  setDemoProps,
  ...rest
}: PropsDemoProps) => {
  const rootClassNames = classNames(style.root, className);
  return (
    <div {...style(rootClassNames, {}, rest)} {...rest}>
      {/* <InputNumber
        defaultValue={3}
        aria-label="Simple number input example"
        min={0}
        max={5}
        className="test"
        onChange={value => console.log(value)}
        // style={{ width: 100 }}
        // value={this.state.value}
        // onChange={this.onChange}
        // readOnly={this.state.readOnly}
        // disabled={this.state.disabled}
      /> */}
      <div className={style.propInputs}>
        <H2 vol={2} uppercase>
          Props Playground
        </H2>
        {demoProps &&
          demoProps.map((item: any, i: number) => {
            let input: React.ReactNode;
            console.log("MEEE", item);
            switch (item.type) {
              case "text":
                input = (
                  <InputRow
                    id={`${item.name}`}
                    key={`${item.name}-${i}`}
                    placeholder={item.label}
                    defaultValue={item.value}
                    label={item.label}
                    vol={2}
                    onChange={(e: any) => {
                      const newDemoProps = [...demoProps];
                      newDemoProps[i].value = e.target.value;
                      setDemoProps(newDemoProps);
                    }}
                  />
                );
                break;
              case "number":
                input = (
                  <InputRow
                    id={`${item.name}`}
                    defaultValue={item.value}
                    key={`${item.name}-${i}`}
                    aria-label={item.label}
                    label={item.label}
                    type={item.type}
                    min={item.min}
                    max={item.max}
                    vol={2}
                    onChange={(e: any) => {
                      const newDemoProps = [...demoProps];
                      newDemoProps[i].value = e.target.value;
                      setDemoProps(newDemoProps);
                    }}
                  />
                );
                break;
              case "checkbox":
                input = (
                  // <InputRow
                  //   id={`${item.name}`}
                  //   key={`${item.name}-${i}`}
                  //   aria-label={item.label}
                  //   label={item.label}
                  //   type={item.type}
                  //   vol={2}
                  //   onChange={(value: any) => {
                  //     const newDemoProps = [...demoProps];
                  //     newDemoProps[i].value = value;
                  //     setDemoProps(newDemoProps);
                  //   }}
                  // />
                  <InputRow
                    id={`${item.name}`}
                    vol={2}
                    label={item.label}
                    labelVisuallyHidden={true}
                    type="checkbox"
                    onChange={(e: any) => {
                      const newDemoProps = [...demoProps];
                      newDemoProps[i].value = !newDemoProps[i].value;
                      setDemoProps(newDemoProps);
                    }}
                    defaultChecked={item.value}
                  />
                );
                break;
              default:
              // code block
            }

            return input;
          })}
      </div>
      {children}
    </div>
  );
};

export default PropsDemo;
