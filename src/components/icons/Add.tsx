import type React from "react";
import type { Ref } from "react";
import Icon, { IconProps } from "../Icon/Icon";

const Add: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} viewBox="0 0 24 24" ref={ref as Ref<SVGSVGElement>}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};
Add.toString = () => "Icon";
export default Add;
