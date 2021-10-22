import React, { Component } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
class Header extends Component {
  render() {
    return (
      <div className={"custom-toolbar"}>
        {/* <Button look="flat">
          <img className={"px-2 mr-md-auto"} src={logo} />
        </Button> */}
      </div>
    );
  }
}
export default connect()(Header);
