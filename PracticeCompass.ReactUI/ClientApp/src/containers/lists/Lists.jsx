import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Insurance from "./insurance/Insurance";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class Lists extends Component {
  render() {
    return (
      <Fragment>
        <Insurance></Insurance>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Lists);
