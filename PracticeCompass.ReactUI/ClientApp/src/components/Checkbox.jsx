import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Checkbox } from "@progress/kendo-react-inputs";
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class CheckboxComponent extends Component {
  render() {
    return (
      <Fragment>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            marginLeft: "10px",
          }}
        >
          <Checkbox
            style={{
              marginRight: "1px",
              borderWidth: "thin",
              borderStyle: "solid",
              borderColor: "#000000",
              marginLeft: this.props.marginLeftStyle
                ? this.props.marginLeftStyle
                : "10px",
            }}
            defaultChecked={this.props.defaultChecked}
            value={this.props.value}
            label={this.props.label}
            onChange={this.props.onChange}
          />
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckboxComponent);
