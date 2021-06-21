import type React from "react";
import Icon, { IconProps } from "../Icon/Icon";

const AngleLeft: React.VFC<IconProps> = ({ className, alt }) => {
  return (
    <Icon alt={alt} className={className}>
      <path d="M12 13h-2l-5-5 5-5h2l-5 5z"></path>
    </Icon>
  );
};

export default AngleLeft;
