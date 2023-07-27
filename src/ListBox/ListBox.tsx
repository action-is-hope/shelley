"use client";
import { Ref, ReactElement, useRef, forwardRef, ReactNode } from "react";
import { useListState, ListState } from "react-stately";
import { mergeRefs } from "@react-aria/utils";
import type { CollectionChildren } from "@react-types/shared/src/collections";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import { useListBox } from "@react-aria/listbox";
import type { ComponentBase, LoadMoreProps } from "../typings/shared-types";
import { ProgressCircle } from "../ProgressCircle";
import { st, classes } from "./listBox.st.css";
import { ListBoxOption } from "./ListBoxOption";

export interface ListBoxProps<T>
  extends AriaListBoxOptions<T>,
    ComponentBase,
    Omit<LoadMoreProps, "onLoadMore"> {
  /** ClassName if you need/want a style hook. */
  className?: string;
  state?: ListState<T>;
  children?: CollectionChildren<T>;
  optionSelectedIcon?: ReactNode;
}

function ListBox<T extends object>(
  props: ListBoxProps<T>,
  ref?: React.Ref<HTMLUListElement>
) {
  const {
    className,
    "data-id": dataId,
    loadingState,
    loadingMoreString,
    loadingString,
    optionSelectedIcon,
  } = props;
  const localRef = useRef<HTMLUListElement>(null);
  // Create state based on the incoming props, if state is provided use that.
  let state = useListState({ ...props });
  if (props.state) state = props.state;

  // Get props for the listbox element
  const { listBoxProps, labelProps } = useListBox(props, state, localRef);

  return (
    <>
      {props.label && (
        <div {...labelProps} data-id={dataId ? `${dataId}--label` : undefined}>
          {props.label}
        </div>
      )}
      <ul
        {...listBoxProps}
        className={st(classes.root, className)}
        data-id={dataId}
        ref={ref ? mergeRefs(ref, localRef) : localRef}
      >
        {[...state.collection].map((item) => (
          <ListBoxOption
            key={item.key}
            className={classes.option}
            {...{
              item,
              state,
              optionSelectedIcon,
              ...props,
            }}
          />
        ))}
        {/* {[...state.collection].map((item) => (
          item.type === 'section'
            ? <ListBoxSection key={item.key} section={item} state={state} />
            : <Option key={item.key} item={item} state={state} />
        ))} */}
        {/* // aria-selected isn't needed here since this option is not selectable.
                // eslint-disable-next-line jsx-a11y/role-has-required-aria-props */}

        {loadingState === "loadingMore" && (
          <li role="option" className={classes.loadingMore}>
            <ProgressCircle
              isIndeterminate
              data-id={dataId ? `${dataId}--progressCircle` : undefined}
              size="small"
              aria-label={
                state.collection.size > 0 ? loadingMoreString : loadingString
              }
            />
          </li>
        )}
      </ul>
    </>
  );
}

// forwardRef doesn't support generic parameters -> cast to the correct type.
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const _ListBox = forwardRef(ListBox) as <T>(
  props: ListBoxProps<T> & { ref?: Ref<HTMLElement> }
) => ReactElement;
export { _ListBox as ListBox };
