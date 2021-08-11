import type React from "react";
import Icon, { IconProps } from "../Icon/Icon";

const AngleRight: React.VFC<IconProps> = ({ className, alt }) => {
  return (
    <Icon alt={alt} className={className}>
      <path d="M4 13h2l5-5-5-5h-2l5 5z"></path>
    </Icon>
  );
};

export default AngleRight;
