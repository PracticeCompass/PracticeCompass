import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import ClaimList from "./ClaimList/ClaimList";
import ClaimDetail from "./ClaimDetail/ClaimDetail";
import ChargeDetail from "./ChargeDetail/ChargeDetail";
import "../../../assets/style/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}
class UnSubmitted extends Component {
  state = {
    claimDetails: null,
    ChargeDetail: null,
    ClaimListExpanded: true,
    ClaimDetailExpanded: false,
    ChargeDetailExpanded: false,
  };
  setClaimDetailExpanded = () => {
    //$("#claimList").children("span").trigger("click");
    $("#claimDetail").children("span").trigger("click");
  };
  setChargeDetailExpanded = () => {
    //$("#claimList").children("span").trigger("click");
    $("#chargeDetail").children("span").trigger("click");
  };
  handleSelect = () => {};
  setClaimDetails = (claim) => {
    this.setState({
      claimDetails: claim,
      ClaimDetailExpanded: true,
      ClaimListExpanded: false,
    });
  };
  setChargeDetails = (charge) => {
    this.setState({
      ChargeDetail: charge,
      ClaimDetailExpanded: false,
      ClaimListExpanded: false,
      ChargeDetailExpanded: true,
    });
  };
  render() {
    return (
      <Fragment>
        <PanelBar onSelect={this.handleSelect} expandMode={"single"}>
          <PanelBarItem
            id="claimList"
            expanded={this.state.ClaimListExpanded}
            title="CLAIM LIST"
          >
            <ClaimList
              setClaimDetailsData={this.setClaimDetails}
              setClaimDetailExpanded={this.setClaimDetailExpanded}
            ></ClaimList>
          </PanelBarItem>
          <PanelBarItem
            id="claimDetail"
            expanded={this.state.ClaimDetailExpanded}
            title="CLAIM DETAIL"
          >
            <ClaimDetail
              claimDetails={this.state.claimDetails}
              setChargeDetailsData={this.setChargeDetails}
              setChargeDetailExpanded={this.setChargeDetailExpanded}
            ></ClaimDetail>
          </PanelBarItem>
          <PanelBarItem
            id="chargeDetail"
            expanded={this.state.ChargeDetailExpanded}
            title="CHARGE DETAIL"
          >
            <ChargeDetail
              ChargeDetails={this.state.ChargeDetail}
            ></ChargeDetail>
          </PanelBarItem>
        </PanelBar>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UnSubmitted);
