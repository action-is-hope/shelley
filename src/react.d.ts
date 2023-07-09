import React from "react";

/**
 * forwardRef doesn't support generic parameters. Previously we have
 * cast to the correct type in the component files.
 * https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
 * EG:
 *   const _Tabs = forwardRef(Tabs) as <T>(
 *     props: TabsProps<T> & { ref?: Ref<HTMLElement> }
 *   ) => ReactElement;
 *
 * Whilst we sometimes do still cast now augment React module type
 * declarations overriding forwardRef with a new function overload
 * type signature:
 * https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
 *
 * This means we can mostly just keep the components simplier than
 * the above:
 * const _Tabs = forwardRef(Tabs);
 *
 * Which is nicer and makes the components more consistant.
 */
// eslint-disable-line
declare module "react" {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}
