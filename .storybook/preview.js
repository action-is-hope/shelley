import React from "react";
import themes from "../src/styles";

import { initializeRTL } from "storybook-addon-rtl";
initializeRTL();
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
  shelleyTheme: {
    name: "Theme",
    description: "Theme Switcher",
    defaultValue: themes["shelley"],
    toolbar: {
      icon: "switchalt",
      title: "Theme Switch",
      items: [
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
// preview.js

const withShelleyTheme = (Story, context) => {
  // Create a themed div for portal content so styles still work. Noy needed if you put your theme class on html.
  if (!document.getElementById("portal")) {
    const portal = document.createElement("div");
    portal.setAttribute("id", "portal");
    portal.setAttribute("class", context.globals.shelleyTheme);
    document.body.appendChild(portal);
  }

  return (
    // We need it as a wrapper on the stories as well else the bg is wrong in the Docs.
    <div className={context.globals.shelleyTheme}>
      <Story {...context} />
    </div>
  );
};

export const decorators = [withShelleyTheme];
