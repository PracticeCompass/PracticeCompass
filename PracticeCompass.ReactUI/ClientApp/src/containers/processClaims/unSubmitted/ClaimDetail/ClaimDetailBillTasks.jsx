import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../../components/DatePicker";
import TextBox from "../../../../components/TextBox";
import DropDown from "../../../../components/DropDown";
import CheckboxComponent from "../../../../components/Checkbox";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class ClaimDetailBillTasks extends Component {
  render() {
    return <Fragment></Fragment>;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimDetailBillTasks);
