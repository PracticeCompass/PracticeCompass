import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import InsurancePayments from "./insurance/insurancePayments";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class ApplyPayments extends Component {
  render() {
    return (
      <Fragment>
        <InsurancePayments></InsurancePayments>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplyPayments);
