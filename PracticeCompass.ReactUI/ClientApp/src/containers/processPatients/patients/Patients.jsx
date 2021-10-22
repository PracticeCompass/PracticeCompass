import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import Patient from "./patient/Patient.jsx";
import PatientDetails from "./patientDetails/PatientDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/style/global.css";
import $ from "jquery";
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
class Patients extends Component {
  state = {
    patientDetails: null,
    patientExpanded: true,
    patientDetailsExpanded: false,
  };
  setPatientDetailExpanded = () => {
    //$("#patient").children("span").trigger("click");
    $("#patientDetail").children("span").trigger("click");
  };
  setPatientDetails = (Patient) => {
    this.setState({
      patientDetails: Patient,
      patientDetailsExpanded: true,
      patientExpanded: false,
    });
  };
  handleSelect = () => {};
  render() {
    return (
      <Fragment>
        <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
          <PanelBarItem
            patientDetails={this.state.patientDetails}
            expanded={this.state.patientExpanded}
            id="patient"
            title="PATIENT"
          >
            <Patient
              setPatientDetails={this.setPatientDetails}
              setPatientDetailExpanded={this.setPatientDetailExpanded}
            ></Patient>
          </PanelBarItem>
          <PanelBarItem
            expanded={this.state.patientDetailsExpanded}
            id="patientDetail"
            title={"PATIENT DETAIl"}
          >
            <PatientDetails
              patientDetails={this.state.patientDetails}
            ></PatientDetails>
          </PanelBarItem>
        </PanelBar>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Patients);
