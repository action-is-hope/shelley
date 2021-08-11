/**
 * Utility type
 */

export type MergeElementProps<
  T extends React.ElementType,
  // https://www.erikverweij.dev/blog/making-your-components-extensible-with-typescript/
  // P extends object = {}
  P extends unknown = Record<string, never>
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;

// export interface MergeElementProps<
//   T extends React.ElementType,
//   // https://www.erikverweij.dev/blog/making-your-components-extensible-with-typescript/
//   // P extends object = {}
//   P extends unknown = Record<string, never>
// > = ;
