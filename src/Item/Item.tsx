import { Item as StatelyItem } from "@react-stately/collections";
import type { ItemProps } from "react-stately";

export type { ItemProps };

// export interface ItemProps<T> extends AdobeItemProps<T>{}
const Item: <T>(props: ItemProps<T>) => JSX.Element = StatelyItem;
export default Item;
