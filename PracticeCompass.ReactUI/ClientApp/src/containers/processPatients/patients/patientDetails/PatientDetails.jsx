import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import PatientDetailSummary from "./patientDetailSummary/PatientDetailSummary";
import PatientDetailLedger from "./patientDetailLedger/PatientDetailLedger";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class PatientDetails extends Component {
  state = {
    selected: 0,
  };
  handleSelect = (e) => {
    this.setState({ selected: e.selected });
  };
  render() {
    return (
      <Fragment>
        <div
          style={{
            paddingTop: "5px",
            overflow: "hidden",
            marginTop: "10px",
            // marginBottom: "50px",
            // paddingBottom: "50px",
          }}
        >
          <TabStrip
            className="userManagmentTabStrip"
            selected={this.state.selected}
            onSelect={this.handleSelect}
          >
            <TabStripTab title="Summary" selected="true">
              <PatientDetailSummary
                patientDetails={this.props.patientDetails}
              ></PatientDetailSummary>
            </TabStripTab>
            <TabStripTab title="Ledger">
              <PatientDetailLedger
                patientDetails={this.props.patientDetails}
              ></PatientDetailLedger>
            </TabStripTab>
          </TabStrip>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
