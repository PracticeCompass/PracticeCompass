import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import InsuranceList from "./InsuranceList";
import InsuranceDetails from "./InsuranceDetails"
import "../../../assets/style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}
class Insurance extends Component {
  state = {
    InsuranceDetails: null,
    InsuranceDetailExpanded: false ,
    InsuranceListExpanded: true,
  };
  setInsuranceExpanded = () => {
    //$("#claimList").children("span").trigger("click");
    $("#insuranceList").children("span").trigger("click");
  };
  setInsuranceDetailExpanded = () => {
    //$("#claimList").children("span").trigger("click");
    $("#insuranceDetail").children("span").trigger("click");
  };
  handleSelect = () => {};
  setInsuranceDetails = (insurance) => {
    this.setState({
      PlanDetails: insurance,
      InsuranceDetailExpanded: true,
      InsuranceListExpanded: false,
    });
  };
  render() {
    return (
      <Fragment>
        <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
          <PanelBarItem
          expanded={this.state.InsuranceListExpanded}
            id="insuranceList"
            title="PLAN LIST"
          >
            <InsuranceList
             setInsuranceDetailExpanded={this.setInsuranceDetailExpanded}
             setInsuranceDetails={this.setInsuranceDetails}
            ></InsuranceList>
          </PanelBarItem>
          <PanelBarItem
            id="insuranceDetail"
            expanded={this.state.InsuranceDetailExpanded}
            title="PLAN DETAILS"
          >
            <InsuranceDetails
              setInsuranceExpanded={this.setInsuranceExpanded}
              PlanDetails={this.state.PlanDetails}
            ></InsuranceDetails>
          </PanelBarItem>
        </PanelBar>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
