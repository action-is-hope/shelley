import type React from "react";
import Icon, { IconProps } from "../Icon/Icon";

const Warning: React.VFC<IconProps> = ({ className, alt }) => {
  return (
    <Icon alt={alt} className={className}>
      <path d="M8 1l-8 14h16l-8-14zM8 13c-0.6 0-1-0.4-1-1s0.4-1 1-1 1 0.4 1 1c0 0.6-0.4 1-1 1zM7 10v-4h2v4h-2z"></path>
    </Icon>
  );
};

export default Warning;
