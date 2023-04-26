import type React from "react";
import type { Ref } from "react";
import Icon, { IconProps } from "../Icon/Icon";

const AngleRight: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} ref={ref as Ref<SVGSVGElement>}>
      <path d="M4 13h2l5-5-5-5h-2l5 5z"></path>
    </Icon>
  );
};
export default AngleRight;
