import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import UnSubmitted from "../unSubmitted/UnSubmitted";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class Rejections extends Component {
  render() {
    return (
      <Fragment>
        <UnSubmitted filterName="Rejections"></UnSubmitted>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rejections);
