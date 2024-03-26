import { useRef, ReactNode, useEffect } from "react";
import type { ListState } from "react-stately";
import type { AriaTagGroupProps, AriaTagProps } from "react-aria";
import { useListState } from "react-stately";
import { useFocusRing, useTag, useTagGroup } from "react-aria";
import CloseIcon from "../icons/Close";
import { IconButton, IconButtonProps } from "../Button/IconButton";
import { Text, TextProps } from "../Text";
import { HelpText, HelpTextProps } from "../HelpText";
import { st, classes } from "./tagGroup.st.css";
import { st as stTag, classes as tagClasses } from "./tag.st.css";
import type { ComponentBase } from "../typings/shared-types";
import { generateDataId } from "../utils";

export interface TagGroupProps<T> extends AriaTagGroupProps<T>, ComponentBase {
  /** Custom className. */
  className?: string;
  /** Override all aspects of the close button; icon, aria-label, vol etc */
  closeButtonProps?: IconButtonProps;
  /** The volume of the label/help text. */
  labelVol?: TextProps["vol"];
  /** The volume of the tags. */
  vol?: TextProps["vol"];
  /** React element to render in the case of no items. */
  emptyState?: ReactNode;
  /** Is there an error with the tag group. */
  isInvalid?: HelpTextProps["isInvalid"];
}

export function TagGroup<T extends object>(props: TagGroupProps<T>) {
  const {
    className,
    label,
    description,
    emptyState,
    errorMessage,
    isInvalid,
    labelVol = 1,
    "data-id": dataId,
  } = props;
  const ref = useRef(null);

  const state = useListState(props);
  const { gridProps, labelProps, descriptionProps, errorMessageProps } =
    useTagGroup(props, state, ref);

  return (
    <div
      className={st(classes.root, { isInvalid }, className)}
      data-id={dataId}
    >
      <Text
        elementType="div"
        className={classes.label}
        vol={labelVol}
        {...labelProps}
        data-id={generateDataId(dataId, "label")}
      >
        {label}
      </Text>
      <div
        className={classes.list}
        {...gridProps}
        ref={ref}
        data-id={generateDataId(dataId, "list")}
      >
        {[...state.collection].length !== 0
          ? [...state.collection].map((item) => {
              return <Tag key={item.key} item={item} state={state} />;
            })
          : emptyState}
      </div>
      <Text
        elementType="div"
        className={classes.helpTextContainer}
        vol={labelVol}
      >
        <HelpText
          className={classes.helpText}
          description={description}
          descriptionProps={descriptionProps}
          errorMessage={errorMessage}
          errorMessageProps={errorMessageProps}
          isInvalid={isInvalid}
          data-id={generateDataId(dataId, "helpText")}
        />
      </Text>
    </div>
  );
}

export interface TagProps<T>
  extends AriaTagProps<T>,
    Pick<TagGroupProps<T>, "closeButtonProps" | "vol"> {
  state: ListState<T>;
  className?: string;
}

export function Tag<T>(props: TagProps<T>) {
  const { item, state, closeButtonProps, vol = 1, className } = props;
  const ref = useRef(null);
  const { focusProps, isFocusVisible } = useFocusRing({ within: true });
  const {
    rowProps,
    gridCellProps,
    removeButtonProps,
    isFocused,
    isDisabled,
    isPressed,
    isSelected,
    allowsRemoving,
  } = useTag(props, state, ref);

  useEffect(() => {
    if (!item.textValue) {
      // eslint-disable-next-line no-console
      console.warn(
        "A `textValue` prop is required for <Item> elements with non-plain text children for accessibility."
      );
    }
  }, [item.textValue]);

  return (
    <Text
      elementType="div"
      vol={vol}
      ref={ref}
      {...rowProps}
      {...focusProps}
      className={stTag(
        tagClasses.root,
        {
          isFocusVisible,
          isFocused,
          isDisabled,
          isPressed,
          isSelected,
          hasRemoveButton: allowsRemoving,
        },
        className
      )}
      {...gridCellProps}
    >
      <div className={tagClasses.content}>{item.rendered}</div>
      {allowsRemoving && (
        <IconButton
          className={tagClasses.removeButton}
          aria-label={"Remove tag"}
          vol={false}
          tone={false}
          variant={false}
          icon={<CloseIcon />}
          {...closeButtonProps}
          {...removeButtonProps}
        />
      )}
    </Text>
  );
}
