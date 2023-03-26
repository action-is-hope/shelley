// import {
//   classNames,
//   SlotProvider,
//   useFocusableRef,
//   useSlotProps,
//   useStyleProps,
// } from "@react-spectrum/utils";
// import CornerTriangle from '@spectrum-icons/ui/CornerTriangle';
// import {FocusableRef} from '@react-types/shared';
// import { FocusRing } from "@react-aria/focus";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import React, { useRef, RefObject } from "react";
// import {SpectrumActionButtonProps} from '@react-types/button';
// import styles from '@adobe/spectrum-css-temp/components/button/vars.css';
// import {Text} from '@react-spectrum/text';
import { useButton } from "@react-aria/button";
// import { useHover } from "@react-aria/interactions";
// import {useProviderProps} from '@react-spectrum/provider';
import { useFocusRing } from "react-aria";
import type { ButtonCustomProps } from "../Button/Button";
// import Text from "../Text/Text";

import { st, classes } from "./actionButton.st.css";
interface ActionButtonProps extends ButtonCustomProps {
  className?: string;
  isQuiet?: boolean;
}
function ActionButton(
  props: ActionButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  // props = useProviderProps(props);
  // props = useSlotProps(props, "actionButton");
  const {
    isQuiet,
    isDisabled,
    // staticColor,
    children,
    // autoFocus,
    // holdAffordance,
    className: classNameProp,
    icon,
    iconPos,
    // ...otherProps
  } = props;

  // let domRef = useFocusableRef(ref);
  // let domRef = ref;

  const localRef = useRef(null);

  const { buttonProps, isPressed } = useButton(
    props,
    localRef as RefObject<HTMLButtonElement>
  );
  // const { hoverProps, isHovered } = useHover({ isDisabled });
  // const { styleProps } = useStyleProps(otherProps);
  // const isTextOnly = React.Children.toArray(props.children).every(
  //   (c) => !React.isValidElement(c)
  // );

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    // <FocusRing focusRingClass={classNames(styles, 'focus-ring')} autoFocus={autoFocus}>
    <button
      // {...styleProps}
      {...mergeProps(buttonProps, focusProps)}
      ref={mergeRefs(localRef, ref)}
      className={st(
        classes.root,
        {
          iconPos: icon ? iconPos : undefined,
          // variant: variant !== false ? variant : undefined,
          // vol: vol !== false ? vol : undefined,
          isQuiet,
          isFocusVisible,
          isPressed,
          isDisabled,
        },
        classNameProp
      )}
      // className={classNames(
      //   styles,
      //   "spectrum-ActionButton",
      //   {
      //     "spectrum-ActionButton--quiet": isQuiet,
      //     "spectrum-ActionButton--staticColor": !!staticColor,
      //     "spectrum-ActionButton--staticWhite": staticColor === "white",
      //     "spectrum-ActionButton--staticBlack": staticColor === "black",
      //     "is-active": isPressed,
      //     "is-disabled": isDisabled,
      //     "is-hovered": isHovered,
      //   },
      //   styleProps.className
      // )}
    >
      {/* {holdAffordance &&
          <CornerTriangle UNSAFE_className={classNames(styles, 'spectrum-ActionButton-hold')} />
        } */}
      {/* <span
      // slots={{
      //   icon: {
      //     size: "S",
      //     UNSAFE_className: classNames(styles, "spectrum-Icon"),
      //   },
      //   text: {
      //     UNSAFE_className: classNames(styles, "spectrum-ActionButton-label"),
      //   },
      // }}
      >
        {typeof children === "string" || isTextOnly ? (
          <Text as="span" vol={1}>
            {children}
          </Text>
        ) : (
          children
        )}
      </span> */}

      {icon && (
        <>
          {icon}
          {children && <span className={classes.divider}></span>}
        </>
      )}
      {children && <span className={classes.inner}>{children}</span>}
    </button>
    // </FocusRing>
  );
}

/**
 * ActionButtons allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
const _ActionButton = React.forwardRef(ActionButton);
export { _ActionButton as ActionButton };
