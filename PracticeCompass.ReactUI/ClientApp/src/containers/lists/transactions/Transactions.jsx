import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class Transactions extends Component {
  render() {
    return (
      <Fragment>
        <div>Hello from Transactions</div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
