import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import InsurancePayments from "./insurance/insurancePayments";
import { GetPaymentClass } from "../../redux/actions/payments";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return { getPaymentClass: () => dispatch(GetPaymentClass()) };
}
class ApplyPayments extends Component {
  componentDidMount() {
    this.props.getPaymentClass();
  }
  render() {
    return (
      <Fragment>
        <InsurancePayments></InsurancePayments>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplyPayments);
