import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "@progress/kendo-react-buttons";
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

class RemoveButtonComponent extends Component {
  render() {
    return (
      <td style={{textAlign:"center"}} onClick={()=>{this.props.myProp.deleteRow(this.props.dataItem)}}>
        <span class="k-icon k-i-close-circle" style={{color: "#2184da",textAlign:"center"}}></span>
      </td>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveButtonComponent);
