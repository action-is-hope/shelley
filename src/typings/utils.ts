/**
 * Utility type
 */

export type MergeElementProps<
  T extends React.ElementType,
  // https://www.erikverweij.dev/blog/making-your-components-extensible-with-typescript/
  P
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;
