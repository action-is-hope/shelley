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
      {demoProps && (
        <div className={style.propsPlayground}>
          <H2 vol={2} className={style.propsHeading} uppercase>
            <span>Props Playground</span>
          </H2>
          <div className={style.propInputs}>
            {demoProps.map((item: any, i: number) => {
              let input: React.ReactNode;
              switch (item.type) {
                case "text":
                  input = (
                    <InputRow
                      id={`${item.name}`}
                      key={`${item.name}-${i}`}
                      placeholder={item.label}
                      defaultValue={item.value}
                      label={`${item.label}:`}
                      vol={2}
                      onChange={(e: any) => {
                        const newDemoProps = [...demoProps];
                        newDemoProps[i].value = e.target.value;
                        setDemoProps(newDemoProps);
                      }}
                    />
                  );
                  break;
                case "textarea":
                  input = (
                    <InputRow
                      id={`${item.name}`}
                      key={`${item.name}-${i}`}
                      type="textarea"
                      placeholder={item.label}
                      defaultValue={item.value}
                      label={`${item.label}:`}
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
                      label={`${item.label}:`}
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
                    <InputRow
                      id={`${item.name}`}
                      vol={2}
                      label={`${item.label}:`}
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
        </div>
      )}
      <H2 vol={2} className={style.exampleHeading} uppercase>
        Example:
      </H2>
      <div className={style.demo}>{children}</div>
    </div>
  );
};

export default PropsDemo;
