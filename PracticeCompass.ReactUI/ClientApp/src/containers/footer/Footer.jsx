import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu, MenuItem } from "@progress/kendo-react-layout";
class Footer extends Component {
  onSelect = (event) => {
    console.log(event.item.data.route);
  };
  render() {
    return (
      <footer
        className={" row bg-light text-center text-lg-start fixed-bottom"}
        style={{ height: "35px" }}
      >
        <div style={{ marginLeft: "20px" }}>
          <Menu openOnClick={true} onSelect={this.onSelect} cssClass="active">
            <MenuItem
              text="Hi,User"
              data={{ route: "menu" }}
              cssStyle={{
                fontSize: "16px",
                color: "black",
              }}
            >
              <MenuItem
                text="User"
                data={{ route: "user" }}
                cssStyle={{
                  fontSize: "16px",
                  color: "black",
                }}
              />
              <MenuItem
                text="LogOut"
                data={{ route: "logout" }}
                cssStyle={{
                  fontSize: "16px",
                  color: "black",
                }}
              />
            </MenuItem>
          </Menu>
        </div>

        <div style={{ marginLeft: "800px", marginTop: "10px" }}>
          © Copyright 2021 , Inc. All rights reserved.
        </div>
      </footer>
    );
  }
}
export default connect()(Footer);
