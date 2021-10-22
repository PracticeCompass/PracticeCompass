import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Patients from "./patients/Patients.jsx";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class ProcessPatients extends Component {
  render() {
    return (
      <Fragment>
        <Patients></Patients>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProcessPatients);
