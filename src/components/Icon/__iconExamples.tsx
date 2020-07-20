/* buttonExamples.tsx */
import React from "react";
// Example Component
import Icon from "./Icon";
// Supporting Components
import PropsDemo from "../../components_site/PropsDemo/PropsDemo";
import CodeSample from "../../components_site/CodeSample/CodeSample";
import { classes as grid } from "../../style/grid.st.css";

export const meta = {
  name: "SVGSVGElement"
};

export const QuickRef = () => (
  <CodeSample className={grid.mid}>{`import Icon from "@action-is-hope/shelley";
\n<Icon>
  {/* crack open an svg to find the path and shove it in. */}
  <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
</Icon>
{/* viewBox prop defaults to "0 0 16 16", match this the svg you have. */}`}</CodeSample>
);

// Props Demo - Examples below.
export const ComponentDemo = () => {
  const [labelDemoProps, setLabelDemoProps]: any = React.useState([
    {
      name: "label",
      label: "label",
      type: "text",
      value: "A hidden label"
    },
    {
      name: "viewBox",
      label: "viewBox",
      type: "text",
      value: "0 0 16 16"
    },
    {
      name: "fontSize",
      label: "inline: fontSize",
      type: "text",
      value: "2rem"
    }
  ]);
  return (
    <PropsDemo
      demoProps={labelDemoProps}
      componentName="Icon"
      setDemoProps={setLabelDemoProps}
      tsExtends="SVGSVGElement"
      renderExample={
        <CodeSample>{`import { Icon } from "@action-is-hope/shelley";\n\n<Icon ${
          labelDemoProps[0].value
            ? `\n  alt="${labelDemoProps[0].value}"`
            : `\n  alt="false"`
        } ${
          labelDemoProps[1].value
            ? `\n  viewBox="${labelDemoProps[1].value}"`
            : `\n  viewBox="false"`
        } \n  style={{fontSize: ${
          labelDemoProps[2].value ? labelDemoProps[2].value : false
        }}} \n>\n  {/* icon deets - the globe icon breaks the code preview... this is a phone :-) */}\n  <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>\n</Icon>
{/* FYI: Avoid inline 'style' especially font-size and color, oh the irony! */}`}</CodeSample>
      }
    >
      <Icon
        id="globe"
        alt={labelDemoProps[0].value ? labelDemoProps[0].value : false}
        viewBox={labelDemoProps[1].value ? labelDemoProps[1].value : false}
        style={{
          fontSize: labelDemoProps[2].value ? labelDemoProps[2].value : false,
          margin: "0 1rem",
          display: "flex"
        }}
      >
        {/* Globe icon */}
        <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM13.2 5.3c0.4 0 0.7 0.3 1.1 0.3-0.3 0.4-1.6 0.4-2-0.1 0.3-0.1 0.5-0.2 0.9-0.2zM1 8c0-0.4 0-0.8 0.1-1.3 0.1 0 0.2 0.1 0.3 0.1 0 0 0.1 0.1 0.1 0.2 0 0.3 0.3 0.5 0.5 0.5 0.8 0.1 1.1 0.8 1.8 1 0.2 0.1 0.1 0.3 0 0.5-0.6 0.8-0.1 1.4 0.4 1.9 0.5 0.4 0.5 0.8 0.6 1.4 0 0.7 0.1 1.5 0.4 2.2-2.5-1.2-4.2-3.6-4.2-6.5zM8 15c-0.7 0-1.5-0.1-2.1-0.3-0.1-0.2-0.1-0.4 0-0.6 0.4-0.8 0.8-1.5 1.3-2.2 0.2-0.2 0.4-0.4 0.4-0.7 0-0.2 0.1-0.5 0.2-0.7 0.3-0.5 0.2-0.8-0.2-0.9-0.8-0.2-1.2-0.9-1.8-1.2s-1.2-0.5-1.7-0.2c-0.2 0.1-0.5 0.2-0.5-0.1 0-0.4-0.5-0.7-0.4-1.1-0.1 0-0.2 0-0.3 0.1s-0.2 0.2-0.4 0.1c-0.2-0.2-0.1-0.4-0.1-0.6 0.1-0.2 0.2-0.3 0.4-0.4 0.4-0.1 0.8-0.1 1 0.4 0.3-0.9 0.9-1.4 1.5-1.8 0 0 0.8-0.7 0.9-0.7s0.2 0.2 0.4 0.3c0.2 0 0.3 0 0.3-0.2 0.1-0.5-0.2-1.1-0.6-1.2 0-0.1 0.1-0.1 0.1-0.1 0.3-0.1 0.7-0.3 0.6-0.6 0-0.4-0.4-0.6-0.8-0.6-0.2 0-0.4 0-0.6 0.1-0.4 0.2-0.9 0.4-1.5 0.4 1.1-0.8 2.5-1.2 3.9-1.2 0.3 0 0.5 0 0.8 0-0.6 0.1-1.2 0.3-1.6 0.5 0.6 0.1 0.7 0.4 0.5 0.9-0.1 0.2 0 0.4 0.2 0.5s0.4 0.1 0.5-0.1c0.2-0.3 0.6-0.4 0.9-0.5 0.4-0.1 0.7-0.3 1-0.7 0-0.1 0.1-0.1 0.2-0.2 0.6 0.2 1.2 0.6 1.8 1-0.1 0-0.1 0.1-0.2 0.1-0.2 0.2-0.5 0.3-0.2 0.7 0.1 0.2 0 0.3-0.1 0.4-0.2 0.1-0.3 0-0.4-0.1s-0.1-0.3-0.4-0.3c-0.1 0.2-0.4 0.3-0.4 0.6 0.5 0 0.4 0.4 0.5 0.7-0.6 0.1-0.8 0.4-0.5 0.9 0.1 0.2-0.1 0.3-0.2 0.4-0.4 0.6-0.8 1-0.8 1.7s0.5 1.4 1.3 1.3c0.9-0.1 0.9-0.1 1.2 0.7 0 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0.2 0.4 0.1 0.6-0.3 0.8 0.1 1.4 0.4 2 0.1 0.2 0.2 0.3 0.3 0.4-1.3 1.4-3 2.2-5 2.2z"></path>
      </Icon>
    </PropsDemo>
  );
};

export const ComponentHTML = () => (
  <CodeSample>{`<svg class="icon--root" focusable="false" viewBox="0 0 16 16" aria-hidden="true">
  <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
</svg>

/* With alt */
<svg class="icon--root" focusable="false" viewBox="0 0 16 16" aria-hidden="true">
  <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
</svg>
<span class="visuallyHidden880087003--root">A hidden label</span>`}</CodeSample>
);

export const ComponentCSS = () => (
  <CodeSample
    fixedHeight
  >{`/* This you get anyway from the core which we borrowed from Material UI. */
.root {
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1em;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0;
  user-select: none;
  flex-shrink: 0;
}


/** button.st.css */

/* Root */
Icon {}



/* Example of styling within inputSelection.st.css */

:import {
  -st-from: "../node_modules/@action-is-hope/shelley/components/Icon/icon.st.css";
  -st-default: Icon;
}

... 

/* Set your values, colour or whatever alignment you need. */
InputSelection Icon {
  font-size: 2em;
}

`}</CodeSample>
);

export const A11yIconWrong = () => (
  <Icon viewBox="0 0 24 24" style={{ fontSize: "1.5rem" }}>
    {/* material-ui wheelchair not accessibility. */}
    <path d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="4" r="2" />
    <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z" />
  </Icon>
);

export const Collection = () => (
  <>
    <Icon viewBox="0 0 24 24">
      {/* material-ui wheelchair not accessibility. */}
      <path d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="4" r="2" />
      <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z" />
    </Icon>

    <Icon>
      {/* eye */}
      <path d="M8 3.9c-6.7 0-8 5.1-8 5.1s2.2 4.1 7.9 4.1 8.1-4 8.1-4-1.3-5.2-8-5.2zM5.3 5.4c0.5-0.3 1.3-0.3 1.3-0.3s-0.5 0.9-0.5 1.6c0 0.7 0.2 1.1 0.2 1.1l-1.1 0.2c0 0-0.3-0.5-0.3-1.2 0-0.8 0.4-1.4 0.4-1.4zM7.9 12.1c-4.1 0-6.2-2.3-6.8-3.2 0.3-0.7 1.1-2.2 3.1-3.2-0.1 0.4-0.2 0.8-0.2 1.3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-0.5-0.1-0.9-0.2-1.3 2 0.9 2.8 2.5 3.1 3.2-0.7 0.9-2.8 3.2-7 3.2z"></path>
    </Icon>

    <Icon>
      <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
    </Icon>

    <Icon>
      {/* angle-double-right */}
      <path d="M2 13h2l5-5-5-5h-2l5 5z"></path>
      <path d="M7 13h2l5-5-5-5h-2l5 5z"></path>
    </Icon>

    <Icon>
      {/* info-circle-o */}
      <path d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path>
      <path d="M7 6h2v7h-2v-7z"></path>
      <path d="M7 3h2v2h-2v-2z"></path>
    </Icon>

    <Icon>
      {/* info-circle */}
      <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM9 13h-2v-7h2v7zM9 5h-2v-2h2v2z"></path>
    </Icon>

    <Icon>
      {/* info */}
      <path d="M6 5h4v11h-4v-11z"></path>
      <path d="M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
    </Icon>

    <Icon>
      {/* input */}
      <path d="M16 5c0-0.6-0.4-1-1-1h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6zM15 11h-14v-6h14v6z"></path>
      <path d="M2 6h1v4h-1v-4z"></path>
    </Icon>
    <Icon>
      {/* ellipsis-dots-v */}
      <path d="M10 2c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
      <path d="M10 8c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
      <path d="M10 14c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"></path>
    </Icon>

    <Icon>
      {/* check.svg */}
      <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
    </Icon>

    <Icon>
      <path d="M965.76 818.56c15.067-11.821 24.657-30.030 24.657-50.479 0-22.916-12.044-43.019-30.147-54.324l-0.27-372.637-64 42.88v329.6c-18.116 11.51-29.963 31.47-29.963 54.198 0 20.246 9.401 38.295 24.075 50.023l-24.192 32.099c-20.65 26.224-33.325 59.576-33.918 95.866l-0.002 78.214h51.84c0.103 0.001 0.225 0.001 0.347 0.001 26.334 0 48.446-18.073 54.61-42.492l21.203-85.509v128h64v-77.44c-0.595-36.424-13.27-69.776-34.18-96.343z"></path>
      <path d="M512 0l-512 256 512 320 512-320-512-256z"></path>
      <path d="M512 640l-320-213.12v109.44c0 58.24 188.16 231.68 320 231.68s320-173.44 320-231.68v-109.44z"></path>
    </Icon>

    <Icon>
      {/* laptop */}
      <path d="M14 11v-9h-12v9h-2v2h16v-2h-2zM10 12h-4v-1h4v1zM13 10h-10v-7h10v7z"></path>
    </Icon>

    <Icon>
      {/* tablet.svg */}
      <path d="M0 2v12h16v-12h-16zM13 13h-11v-10h11v10zM15 9h-1v-2h1v2z"></path>
    </Icon>

    <Icon>
      {/* mobile */}
      <path d="M4 1v14h8v-14h-8zM9 14h-2v-1h2v1zM11 12h-6v-9h6v9z"></path>
    </Icon>
  </>
);

export const Example1 = () => (
  <Icon
    viewBox="8 -4 24 24"
    alt="infection plotted against time demonstrating exponential growth"
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

// Add some tests to check refs and tings are spread properly.
// const inputEl = React.useRef();
// const test = React.createRef<HTMLButtonElement>();
// const onButtonClick = () => {
//   const node = test.current;
//   // `current` points to the mounted text input element
//   node && node.focus();
// };
