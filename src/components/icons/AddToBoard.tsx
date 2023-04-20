import type React from "react";
import type { Ref } from "react";
import Icon, { IconProps } from "../Icon/Icon";

const AddToBoard: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} viewBox="0 0 24 24" ref={ref as Ref<SVGSVGElement>}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" />
    </Icon>
  );
};
AddToBoard.toString = () => "Icon";
export default AddToBoard;
