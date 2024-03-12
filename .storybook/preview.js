import React from "react";
import "../src/styles";

import { initializeRTL } from "storybook-addon-rtl";
initializeRTL();
const sampleViewports = {
  tiny: {
    name: "Tiny",
    styles: {
      height: "568px",
      width: "338px",
    },
    type: "mobile",
  },
  mobile: {
    name: "Mobile",
    styles: {
      height: "100%",
      width: "568px",
    },
    type: "mobile",
  },
  tablet: {
    name: "Tablet",
    styles: {
      height: "100%",
      width: "950px",
    },
    type: "tablet",
  },
  laptop: {
    name: "Laptop",
    styles: {
      height: "768px",
      width: "1025px",
    },
  },
  wideLaptop: {
    name: "Wide Laptop",
    styles: {
      height: "100%",
      width: "1180px",
    },
  },
  desktop: {
    name: "Desktop",
    styles: {
      height: "100%",
      width: "1440px",
    },
  },
  large: {
    name: "Large",
    styles: {
      height: "100%",
      width: "1680px",
    },
  },
};

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // options: {
  //   storySort: {
  //     method: "alphabetical",
  //     order: [],
  //     locales: "",
  //   },
  // },
  viewport: {
    viewports: sampleViewports,
  },
};
export const globalTypes = {
  shelleyTheme: {
    name: "Theme",
    description: "Theme Switcher",
    defaultValue: "shelley",
    toolbar: {
      icon: "switchalt",
      title: "Theme Switch",
      items: [
        {
          value: "",
          title: "Base",
        },
        {
          value: "shelley",
          title: "Shelley",
        },
        {
          value: "shelley shelley-dark",
          title: "ShelleyDark",
        },
      ],
    },
  },
};
// preview.js

const withShelleyTheme = (Story, context) => {
  document.documentElement.setAttribute(
    "data-theme",
    context.globals.shelleyTheme
  );
  return <Story {...context} />;
};

export const decorators = [withShelleyTheme];
