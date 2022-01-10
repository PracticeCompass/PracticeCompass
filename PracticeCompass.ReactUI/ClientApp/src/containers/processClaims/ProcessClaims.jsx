import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import UnSubmitted from "./unSubmitted/UnSubmitted.jsx";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class ProcessClaims extends Component {
  render() {
    return (
      <Fragment>
        <UnSubmitted filterName="ClaimSearch"></UnSubmitted>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProcessClaims);
