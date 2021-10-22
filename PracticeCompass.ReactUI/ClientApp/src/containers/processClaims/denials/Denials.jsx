import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import UnSubmitted from "../unSubmitted/UnSubmitted";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class Denials extends Component {
  render() {
    return (
      <Fragment>
        <UnSubmitted filterName="Denials"></UnSubmitted>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Denials);
