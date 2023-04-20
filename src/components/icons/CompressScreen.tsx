import type React from "react";
import type { Ref } from "react";
import Icon, { IconProps } from "../Icon/Icon";

const CompressScreenIcon: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} ref={ref as Ref<SVGSVGElement>}>
      {/* compress-square */}
      <path d="M12 0h-12v12l1-1v-10h10z"></path>
      <path d="M4 16h12v-12l-1 1v10h-10z"></path>
      <path d="M7 9h-5l1.8 1.8-3.8 3.8 1.4 1.4 3.8-3.8 1.8 1.8z"></path>
      <path d="M16 1.4l-1.4-1.4-3.8 3.8-1.8-1.8v5h5l-1.8-1.8z"></path>
    </Icon>
  );
};
CompressScreenIcon.toString = () => "Icon";
export default CompressScreenIcon;
