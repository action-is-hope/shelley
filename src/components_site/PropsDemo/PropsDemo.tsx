/** PropsDemo.tsx */
/** @todo Tidy this up, including types and maybe expose it. */
import type React from "react";
import classNames from "classnames";

import {
  H2,
  H3,
  P,
  InputText,
  InputSelect,
  InputSelection,
} from "../../indexLib";

/* = Style API. */
import { st, classes } from "./propsDemo.st.css";

interface PropsDemoProps extends React.HTMLProps<HTMLSelectElement> {
  className?: string;
  componentName?: string; // Use for linking to Source in future.
  demoProps?: any;
  demoNonProps?: any;
  renderExample?: any;
  tsExtends?: string;
  setDemoProps?: (demoProps: any) => void;
  setNonDemoProps?: (demoNonProps: any) => void;
}

const PropsDemo: React.VFC<PropsDemoProps> = ({
  className,
  children,
  demoProps,
  demoNonProps,
  renderExample,
  setDemoProps,
  setNonDemoProps,
  tsExtends,
  componentName,
  ...rest
}) => {
  const rootClassNames = classNames(classes.root, className);

  const setInput = (
    item: any,
    i: number,
    propsArray: any,
    setPropsArray: any
  ) => {
    switch (item.type) {
      case "text":
        return (
          <InputText
            id={`${item.name}`}
            key={`${item.name}-${i}`}
            placeholder={item.label}
            defaultValue={item.value}
            label={`${item.label}:`}
            vol={1}
            variant={2}
            onChange={(e: any) => {
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = e.target.value;
              setPropsArray(newDemoProps);
            }}
          />
        );
      case "textarea":
        return (
          <InputText
            id={`${item.name}`}
            key={`${item.name}-${i}`}
            type="textarea"
            rows={1}
            placeholder={item.label}
            defaultValue={item.value}
            label={`${item.label}:`}
            vol={1}
            variant={2}
            onChange={(e: any) => {
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = e.target.value;
              setPropsArray(newDemoProps);
            }}
          />
        );
      case "number":
        return (
          <InputText
            id={`${item.name}`}
            defaultValue={item.value}
            key={`${item.name}-${i}`}
            aria-label={item.label}
            label={`${item.label}:`}
            type={item.type}
            min={item.min}
            max={item.max}
            vol={1}
            variant={2}
            onChange={(e: any) => {
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = e.target.value;
              setPropsArray(newDemoProps);
            }}
          />
        );
      case "checkbox":
        return (
          <InputSelection
            id={`${item.name}`}
            key={`${item.name}-${i}`}
            vol={1}
            variant={2}
            label={`${item.label}:`}
            // labelVisuallyHidden={true}
            type="toggle"
            onChange={() => {
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
          <InputSelect
            value={item.value}
            label={`${item.label}:`}
            vol={1}
            variant={2}
            id={`${item.name}`}
            key={`${item.name}-${i}`}
            onChange={(e: any) => {
              const newDemoProps = [...propsArray];
              newDemoProps[i].value = e.target.value;
              setPropsArray(newDemoProps);
            }}
          >
            {item.options.map((item: string) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </InputSelect>
        );
      default:
        // code block
        return false;
    }
  };

  return (
    <section className={st(rootClassNames)} {...rest}>
      {demoProps && (
        <H2 vol={3} className={classes.propsHeading} uppercase>
          <span>Props Playground</span>
        </H2>
      )}
      <div className={classes.gridOverflow}>
        <div className={classes.internalGrid}>
          <div className={classes.propsPlayground}>
            {demoProps && (
              <>
                {/* <H2 vol={3} className={classes.propsHeading} uppercase>
                  <span>Props Playground</span>
                </H2> */}
                <P vol={2} className={classes.propsHint}>
                  Have a little play around with the props below:
                </P>
                <div className={classes.propInputs}>
                  {demoProps.map((item: any, i: number) => {
                    return setInput(item, i, demoProps, setDemoProps);
                  })}
                </div>
              </>
            )}
            {tsExtends && (
              <P vol={2} className={classes.tsExtends}>
                <abbr title="TypeScript">
                  <span className={classes.tsLogo}>TS</span>
                </abbr>
                based on: <code>{tsExtends}</code>
              </P>
            )}

            {demoNonProps && (
              <>
                <H2 vol={3} className={classes.propsHeading} uppercase>
                  <span>Props Playground</span>
                </H2>
                <div className={classes.propInputs}>
                  {demoNonProps.map((item: any, i: number) => {
                    return setInput(item, i, demoNonProps, setNonDemoProps);
                  })}
                </div>
              </>
            )}
          </div>

          <div className={classes.codeExample}>
            <H3 vol={1} className={classes.exampleHeading} uppercase>
              React Code:
            </H3>
            {renderExample}
          </div>
          <div className={classes.demoExample}>
            <H3 vol={1} className={classes.exampleHeading} uppercase>
              Preview:
            </H3>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropsDemo;
