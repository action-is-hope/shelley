/*
  This is the main export point of the component library.
  It's what will get exposed to other packages when added as a dependency.
*/

/** Default components in alphabetical order */
// import Button from "./components/Button";
// import Text, { H1, H2, H3, H4, H5, H6, P } from "./components/Text/Text";

// import { Theme as DefaultTheme } from "./projects/default";

// export { DefaultTheme, Button, Text, H1, H2, H3, H4, H5, H6, P };

export { default as Button } from "./components/Button/Button";
export * from "./components/Button/Button";

export { default as Text } from "./components/Text/Text";
export * from "./components/Text/Text";
