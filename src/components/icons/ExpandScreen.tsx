import type React from "react";
import type { Ref } from "react";
import Icon, { IconProps } from "../Icon/Icon";

const ExpandScreenIcon: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} ref={ref as Ref<SVGSVGElement>}>
      {/* fullscreen square */}
      <path d="M11 2h-9v9l1-1v-7h7z"></path>
      <path d="M5 14h9v-9l-1 1v7h-7z"></path>
      <path d="M16 0h-5l1.8 1.8-4.5 4.5 1.4 1.4 4.5-4.5 1.8 1.8z"></path>
      <path d="M7.7 9.7l-1.4-1.4-4.5 4.5-1.8-1.8v5h5l-1.8-1.8z"></path>
    </Icon>
  );
};
ExpandScreenIcon.toString = () => "Icon";
export default ExpandScreenIcon;
