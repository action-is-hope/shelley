import type React from "react";
import type { Ref } from "react";
import Icon, { IconProps } from "../Icon/Icon";

const AngleDown: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} ref={ref as Ref<SVGSVGElement>}>
      <path d="M13 4v2l-5 5-5-5v-2l5 5z"></path>
    </Icon>
  );
};
AngleDown.toString = () => "Icon";
export default AngleDown;
