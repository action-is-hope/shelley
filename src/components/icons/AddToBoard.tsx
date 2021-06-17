import React from "react";
import Icon, { IconProps } from "../Icon/Icon";

const Logo = ({ className, alt }: IconProps) => {
  return (
    <Icon alt={alt} viewBox="0 0 24 24" className={className}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z" />
    </Icon>
  );
};

export default Logo;
