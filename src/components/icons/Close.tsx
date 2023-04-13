import type React from "react";
import Icon, { IconProps } from "../Icon/Icon";

const Close: React.VFC<IconProps> = ({ className, alt }) => {
  return (
    <Icon alt={alt} className={className}>
      <path d="M15.1 3.1l-2.2-2.2-4.9 5-4.9-5-2.2 2.2 5 4.9-5 4.9 2.2 2.2 4.9-5 4.9 5 2.2-2.2-5-4.9z"></path>
    </Icon>
  );
};

export default Close;
