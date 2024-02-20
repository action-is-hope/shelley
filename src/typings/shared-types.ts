/** shared-types.ts */

export interface ComponentBase {
  /** Add predefined data-id to ease testing or analytics. */
  "data-id"?: string;
}
// "top" "right" "bottom" "left" but using right to left aware langauge.
export declare type AlignPos = "top" | "end" | "bottom" | "start" | undefined;

export declare type ButtonVariants =
  | "lead"
  | "support"
  | "quiet"
  | "fab"
  | false;

export type ExtendedButtonVariants<V> = ButtonVariants | V;

export type DataIdDOMAttribute = {
  "data-id"?: { value: string };
};

export declare type FieldVariants = "outlined" | "filled" | "quiet" | false;

export declare type LabelPosition = "top" | "side" | "over" | "hidden";

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

export type Orientation = "horizontal" | "vertical";

/** Selection input types - maps to input type attribute. */
export declare type SelectionControlType =
  | "checkbox"
  | "radio"
  | "switch" // Maps to checkbox.
  | "toggle"; // Maps to checkbox.

/** Generic size levels */
export declare type Size = 1 | 2 | 3 | 4 | 5 | 6 | false;

export declare type TextAlign =
  | "center"
  | "inherit"
  | "justify"
  | "start"
  | "end";

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

/** Tone colours */
export declare type Tone =
  | "lead"
  | "support"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "light"
  | "dark"
  | "contrast"
  | false;
export type ExtendedToneVariants<T> = Tone | T;

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

/** Volume levels */
export declare type Volume = 1 | 2 | 3 | 4 | 5 | 6 | false;
