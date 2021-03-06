/** types.ts */

// "top" "right" "bottom" "left" but using right to left aware langauge.
export declare type AlignPos = "top" | "end" | "bottom" | "start" | false;

export declare type TextAlign =
  | "center"
  | "inherit"
  | "justify"
  | "start"
  | "end";

/** Accent color indexes */
export declare type Accent = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | false;

/** Color indexes */
export declare type Color = 1 | 2 | 3 | 4 | 5 | 6 | false;

/** Variant indexes */
export declare type Variant = 1 | 2 | 3 | 4 | 5 | 6 | false;

/** Generic volume levels */
export declare type Volume = 1 | 2 | 3 | 4 | 5 | 6 | false;

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
  | "textarea" // Internally map to textarea element.
  | "time"
  | "url";

/** Selection input types - maps to input type attribute. */
export declare type SelectionControlType =
  | "checkbox"
  | "radio"
  | "switch" // Internally map to checkbox.
  | "toggle"; // Internally map to checkbox.
