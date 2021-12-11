import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class LookUpsList extends Component {
  render() {
    return (
      <Fragment>
        <div>list</div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LookUpsList);
