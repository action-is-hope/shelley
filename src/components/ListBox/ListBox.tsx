/** ListBox.tsx */
import { Ref, useRef } from "react";
import { useListState, ListState } from "react-stately";
import { useListBox } from "react-aria";
import type { CollectionChildren } from "@react-types/shared/src/collections";
import type { AriaListBoxOptions } from "@react-aria/listbox";
import ListBoxOption from "../ListBoxOption/ListBoxOption";
/* = Style API. */
import { st, classes } from "./listBox.st.css";
import { mergeRefs } from "@react-aria/utils";

export interface ListBoxProps<T> extends AriaListBoxOptions<T> {
  /** ClassName if you need/want a style hook. */
  className?: string;
  state?: ListState<T>;
  children: CollectionChildren<T>;
  listBoxRef?: Ref<any>;
}

export function ListBox<T extends object>(props: ListBoxProps<T>) {
  const { className, listBoxRef } = props;
  const ref = useRef(null);

  // let ref = React.useRef(null);
  // let { listBoxRef = ref, state } = props;
  // let { listBoxProps } = useListBox(props, state, listBoxRef);
  console.log("LISTBOX state", props);
  // Create state based on the incoming props, if state is provided use that.
  let state = useListState({ ...props });
  if (props.state) state = props.state;

  // Get props for the listbox element
  const { listBoxProps, labelProps } = useListBox(props, state, ref);

  return (
    <>
      {props.label && <div {...labelProps}>{props.label}</div>}
      <ul
        className={st(classes.root, className)}
        {...listBoxProps}
        ref={listBoxRef ? mergeRefs(listBoxRef, ref) : ref}
      >
        {[...state.collection].map((item) => (
          <ListBoxOption
            key={item.key}
            {...{
              item,
              state,
              ...props,
            }}
          />
        ))}
        {/* {[...state.collection].map((item) => (
          item.type === 'section'
            ? <ListBoxSection key={item.key} section={item} state={state} />
            : <Option key={item.key} item={item} state={state} />
        ))} */}
      </ul>
    </>
  );
}

export default ListBox;
