import type React from "react";
import type { Ref } from "react";
import { Icon, IconProps } from "../Icon/Icon";

const Info: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} ref={ref as Ref<SVGSVGElement>}>
      <path d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"></path>
      <path d="M7 6h2v7h-2v-7z"></path>
      <path d="M7 3h2v2h-2v-2z"></path>
    </Icon>
  );
};
export default Info;
