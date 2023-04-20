import type React from "react";
import type { Ref } from "react";
import Icon, { IconProps } from "../Icon/Icon";

const AngleLeft: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} ref={ref as Ref<SVGSVGElement>}>
      <path d="M12 13h-2l-5-5 5-5h2l-5 5z"></path>
    </Icon>
  );
};
AngleLeft.toString = () => "Icon";
export default AngleLeft;
