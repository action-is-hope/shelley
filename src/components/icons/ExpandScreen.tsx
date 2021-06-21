import type React from "react";

import Icon, { IconProps } from "../Icon/Icon";

const ExpandScreenIcon: React.VFC<IconProps> = ({ className, alt }) => {
  return (
    <Icon alt={alt} className={className}>
      {/* fullscreen square */}
      <path d="M11 2h-9v9l1-1v-7h7z"></path>
      <path d="M5 14h9v-9l-1 1v7h-7z"></path>
      <path d="M16 0h-5l1.8 1.8-4.5 4.5 1.4 1.4 4.5-4.5 1.8 1.8z"></path>
      <path d="M7.7 9.7l-1.4-1.4-4.5 4.5-1.8-1.8v5h5l-1.8-1.8z"></path>

      {/* fullscreen icon */}
      {/* <path d="M5.3 6.7l1.4-1.4-3-3 1.3-1.3h-4v4l1.3-1.3z"></path>
      <path d="M6.7 10.7l-1.4-1.4-3 3-1.3-1.3v4h4l-1.3-1.3z"></path>
      <path d="M10.7 9.3l-1.4 1.4 3 3-1.3 1.3h4v-4l-1.3 1.3z"></path>
      <path d="M11 1l1.3 1.3-3 3 1.4 1.4 3-3 1.3 1.3v-4z"></path> */}
    </Icon>
  );
};

export default ExpandScreenIcon;
