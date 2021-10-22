import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import PhysiciansList from "./PhysiciansList"
import PhysiciansDetails from "./PhysiciansDetails"
import "../../../assets/style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}
class Physicians extends Component {
  state = {
    PhysicianDetails: null,
    PhysicianDetailExpanded: false ,
    PhysicianListExpanded: true,
  };
  setInsuranceExpanded = () => {
    //$("#claimList").children("span").trigger("click");
    $("#physiciansList").children("span").trigger("click");
  };
  setPhysicianDetailExpanded = () => {
    //$("#claimList").children("span").trigger("click");
    $("#physicianDetail").children("span").trigger("click");
  };
  handleSelect = () => {};
  setPhysicianDetails = (physician) => {
    this.setState({
      PhysicianDetails: physician,
      PhysicianDetailExpanded: true,
      PhysicianListExpanded: false,
    });
  };
  render() {
    return (
      <Fragment>
        <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
          <PanelBarItem
            id="physiciansList"
            expanded={this.state.PhysicianListExpanded}
            title="PHYSICIAN LIST"
          >
            <PhysiciansList
             setInsuranceDetailExpanded={this.setPhysicianDetailExpanded}
             setInsuranceDetails={this.setPhysicianDetails}
            ></PhysiciansList>
          </PanelBarItem>
          <PanelBarItem
            id="physicianDetail"
            expanded={this.state.setPhysicianDetailExpanded}
            title="PHYSICIAN DETAILS"
          >
            <PhysiciansDetails
              setInsuranceExpanded={this.setInsuranceExpanded}
            ></PhysiciansDetails>
          </PanelBarItem>
        </PanelBar>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Physicians);
