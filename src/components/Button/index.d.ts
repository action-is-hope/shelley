/**
 * Button props extending those of a regular button.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Type of the button default, primary..*/
  color?: string;
  /** Optional ref. */
  ref?: React.Ref<HTMLButtonElement>;
  /** Button sizes: xs, sm, md, lg */
  size?: string;
  /** Button variant. */
  variant?: string;
  /** Extra text that can be used to render a tooltip on hover/focus. */
  tip?: string;
}
