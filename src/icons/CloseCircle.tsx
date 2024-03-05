import type React from "react";
import type { Ref } from "react";
import { Icon, IconProps } from "../Icon";

const CloseCircle: React.VFC<IconProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <Icon {...rest} ref={ref as Ref<SVGSVGElement>}>
      <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM12.2 10.8l-1.4 1.4-2.8-2.8-2.8 2.8-1.4-1.4 2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8z"></path>
    </Icon>
  );
};
export default CloseCircle;
