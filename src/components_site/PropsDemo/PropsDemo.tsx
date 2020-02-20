/** PropsDemo.tsx */
import React from "react";
import style from "./propsDemo.st.css";
import classNames from "classnames";
import InputRow from "../../components/InputRow/InputRow";
import Text, { H2, H3, P } from "../../components/Text/Text";
import RadioCheck from "../../components/RadioCheckInput/RadioCheckInput";

interface PropsDemoProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  demoProps?: any;
  demoNonProps?: any;
  renderExample?: any;
  tsExtends?: string;
  setDemoProps?: (demoProps) => void;
  setNonDemoProps?: (demoNonProps) => void;
}

const PropsDemo = ({
  className,
  children,
  demoProps,
  demoNonProps,
  renderExample,
  setDemoProps,
  setNonDemoProps,
  tsExtends,
  ...rest
}: PropsDemoProps) => {
  const rootClassNames = classNames(style.root, className);

  const setInput = (
    item: any,
    i: number,
    propsArray: any,
    setPropsArray: any
  ) => {
    switch (item.type) {
      case "text":
        return (
          <InputRow
            id={`${item.name}`}
            key={`${item.name}-${i}`}
            placeholder={item.label}
            defaultValue={item.value}
            label={`${item.label}:`}
            vol={2}
            onChange={(e: any) => {
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = e.target.value;
              setPropsArray(newDemoProps);
            }}
          />
        );
      case "textarea":
        return (
          <InputRow
            id={`${item.name}`}
            key={`${item.name}-${i}`}
            type="textarea"
            rows={1}
            placeholder={item.label}
            defaultValue={item.value}
            label={`${item.label}:`}
            vol={2}
            onChange={(e: any) => {
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = e.target.value;
              setPropsArray(newDemoProps);
            }}
          />
        );
      case "number":
        return (
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
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = e.target.value;
              setPropsArray(newDemoProps);
            }}
          />
        );
      case "checkbox":
        return (
          <InputRow
            id={`${item.name}`}
            key={`${item.name}-${i}`}
            vol={2}
            label={`${item.label}:`}
            labelVisuallyHidden={true}
            type="checkbox"
            onChange={(e: any) => {
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = !newDemoProps[i].value;
              setPropsArray(newDemoProps);
            }}
            defaultChecked={item.value}
          />
        );
      // {getItems(urls, inputValue).map((item: IAItem, index: number) => {
      //   const isHighlighted = highlightedIndex === index;
      //   return (
      //     <MenuItem
      //       {...getItemProps({ item })}
      //       key={item}
      //       selected={isHighlighted}
      //       component="div"
      //     >
      //       /{getItemDisplayName(item)}
      //     </MenuItem>
      //   );
      // })}
      case "select":
        return (
          <select
            value={item.value}
            key={`${item.name}-${i}`}
            onChange={(e: any) => {
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = e.target.value;
              setPropsArray(newDemoProps);
            }}
          >
            {item.options.map((item: string, index: number) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        );
      default:
      // code block
    }
  };

  return (
    <div {...style(rootClassNames, {}, rest)} {...rest}>
      {demoProps && (
        <H2 vol={3} className={style.propsHeading} uppercase>
          <span>Props Playground</span>
        </H2>
      )}
      <div className={style.gridWrap}>
        <div className={style.grid}>
          <div className={style.propsPlayground}>
            {demoProps && (
              <>
                {/* <H2 vol={3} className={style.propsHeading} uppercase>
                  <span>Props Playground</span>
                </H2> */}
                <P vol={2} className={style.propsHint}>
                  Have a little play around with the props below:
                </P>
                <div className={style.propInputs}>
                  {demoProps.map((item: any, i: number) => {
                    return setInput(item, i, demoProps, setDemoProps);
                  })}
                </div>
              </>
            )}
            {tsExtends && (
              <P vol={2} className={style.tsExtends}>
                <abbr title="TypeScript">
                  <span className={style.tsLogo}>TS</span>
                </abbr>
                based on: <code>{tsExtends}</code>
              </P>
            )}

            {demoNonProps && (
              <>
                <H2 vol={3} className={style.propsHeading} uppercase>
                  <span>Props Playground</span>
                </H2>
                <div className={style.propInputs}>
                  {demoNonProps.map((item: any, i: number) => {
                    return setInput(item, i, demoNonProps, setNonDemoProps);
                  })}
                </div>
              </>
            )}
          </div>

          <div className={style.codeExample}>
            <H3 vol={1} className={style.exampleHeading} uppercase>
              React Code:
            </H3>
            {renderExample}
          </div>
          <div className={style.example}>
            <H3 vol={1} className={style.exampleHeading} uppercase>
              Preview:
            </H3>
            <div className={style.demo}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropsDemo;
