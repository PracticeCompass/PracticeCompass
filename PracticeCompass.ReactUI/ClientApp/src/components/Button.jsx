import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "@progress/kendo-react-buttons";
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class ButtonComponent extends Component {
  render() {
    return (
      <Fragment>
        <Button
          icon={this.props.icon}
          className={"infraBtn " + this.props.classButton ?? "infraBtn-primary"}
          onClick={this.props.onClick}
          style={this.props.style}
          disabled={this.props.disabled}
        >
          {this.props.children}
        </Button>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonComponent);
