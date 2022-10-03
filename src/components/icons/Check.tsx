import type React from "react";
import Icon, { IconProps } from "../Icon/Icon";

const Check: React.VFC<Omit<IconProps, "ref">> = ({
  className,
  alt,
  ...rest
}) => {
  return (
    <Icon alt={alt} className={className} {...rest}>
      <path d="M7.3 14.2l-7.1-5.2 1.7-2.4 4.8 3.5 6.6-8.5 2.3 1.8z"></path>
    </Icon>
  );
};

export default Check;
