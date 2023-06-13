export type ValidationState = "valid" | "invalid";

export interface Validation {
  /** Whether the input should display its "valid" or "invalid" visual styling. */
  validationState?: ValidationState;
  /**
   * Whether user input is required on the input before form submission.
   * Often paired with the `necessityIndicator` prop to add a visual indicator to the input.
   */
  isRequired?: boolean;
}

export type Orientation = "horizontal" | "vertical";

/** types.ts */

export interface ComponentBase {
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
}
// "top" "right" "bottom" "left" but using right to left aware langauge.
export declare type AlignPos = "top" | "end" | "bottom" | "start" | undefined;

export declare type LabelPosition = "top" | "side" | "over" | "hidden";

export declare type TextAlign =
  | "center"
  | "inherit"
  | "justify"
  | "start"
  | "end";

/** Accent color indexes */
export declare type Accent = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | false;

/** Variant indexes */
export declare type Variant = 1 | 2 | 3 | 4 | 5 | 6 | undefined;

export declare type ButtonVariants =
  | "primary"
  | "secondary"
  | "quiet"
  | "fab"
  | false;

export declare type FieldVariants = "outlined" | "filled" | "quiet" | false;

/** Generic volume levels */
export declare type Volume = 1 | 2 | 3 | 4 | 5 | 6 | false;

/** Generic size levels */
export declare type Size = 1 | 2 | 3 | 4 | 5 | 6 | false;

/** Text volume levels */
export declare type TextVolume =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | false;

/** Text input types - maps to input type attribute. */
export declare type TextInputType =
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url";

/** Selection input types - maps to input type attribute. */
export declare type SelectionControlType =
  | "checkbox"
  | "radio"
  | "switch" // Internally map to checkbox.
  | "toggle"; // Internally map to checkbox.

export declare type LoadingState =
  | "loading"
  | "sorting"
  | "loadingMore"
  | "error"
  | "idle"
  | "filtering";

export declare type LoadMore = () => any;

export interface LoadMoreProps {
  /**
   * Handler that is called when more items should be loaded,
   * e.g. while scrolling near the bottom.
   */
  onLoadMore?: LoadMore;
  /**
   * The current loading state of the ComboBox. Determines whether or
   * not the progress circle should be shown.
   */
  loadingState?: LoadingState;
  /** 'Loading' string for progress loader */
  loadingString?: "Loading...";
  /** 'Loading more' string for progress loader */
  loadingMoreString?: "Loading more...";
}

export type DataIdDOMAttribute = {
  "data-id"?: { value: string };
};
