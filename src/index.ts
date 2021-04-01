/*
  This is the main export point of the component library.
  It's what will get exposed to other packages when added as a dependency.
*/

import ShelleyBanner from "./components_site/ShelleyBanner/ShelleyBanner";

/** Default components in alphabetical order */

export { default as Blockquote } from "./components/Blockquote/Blockquote";
export * from "./components/Blockquote/Blockquote";

export { default as Button } from "./components/Button/Button";
export * from "./components/Button/Button";

export { default as ButtonGroup } from "./components/ButtonGroup/ButtonGroup";
export * from "./components/ButtonGroup/ButtonGroup";

export { default as ErrorText } from "./components/ErrorText/ErrorText";
export * from "./components/ErrorText/ErrorText";

export { default as Grid } from "./components/Grid/Grid";
export * from "./components/Grid/Grid";

export { default as HintText } from "./components/HintText/HintText";
export * from "./components/HintText/HintText";

export { default as Icon } from "./components/Icon/Icon";
export * from "./components/Icon/Icon";

export { default as InputAdornment } from "./components/InputAdornment/InputAdornment";
export * from "./components/InputAdornment/InputAdornment";

export { default as InputBase } from "./components/InputBase/InputBase";
export * from "./components/InputBase/InputBase";

export { default as InputSelect } from "./components/InputSelect/InputSelect";
export * from "./components/InputSelect/InputSelect";

export { default as InputSelection } from "./components/InputSelection/InputSelection";
export * from "./components/InputSelection/InputSelection";

export { default as InputSelectionControl } from "./components/InputSelectionControl/InputSelectionControl";
export * from "./components/InputSelectionControl/InputSelectionControl";

export { default as InputText } from "./components/InputText/InputText";
export * from "./components/InputText/InputText";

export { default as Label } from "./components/Label/Label";
export * from "./components/Label/Label";

export * from "./components/Menu/Menu";

export { default as Text } from "./components/Text/Text";
export * from "./components/Text/Text";

export { default as VisuallyHidden } from "./components/VisuallyHidden/VisuallyHidden";
export * from "./components/VisuallyHidden/VisuallyHidden";

/** Extras - Temp */

// @todo Move these into a seperate package designed to help building UI libs on top of Shelley.

// export { default as CodeSample } from "./components_site/CodeSample/CodeSample";
// export * from "./components_site/CodeSample/CodeSample";

// export { default as Logo } from "./components_site/Logo/Logo";
// export * from "./components_site/Logo/Logo";
