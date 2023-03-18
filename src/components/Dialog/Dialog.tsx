import Button from "../Button/Button";

// import CrossLarge from '@spectrum-icons/ui/CrossLarge';
import { DialogContext, DialogContextValue } from "./context";
// import { DOMRef } from "@react-types/shared";
import { mergeRefs, mergeProps } from "@react-aria/utils";
// import {Grid} from '@react-spectrum/layout';
// @ts-ignore
// import intlMessages from "../intl/*.json";
// import { mergeProps } from "@react-aria/utils";
import React, {
  RefObject,
  useContext,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import type { AriaDialogProps } from "@react-types/dialog";
// import styles from '@adobe/spectrum-css-temp/components/dialog/vars.css';
import { useDialog } from "@react-aria/dialog";
// import { useLocalizedStringFormatter } from "@react-aria/i18n";

import { st, classes } from "./dialog.st.css";

let sizeMap = {
  S: "small",
  M: "medium",
  L: "large",
  fullscreen: "fullscreen",
  fullscreenTakeover: "fullscreenTakeover",
};

interface DialogProps extends AriaDialogProps {
  /** The contents of the Dialog. */
  children: ReactNode;
  /** The size of the Dialog. Only applies to "modal" type Dialogs. */
  size?: "S" | "M" | "L";
  /** Whether the Dialog is dismissable. See the [examples](#examples) for more details. */
  isDismissable?: boolean;
  /** Handler that is called when the 'x' button of a dismissable Dialog is clicked. */
  onDismiss?: () => void;
}

function Dialog(props: DialogProps, ref: React.Ref<HTMLElement>) {
  let { type = "modal", ...contextProps } =
    useContext(DialogContext) || ({} as DialogContextValue);
  console.log("contextProps", contextProps);
  let {
    children,
    isDismissable = contextProps.isDismissable,
    onDismiss = contextProps.onClose,
    size,
    ...otherProps
  } = props;
  // let stringFormatter = useLocalizedStringFormatter(intlMessages);
  // let {styleProps} = useStyleProps(otherProps);

  size = type === "popover" ? size || "S" : size || "L";

  // let domRef = useDOMRef(ref);
  // let domRef = ref;
  // let gridRef = useRef();
  // let sizeVariant = sizeMap[type] || sizeMap[size];
  const localRef = useRef(null);

  // let domRef = mergeRefs(ref, localRef);

  let { dialogProps, titleProps } = useDialog(
    mergeProps(contextProps, props),
    localRef
  );

  // let hasHeader = useHasChild(`.${styles['spectrum-Dialog-header']}`, unwrapDOMRef(gridRef));
  // let hasHeading = useHasChild(`.${styles['spectrum-Dialog-heading']}`, unwrapDOMRef(gridRef));
  // let hasFooter = useHasChild(`.${styles['spectrum-Dialog-footer']}`, unwrapDOMRef(gridRef));
  // let hasTypeIcon = useHasChild(`.${styles['spectrum-Dialog-typeIcon']}`, unwrapDOMRef(gridRef));

  // let slots = useMemo(() => ({
  //   hero: {UNSAFE_className: styles['spectrum-Dialog-hero']},
  //   heading: {UNSAFE_className: classNames(styles, 'spectrum-Dialog-heading', {'spectrum-Dialog-heading--noHeader': !hasHeader, 'spectrum-Dialog-heading--noTypeIcon': !hasTypeIcon}), level: 2, ...titleProps},
  //   header: {UNSAFE_className: classNames(styles, 'spectrum-Dialog-header', {'spectrum-Dialog-header--noHeading': !hasHeading, 'spectrum-Dialog-header--noTypeIcon': !hasTypeIcon})},
  //   typeIcon: {UNSAFE_className: styles['spectrum-Dialog-typeIcon']},
  //   divider: {UNSAFE_className: styles['spectrum-Dialog-divider'], size: 'M'},
  //   content: {UNSAFE_className: styles['spectrum-Dialog-content']},
  //   footer: {UNSAFE_className: styles['spectrum-Dialog-footer']},
  //   buttonGroup: {UNSAFE_className: classNames(styles, 'spectrum-Dialog-buttonGroup', {'spectrum-Dialog-buttonGroup--noFooter': !hasFooter}), align: 'end'}
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }), [hasFooter, hasHeader, titleProps]);

  return (
    <section
      // {...styleProps}
      {...dialogProps}
      // className={classNames(
      //   styles,
      //   'spectrum-Dialog',
      //   {
      //     [`spectrum-Dialog--${sizeVariant}`]: sizeVariant,
      //     'spectrum-Dialog--dismissable': isDismissable
      //   },
      //   styleProps.className
      // )}
      className={st(classes.root, { size })}
      ref={mergeRefs(ref, localRef)}
      // TabIndex is set to -1 by useDialog, this interferes
      // with react-focus-on. Adobe's FocusScope likely supports this.
      tabIndex={undefined}
    >
      <div className={classes.dialogGrid}>
        {children}
        {isDismissable && (
          <Button
            // UNSAFE_className={styles['spectrum-Dialog-closeButton']}
            // isQuiet
            // aria-label={stringFormatter.format("dismiss")}
            aria-label={"dismiss - PROP!"}
            onPress={onDismiss}
          >
            {/* <CrossLarge /> */}X
          </Button>
        )}
      </div>
      {/* <Grid ref={gridRef} UNSAFE_className={styles['spectrum-Dialog-grid']}>
        <SlotProvider slots={slots}>
          {children}
        </SlotProvider>
        {isDismissable &&
          <ActionButton
            UNSAFE_className={styles['spectrum-Dialog-closeButton']}
            isQuiet
            aria-label={stringFormatter.format('dismiss')}
            onPress={onDismiss}>
            <CrossLarge />
          </ActionButton>
        }
      </Grid> */}
    </section>
  );
}

/**
 * Dialogs are windows containing contextual information, tasks, or workflows that appear over the user interface.
 * Depending on the kind of Dialog, further interactions may be blocked until the Dialog is acknowledged.
 */
let _Dialog = React.forwardRef(Dialog);
export { _Dialog as Dialog };
