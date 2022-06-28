import { Typography, TypographyProps } from "antd";
import React, { ReactElement } from "react";

type Props = {
  children: string | React.ReactNode;
  style?: any;
};

const EllipsisText = ({ children, ...props }: Props) => {
  return (
    <Typography.Text {...props} ellipsis={{ tooltip: children }}>
      {children}
    </Typography.Text>
  );
};

export default EllipsisText;
