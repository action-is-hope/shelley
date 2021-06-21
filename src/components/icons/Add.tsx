import type React from "react";
import Icon, { IconProps } from "../Icon/Icon";

const Add: React.VFC<IconProps> = ({ className, alt }) => {
  return (
    <Icon alt={alt} viewBox="0 0 24 24" className={className}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </Icon>
  );
};

export default Add;
