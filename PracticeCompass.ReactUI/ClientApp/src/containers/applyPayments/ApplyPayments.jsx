import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import FindPayments from "./findPayments/findPayments";
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
        <FindPayments></FindPayments>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplyPayments);
