import React, { useState } from "react";
import "./index.scss";
import { Form, Input, Button, Checkbox } from "antd";

export default props => {
  return <div className="custom-card">{props.children}</div>;
};
