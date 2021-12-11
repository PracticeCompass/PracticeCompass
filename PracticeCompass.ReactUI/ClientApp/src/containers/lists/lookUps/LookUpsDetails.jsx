import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class LookUpsDetails extends Component {
  render() {
    return (
      <Fragment>
        <div>lookup details</div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LookUpsDetails);
