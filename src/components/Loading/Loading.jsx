import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Wrapper } from "./Loading.styled";

export const Loading = () => {
  return (
    <Wrapper>
      <LoadingOutlined
        style={{
          fontSize: 60,
        }}
        spin
        size="large"
      />
    </Wrapper>
  );
};
