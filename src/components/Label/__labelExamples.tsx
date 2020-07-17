/* buttonExamples.tsx */
import React from "react";
// Example Component
import Icon from "../Icon/Icon";
import classnames from "classnames";
// Supporting Components
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";
// import styleExamples from "./__gridExample.st.css";

import { classes as grid } from "../../projects/default/css/grid.st.css";
import Text, { P } from "../Text/Text";
import Label from "../Label/Label";
import InputSelectionControl from "../InputSelectionControl/InputSelectionControl";

export const meta = {
  name: "Label"
};

export const QuickRef = () => (
  <CodeSample className={grid.mid}>{`import Label from "shelley-ui";

<Label 
  hint="Optional, non-interactive hint text"
  htmlFor="id-of-input-to-label" 
>
  Label text
</Label>`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "label",
      label: "label",
      type: "text",
      value: "Label for form input"
    },
    {
      name: "hint",
      label: "hint",
      type: "text",
      value: ""
    },
    {
      name: "htmlFor",
      label: "htmlFor",
      type: "text",
      value: "id-of-input-to-label"
    },
    {
      name: "visuallyHidden",
      label: "visuallyHidden",
      type: "checkbox",
      value: false
    },
    {
      name: "inputControl",
      label: "inputControl",
      type: "select",
      value: "checkbox",
      options: ["none", "radio", "checkbox", "toggle", "switch"]
    }
  ]);
  return (
    <PropsDemo
      demoProps={labelDemoProps}
      setDemoProps={setLabelDemoProps}
      // setNonDemoProps={setLabelNonDemoProps}
      // demoNonProps={labelNonDemoProps}
      tsExtends="HTMLLabelElement"
      renderExample={
        <CodeSample className={grid.mid}>{`import { Label${
          labelDemoProps[4].value !== "none" ? `, InputSelectionControl` : ``
        } } from "@action-is-hope/shelley";\n<Label ${
          labelDemoProps[1].value ? `\n  hint="${labelDemoProps[1].value}"` : ``
        } ${
          labelDemoProps[2].value
            ? `\n  htmlFor="${labelDemoProps[2].value}"`
            : ``
        } ${
          labelDemoProps[4].value !== "none"
            ? `\n  inputControl={\n    <InputSelectionControl id="${labelDemoProps[2].value}" type="${labelDemoProps[4].value}" />\n  }`
            : ``
        } \n>\n ${labelDemoProps[0].value}\n</Label>`}</CodeSample>
      }
    >
      <Label
        hint={labelDemoProps[1].value}
        // htmlFor={labelDemoProps[2].value}
        visuallyHidden={labelDemoProps[3].value}
        inputPos="bottom"
        inputControl={
          labelDemoProps[4].value !== "none" ? (
            <InputSelectionControl
              id={labelDemoProps[2].value}
              type={labelDemoProps[4].value}
            />
          ) : (
            <input type="text" />
          )
        }
        // inputControl={<input type="checkbox" />}
      >
        {labelDemoProps[0].value}
      </Label>
    </PropsDemo>
  );
};

export const ComponentHTML = () => (
  /** @TODO: #stylable This will chane when we upgrage - test this is inline with the new.. */
  <CodeSample language="html">{`<label class="label-root" for="id-of-input-to-associate">
  <span class="label-textContainer">
    <span class="label-labelText">Form item label</span>
    <span class="hintText-root">Form item hint message</span>
  </span>
</label>

<!-- OR if used wih the inputControl prop: -->

<label class="label-root label-hasInput">
  <span class="label-textContainer">
    <span class="label-labelText">Label for form input</span>
  </span>
  <span class="inputSelectionControl-root">
    <input id="id-of-input-to-label" class="inputSelectionControl-inputField inputSelectionControl-checkbox" type="checkbox">
  </span>
</label>
<!-- @todo #styable revisit after upgrade - data-labelinputpos="bottom" -->`}</CodeSample>
);

export const ComponentCSS = () => (
  <CodeSample fixedHeight>{`/** label.st.css */

Label {}

/* A wrapper around both the label and the hint elements. */
Label::textContainer {}

/* A span containing the label value*/
Label::labelText {}

/* Hint is used internally which we target like so with stylable: */
Label Hint {}

/* If the Label includes an inline assume we want a basic checkbox/radio layout. */
Label.hasInput {}

/* Input positions */
Label:inputPos(top) {}
Label:inputPos(end) {}
Label:inputPos(bottom) {}
Label:inputPos(start) {}
`}</CodeSample>
);

export const Example1 = () => (
  <Text tag="div" vol={2} className={classnames(grid.mid)}>
    <code>mid-start</code>
    <code>mid-end</code>
  </Text>
);

export const Example2 = () => (
  <Icon
    viewBox="8 -4 24 24"
    alt="infection plotted against time domonstrating exponential growth"
    style={{
      fontSize: "1.75rem",
      width: "2em",
      color: "#ff9dfb",
      position: "relative",
      top: "4px"
    }}
  >
    <path d="M0,19.990821477742085L0.7843137254901961,19.990821477742085L1.5686274509803921,19.981642955484165L2.3529411764705883,19.981642955484165L3.1372549019607843,19.95410738871042L3.9215686274509802,19.95410738871042L4.705882352941177,19.95410738871042L5.490196078431373,19.95410738871042L6.2745098039215685,19.95410738871042L7.058823529411765,19.9449288664525L7.8431372549019605,19.92657182193667L8.627450980392158,19.92657182193667L9.411764705882353,19.89903625516292L10.196078431372548,19.89903625516292L10.980392156862745,19.889857732905003L11.764705882352942,19.889857732905003L12.549019607843137,19.889857732905003L13.333333333333332,19.889857732905003L14.11764705882353,19.889857732905003L14.901960784313726,19.889857732905003L15.686274509803921,19.880679210647084L16.470588235294116,19.880679210647084L17.254901960784316,19.862322166131253L18.03921568627451,19.862322166131253L18.823529411764707,19.862322166131253L19.6078431372549,19.862322166131253L20.392156862745097,19.862322166131253L21.176470588235293,19.862322166131253L21.96078431372549,19.862322166131253L22.745098039215684,19.862322166131253L23.529411764705884,19.678751720972922L24.313725490196077,19.678751720972922L25.098039215686274,19.678751720972922L25.88235294117647,19.513538320330426L26.666666666666664,19.513538320330426L27.450980392156865,19.45846718678293L28.23529411764706,19.44928866452501L29.019607843137255,19.430931620009176L29.80392156862745,19.35750344194585L30.588235294117645,19.30243230839835L31.372549019607842,19.072969251950436L32.15686274509804,18.88022028453419L32.94117647058823,18.595686094538777L33.72549019607843,17.97154658100046L34.50980392156863,17.448370812299217L35.294117647058826,16.17255621844883L36.07843137254902,15.071133547498853L36.86274509803921,14.446994033960532L37.64705882352941,11.197797154658101L38.431372549019606,8.242312987608996L39.2156862745098,4.7361174850849L40,0L40,20L39.2156862745098,20L38.431372549019606,20L37.64705882352941,20L36.86274509803921,20L36.07843137254902,20L35.294117647058826,20L34.50980392156863,20L33.72549019607843,20L32.94117647058823,20L32.15686274509804,20L31.372549019607842,20L30.588235294117645,20L29.80392156862745,20L29.019607843137255,20L28.23529411764706,20L27.450980392156865,20L26.666666666666664,20L25.88235294117647,20L25.098039215686274,20L24.313725490196077,20L23.529411764705884,20L22.745098039215684,20L21.96078431372549,20L21.176470588235293,20L20.392156862745097,20L19.6078431372549,20L18.823529411764707,20L18.03921568627451,20L17.254901960784316,20L16.470588235294116,20L15.686274509803921,20L14.901960784313726,20L14.11764705882353,20L13.333333333333332,20L12.549019607843137,20L11.764705882352942,20L10.980392156862745,20L10.196078431372548,20L9.411764705882353,20L8.627450980392158,20L7.8431372549019605,20L7.058823529411765,20L6.2745098039215685,20L5.490196078431373,20L4.705882352941177,20L3.9215686274509802,20L3.1372549019607843,20L2.3529411764705883,20L1.5686274509803921,20L0.7843137254901961,20L0,20Z"></path>
  </Icon>
);
