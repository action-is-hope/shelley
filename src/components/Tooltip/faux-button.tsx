import React from "react";

const h = React.createElement;

/**
 * Accessible "button" usurper.
 * Establishes the correct role, tabindex, and key/mouse interaction if interactive.
 * Buttons activate on space and enter.
 *
 * NOTE: Gives 'disabled' attribute if interaction not provided.
 *
 * @see https://www.w3.org/TR/wai-aria-practices-1.1/#button
 * @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/button/button.html
 */
interface FauxButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  /** The DOM element for the component */
  tag: string;
  className?: string;
  /** The action to take on activation. Happens on click and space or enter keys. */
  onInteraction?: () => any;
  /** HTML disabled attribute */
  disabled?: boolean;
}

/** Handle the keyboard activation same as a button */
function handleKeyActivation(cb: () => any) {
  return (event: any) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        cb();
        return;
    }
  };
}

export const FauxButton: React.SFC<FauxButtonProps> = ({
  tag,
  className,
  onInteraction,
  disabled,
  children,
  ...rest
}) =>
  h(
    tag,
    {
      ...rest,
      role: "button",
      tabIndex: "0",
      className,
      // Disabled if set, or if interaction non-existent
      disabled: disabled ? true : onInteraction ? null : true,
      onClick: onInteraction,
      onKeyDown: onInteraction && handleKeyActivation(onInteraction)
    },
    children
  );
