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
      InsuranceDetails: insurance,
      InsuranceDetailExpanded: true,
      InsuranceListExpanded: false,
    });
  };
  render() {
    return (
      <Fragment>
        <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
          <PanelBarItem
            id="insuranceList"
            expanded={this.state.InsuranceListExpanded}
            title="INSURANCE LIST"
          >
            <InsuranceList
             setInsuranceDetailExpanded={this.setInsuranceDetailExpanded}
             setInsuranceDetails={this.setInsuranceDetails}
            ></InsuranceList>
          </PanelBarItem>
          <PanelBarItem
            id="insuranceDetail"
            expanded={this.state.InsuranceDetailExpanded}
            title="INSURANCE DETAILS"
          >
            <InsuranceDetails
              setInsuranceExpanded={this.setInsuranceExpanded}
            ></InsuranceDetails>
          </PanelBarItem>
        </PanelBar>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
