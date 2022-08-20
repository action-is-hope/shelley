import React from "react";
import themes from "../src/styles";

import { initializeRTL } from "storybook-addon-rtl";
initializeRTL();
// Mirroring the viewports from Bronte.
const bronteViewports = {
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
  options: {
    storySort: {
      method: "alphabetical",
      order: [],
      locales: "",
    },
  },
  viewport: {
    viewports: bronteViewports,
  },
};
export const globalTypes = {
  bronteTheme: {
    name: "Theme",
    description: "Theme Switcher",
    defaultValue: themes["shelley"],
    toolbar: {
      icon: "switchalt",
      title: "Theme Switch",
      items: [
        /** TODO: Tidy away...*/
        {
          value: themes["base"],
          title: "Base",
        },
        {
          value: themes["shelley"],
          title: "Shelley",
        },
      ],
    },
  },
};

const withBronteTheme = (Story, context) => {
  return (
    <div
      className={context.globals.bronteTheme}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "20vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Story {...context} />
    </div>
  );
};

export const decorators = [withBronteTheme];
