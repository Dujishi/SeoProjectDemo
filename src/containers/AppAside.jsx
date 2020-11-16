import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import CustomMenu from "@/components/CustomMenu";
import logo from "../assets/images/logo.jpeg";

const { Sider } = Layout;

const AppAside = props => {
  let { menuToggle, menu } = props;
  return (
    <Sider className="aside" collapsed={menuToggle}>
      {/* <div className="logo">
        <img src={logo} />
      </div> */}
      <div
        style={{
          color: "#fff",
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        <i>Costco</i>
      </div>
      <CustomMenu menu={menu}></CustomMenu>
    </Sider>
  );
};

AppAside.propTypes = {
  menuToggle: PropTypes.bool,
  menu: PropTypes.array.isRequired
};

export default AppAside;
